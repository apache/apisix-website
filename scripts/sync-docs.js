const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");
const process = require("process");
const os = require('os');
const listr = require("listr");
const simpleGit = require("simple-git");
const semver = require('semver');

const common = require("./common.js");


const git = simpleGit();
const {projects, languages, projectPaths} = common;
const tempPath = "./tmp";
const websitePath = "../website";

const projectReleases = {};
const tasks = new listr([
  {
    title: "Start documents sync",
    task: () => {
      removeFolder(tempPath);
      fs.mkdirSync(tempPath);
    }
  },
  {
    title: "Clone git repositories",
    task: () => {
      const gitTasks = projects.map(project => {
        return {
          title: `Clone ${project.name} repository`,
          task: async () => {
            await git.clone(`https://github.com/apache/${project.name}.git`, `${tempPath}/${project.name}/`);
          }
        }
      });
      return new listr(gitTasks, {concurrent: 3});
    },
  },
  {
    title: "Find project release",
    task: async () => {
      const findReleaseTasks = projects.map(project => {
        return {
          title: `Find ${project.name} releases`,
          task: async () => {
            let ret = await git.cwd(`${tempPath}/${project.name}/`).branch();
            if (ret.all) {
              projectReleases[project.name] = ret.all
                  .filter(release => release.includes("remotes/origin/release/"))
                  .map(release => release.replace("remotes/origin/release/", ""))
                  .sort((a, b) => semver.compare(semver.coerce(a).version, semver.coerce(b).version));
            }
          }
        }
      });
      return new listr(findReleaseTasks);
    }
  },
  {
    title: "Extract documents",
    task: () => {
      const extractDocumentTasks = projectPaths.map(project => {
        return {
          title: `Extract ${project.name} documents`,
          task: () => {
            const extractProjectTasks = projectReleases[project.name].map(version => {
              return {
                title: `Extract ${project.name} ${version} documents`,
                task: () => {
                  return new listr([
                    {
                      title: `Checkout ${project.name} version: ${version}`,
                      task: async () => {
                        await git.cwd(`${tempPath}/${project.name}/`).checkout(`remotes/origin/release/${version}`, ['-f']);
                      }
                    },
                    {
                      title: "Replace elements inside MD files",
                      task: () => {
                        const branchName = `release/${version}`;
                        replaceMDElements(project.name, [`${tempPath}/${project.name}/docs`], branchName);
                        copyAllDocs(project);
                      }
                    },
                    {
                      title: "Generate API docs for APISIX",
                      enabled: () => {
                        return os.platform() === "linux" && project.name === 'apisix' && isFileExisted(`./${tempPath}/${project.name}/autodocs`);
                      },
                      task: () => {
                        return generateAPIDocs(project);
                      }
                    },
                    {
                      title: "Add English documents",
                      task: () => {
                        childProcess.execSync(
                            `npm run docusaurus docs:version:docs-${project.name} ${version}`,
                            {cwd: websitePath}
                        );
                      }
                    },
                    {
                      title: "Add Chinese documents",
                      task: () => {
                        if (isFileExisted(`./${tempPath}/${project.name}/docs/zh/latest`) !== false) {
                          copyFolder(
                              project.latestDocs.zh,
                              `${websitePath}/i18n/zh/docusaurus-plugin-content-docs-docs-${project.name}/version-${version}`
                          );
                        }
                      }
                    }
                  ]);
                }
              }
            });
            return new listr(extractProjectTasks);
          }
        }
      });
      return new listr(extractDocumentTasks);
    }
  },
  {
    // NOTE: Extract docs from the master branch
    title: "Extract next version documents",
    task: () => {
      const nextVersionTasks = projectPaths.map((project) => {
        return {
          title: `Extract ${project.name} next version documents`,
          task: () => {
            const steps = [
              {
                title: `Checkout ${project.name} next version`,
                task: () => new Promise(async (resolve) => {
                  git.cwd(`${tempPath}/${project.name}/`).checkout(`remotes/origin/${project.branch}`, ['-f']).then(() => {
                    resolve();
                  });
                })
              },
              {
                title: "Replace elements inside MD files",
                task: () => {
                  replaceMDElements(project.name, [`${tempPath}/${project.name}/docs`], project.branch);
                  copyAllDocs(project);
                }
              },
              {
                title: "Generate API docs for APISIX",
                enabled: () => {
                  return os.platform() === "linux" && project.name === 'apisix' && isFileExisted(`./${tempPath}/${project.name}/autodocs`);
                },
                task: () => {
                  return generateAPIDocs(project);
                }
              }
            ];
            return new listr(steps);
          }
        }
      });
      return new listr(nextVersionTasks);
    }
  },
  {
    title: "Clean temporary files",
    task: () => {
      removeFolder(tempPath);
    }
  }
]);

tasks.run()
    .then(() => {
      console.log("[Finish] Documents synchronize success");
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });

const log = (text) => {
};

const isFileExisted = (path) => {
  return fs.existsSync(path);
};

const replaceMDElements = (project, path, branch = "master") => {
  const replace = require("replace-in-file");
  const allMDFilePaths = path.map((p) => `${p}/**/*.md`);

  // replace the image urls inside markdown files
  const imageOptions = {
    files: allMDFilePaths,
    // NOTE: just replace the url begin with ../assets/images ,then can replace with absolute url path
    from: /(\.\.\/)+assets\/images\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g,
    to: (match) => {
      const imgPath = match.replace(/\(|\)|\.\.\/*/g, "");
      const newUrl = `https://cdn.jsdelivr.net/gh/apache/${project}@${branch}/docs/${imgPath}`;
      //console.log(`${project}: ${match} 👉 ${newUrl}`);
      return newUrl;
    },
  };

  // replace the markdown urls inside markdown files
  const markdownOptions = {
    files: allMDFilePaths,
    from: RegExp(
        `\\[.*\\]\\((\\.\\.\\/)*(${languages.join("|")})\\/.*\\.md\\)`,
        "g"
    ),
    to: (match) => {
      const markdownPath = match.replace(/\(|\)|\.\.\/*|\[.*\]|\.\//g, ""); // "en/latest/discovery/dns.md"
      const lang = markdownPath.split("/")[0];
      const urlPath = markdownPath.replace(
          RegExp(`(${languages.join("|")})\\/latest\\/|\\.md`, "g"),
          ""
      ); // "discovery/dns"
      const projectNameWithoutPrefix =
          project === "apisix" ? "apisix" : project.replace("apisix-", "");
      let newUrl = match.replace(
          /\]\(.*\)/g,
          `](https://apisix.apache.org${lang !== "en" ? "/" + lang : ""
          }/docs/${projectNameWithoutPrefix}/${urlPath})`
      );
      log(`${project}: ${match} 👉 ${newUrl}`);
      return newUrl;
    },
  };

  try {
    replace.sync(imageOptions);
    replace.sync(markdownOptions);
  } catch (error) {
    console.error(`${project} - Error occurred:`, error);
  }
};

const removeFolder = (tarDir) => {
  if (!fs.existsSync(tarDir)) return;

  let files = fs.readdirSync(tarDir);
  files.forEach((file) => {
    const tarPath = path.join(tarDir, file);
    let stats = fs.statSync(tarPath);
    if (stats.isDirectory()) {
      removeFolder(tarPath);
    } else {
      fs.unlinkSync(tarPath);
    }
  });

  fs.rmdirSync(tarDir);
};

const copyFolder = (srcDir, tarDir) => {
  let files = fs.readdirSync(srcDir);
  if (isFileExisted(tarDir) === false) {
    fs.mkdirSync(tarDir, () => log(`create directory ${tarDir}`));
  }
  files.forEach((file) => {
    let srcPath = path.join(srcDir, file);
    let tarPath = path.join(tarDir, file);

    let stats = fs.statSync(srcPath);
    if (stats.isDirectory()) {
      if (!fs.existsSync(tarPath)) {
        fs.mkdirSync(tarPath);
      }
      copyFolder(srcPath, tarPath);
    } else {
      fs.copyFileSync(srcPath, tarPath);
    }
  });
};

const copyDocs = (source, target, projectName, locale) => {
  if (isFileExisted(`${source}/${locale}/latest`) === false) {
    log(`[${projectName}] can not find ${locale} latest folder, skip.`);
    return;
  }

  log(`[${projectName}] load ${locale} latest docs config.json`);
  const configLatest = JSON.parse(
      fs.readFileSync(`${source}/${locale}/latest/config.json`)
  );

  log(`[${projectName}] delete ${locale} docs config.json`);
  fs.unlinkSync(`${source}/${locale}/latest/config.json`);

  log(`[${projectName}] copy latest ${locale} docs to ${target}`);
  copyFolder(`${source}/${locale}/latest/`, target);

  log(`[${projectName}] write sidebar.json`);
  const sidebar = {
    docs: [...(configLatest.sidebar || [])],
  };
  fs.writeFileSync(`${target}/sidebars.json`, JSON.stringify(sidebar, null, 2));
};

const copyAllDocs = (project) => {
  copyDocs(
      `${tempPath}/${project.name}/docs`,
      project.latestDocs.en,
      project.name,
      "en"
  );
  copyDocs(
      `${tempPath}/${project.name}/docs`,
      project.latestDocs.zh,
      project.name,
      "zh"
  );
};

/**
 * Generate APISIX API Docs
 * @return {Listr<Listr.ListrContext>}
 * @param project
 * @param version
 */
const generateAPIDocs = (project) => {
  return new listr([
    {
      title: "Generate markdown files",
      task: () => {
        childProcess.spawnSync(`autodocs/generate.sh`, ['build'], {
          cwd: `./${tempPath}/${project.name}`
        });
      }
    },
    {
      title: "Copy API docs",
      task: () => {
        if (isFileExisted(`./${tempPath}/${project.name}/autodocs/output`) !== false) {
          copyFolder(`${tempPath}/${project.name}/autodocs/output`, `${project.latestDocs.en}/pdk-docs`);
        }
      }
    }
  ]);
}

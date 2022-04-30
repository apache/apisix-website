const childProcess = require('child_process');
const fs = require('fs/promises');
const path = require('path');
const process = require('process');
const os = require('os');
const Listr = require('listr');
const simpleGit = require('simple-git');
const semver = require('semver');
const replace = require('replace-in-file');

const common = require('./common.js');
const { versions } = require('../website/config/apisix-versions.js');

const { projects, languages, projectPaths } = common;
const tempPath = './temp';
const websitePath = '../website';
const gitMap = {};
const projectReleases = {};

const tasks = new Listr([
  {
    title: 'Start documents sync',
    task: async () => {
      if (!await isDirExisted(tempPath)) { await fs.mkdir(tempPath); }
    },
  },
  {
    title: 'Clone git repositories',
    task: () => {
      const gitTasks = projects.map((project) => ({
        title: `Clone ${project.name} repository`,
        task: async () => {
          const dir = `${tempPath}/${project.name}/`;
          if (isDirExisted(dir)) {
            gitMap[project.name] = simpleGit(dir);
            await gitMap[project.name].cwd(dir).fetch();
          } else {
            gitMap[project.name] = simpleGit();
            await gitMap[project.name]
              .clone(
                `https://github.com/apache/${project.name}.git`,
                { '--filter': 'blob:none', '--sparse': true },
              )
              .cwd(`${tempPath}/${project.name}/`)
              .raw(['sparse-checkout', 'set', 'docs']);
            if (project.name === 'apisix') {
              gitMap[project.name]
                .cwd(`${tempPath}/${project.name}/`)
                .raw(['sparse-checkout', 'add', 'apisix/core', 'autodocs']);
            }
          }
        },
      }));
      return new Listr(gitTasks, { concurrent: projects.length });
    },
  },
  {
    title: 'Find project release',
    task: () => {
      const findReleaseTasks = projects
        .filter((p) => p.name !== 'apisix')
        .map((project) => ({
          title: `Find ${project.name} releases`,
          task: async () => {
            const ret = await gitMap[project.name].cwd(`${tempPath}/${project.name}/`).branch();
            if (ret.all) {
              projectReleases[project.name] = ret.all
                .filter((release) => release.includes('remotes/origin/release/'))
                .map((release) => release.replace('remotes/origin/release/', ''))
                .sort((a, b) => semver.compare(semver.coerce(a).version, semver.coerce(b).version));
            }
          },
        }));
      return new Listr(findReleaseTasks, { concurrent: projects.length });
    },
  },
  {
    title: 'Extract documents',
    task: () => {
      // add apisix versions to release
      projectReleases.apisix = versions;

      const extractTasks = projectPaths.map((project) => (
        {
          title: `Extract ${project.name}`,
          task: () => new Listr([
            {
              title: `Create target dir`,
              task: async () => {
                const projectName = project.name;
                const docs = `${websitePath}/docs-${projectName}_versioned_docs`;
                const sidebar = `${websitePath}/docs-${projectName}_versioned_sidebars`;
                const versions = `${websitePath}/docs-${projectName}_vesions.json`;

                await Promise.all([
                  removeFolder(docs).then(() => fs.mkdir(docs)),
                  removeFolder(sidebar).then(() => fs.mkdir(sidebar)),
                  fs.rm(versions)
                    .catch(() => { /* ignore */ })
                    .then(() => fs.writeFile(
                      versions,
                      JSON.stringify(projectReleases[projectName], null, 2),
                    )),
                ]);
              },
            },
            {
              title: `Extract ${project.name} documents`,
              task: () => {
                const steps = projectReleases[project.name]
                  .map((version) => ({
                    title: `Extract ${project.name} ${version} documents`,
                    task: () => extractDocsVersionTasks(project, version),
                  }));
                return new Listr(steps);
              },
            },
          ]),
        }
      ));
      return new Listr(extractTasks, { concurrent: projects.length });
    },
  },
  {
    // NOTE: Extract docs from the master branch
    title: 'Extract next version documents',
    skip: () => true,
    task: () => {
      const nextVersionTasks = projectPaths.map((project) => ({
        title: `Extract ${project.name} next version documents`,
        task: () => {
          const steps = [
            {
              title: `Checkout ${project.name} next version`,
              task: () => gitMap[project.name].cwd(`${tempPath}/${project.name}/`).checkout(`remotes/origin/${project.branch}`, ['-f']),
            },
            {
              title: 'Replace elements inside MD files',
              task: async () => {
                await replaceMDElements(project.name, [`${tempPath}/${project.name}/docs`], project.branch);
                // await copyAllDocs(project);
              },
            },
            {
              title: 'Generate API docs for APISIX',
              enabled: () => os.platform() === 'linux' && project.name === 'apisix' && isFileExisted(`./${tempPath}/${project.name}/autodocs`),
              task: () => generateAPIDocs(project),
            },
          ];
          return new Listr(steps);
        },
      }));
      return new Listr(nextVersionTasks, { concurrent: projects.length });
    },
  },
]);

tasks.run()
  .then(() => {
    console.log('[Finish] Documents synchronize success');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function log(text) {
  console.log(text);
}

async function replaceMDElements(project, path, branch = 'master') {
  const allMDFilePaths = path.map((p) => `${p}/**/*.md`);

  // replace the image urls inside markdown files
  const imageOptions = {
    files: allMDFilePaths,
    // NOTE: just replace the url begin with ../assets/images ,
    // then can replace with absolute url path
    from: /(\.\.\/)+assets\/images\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g,
    to: (match) => {
      const imgPath = match.replace(/\(|\)|\.\.\/*/g, '');
      const newUrl = `https://raw.githubusercontent.com/apache/${project}/${branch}/docs/${imgPath}`;
      log(`${project}: ${match} 👉 ${newUrl}`);
      return newUrl;
    },
  };

  // replace the markdown urls inside markdown files
  const markdownOptions = {
    files: allMDFilePaths,
    from: RegExp(
      `\\[.*\\]\\((\\.\\.\\/)*(${languages.join('|')})\\/.*\\.md\\)`,
      'g',
    ),
    to: (match) => {
      const markdownPath = match.replace(/\(|\)|\.\.\/*|\[.*\]|\.\//g, ''); // "en/latest/discovery/dns.md"
      const lang = markdownPath.split('/')[0];
      const urlPath = markdownPath.replace(
        RegExp(`(${languages.join('|')})\\/latest\\/|\\.md`, 'g'),
        '',
      ); // "discovery/dns"
      const projectNameWithoutPrefix = project === 'apisix' ? 'apisix' : project.replace('apisix-', '');
      const newUrl = match.replace(
        /\]\(.*\)/g,
        `](https://apisix.apache.org${lang === 'en' ? '' : `/${lang}`}/docs/${projectNameWithoutPrefix}/${urlPath})`,
      );
      log(`${project}: ${match} 👉 ${newUrl}`);
      return newUrl;
    },
  };

  await replace(imageOptions);
  await replace(markdownOptions);
}

async function isFileExisted(p) {
  return fs.stat(p).then((v) => v.isFile()).catch(() => false);
}

async function isDirExisted(p) {
  return fs.stat(p).then((v) => v.isDirectory()).catch(() => false);
}

async function removeFolder(tarDir) {
  if (await isDirExisted()) return;
  await fs.rm(tarDir, { recursive: true, force: true });
}

async function copyFolder(srcDir, tarDir) {
  const [files] = await Promise.all([
    fs.readdir(srcDir),
    fs.mkdir(tarDir, { recursive: true }),
  ]);

  return Promise.all(files.map(async (file) => {
    const srcPath = path.join(srcDir, file);
    const tarPath = path.join(tarDir, file);
    const stats = await fs.stat(srcPath);

    return stats.isDirectory()
      ? copyFolder(srcPath, tarPath)
      : fs.copyFile(srcPath, tarPath);
  }));
}

async function copyDocs(source, target) {
  if (!await isDirExisted(source)) {
    log(`cannot find ${source}, skip.`);
    return Promise.reject(new Error(`${source} no exist`));
  }

  return copyFolder(source, target);
}

function normalizeSidebar(sidebarList, version) {
  const arr = sidebarList.map((block) => ({
    ...block,
    ...block?.items?.length > 0
      ? {
        collapsible: true,
        collapsed: true,
        items: block.items.map((v) => {
          if (typeof v === 'string') {
            return {
              type: 'doc',
              id: `version-${version}/${v}`,
            };
          }
          if (v.type === 'category') {
            return normalizeSidebar([v], version)[`version-${version}/docs`][0];
          }
          return v;
        }),
      }
      : {},
  }));

  return {
    [`version-${version}/docs`]: arr,
  };
}

async function handleConfig2Sidebar(source, target, version, versionedTarget) {
  log(`load ${source} latest docs config.json`);
  const config = JSON.parse(
    await fs.readFile(`${source}/config.json`),
  );

  const sidebar = JSON.stringify(
    { docs: config.sidebar || [] },
    null,
    2,
  );

  const versionedSidebar = JSON.stringify(
    await normalizeSidebar(config.sidebar, version),
    null,
    2,
  );

  await Promise.allSettled([
    fs.unlink(`${source}/config.json`),
    fs.writeFile(`${target}/sidebars.json`, sidebar),
    typeof version !== 'undefined'
      ? fs.writeFile(`${versionedTarget}/version-${version}-sidebars.json`, versionedSidebar)
      : Promise.resolve(),
  ]);
}

/**
 * Generate APISIX API Docs
 * @return {Listr<Listr.ListrContext>}
 * @param project
 * @param version
 */
function generateAPIDocs(project) {
  const dir = `./${tempPath}/${project.name}`;
  return new Listr([
    {
      title: 'Generate markdown files',
      task: () => {
        childProcess.spawnSync(`autodocs/generate.sh`, ['build'], {
          cwd: dir,
        });
      },
    },
    {
      title: 'Copy API docs',
      task: async () => {
        if (
          await copyDocs(`${dir}/autodocs/output`, `${dir}/pdk-docs`)
            .then(() => true)
            .catch(() => false)
        ) {
          await fs.rm(`${dir}/autodocs/output`, { recursive: true });
        }
      },
    },
  ]);
}

function extractDocsVersionTasks(project, version) {
  const projectPath = `${tempPath}/${project.name}`;
  return new Listr([
    {
      title: `Checkout ${project.name} version: ${version}`,
      task: () => gitMap[project.name].cwd(projectPath).checkout(`remotes/origin/release/${version}`, ['-f']),
    },
    {
      title: 'Generate API docs for APISIX',
      enabled: () => project.name === 'apisix' && os.platform() === 'linux' && isFileExisted(`./${tempPath}/${project.name}/autodocs`),
      task: () => generateAPIDocs(project),
    },
    {
      title: `Copy to target path`,
      task: async () => {
        const branchName = `release/${version}`;
        const projectName = project.name;

        const docsPath = `${projectPath}/docs`;
        const enSrcDocs = `${docsPath}/en/latest`;
        const zhSrcDocs = `${docsPath}/zh/latest`;
        const enTargetDocs = `${websitePath}/docs-${projectName}_versioned_docs/version-${version}`;
        const zhTargetDocs = `${websitePath}/i18n/zh/docusaurus-plugin-content-docs-docs-${projectName}/version-${version}`;

        await Promise.all([
          copyDocs(enSrcDocs, enTargetDocs)
            .then(() => replaceMDElements(projectName, [enTargetDocs], branchName))
            .then(() => handleConfig2Sidebar(enTargetDocs, enTargetDocs, version, `${websitePath}/docs-${project.name}_versioned_sidebars`)),
          copyDocs(zhSrcDocs, zhTargetDocs)
            .then(() => replaceMDElements(projectName, [zhTargetDocs], branchName)),
        ]).catch(() => { /* ignore */ });
      },
    },
  ]);
}

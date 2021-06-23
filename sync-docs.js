const log = (text) => {
  console.log(` \u001b[32m${text}\u001b[0m`);
};

log("Start sync-docs.js");

const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");
const common = require("./common.js");

const { projects, languages, projectPaths } = common;

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
      const newUrl = `https://raw.githubusercontent.com/apache/${project}/${branch}/docs/${imgPath}`;
      console.log(`${project}: ${match} 👉 ${newUrl}`);
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
    `./tmp/${project.name}/docs`,
    project.latestDocs.en,
    project.name,
    "en"
  );
  copyDocs(
    `./tmp/${project.name}/docs`,
    project.latestDocs.zh,
    project.name,
    "zh"
  );
};

const cloneRepos = () => {
  log("Clone repos");
  const gitCommand = projects
    .map((project) => `git clone https://github.com/apache/${project.name}.git`)
    .join(" & ");
  childProcess.execSync(gitCommand, { cwd: "./tmp" });
};

const findReleaseVersions = (project) => {
  // release branch name format example: origin/release/2.5
  const branchRaw = childProcess
    .execSync("git --no-pager branch -r", {
      cwd: `./tmp/${project}`,
    })
    .toString();
  const versions = [];
  branchRaw.split("\n").map((b) => {
    if (b.includes("release") === false) return;
    const version = b.trim().replace("origin/release/", "");
    if (version === "test") return;
    versions.push(version);
  });
  log("Found release versions: ", versions);
  return versions;
};

const setUp = () => {
  log("Install dependencies");
  childProcess.execSync("npm i --save replace-in-file");
  childProcess.execSync("npm install", { cwd: `./website` });

  removeFolder("tmp");
  fs.mkdirSync("tmp");
};

const cleanUp = () => {
  log("Delete tmp folder");
  removeFolder("tmp");

  log("Delete npm related files");
  removeFolder("node_modules");
  ["package.json", "package-lock.json"].forEach((file) => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  });
};

const main = () => {
  setUp();

  cloneRepos();

  log("Versioning");
  projectPaths.map((project) => {
    const projectName = project.name;
    const versions = findReleaseVersions(projectName);
    versions.map((version) => {
      log(`Versioning for ${project} version: ${version}`);
      childProcess.execSync(`git checkout -f origin/release/${version}`, {
        cwd: `./tmp/${projectName}`,
      });

      log("Replace elements inside MD files");
      replaceMDElements(projectName, [`./tmp/${projectName}/docs`], project.branch);

      copyAllDocs(project);
      // versioning English docs
      childProcess.execSync(
        `npm run docusaurus docs:version:docs-${projectName} ${version}`,
        { cwd: `./website` }
      );
      // versioning Chinese docs
      if (isFileExisted(`./tmp/${projectName}/docs/zh/latest`) !== false) {
        copyFolder(
          project.latestDocs.zh,
          `./website/i18n/zh/docusaurus-plugin-content-docs-docs-${projectName}/version-${version}`
        );
      }
    });
  });

  log("Copy next version docs");
  projectPaths.map((project) => {
    const projectName = project.name;
    childProcess.execSync(`git checkout -f ${project.branch}`, {
      cwd: `./tmp/${projectName}`,
    });

    log("Replace elements inside MD files");
    replaceMDElements(projectName, [`./tmp/${projectName}/docs`], project.branch);
    copyAllDocs(project);
  });

  cleanUp();
};

main();

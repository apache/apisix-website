console.log("Start sync-docs.js");

const childProcess = require("child_process");
const fs = require("fs");

// NOTE: disable "apisix", "apisix-dashboard" currently
const projects = ["apisix-ingress-controller"];

const projectPaths = projects.map((project) => {
  return {
    project: project,
    pluginId: `docs-${project}`,
    latestDocs: {
      en: `./website/docs/${project}`,
      zh: `./website/i18n/zh/docusaurus-plugin-content-docs-docs-${project}/current`,
    },
  };
});

const isFileExisted = (path) => {
  try {
    fs.accessSync(path);
    return true;
  } catch {
    return false;
  }
};

const replaceMDImageUrl = (project, paths) => {
  const replace = require("replace-in-file");
  const allMDFilePaths = paths.map((p) => `${p}/**/*.md`);

  const options = {
    files: allMDFilePaths,
    from: /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g,
    to: (match) => {
      console.log(match);
      const imgPath = match
        .match(/\((.+?)\)/g)[0]
        .replace("(", "")
        .replace(")", "")
        .replace("../", "")
        .replace("../", "")
        .replace("../", "")
        .replace("../", "");
      const newUrl = `(https://raw.githubusercontent.com/apache/${project}/master/docs/${imgPath})`;
      const result = match.replace(match.match(/\((.+?)\)/g)[0], newUrl);
      console.log(result);
      return result;
    },
  };

  try {
    const results = replace.sync(options);
    console.log(`${project} - Replacement results:`, results);
  } catch (error) {
    console.error(`${project} - Error occurred:`, error);
  }
};

const copyDocs = (source, target, projectName, locale) => {
  if (isFileExisted(`${source}/${locale}/latest`) === false) {
    console.log(`[${projectName}] can not find ${locale} latest folder, skip.`);
    return;
  }

  console.log(`[${projectName}] load ${locale} latest docs config.json`);
  const configLatest = JSON.parse(
    fs.readFileSync(`${source}/${locale}/latest/config.json`)
  );

  console.log(`[${projectName}] delete ${locale} docs config.json`);
  fs.unlinkSync(`${source}/${locale}/latest/config.json`);

  console.log(`[${projectName}] copy latest ${locale} docs to ${target}`);
  childProcess.execSync(`cp -rf ${source}/${locale}/latest/* ${target}`);

  console.log(`[${projectName}] write sidebar.json`);
  const sidebar = {
    docs: [...(configLatest.sidebar || {})],
  };
  fs.writeFileSync(`${target}/sidebars.json`, JSON.stringify(sidebar, null, 2));
};

const main = () => {
  console.log("Install dependencies");
  childProcess.execSync("npm i --save replace-in-file");
  childProcess.execSync("mkdir tmp");

  console.log("Clone repos");
  const gitCommand =
    projects
      .map(
        (project) =>
          `git clone --depth=1 https://github.com/apache/${project}.git`
      )
      .join(" & ") + " & wait";
  childProcess.execSync(gitCommand, { cwd: "./tmp" });

  console.log("Replace image url inside MD files");
  projects.map((project) => {
    replaceMDImageUrl(project, [`./tmp/${project}/docs`]);
  });

  console.log("Copy docs");
  projectPaths.map((path) => {
    copyDocs(
      `./tmp/${path.project}/docs`,
      path.latestDocs.en,
      path.project,
      "en"
    );
    copyDocs(
      `./tmp/${path.project}/docs`,
      path.latestDocs.zh,
      path.project,
      "zh"
    );
  });

  console.log("Delete tmp folder");
  childProcess.execSync("rm -rf tmp");

  console.log("Delete node_modules");
  childProcess.execSync("rm -rf package.json package-lock.json node_modules");
};

main();

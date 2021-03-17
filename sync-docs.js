console.log("Start sync-docs.js");

const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");

// NOTE: disable "apisix-docker" "apisix-helm-chart" currently
const projects = ["apisix-ingress-controller", "apisix", "apisix-dashboard"];

const langs = ["en", "zh", "es"];

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
  return fs.existsSync(path);
};

const replaceMDElements = (project, path) => {
  const replace = require("replace-in-file");
  const allMDFilePaths = path.map((p) => `${p}/**/*.md`);

  // replace the image urls inside markdown files
  const imageOptions = {
    files: allMDFilePaths,
    // NOTE: just replace the url begin with ../assets/images ,then can replace with absolute url path
    from: /(\.\.\/)+assets\/images\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g,
    to: (match) => {
      const imgPath = match.replace(/\(|\)|\.\.\/*/g, "");
      const newUrl = `https://raw.githubusercontent.com/apache/${project}/master/docs/${imgPath}`;
      console.log(`${project}: ${match} 👉 ${newUrl}`);
      return newUrl;
    },
  };

  // replace the markdown urls inside markdown files
  const markdownOptions = {
    files: allMDFilePaths,
    from: RegExp(
      `\\[.*\\]\\((\\.\\.\\/)*(${langs.join("|")})\\/.*\\.md\\)`,
      "g"
    ),
    to: (match) => {
      const markdownPath = match.replace(/\(|\)|\.\.\/*|\[.*\]|\.\//g, ""); // "en/latest/discovery/dns.md"
      const lang = markdownPath.split("/")[0];
      const urlPath = markdownPath.replace(
        RegExp(`(${langs.join("|")})\\/latest\\/|\\.md`, "g"),
        ""
      ); // "discovery/dns"
      const projectNameWithoutPrefix =
        project === "apisix" ? "apisix" : project.replace("apisix-", "");
      let newUrl = match.replace(
        /\]\(.*\)/g,
        `](https://apisix.apache.org${
          lang !== "en" ? "/" + lang : ""
        }/docs/${projectNameWithoutPrefix}/${urlPath})`
      );
      console.log(`${project}: ${match} 👉 ${newUrl}`);
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
}

const copyFolder = (srcDir, tarDir) => {
  let files = fs.readdirSync(srcDir);
  files.forEach(file => {
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
}

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
  copyFolder(`${source}/${locale}/latest/`, target)

  console.log(`[${projectName}] write sidebar.json`);
  const sidebar = {
    docs: [...(configLatest.sidebar || [])],
  };
  fs.writeFileSync(`${target}/sidebars.json`, JSON.stringify(sidebar, null, 2));
};

const main = () => {
  console.log("Install dependencies");
  childProcess.execSync("npm i --save replace-in-file");

  removeFolder("tmp");
  fs.mkdirSync("tmp");

  console.log("Clone repos");
  const gitCommand =
    projects
      .map(
        (project) =>
          `git clone --depth=1 https://github.com/apache/${project}.git`
      )
      .join(" & ");
  childProcess.execSync(gitCommand, { cwd: "./tmp" });

  console.log("Replace elements inside MD files");
  projects.map((project) => {
    replaceMDElements(project, [`./tmp/${project}/docs`]);
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
  removeFolder("tmp");

  console.log("Delete npm related files");
  removeFolder("node_modules");
  ["package.json", "package-lock.json"].forEach((file) => {
    if (fs.existsSync(file)){
      fs.unlinkSync(file);
    }
  })
};

main();

console.log("start pullDocs.js");

const childProcess = require("child_process");
const fs = require("fs");

const docsPaths = {
  apisix: {
    pluginId: "docs-apisix",
    latestDocs: {
      en: "./website/docs/apisix",
      zh:
        "./website/i18n/zh-cn/docusaurus-plugin-content-docs-docs-apisix/current",
    },
  },
  apisixDashboard: {
    pluginId: "docs-apisix-dashboard",
    latestDocs: {
      en: "./website/docs/apisix-dashboard",
      zh:
        "./website/i18n/zh-cn/docusaurus-plugin-content-docs-docs-apisix-dashboard/current",
    },
  },
  apisixDashboard: {
    pluginId: "docs-apisix-ingress-controller",
    latestDocs: {
      en: "./website/docs/apisix-ingress-controller",
      zh:
        "./website/i18n/zh-cn/docusaurus-plugin-content-docs-docs-apisix-ingress-controller/current",
    },
  },
};

function isFileExisted(path) {
  try {
    fs.accessSync(path);
    return true;
  } catch {
    return false;
  }
}

const copyDocs = (source, project, locale) => {
  if (isFileExisted(`${source}/${locale}/latest`) === false) {
    console.log(`[${project}] can not find ${locale} latest folder, skip.`);
    return;
  }

  console.log(`[${project}] load ${locale} latest docs config.json`);
  const configLatest = JSON.parse(
    fs.readFileSync(`${source}/${locale}/latest/config.json`)
  );

  console.log(`[${project}] delete ${locale} docs config.json`);
  fs.unlinkSync(`${source}/${locale}/latest/config.json`);

  console.log(
    `[${project}] copy latest ${locale} docs to ${docsPaths[project].latestDocs[locale]}`
  );
  childProcess.execSync(
    `cp -rf ${source}/${locale}/latest/* ${docsPaths[project].latestDocs[locale]}`
  );

  console.log(`[${project}] write sidebar.json`);
  const sidebar = {
    docs: { ...configLatest.sidebar },
  };
  fs.writeFileSync(
    `${docsPaths[project].latestDocs[locale]}/sidebars.json`,
    JSON.stringify(sidebar, null, 4)
  );
};

const main = () => {
  childProcess.execSync("mkdir tmp");

  console.log("Clone repos");
  childProcess.execSync(
    `git clone --depth=1 https://github.com/apache/apisix.git &
     git clone --depth=1 https://github.com/apache/apisix-dashboard.git &
     git clone --depth=1 https://github.com/apache/apisix-ingress-controller.git &
     wait`,
    {
      cwd: "./tmp",
    }
  );

  copyDocs("./tmp/apisix/docs", "apisix", "en");
  copyDocs("./tmp/apisix/docs", "apisix", "zh");

  copyDocs("./tmp/apisix-dashboard/docs", "apisixDashboard", "en");
  copyDocs("./tmp/apisix-dashboard/docs", "apisixDashboard", "zh");

  copyDocs(
    "./tmp/apisix-ingress-controller/docs",
    "apisixIngressController",
    "en"
  );
  copyDocs(
    "./tmp/apisix-ingress-controller/docs",
    "apisixIngressController",
    "zh"
  );

  console.log("delete tmp folder");
  childProcess.execSync("rm -rf tmp");
};

main();

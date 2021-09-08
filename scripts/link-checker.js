const fs = require("fs");
const path = require("path");
const process = require("process");

const listr = require("listr");
const axios = require("axios");

const common = require("./common.js");
const {projects, languages, projectPaths} = common;

axios.defaults.timeout = 5000;

const tasks = new listr([
  {
    title: "Start Link Checker",
    task: () => {}
  },
  {
    title: "Scan document files",
    task: (ctx) => {
      ctx.allDocuments = [];
      const scanTasks = projectPaths.map(project => {
        Object.values(project.latestDocs).forEach((path) => {
          if (!fs.existsSync(path)) return;
          ctx.allDocuments.push({
            files: scanFolder(path),
            path,
            project: project.name,
          })
        });
      });
    }
  },
  {
    title: "Scan all links",
    task: (ctx) => {
      ctx.externalLinks = []; // links to other sites
      ctx.internalLinks = []; // links to other Markdown files or anchor

      for (const documents of ctx.allDocuments) {
        documents.files.forEach((file) => {
          const scanResult = scanLinkInMDFile(file, documents.project);
          ctx.externalLinks.push(...scanResult.links);
          ctx.internalLinks.push(...scanResult.filteredLinks);
        });
      }

      console.log(`[Link Scanner] Scan result: ${ctx.externalLinks.length} external links, ${ctx.internalLinks.length} internal links`);
    }
  },
  {
    title: "Start external link check",
    task: async (ctx) => {
      ctx.externalBrokenList = [];
      let externalLinkCheckPromises = [];
      ctx.externalLinks.forEach((link) => {
        externalLinkCheckPromises.push(linkValidate(link));
      });

      let result = await Promise.all(externalLinkCheckPromises);
      ctx.externalBrokenList.push(...result.filter((item) => item.status !== 200));
    }
  },
  {
    title: "Start internal link check",
    task: (ctx) => {
      ctx.internalBrokenList = [];
      ctx.internalLinks.forEach((link) => {
        if (!fs.existsSync(link.url)) {
          ctx.internalBrokenList.push(link);
        }
      });
    }
  },
  {
    title: "Write broken list to file",
    task: (ctx) => {
      fs.writeFileSync('./brokenLinks.json', JSON.stringify({
        external: ctx.externalBrokenList,
        internal: ctx.internalBrokenList,
      }));
    }
  }
]);

tasks.run()
    .then(() => {
      console.log("[Finish] Link Checker finished");
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });

const scanFolder = (tarDir) => {
  let filePaths = [];
  let files = fs.readdirSync(tarDir);
  files.forEach((file) => {
    const tarPath = path.join(tarDir, file);
    let stats = fs.statSync(tarPath);
    if (stats.isDirectory()) {
      filePaths.push(...scanFolder(tarPath));
    } else {
      filePaths.push(tarPath);
    }
  });

  return filePaths;
}

const scanLinkInMDFile = (filePath, project) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const regex = /\[[\s\S]*?\]\([\s\S]*?\)/g;
  if (fileContent.match(regex)) {
    const arrayOfLinks = fileContent.match(regex);
    const links = arrayOfLinks.map((item) => {
      const textHrefDivide = item.split('](');
      const text = textHrefDivide[0].replace('[', '');
      const url = textHrefDivide[1].replace(')', '');
      return ({url, text, file: filePath});
    });

    // filter out links to other Markdown files
    const filteredList = []; // local files
    const unfilteredList = links.filter((link) => { // web links
      let url = link.url.trim();
      if (url.startsWith("http://") || url.startsWith("https://")) {
        link.url = url;
        return true;
      }

      // url preprocess
      if (url.startsWith("#") || url.indexOf("#") > 0) { // such as "#abcd"
        let split = url.split("#").filter(item => item !== "");
        if (split.length > 1) {
          link.anchor = "#" + split[1];
          url = path.normalize(path.dirname(filePath) + path.sep + link.url);
        } else {
          link.anchor = link.url;
          url = filePath;
        }
      } else if (url === "LICENSE" || url === 'logos/apache-apisix.png') {
        url = "https://github.com/apache/" + project + "/blob/master/" + url;
      } else if (!url.endsWith(".md")) { // not end with ".md"
        console.log(filePath, link.url, url,filePath.startsWith("website\\docs"));
        let lang = !filePath.includes("i18n") ? "en" : filePath.split("i18n" + path.sep)[1].split(path.sep)[0];
        let subPath = !filePath.includes("i18n") ? path.dirname(filePath.split("docs" + path.sep + project + path.sep)[1]) : path.dirname(filePath.split("docs-" + project + path.sep + "current" + path.sep)[1]);
        subPath = subPath !== "." ? subPath + path.sep : "";
        let originPath = path.normalize("docs" + path.sep + lang + path.sep + "latest" + path.sep + subPath + url).replace(/\\/g, '/');

        url = "https://github.com/apache/" + project + "/blob/master/" + originPath;
      } else { // such as "./abcd", "../abcd", "../../../abcd"
        url = path.normalize(path.dirname(filePath) + path.sep + url);
      }

      // set url
      let originLink = link.url;
      link.url = url;

      // url postprocess
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        filteredList.push(link);
        return false;
      }

      // replace the converted link with the original document
      let documentContent = fs.readFileSync(filePath, 'utf8');
      documentContent = documentContent.replace(new RegExp(originLink, "g"), link.url);
      fs.writeFileSync(filePath, documentContent, 'utf8');

      return true;
    });
    return {
      links: unfilteredList,
      filteredLinks: filteredList,
    };
  } else {
    return {
      links: [],
      filteredLinks: [],
    };
  }
}

const linkValidate = (link) => {
  console.log("checking external link: ", link.url);
  return new Promise((resolve) => {
    axios.get(link.url)
        .then((res) => {
          resolve({
            ...link,
            status: res.status,
            statusText: res.statusText,
          });
        })
        .catch((err) => {
          resolve({
            ...link,
            status: 0,
            statusText: 'FAIL',
          });
        });
  });
}

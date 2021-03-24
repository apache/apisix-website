const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const common = require("./common.js");

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
        console.log(filePath, link.url, filePath.startsWith("website\\docs"));
        let lang = filePath.startsWith("website" + path.sep + "docs") ? "en" : filePath.split("i18n" + path.sep)[1].split(path.sep)[0];
        let subPath = filePath.startsWith("website" + path.sep + "docs") ? path.dirname(filePath.split("docs" + path.sep + project + path.sep)[1]) : path.dirname(filePath.split("docs-" + project + path.sep + "current" + path.sep)[1]);
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
  return new Promise((resolve) => {
    const axios = require("axios");
    axios.get(link.url)
        .then((res) => {
          console.log(`[Link Checker] check "${link.url}", result is ${res.statusText}`)
          resolve({
            ...link,
            status: res.status,
            statusText: res.statusText,
          });
        })
        .catch((err) => {
          console.log(`[Link Checker] check "${link.url}", result is FAIL`);
          resolve({
            ...link,
            status: 0,
            statusText: 'FAIL',
          });
        });
  });
}

(async function main() {
  console.log("Start link-checker.js");
  console.log("Install dependencies");
  childProcess.execSync("npm i --save axios");

  console.log("[Document Scanner] Scan all documents");
  let allDocuments = [];
  common.projectPaths().map((projectInfo) => {
    Object.values(projectInfo.paths).forEach((path) => {
      if (!fs.existsSync(path)) return;
      allDocuments.push({
        files: scanFolder(path),
        path,
        project: projectInfo.project,
      })
    });
  });

  console.log("[Link Scanner] Scan all links");
  let externalLinks = []; // links to other sites
  let internalLinks = []; // links to other Markdown files or anchor
  for (const documents of allDocuments) {
    documents.files.forEach((file) => {
      const scanResult = scanLinkInMDFile(file, documents.project);
      externalLinks.push(...scanResult.links);
      internalLinks.push(...scanResult.filteredLinks);
    });
  }

  //console.log(`[Link Scanner] External Links\n`, externalLinks.map(item => item.url).join("\n"));
  //console.log(`[Link Scanner] Internal Links\n`, internalLinks.map(item => item.url).join("\n"));
  console.log(`[Link Scanner] Scan result: ${externalLinks.length} external links, ${internalLinks.length} internal links`)

  console.log(`[Link Checker] Start external link check`);
  let externalBrokenList = [];
  let externalLinkCheckPromises = [];
  externalLinks.forEach((link) => {
    externalLinkCheckPromises.push(linkValidate(link));
  });

  let result = await Promise.all(externalLinkCheckPromises);
  externalBrokenList.push(...result.filter((item) => item.status !== 200));
  console.log(`[Link Checker] External link check finished`);

  console.log(`[Link Checker] Start internal link check`);
  let internalBrokenList = [];
  internalLinks.forEach((link) => {
    let exist = true;
    if (!fs.existsSync(link.url)) {
      internalBrokenList.push(link);
      exist = false;
    }
    console.log(`[Link Checker] check "${link.url}", result is ${exist}`)
  });
  console.log(`[Link Checker] Internal link check finished`);

  console.log("[Finish] Write broken list to file");
  fs.writeFileSync('./brokenLinks.json', JSON.stringify({
    external: externalBrokenList,
    internal: internalBrokenList,
  }));
})();

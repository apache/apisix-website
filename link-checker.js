const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const projects = ["apisix-ingress-controller", "apisix", "apisix-dashboard"];

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

const scanLinkInMDFile = (filePath) => {
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
		const filteredList = [];
		const unfilteredList = links.filter((link) => {
			const result = link.url.startsWith("http://") || link.url.startsWith("https://");
			if (!result) filteredList.push(link);
			return result;
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
					console.log(`[Link Checker] check ${link.url}, result is ${res.statusText}`)
					resolve({
						...link,
						status: res.status,
						statusText: res.statusText,
					});
				})
				.catch((err) => {
					console.log(`[Link Checker] check ${link.url}, result is FAIL`);
					resolve({
						...link,
						status: 404,
						statusText: 'FAIL',
					});
				});
	});
}

(async function main(values) {
	console.log("Start link-checker.js");
	console.log("Install dependencies");
	childProcess.execSync("npm i --save axios");

	console.log("[Document Scanner] Scan all documents");
	let allDocPaths = [];
	projects.map((project) => {
		let latestDocs = {
			en: `./website/docs/${project}`,
			zh: `./website/i18n/zh/docusaurus-plugin-content-docs-docs-${project}/current`,
		};

		Object.values(latestDocs).forEach((docPath) => {
			if (!fs.existsSync(docPath)) return;
			allDocPaths.push(...scanFolder(docPath))
		});
	});

	console.log("[Link Scanner] Scan all links");
	let externalLinks = []; // links to other sites
	let internalLinks = []; // links to other Markdown files or anchor
	for (const file of allDocPaths) {
		const scanResult = scanLinkInMDFile(file);
		externalLinks.push(...scanResult.links);
		internalLinks.push(...scanResult.filteredLinks);
	}

	console.log(`[Link Scanner] Scan result: ${externalLinks.length} external links, ${internalLinks.length} internal links`)

	console.log(`[Link Checker] Start external link check`);
	let externalLinkCheckPromises = [];
	externalLinks.forEach((link) => {
		externalLinkCheckPromises.push(linkValidate(link));
	});


	let result = await Promise.all(externalLinkCheckPromises);
	let brokenList = result.filter((item) => item.statusText !== "OK");

	console.log("[Finish] Write broken list to file");
	fs.writeFileSync('./brokenLinks.json', JSON.stringify(brokenList));
})();

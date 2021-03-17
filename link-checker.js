const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const mdLinks = require("markdown-links-validator").mdLinks;

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

(async function main() {
	console.log("Start link-checker.js");
	console.log("Install dependencies");
	childProcess.execSync("npm i --save markdown-links-validator");

	console.log("Scan all documents");
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

	console.log("Scan broken links");
	let brokenLinks = [];
	for (const file of allDocPaths) {
		try {
			let links = await mdLinks(file, {validate: true});
			links.forEach((link) => {
				if (link.statusText === "FAIL") {
					brokenLinks.push(link);
				}
				console.log(`[Check Link] check "${link.url}", result is ${link.statusText}`);
			});
		} catch (e) {

		}
	}

	console.log("Write broken list to file");
	fs.writeFileSync('./brokenLink.json', JSON.stringify(brokenLinks));
})();

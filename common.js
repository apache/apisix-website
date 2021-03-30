const projects = ["apisix-ingress-controller", "apisix", "apisix-dashboard", "apisix-docker", "apisix-helm-chart"];
const languages = ["en", "zh", "es"];

module.exports = {
  projects,
  languages,
  projectPaths: () => projects.map((project) => {
    return {
      project: project,
      pluginId: `docs-${project}`,
      paths: {
        en: `./website/docs/${project}`,
        zh: `./website/i18n/zh/docusaurus-plugin-content-docs-docs-${project}/current`,
      },
    };
  })
}

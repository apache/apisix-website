const projects = [
  {
    name: "apisix-ingress-controller",
    branch: "master"
  }, {
    name: "apisix",
    branch: "master"
  }, {
    name: "apisix-dashboard",
    branch: "master"
  }, {
    name: "apisix-docker",
    branch: "master"
  }, {
    name: "apisix-helm-chart",
    branch: "master"
  }, {
    name: "apisix-java-plugin-runner",
    branch: "main"
  }
];

const languages = ["en", "zh", "es"];

module.exports = {
  projects,
  languages,
  projectPaths: () => projects.map((project) => {
    return {
      name: project.name,
      pluginId: `docs-${project.name}`,
      paths: {
        en: `./website/docs/${project.name}`,
        zh: `./website/i18n/zh/docusaurus-plugin-content-docs-docs-${project.name}/current`,
      },
    };
  })
}

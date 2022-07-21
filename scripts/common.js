const projects = [
  {
    name: 'apisix-ingress-controller',
    branch: 'master',
    hasChangelog: true,
  },
  {
    name: 'apisix',
    branch: 'master',
    hasChangelog: true,
  },
  {
    name: 'apisix-dashboard',
    branch: 'master',
    hasChangelog: true,
  },
  {
    name: 'apisix-docker',
    branch: 'master',
    hasChangelog: false,
  },
  {
    name: 'apisix-helm-chart',
    branch: 'master',
    hasChangelog: false,
  },
  {
    name: 'apisix-java-plugin-runner',
    branch: 'main',
    hasChangelog: true,
  },
  {
    name: 'apisix-go-plugin-runner',
    branch: 'master',
    hasChangelog: true,
  },
  {
    name: 'apisix-python-plugin-runner',
    branch: 'master',
    hasChangelog: true,
  },
];

const languages = ['en', 'zh'];

module.exports = {
  projects,
  languages,
  projectPaths: projects.map((project) => ({
    name: project.name,
    pluginId: `docs-${project.name}`,
    branch: project.branch,
    latestDocs: {
      en: `../doc/docs/${project.name}`,
      zh: `../doc/i18n/zh/docusaurus-plugin-content-docs-docs-${project.name}/current`,
    },
  })),
};

const projects = [
  {
    name: "apisix-ingress-controller",
    branch: "master",
    hasChangelog: false,
  }, {
    name: "apisix",
    branch: "master",
    hasChangelog: true,
    changelogExtractor: function (changelogs, targetRelease) {
      const regex = /##.[0-9].[0-9].[0-9]/g;
      const versions = changelogs.match(regex);

      let changelog;
      changelogs.split(regex)
          .filter(item => item.indexOf("Table of Contents") === -1)
          .forEach((log, index) => {
            const targetVersion = targetRelease.tag_name.replace("v", "");
            let version = versions[index].replace("## ", "");
            if (version.endsWith(".0")) version = version.replace(".0", "");
            if (targetVersion === version) {
              changelog = {
                version: targetVersion,
                changelog: log,
                releaseTime: targetRelease.published_at,
              };
            }
          });

      return changelog;
    }
  }, {
    name: "apisix-dashboard",
    branch: "master",
    hasChangelog: true,
    changelogExtractor: function (changelogs, targetRelease) {
      const regex = /#.[0-9].[0-9].[0-9]/g;
      const versions = changelogs.match(regex);

      let changelog;
      changelogs.split(regex)
          .filter(item => item.indexOf("Table of Contents") === -1)
          .forEach((log, index) => {
            const targetVersion = targetRelease.tag_name.replace("v", "");
            let version = versions[index].replace("# ", "");
            if (version.endsWith(".0")) version = version.replace(".0", "");
            if (targetVersion === version) {
              changelog = {
                version: targetVersion,
                changelog: log,
                releaseTime: targetRelease.published_at,
              };
            }
          });

      return changelog;
    }
  }, {
    name: "apisix-docker",
    branch: "master",
    hasChangelog: false,
  }, {
    name: "apisix-helm-chart",
    branch: "master",
    hasChangelog: false,
  }, {
    name: "apisix-java-plugin-runner",
    branch: "main",
    hasChangelog: false,
  }, {
    name: "apisix-go-plugin-runner",
    branch: "master",
    hasChangelog: false,
  }
];

const languages = ["en", "zh", "es"];

module.exports = {
  projects,
  languages,
  projectPaths: projects.map((project) => {
    return {
      name: project.name,
      pluginId: `docs-${project.name}`,
      branch: project.branch,
      latestDocs: {
        en: `../website/docs/${project.name}`,
        zh: `../website/i18n/zh/docusaurus-plugin-content-docs-docs-${project.name}/current`,
      },
    };
  })
}

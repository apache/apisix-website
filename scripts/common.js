const projects = [
  {
    name: "apisix-ingress-controller",
    branch: "master",
    hasChangelog: true,
    changelogExtractor: function (changelogs, targetRelease) {
      return changelogExtractor(changelogs, targetRelease, "#", true);
    }
  },
  {
    name: "apisix",
    branch: "master",
    hasChangelog: true,
    changelogExtractor: function (changelogs, targetRelease) {
      return changelogExtractor(changelogs, targetRelease, "##", false);
    }
  },
  {
    name: "apisix-dashboard",
    branch: "master",
    hasChangelog: true,
    changelogExtractor: function (changelogs, targetRelease) {
      return changelogExtractor(changelogs, targetRelease, "#", false);
    }
  },
  {
    name: "apisix-docker",
    branch: "master",
    hasChangelog: false,
  },
  {
    name: "apisix-helm-chart",
    branch: "master",
    hasChangelog: false,
  },
  {
    name: "apisix-java-plugin-runner",
    branch: "main",
    hasChangelog: true,
    changelogExtractor: function (changelogs, targetRelease) {
      return changelogExtractor(changelogs, targetRelease, "##", true);
    }
  },
  {
    name: "apisix-go-plugin-runner",
    branch: "master",
    hasChangelog: true,
    changelogExtractor: function (changelogs, targetRelease) {
      return changelogExtractor(changelogs, targetRelease, "##", true);
    }
  },
  {
    name: "apisix-python-plugin-runner",
    branch: "master",
    hasChangelog: true,
    changelogExtractor: function (changelogs, targetRelease) {
      return changelogExtractor(changelogs, targetRelease, "##", true);
    }
  }
];

const languages = ["en", "zh", "es"];

/**
 * changelog extractor for each version
 * @param {string} changelogs CHANGELOG.md contents
 * @param {Object} targetRelease result from GitHub API
 * @param {string} versionStartsWith version line markdown symbol
 * @param {boolean} reserveVersionEnds0 reserve the `.0` on version end (e.g. `.0` of `1.5.0`)
 */
const changelogExtractor = (changelogs, targetRelease, versionStartsWith, reserveVersionEnds0) => {
  const regex = new RegExp(`${versionStartsWith}.[0-9].[0-9].[0-9]`, "g");
  const versions = changelogs.match(regex);

  let changelog;
  changelogs.split(regex)
      .filter(item => item.indexOf("Table of Contents") === -1)
      .forEach((log, index) => {
        const targetVersion = targetRelease.tag_name.replace("v", "");
        let version = versions[index].replace(`${versionStartsWith} `, "");
        if (!reserveVersionEnds0 && version.endsWith(".0")) {
          version = version.replace(".0", "");
        }
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

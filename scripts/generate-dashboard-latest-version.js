/*
 * @Author: xkp
 * @Date: 2023-01-08 18:32:37
 * @Description:
 */
const { writeFile } = require('fs/promises');
const axios = require('axios');
const Listr = require('listr');
const docsConfig = require('../config/docs.json');
const downloadsConfig = require('../config/downloads.json');

axios.defaults.timeout = 5000;

const axiosConfig = {
  headers: {
    'content-type': 'application/json',
    Accept: 'application/vnd.github.v3+json',
    ...(process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {}),
  },
};

const tasks = new Listr([
  {
    title: `Getting dashboard's latest version`,
    task: (ctx) => axios.get('https://api.github.com/repos/apache/apisix-dashboard/releases/latest', axiosConfig).then((resp) => {
      ctx.data = resp.data;
      return ctx;
    }),
  },
  {
    title: 'Write version in config',
    enabled: (ctx) => ctx.data,
    task: async (ctx) => {
      const latestVersion = ctx.data.tag_name;
      const latestReleaseDate = new Date(ctx.data.published_at).toLocaleDateString().replaceAll('/', '-');
      const newDocs = docsConfig.map((item) => {
        if (item.githubRepo === 'apache/apisix-dashboard') {
          return {
            ...item,
            version: latestVersion,
            releaseDate: latestReleaseDate,
          };
        }
        return item;
      });
      const newDownloads = downloadsConfig.map((item) => {
        if (item.githubRepo === 'apache/apisix-dashboard') {
          return {
            ...item,
            downloadPath: item.downloadPath.replaceAll(item.version, latestVersion),
            version: latestVersion,
            releaseDate: latestReleaseDate,
          };
        }
        return item;
      });
      return new Listr([
        {
          title: 'update docs.json',
          task: () => writeFile('../config/docs.json', JSON.stringify(newDocs)),
        },
        {
          title: 'update downloads.json',
          task: () => writeFile('../config/downloads.json', JSON.stringify(newDownloads)),
        },
      ]);
    },
  },
]);

tasks
  .run()
  .then(() => {
    console.log(`Finished`);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

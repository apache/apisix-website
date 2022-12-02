const Listr = require('listr');
const util = require('util');
const { chdir } = require('node:process');
const exec = util.promisify(require('node:child_process').exec);

const tasks = new Listr([
  {
    title: `Change working dir`,
    task: () => chdir('../'),
  },
  {
    title: `Copy docs edit to website`,
    task: () => Promise.allSettled([
      exec('cp ./doc/src/css/edit.scss ./website/src/css'),
      exec('cp ./doc/src/pages/edit.tsx ./website/src/pages'),
    ]),
  },
  {
    title: `Build website's all parts`,
    task: () => Promise.allSettled([
      exec('yarn run build:blog:zh', { stdio: 'ignore' }),
      exec('yarn run build:blog:en', { stdio: 'ignore' }),
      exec('yarn run build:doc', { stdio: 'ignore' }),
      exec('yarn run build:website', { stdio: 'ignore' }),
    ]),
  },
  {
    title: `Copy website's all parts to website's root`,
    task: () => Promise.allSettled([
      exec(
        'cp ./.asf.yaml ./.htaccess ./blog/en/build/blog ./blog/en/build/assets ./doc/build/assets ./doc/build/docs ./website/build/ -r',
        { stdio: 'ignore' },
      ),
      exec(
        'cp ./blog/zh/build/blog ./blog/zh/build/assets ./doc/build/zh/docs ./doc/build/zh/assets ./website/build/zh/ -r',
        { stdio: 'ignore' },
      ),
    ]),
  },
]);

tasks
  .run()
  .then(() => {
    console.log(`[Finish] Generate website`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

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
    title: `Build website's all parts`,
    task: () => Promise.allSettled([
      exec('yarn run build:blog:zh', { stdio: 'ignore' }).then(() => exec('yarn run build:blog:en', { stdio: 'ignore' })),
      exec('yarn run build:docs', { stdio: 'ignore' }),
    ]),
  },
  {
    title: `Copy website's all parts to website's root`,
    task: () => Promise.allSettled([
      exec(
        'cp ./.asf.yaml ./.htaccess ./blog/en-build/blog ./blog/en-build/assets ./website/build/ -r',
        { stdio: 'ignore' },
      ),
      exec(
        'cp ./blog/zh-build/blog ./blog/zh-build/assets ./website/build/zh/ -r',
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

const childProcess = require('child_process');
const fs = require('fs/promises');
const path = require('path');
const process = require('process');
const os = require('os');
const Listr = require('listr');
const simpleGit = require('simple-git');
const semver = require('semver');
const replace = require('replace-in-file');
const { promisify } = require('util');

const common = require('./common.js');
const { versions } = require('../website/config/apisix-versions.js');

const { projects, languages, projectPaths } = common;
const exec = promisify(childProcess.exec);
const tempPath = './tmp';
const websitePath = '../website';
const gitMap = {};
const projectReleases = {};

const extractDocsHeadTasks = (project, version) => ([
  {
    title: `Checkout ${project.name} version: ${version}`,
    task: () => gitMap[project.name].cwd(`${tempPath}/${project.name}/`).checkout(`remotes/origin/release/${version}`, ['-f']),
  },
  {
    title: 'Replace elements inside MD files',
    task: async () => {
      const branchName = `release/${version}`;
      await replaceMDElements(project.name, [`${tempPath}/${project.name}/docs`], branchName);
      await copyAllDocs(project);
    },
  },
]);

const extractDocsTailTasks = (project, version) => ([
  {
    title: 'Add English & Chinese documents',
    task: () => Promise.all([
      exec(
        `yarn docusaurus docs:version:docs-${project.name} ${version}`,
        { cwd: websitePath },
      ),
      isDirExisted(`./${tempPath}/${project.name}/docs/zh/latest`)
        .then(
          (exist) => exist && copyFolder(
            project.latestDocs.zh,
            `${websitePath}/i18n/zh/docusaurus-plugin-content-docs-docs-${project.name}/version-${version}`,
          ),
        ),
    ]),
  },
]);

const tasks = new Listr([
  {
    title: 'Start documents sync',
    task: async () => {
      await removeFolder(tempPath);
      await fs.mkdir(tempPath);
    },
  },
  {
    title: 'Clone git repositories',
    task: () => {
      const gitTasks = projects.map((project) => ({
        title: `Clone ${project.name} repository`,
        task: async () => {
          gitMap[project.name] = simpleGit();
          await gitMap[project.name].clone(`https://github.com/apache/${project.name}.git`, `${tempPath}/${project.name}/`);
        },
      }));
      return new Listr(gitTasks, { concurrent: projects.length });
    },
  },
  {
    title: 'Find project release',
    task: () => {
      const findReleaseTasks = projects.map((project) => ({
        title: `Find ${project.name} releases`,
        task: async () => {
          const ret = await gitMap[project.name].cwd(`${tempPath}/${project.name}/`).branch();
          if (ret.all) {
            projectReleases[project.name] = ret.all
              .filter((release) => release.includes('remotes/origin/release/'))
              .map((release) => release.replace('remotes/origin/release/', ''))
              .sort((a, b) => semver.compare(semver.coerce(a).version, semver.coerce(b).version));
          }
        },
      }));
      return new Listr(findReleaseTasks, { concurrent: projects.length });
    },
  },
  {
    title: 'Extract documents',
    task: () => {
      const extractDocumentTasks = projectPaths.map((project) => ({
        title: `Extract ${project.name} documents`,
        task: () => {
          const extractProjectTasks = project.name === 'apisix'
            ? versions.map((version) => ({
              title: `Extract ${project.name} ${version} documents`,
              task: () => new Listr([
                ...extractDocsHeadTasks(project, version),
                {
                  title: 'Generate API docs for APISIX',
                  enabled: () => os.platform() === 'linux' && isFileExisted(`./${tempPath}/${project.name}/autodocs`),
                  task: () => generateAPIDocs(project),
                },
                ...extractDocsTailTasks(project, version),
              ]),
            }))
            : projectReleases[project.name].map((version) => ({
              title: `Extract ${project.name} ${version} documents`,
              task: () => new Listr([
                ...extractDocsHeadTasks(project, version),
                ...extractDocsTailTasks(project, version),
              ]),
            }));
          return new Listr(extractProjectTasks);
        },
      }));

      return new Listr(extractDocumentTasks, { concurrent: projects.length });
    },
  },
  {
    // NOTE: Extract docs from the master branch
    title: 'Extract next version documents',
    task: () => {
      const nextVersionTasks = projectPaths.map((project) => ({
        title: `Extract ${project.name} next version documents`,
        task: () => {
          const steps = [
            {
              title: `Checkout ${project.name} next version`,
              task: () => gitMap[project.name].cwd(`${tempPath}/${project.name}/`).checkout(`remotes/origin/${project.branch}`, ['-f']),
            },
            {
              title: 'Replace elements inside MD files',
              task: async () => {
                await replaceMDElements(project.name, [`${tempPath}/${project.name}/docs`], project.branch);
                await copyAllDocs(project);
              },
            },
            {
              title: 'Generate API docs for APISIX',
              enabled: () => os.platform() === 'linux' && project.name === 'apisix' && isFileExisted(`./${tempPath}/${project.name}/autodocs`),
              task: () => generateAPIDocs(project),
            },
          ];
          return new Listr(steps);
        },
      }));
      return new Listr(nextVersionTasks, { concurrent: projects.length });
    },
  },
  {
    title: 'Clean temporary files',
    task: () => removeFolder(tempPath),
  },
]);

tasks.run()
  .then(() => {
    console.log('[Finish] Documents synchronize success');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function log(text) {
  // console.log(text);
}

async function replaceMDElements(project, path, branch = 'master') {
  const allMDFilePaths = path.map((p) => `${p}/**/*.md`);

  // replace the image urls inside markdown files
  const imageOptions = {
    files: allMDFilePaths,
    // NOTE: just replace the url begin with ../assets/images ,
    // then can replace with absolute url path
    from: /(\.\.\/)+assets\/images\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g,
    to: (match) => {
      const imgPath = match.replace(/\(|\)|\.\.\/*/g, '');
      const newUrl = `https://raw.githubusercontent.com/apache/${project}/${branch}/docs/${imgPath}`;
      log(`${project}: ${match} 👉 ${newUrl}`);
      return newUrl;
    },
  };

  // replace the markdown urls inside markdown files
  const markdownOptions = {
    files: allMDFilePaths,
    from: RegExp(
      `\\[.*\\]\\((\\.\\.\\/)*(${languages.join('|')})\\/.*\\.md\\)`,
      'g',
    ),
    to: (match) => {
      const markdownPath = match.replace(/\(|\)|\.\.\/*|\[.*\]|\.\//g, ''); // "en/latest/discovery/dns.md"
      const lang = markdownPath.split('/')[0];
      const urlPath = markdownPath.replace(
        RegExp(`(${languages.join('|')})\\/latest\\/|\\.md`, 'g'),
        '',
      ); // "discovery/dns"
      const projectNameWithoutPrefix = project === 'apisix' ? 'apisix' : project.replace('apisix-', '');
      const newUrl = match.replace(
        /\]\(.*\)/g,
        `](https://apisix.apache.org${lang === 'en' ? '' : `/${lang}`}/docs/${projectNameWithoutPrefix}/${urlPath})`,
      );
      log(`${project}: ${match} 👉 ${newUrl}`);
      return newUrl;
    },
  };

  await replace(imageOptions);
  await replace(markdownOptions);
}

async function isFileExisted(p) {
  return fs.stat(p).then((v) => v.isFile()).catch(() => false);
}

async function isDirExisted(p) {
  return fs.stat(p).then((v) => v.isDirectory()).catch(() => false);
}

async function removeFolder(tarDir) {
  if (await isDirExisted()) return;
  await fs.rm(tarDir, { recursive: true, force: true });
}

async function copyFolder(srcDir, tarDir) {
  const [files] = await Promise.all([
    fs.readdir(srcDir),
    fs.mkdir(tarDir, { recursive: true }),
  ]);

  return Promise.all(files.map(async (file) => {
    const srcPath = path.join(srcDir, file);
    const tarPath = path.join(tarDir, file);
    const stats = await fs.stat(srcPath);

    return stats.isDirectory()
      ? copyFolder(srcPath, tarPath)
      : fs.copyFile(srcPath, tarPath);
  }));
}

async function copyDocs(source, target, projectName, locale) {
  if (!await isDirExisted(`${source}/${locale}/latest`)) {
    log(`[${projectName}] can not find ${locale} latest folder, skip.`);
    return;
  }

  log(`[${projectName}] load ${locale} latest docs config.json`);
  const configLatest = JSON.parse(
    await fs.readFile(`${source}/${locale}/latest/config.json`),
  );

  log(`[${projectName}] delete ${locale} docs config.json`);
  log(`[${projectName}] copy latest ${locale} docs to ${target}`);
  log(`[${projectName}] write sidebar.json`);
  await Promise.all([
    fs.unlink(`${source}/${locale}/latest/config.json`),
    copyFolder(`${source}/${locale}/latest/`, target),
    fs.writeFile(`${target}/sidebars.json`, JSON.stringify({
      docs: [...(configLatest.sidebar || [])],
    }, null, 2)),
  ]);
}

async function copyAllDocs(project) {
  await Promise.all([
    copyDocs(
      `${tempPath}/${project.name}/docs`,
      project.latestDocs.en,
      project.name,
      'en',
    ),
    copyDocs(
      `${tempPath}/${project.name}/docs`,
      project.latestDocs.zh,
      project.name,
      'zh',
    ),
  ]);
}

/**
 * Generate APISIX API Docs
 * @return {Listr<Listr.ListrContext>}
 * @param project
 * @param version
 */
function generateAPIDocs(project) {
  return new Listr([
    {
      title: 'Generate markdown files',
      task: () => {
        childProcess.spawnSync(`autodocs/generate.sh`, ['build'], {
          cwd: `./${tempPath}/${project.name}`,
        });
      },
    },
    {
      title: 'Copy API docs',
      task: async () => {
        if (await isFileExisted(`./${tempPath}/${project.name}/autodocs/output`)) {
          await copyFolder(`${tempPath}/${project.name}/autodocs/output`, `${project.latestDocs.en}/pdk-docs`);
        }
      },
    },
  ]);
}

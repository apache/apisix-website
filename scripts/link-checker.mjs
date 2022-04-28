import remarkParse from 'remark-parse';
import { read } from 'to-vfile';
import { visit } from 'unist-util-visit';
import isAbsoluteUrl from 'is-absolute-url';
// eslint-disable-next-line import/no-unresolved
import PQueue from 'p-queue';
import { engine } from 'unified-engine';
import { unified } from 'unified';
import path from 'path';
import fs from 'fs/promises';
import { stringifyPosition } from 'unist-util-stringify-position';
import { toString } from 'mdast-util-to-string';
import remarkFrontmatter from 'remark-frontmatter';
// eslint-disable-next-line import/no-unresolved
import got from 'got';
import Listr from 'listr';

const { GITHUB_TOKEN } = process.env;

const linkStatusMap = {};
/**
 * @param {string} url
 */
async function isLinkAlive(url, opt) {
  if (opt.ignoreExUrls.some((v) => v.test(url))) {
    return {
      status: true,
      msg: 'ignored',
    };
  }
  const config = {
    headers: {
      ...url.includes('github.com') ? { authorization: `Bearer ${GITHUB_TOKEN}` } : {},
      connection: 'close',
      'accept-encoding': 'gzip, deflate, br',
    },
    timeout: {
      request: 5000,
    },
    retry: {
      limit: 3,
      noise: 50,
    },
  };
  if (!linkStatusMap[url]) {
    const get = got.get(url, config)
      .then((v) => v.statusMessage === 'OK').catch((err) => err.code);

    const head = got.get(url, config)
      .then((v) => v.statusMessage === 'OK').catch((err) => err.code);

    linkStatusMap[url] = Promise.allSettled([get, head]).then((v) => {
      if (v.some((r) => r.status === 'fulfilled' && r.value === true)) {
        return {
          status: true,
          msg: undefined,
        };
      }
      return {
        status: false,
        msg: v[0].value,
      };
    });
  }

  return linkStatusMap[url];
}

/** @type {import('./link-checker').CheckExternalLink} */
async function checkExternalLink(info, opt) {
  return {
    external: true,
    url: info.url,
    file: info.path,
    position: info.pos,
    ...await isLinkAlive(info.url, opt),
  };
}

async function isFileExist(p) {
  return fs.stat(p).then((v) => v.isFile()).catch(() => false);
}

const headingsFilter = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ['yaml'])
  .freeze();

const fileHeadingsMap = {};
const puncRegExp = /[:?/()]/g;
async function isHeadingExist(filePath, heading) {
  if (!fileHeadingsMap[filePath]) {
    fileHeadingsMap[filePath] = read(filePath)
      .then((v) => headingsFilter.parse(v))
      .then((t) => {
        const headings = [];
        visit(t, (node) => {
          if (node.type === 'heading') {
            let s = toString(node);
            if (typeof s === 'string') {
              s = s.replace(puncRegExp, '').replace(/\s/g, '-');
              headings.push(s, s.toLowerCase());
            }
          }
        });
        return headings;
      });
  }
  const headings = await fileHeadingsMap[filePath];
  return headings.length > 0 && headings.includes(heading);
}

/** @type {import('./link-checker').CheckInternalLink} */
async function checkInternalLink(info, opt) {
  const [url, hash] = info.url.split('#');

  const res = {
    external: false,
    url: info.url,
    position: info.pos,
    file: info.path,
  };

  // skip ignored url
  if (opt.ignoreInUrls.some((v) => v.test(url))) {
    return Promise.resolve(Object.assign(res, {
      parsedUrl: info.url,
      status: true,
      msg: 'ignored',
    }));
  }

  // handle file path
  let filePath = url;
  if (filePath.length !== 0) {
    // exec users handle
    if (typeof opt.beforeHandlePath === 'function') {
      filePath = opt.beforeHandlePath(filePath);
    }

    // absolute path /xxx => parent_dir/xxx
    if (filePath.startsWith('/')) {
      filePath = path.resolve(opt.base + filePath);
    } else {
      // current path xxx => ./xxx
      // will be handled as relative path
      if (!filePath.startsWith('.')) {
        filePath = `./${filePath}`;
      }
      // relative path ./xxx, ../xxx => parent_dir/xxx
      if (filePath.startsWith('.')) {
        filePath = path.resolve(path.dirname(info.path), filePath);
      }
    }
    // path to md file /xxx/, /xxx => /xxx.md
    // check split('.').length to skip xxx.{yaml, ...}
    if (!filePath.endsWith('.md') && filePath.split('.').length < 2) {
      if (filePath.endsWith('/')) {
        filePath = filePath.slice(0, -1);
      }
      filePath += '.md';
    }

    // renew res
    res.parsedUrl = filePath;

    const exist = await isFileExist(filePath);

    if (!exist) {
      return Object.assign(res, {
        status: false,
        msg: 'file not exist',
      });
    }
  }

  if (typeof hash === 'undefined' || hash.length === 0) {
    return Object.assign(res, {
      status: true,
    });
  }

  // current path
  if (filePath.length === 0) {
    filePath = info.path;
  }
  const headingExist = await isHeadingExist(filePath, hash);
  return Object.assign(res, headingExist
    ? {
      parsedUrl: `${filePath}#${hash}`,
      status: true,
    } : {
      parsedUrl: `${filePath}#${hash}`,
      status: false,
      msg: 'heading not exist',
    });
}

function handleWrapper(func, data, info, opt) {
  return async () => {
    const res = await func(info, opt);
    if (opt.includeAll || !res.status) data.push(res);
  };
}
const exData = [];
const inData = [];
const inLinkChecker = handleWrapper.bind(null, checkInternalLink, inData);
const exLinkChecker = handleWrapper.bind(null, checkExternalLink, exData);

const exLinksQueue = new PQueue({ concurrency: 60, interval: 500 });
const inLinksQueue = new PQueue();
const allQueue = [];

/**
 * @typedef {import('./link-checker').Options} Opt
 */

/**
 * @type {Opt}
 */
const defaultOptions = {
  includeAll: false,
};

/**
 * @param {Opt} options
 * @returns
 */
function linkShunt(options = {}) {
  // merge options
  const opt = Object.assign(defaultOptions, options);
  return (tree, file) => {
    if (opt.ignoreFiles.some((v) => v.test(file.path))) return;
    visit(tree, (node) => {
      if (node.type === 'link' || node.type === 'definition') {
        const info = {
          url: node.url,
          path: file.path,
          pos: stringifyPosition(node.position),
        };

        // external url
        if ((isAbsoluteUrl(node.url) || node.url.startsWith('//'))) {
          allQueue.push(exLinksQueue.add(exLinkChecker(info, opt)));
        } else {
          allQueue.push(inLinksQueue.add(inLinkChecker(info, opt)));
        }
      }
    });
  };
}

const tasks = new Listr([
  {
    title: 'checking links',
    task: async () => {
      const processor = unified()
        .use(remarkParse)
        .use(remarkFrontmatter, ['yaml'])
        .use(linkShunt, {
          base: '../website',
          ignoreInUrls: [
            /(\/zh)?\/blog\/?(tags\/.+)?$/,
            /(\/zh)?\/team\/?$/,
            /(\/zh)?\/contribute\/?$/,
            /.+cert-manager/,
            /LICENSE/,
            /logos\/apache-apisix.png/,
          ],
          ignoreExUrls: [
            /127\.0\.0\.1/,
            /mailto/,
          ],
          ignoreFiles: [
            /README\.md/,
            /CHANGELOG\.md/,
          ],
          beforeHandlePath: (p) => {
            const paths = ['dashboard', 'docker', 'go-plugin-runner', 'helm-chart', 'ingress-controller', 'java-plugin-runner', 'python-plugin-runner'];
            const path = paths.find((v) => p.includes(v));
            if (typeof path === 'undefined') return p;

            const idx = p.indexOf(path);
            return `${p.slice(0, idx)}apisix-${p.slice(idx)}`;
          },
        })
        .freeze();

      engine(
        {
          processor,
          files: [
            '../website/docs',
            '../website/blog',
            '../website/articles',
            '../website/i18n/zh/docusaurus-plugin-content-blog',
            '../website/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/current',
          ],
          extensions: ['md'],
          color: true,
        },
        async (err) => {
          if (err) {
            console.log(err);
            process.exit(1);
          }
        },
      );

      await Promise.all(allQueue);
    },
  },
  {
    title: 'write broken links to json file',
    task: () => fs.writeFile(
      './brokenLinks.json',
      JSON.stringify({
        internal: inData,
        external: exData,
      }),
    ),
  },
]);

tasks.run()
  .then(() => {
    console.log('[Finish] Link Checker finished');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

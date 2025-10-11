/* eslint-disable quote-props */

/**
 * @type {Array<string>} version list
 */
const versions = ['3.10', '3.11', '3.12', '3.13', '3.14'];

/**
 * @type {Array<string>} LTS version list
 */
const LTSVersions = [];

/**
 * @type {{[origin: string]: string}} version display name mapping to origin name
 */
const versionMap = {
  '2.99': '3.0.0-beta',
};

/**
 * @type {Array<{label: string, href: string}>}
 */
const archivedVersions = [
  {
    label: '3.9',
    href: 'https://apache-apisix.netlify.app/docs/apisix/3.9/getting-started/readme/',
  },
  {
    label: '3.8',
    href: 'https://apache-apisix.netlify.app/docs/apisix/3.8/getting-started/readme/',
  },
  {
    label: '3.7',
    href: 'https://apache-apisix.netlify.app/docs/apisix/3.7/getting-started/readme/',
  },
  {
    label: '3.6',
    href: 'https://apache-apisix.netlify.app/docs/apisix/3.6/getting-started/readme/',
  },
  {
    label: '3.5',
    href: 'https://apache-apisix.netlify.app/docs/apisix/3.5/getting-started/readme/',
  },
  {
    label: '3.4',
    href: 'https://apache-apisix.netlify.app/docs/apisix/3.4/getting-started/readme/',
  },
  {
    label: '3.3',
    href: 'https://apache-apisix.netlify.app/docs/apisix/3.3/getting-started/readme/',
  },
  {
    label: '3.2',
    href: 'https://apache-apisix.netlify.app/docs/apisix/3.2/getting-started/',
  },
  {
    label: '3.1',
    href: 'https://apache-apisix.netlify.app/docs/apisix/3.1/getting-started/',
  },
  {
    label: '3.0',
    href: 'https://apache-apisix.netlify.app/docs/apisix/3.0/getting-started/',
  },
  {
    label: '2.15',
    href: 'https://apache-apisix.netlify.app/docs/apisix/2.15/getting-started/',
  },
  {
    label: '2.14',
    href: 'https://apache-apisix.netlify.app/docs/apisix/2.14/getting-started/',
  },
  {
    label: '2.13',
    href: 'https://apache-apisix.netlify.app/docs/apisix/2.13/getting-started/',
  },
  {
    label: '2.12',
    href: 'https://apache-apisix.netlify.app/docs/apisix/2.12/getting-started/',
  },
  {
    label: '2.11',
    href: 'https://apache-apisix.netlify.app/docs/apisix/2.11/getting-started/',
  },
  {
    label: '2.10',
    href: 'https://apache-apisix.netlify.app/docs/apisix/2.10/getting-started/',
  },
  {
    label: '2.9',
    href: 'https://apache-apisix.netlify.app/docs/apisix/2.9/getting-started/',
  },
  {
    label: '2.8',
    href: 'https://apache-apisix.netlify.app/docs/apisix/2.8/getting-started/',
  },
  {
    label: '2.7',
    href: 'https://apache-apisix.netlify.app/docs/apisix/2.7/getting-started/',
  },
  {
    label: '2.6',
    href: 'https://apache-apisix.netlify.app/docs/apisix/2.6/getting-started/',
  },
  {
    label: '2.5',
    href: 'https://apache-apisix.netlify.app/docs/apisix/2.5/getting-started/',
  },
  {
    label: '2.4',
    href: 'https://apache-apisix.netlify.app/docs/apisix/2.4/getting-started/',
  },
];

module.exports = {
  versions, LTSVersions, versionMap, archivedVersions,
};

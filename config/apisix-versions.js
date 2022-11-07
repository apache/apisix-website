/* eslint-disable quote-props */

/**
 * @type {Array<string>} version list
 */
const versions = ['2.12', '2.13', '2.14', '2.15', '3.0'];

/**
 * @type {Array<string>} LTS version list
 */
const LTSVersions = ['2.15'];

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
    label: '2.11',
    href: 'https://625a9090d04b9a6953165811--2-11-old-docs-apache-apisix.netlify.app/docs/apisix/getting-started/',
  },
  {
    label: '2.10',
    href: 'https://625a9090d04b9a6953165811--2-11-old-docs-apache-apisix.netlify.app/docs/apisix/2.10/getting-started/',
  },
  {
    label: '2.9',
    href: 'https://625a57e513f19e48ae3a4468--old-docs-apache-apisix.netlify.app/docs/apisix/getting-started/',
  },
  {
    label: '2.8',
    href: 'https://625a57e513f19e48ae3a4468--old-docs-apache-apisix.netlify.app/docs/apisix/2.8/getting-started/',
  },
  {
    label: '2.7',
    href: 'https://625a57e513f19e48ae3a4468--old-docs-apache-apisix.netlify.app/docs/apisix/2.7/getting-started/',
  },
  {
    label: '2.6',
    href: 'https://625a57e513f19e48ae3a4468--old-docs-apache-apisix.netlify.app/docs/apisix/2.6/getting-started/',
  },
  {
    label: '2.5',
    href: 'https://625a57e513f19e48ae3a4468--old-docs-apache-apisix.netlify.app/docs/apisix/2.5/getting-started/',
  },
  {
    label: '2.4',
    href: 'https://625a57e513f19e48ae3a4468--old-docs-apache-apisix.netlify.app/docs/apisix/2.4/getting-started/',
  },
];

module.exports = {
  versions, LTSVersions, versionMap, archivedVersions,
};

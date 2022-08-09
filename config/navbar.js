module.exports = [
  {
    label: 'Docs',
    position: 'right',
    to: '/docs',
    target: '_parent',
    items: [
      {
        label: 'Apache APISIX®️',
        to: '/docs/apisix/getting-started',
        target: '_parent',
      },
      {
        label: 'Apache APISIX®️ Dashboard',
        to: '/docs/dashboard/USER_GUIDE',
        target: '_parent',
      },
      {
        label: 'Apache APISIX®️ Ingress Controller',
        to: '/docs/ingress-controller/getting-started/',
        target: '_parent',
      },
      {
        label: 'Apache APISIX®️ Helm Charts',
        to: '/docs/helm-chart/apisix/',
        target: '_parent',
      },
      {
        label: 'Apache APISIX®️ Docker',
        to: '/docs/docker/build/',
        target: '_parent',
      },
      {
        label: 'Apache APISIX®️ Java Plugin Runner',
        to: '/docs/java-plugin-runner/development/',
        target: '_parent',
      },
      {
        label: 'Apache APISIX®️ Go Plugin Runner',
        to: '/docs/go-plugin-runner/getting-started/',
        target: '_parent',
      },
      {
        label: 'Apache APISIX®️ Python Plugin Runner',
        to: '/docs/python-plugin-runner/getting-started/',
        target: '_parent',
      },
      {
        label: 'General',
        to: '/docs/general/join',
        target: '_parent',
      },
    ],
  },
  {
    to: '/blog',
    label: 'Blog',
    position: 'right',
    target: '_parent',
  },
  {
    to: '/blog/tags/case-studies',
    label: 'Case Studies',
    position: 'right',
    target: '_parent',
  },
  {
    to: '/downloads',
    label: 'Downloads',
    position: 'right',
    target: '_parent',
  },
  {
    to: '/help',
    label: 'Help',
    position: 'right',
    target: '_parent',
  },
  {
    to: 'team',
    label: 'Team',
    position: 'right',
    target: '_parent',
  },
  {
    label: 'Resources',
    position: 'right',
    items: [
      {
        to: '/showcase',
        label: 'Showcase',
        target: '_parent',
      },
      {
        to: '/plugins',
        label: 'PluginHub',
        target: '_parent',
      },
      {
        to: '/docs/general/join',
        label: 'Community',
        target: '_parent',
      },
      {
        to: '/docs/general/events',
        label: 'Events',
        target: '_parent',
      },
    ],
  },
  {
    type: 'localeDropdown',
    position: 'right',
  },
];

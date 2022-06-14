module.exports = [
  {
    label: 'Docs',
    position: 'right',
    to: '/docs',
    items: [
      {
        label: 'Apache APISIX®️',
        to: '/docs/apisix/getting-started',
      },
      {
        label: 'Apache APISIX®️ Dashboard',
        to: '/docs/dashboard/USER_GUIDE',
      },
      {
        label: 'Apache APISIX®️ Ingress Controller',
        to: '/docs/ingress-controller/getting-started/',
      },
      {
        label: 'Apache APISIX®️ Helm Charts',
        to: '/docs/helm-chart/apisix/',
      },
      {
        label: 'Apache APISIX®️ Docker',
        to: '/docs/docker/build/',
      },
      {
        label: 'Apache APISIX®️ Java Plugin Runner',
        to: '/docs/java-plugin-runner/development/',
      },
      {
        label: 'Apache APISIX®️ Go Plugin Runner',
        to: '/docs/go-plugin-runner/getting-started/',
      },
      {
        label: 'Apache APISIX®️ Python Plugin Runner',
        to: '/docs/python-plugin-runner/getting-started/',
      },
      {
        label: 'General',
        to: '/docs/general/join',
      },
    ],
  },
  {
    to: '/zh/blog',
    label: '中文博客',
    position: 'right',
  },
  {
    to: '/blog',
    label: 'Blog',
    position: 'right',
  },
  {
    to: '/blog/tags/user-case',
    label: 'Case Studies',
    position: 'right',
  },
  {
    to: '/downloads',
    label: 'Downloads',
    position: 'right',
  },
  {
    to: '/help',
    label: 'Help',
    position: 'right',
  },
  {
    to: 'team',
    label: 'Team',
    position: 'right',
  },
  {
    label: 'Resources',
    position: 'right',
    items: [
      {
        to: '/showcase',
        label: 'Showcase',
      },
      {
        to: '/plugins',
        label: 'PluginHub',
      },
      {
        to: '/docs/general/join',
        label: 'Community',
      },
      {
        to: '/docs/general/events',
        label: 'Events',
      },
    ],
  },
  {
    type: 'localeDropdown',
    position: 'right',
  },
];

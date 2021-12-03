module.exports = [
  {
    label: "Docs",
    position: "right",
    to: "/docs",
    items: [
      {
        label: "Apache APISIX®️",
        to: "/docs/apisix/getting-started",
      },
      {
        label: "Apache APISIX®️ Dashboard",
        to: "/docs/dashboard/USER_GUIDE",
      },
      {
        label: "Apache APISIX®️ Ingress Controller",
        to: "/docs/ingress-controller/getting-started/",
      },
      {
        label: "Apache APISIX®️ Helm Charts",
        to: "/docs/helm-chart/apisix/",
      },
      {
        label: "Apache APISIX®️ Docker",
        to: "/docs/docker/build/",
      },
      {
        label: "Apache APISIX®️ Java Plugin Runner",
        to: "/docs/java-plugin-runner/development/"
      },
      {
        label: "Apache APISIX®️ Go Plugin Runner",
        to: "/docs/go-plugin-runner/getting-started/"
      },
      {
        label: "Apache APISIX®️ Python Plugin Runner",
        to: "/docs/python-plugin-runner/getting-started/"
      },
      {
        label: "General",
        to: "/docs/general/security",
      },
    ],
  },
  {
    to: "/blog",
    label: "Blog",
    position: "right",
  },
  {
    to: "/downloads",
    label: "Downloads",
    position: "right",
  },
  {
    to: "https://github.com/apache/apisix/discussions",
    label: "Discussions",
    position: "right"
  },
  {
    label: "Resources",
    position: "right",
    items: [
      {
        to: "/showcase",
        label: "Showcase"
      },
      {
        to: "/plugins",
        label: "Plugin Hub",
      },
      {
        to: "/docs/general/community",
        label: "Community"
      },
      {
        to: "/contribute",
        label: "Contribute"
      },
      {
        to: "/team",
        label: "Team"
      },
      {
        to: "/help",
        label: "Help",
      },
    ]
  },
  {
    type: "localeDropdown",
    position: "right",
  },
]

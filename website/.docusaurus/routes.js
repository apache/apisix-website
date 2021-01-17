
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';
export default [
{
  path: '/',
  component: ComponentCreator('/','d7d'),
  exact: true,
},
{
  path: '/__docusaurus/debug',
  component: ComponentCreator('/__docusaurus/debug','3d6'),
  exact: true,
},
{
  path: '/__docusaurus/debug/config',
  component: ComponentCreator('/__docusaurus/debug/config','914'),
  exact: true,
},
{
  path: '/__docusaurus/debug/content',
  component: ComponentCreator('/__docusaurus/debug/content','d12'),
  exact: true,
},
{
  path: '/__docusaurus/debug/globalData',
  component: ComponentCreator('/__docusaurus/debug/globalData','3cf'),
  exact: true,
},
{
  path: '/__docusaurus/debug/metadata',
  component: ComponentCreator('/__docusaurus/debug/metadata','31b'),
  exact: true,
},
{
  path: '/__docusaurus/debug/registry',
  component: ComponentCreator('/__docusaurus/debug/registry','0da'),
  exact: true,
},
{
  path: '/__docusaurus/debug/routes',
  component: ComponentCreator('/__docusaurus/debug/routes','244'),
  exact: true,
},
{
  path: '/blog',
  component: ComponentCreator('/blog','9e5'),
  exact: true,
},
{
  path: '/blog/2020/12/16/another-way-to-implement-envoy-filter',
  component: ComponentCreator('/blog/2020/12/16/another-way-to-implement-envoy-filter','bd8'),
  exact: true,
},
{
  path: '/blog/2020/12/18/a-first-look-at-kubernetes-service-api',
  component: ComponentCreator('/blog/2020/12/18/a-first-look-at-kubernetes-service-api','c7d'),
  exact: true,
},
{
  path: '/help',
  component: ComponentCreator('/help','6a6'),
  exact: true,
},
{
  path: '/search',
  component: ComponentCreator('/search','9d1'),
  exact: true,
},
{
  path: '/users',
  component: ComponentCreator('/users','884'),
  exact: true,
},
{
  path: '/docs',
  component: ComponentCreator('/docs','d69'),
  
  routes: [
{
  path: '/docs/',
  component: ComponentCreator('/docs/','24c'),
  exact: true,
},
{
  path: '/docs/2fa',
  component: ComponentCreator('/docs/2fa','03a'),
  exact: true,
},
{
  path: '/docs/committer-guide',
  component: ComponentCreator('/docs/committer-guide','3b0'),
  exact: true,
},
{
  path: '/docs/contributor-guide',
  component: ComponentCreator('/docs/contributor-guide','697'),
  exact: true,
},
{
  path: '/docs/downloads',
  component: ComponentCreator('/docs/downloads','ea5'),
  exact: true,
},
{
  path: '/docs/release-guide',
  component: ComponentCreator('/docs/release-guide','55b'),
  exact: true,
},
{
  path: '/docs/security',
  component: ComponentCreator('/docs/security','852'),
  exact: true,
},
{
  path: '/docs/team',
  component: ComponentCreator('/docs/team','c9f'),
  exact: true,
},
]
},
{
  path: '*',
  component: ComponentCreator('*')
}
];

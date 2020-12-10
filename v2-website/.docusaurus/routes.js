
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';
export default [
{
  path: '/',
  component: ComponentCreator('/','deb'),
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
  component: ComponentCreator('/__docusaurus/debug/content','c28'),
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
  component: ComponentCreator('/blog','a41'),
  exact: true,
},
{
  path: '/blog/2020/08/22/new-website',
  component: ComponentCreator('/blog/2020/08/22/new-website','aeb'),
  exact: true,
},
{
  path: '/help',
  component: ComponentCreator('/help','416'),
  exact: true,
},
{
  path: '/search',
  component: ComponentCreator('/search','f38'),
  exact: true,
},
{
  path: '/users',
  component: ComponentCreator('/users','9b3'),
  exact: true,
},
{
  path: '/docs',
  component: ComponentCreator('/docs','d89'),
  
  routes: [
{
  path: '/docs/2fa',
  component: ComponentCreator('/docs/2fa','223'),
  exact: true,
},
{
  path: '/docs/committer-guide',
  component: ComponentCreator('/docs/committer-guide','9be'),
  exact: true,
},
{
  path: '/docs/contributor-guide',
  component: ComponentCreator('/docs/contributor-guide','b4f'),
  exact: true,
},
{
  path: '/docs/downloads',
  component: ComponentCreator('/docs/downloads','c57'),
  exact: true,
},
{
  path: '/docs/release-guide',
  component: ComponentCreator('/docs/release-guide','a13'),
  exact: true,
},
{
  path: '/docs/security',
  component: ComponentCreator('/docs/security','ceb'),
  exact: true,
},
{
  path: '/docs/subscrbe-guide',
  component: ComponentCreator('/docs/subscrbe-guide','68d'),
  exact: true,
},
{
  path: '/docs/team',
  component: ComponentCreator('/docs/team','2ce'),
  exact: true,
},
]
},
{
  path: '*',
  component: ComponentCreator('*')
}
];


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
  path: '/../docs',
  component: ComponentCreator('/../docs','9dc'),
  
  routes: [
{
  path: '/../docs/2fa',
  component: ComponentCreator('/../docs/2fa','0db'),
  exact: true,
},
{
  path: '/../docs/committer-guide',
  component: ComponentCreator('/../docs/committer-guide','ce2'),
  exact: true,
},
{
  path: '/../docs/contributor-guide',
  component: ComponentCreator('/../docs/contributor-guide','e62'),
  exact: true,
},
{
  path: '/../docs/downloads',
  component: ComponentCreator('/../docs/downloads','5f2'),
  exact: true,
},
{
  path: '/../docs/release-guide',
  component: ComponentCreator('/../docs/release-guide','6c8'),
  exact: true,
},
{
  path: '/../docs/security',
  component: ComponentCreator('/../docs/security','8a9'),
  exact: true,
},
{
  path: '/../docs/subscrbe-guide',
  component: ComponentCreator('/../docs/subscrbe-guide','276'),
  exact: true,
},
{
  path: '/../docs/team',
  component: ComponentCreator('/../docs/team','44b'),
  exact: true,
},
]
},
{
  path: '*',
  component: ComponentCreator('*')
}
];

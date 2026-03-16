import React from 'react';
import Content from '@theme-original/DocSidebar/Desktop/Content';
import type { Props } from '@theme/DocSidebar/Desktop/Content';
import DocsVersionDropdownNavbarItem from '@theme/NavbarItem/DocsVersionDropdownNavbarItem';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useActivePlugin } from '@docusaurus/plugin-content-docs/client';
import { archivedVersions } from '../../../../../config/apisix-versions';
import styles from './styles.module.css';

const ContentWrapper = (props: Props): JSX.Element => {
  const activePlugin = useActivePlugin();
  const docsPluginId = activePlugin?.pluginId ?? 'default';

  return (
    <>
      <div className={styles.sidebarVersionSwitch}>
        Version:
        <DocsVersionDropdownNavbarItem
          docsPluginId={docsPluginId}
          dropdownItemsBefore={[]}
          dropdownItemsAfter={docsPluginId === 'docs-apisix' ? archivedVersions : []}
          items={[]}
        />
      </div>
      <Content {...props} />
    </>
  );
};

export default ContentWrapper;

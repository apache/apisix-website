/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable import/no-extraneous-dependencies, max-len */
import type { FC } from 'react';
import React, { useState } from 'react';
import clsx from 'clsx';
import {
  useThemeConfig,
  useAnnouncementBar,
  MobileSecondaryMenuFiller,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import useWindowSize from '@theme/hooks/useWindowSize';
import useScrollPosition from '@theme/hooks/useScrollPosition';
import Logo from '@theme/Logo';
import IconArrow from '@theme/IconArrow';
import { translate } from '@docusaurus/Translate';
import { DocSidebarItems } from '@theme/DocSidebarItem';
import DocsVersionDropdownNavbarItem from '@theme/NavbarItem/DocsVersionDropdownNavbarItem';
import type { Props } from '@theme/DocSidebar';
// eslint-disable-next-line import/no-unresolved
import { archivedVersions } from '../../../../config/apisix-versions';

import styles from './styles.module.css';

function useShowAnnouncementBar() {
  const { isClosed } = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(!isClosed);
  useScrollPosition(({ scrollY }) => {
    if (!isClosed) {
      setShowAnnouncementBar(scrollY === 0);
    }
  });
  return showAnnouncementBar;
}

const HideableSidebarButton = ({ onClick }: { onClick: React.MouseEventHandler }) => (
  <button
    type="button"
    title={translate({
      id: 'theme.docs.sidebar.collapseButtonTitle',
      message: 'Collapse sidebar',
      description: 'The title attribute for collapse button of doc sidebar',
    })}
    aria-label={translate({
      id: 'theme.docs.sidebar.collapseButtonAriaLabel',
      message: 'Collapse sidebar',
      description: 'The title attribute for collapse button of doc sidebar',
    })}
    className={clsx('button button--secondary button--outline', styles.collapseSidebarButton)}
    onClick={onClick}
  >
    <IconArrow className={styles.collapseSidebarButtonIcon} />
  </button>
);

const DocsVersionWrapper = (props: { docsPluginId: string }) => {
  const { docsPluginId } = props;
  return (
    <div className={styles.sidebarVersionSwitch}>
      Version:
      <DocsVersionDropdownNavbarItem
        docsPluginId={docsPluginId}
        dropdownItemsBefore={[]}
        dropdownItemsAfter={docsPluginId === 'docs-apisix' ? archivedVersions : []}
        items={[]}
      />
    </div>
  );
};

const DocsVersionWrapperMemo = React.memo(DocsVersionWrapper);

interface DocSidebarMobileSecondaryMenuProps extends Props {
  docsPluginId: string;
  toggleSidebar: () => void;
}

const DocSidebarMobileSecondaryMenu: FC<DocSidebarMobileSecondaryMenuProps> = ({
  toggleSidebar,
  sidebar,
  path,
  docsPluginId,
}) => (
  <>
    <DocsVersionWrapperMemo docsPluginId={docsPluginId} />
    <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
      <DocSidebarItems items={sidebar} activePath={path} onItemClick={() => toggleSidebar()} />
    </ul>
  </>
);

const DocSidebarMobile = (props: Props) => (
  <MobileSecondaryMenuFiller component={DocSidebarMobileSecondaryMenu} props={props} />
);

const DocSidebarDesktop = ({
  path,
  sidebar,
  onCollapse,
  isHidden,
  docsPluginId,
}: Props & { docsPluginId: string }) => {
  const showAnnouncementBar = useShowAnnouncementBar();
  const {
    navbar: { hideOnScroll },
    hideableSidebar,
  } = useThemeConfig();
  const { isClosed: isAnnouncementBarClosed } = useAnnouncementBar();

  return (
    <div
      className={clsx(styles.sidebar, {
        [styles.sidebarWithHideableNavbar]: hideOnScroll,
        [styles.sidebarHidden]: isHidden,
      })}
    >
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      <DocsVersionWrapperMemo docsPluginId={docsPluginId} />
      <nav
        className={clsx('menu thin-scrollbar', styles.menu, {
          [styles.menuWithAnnouncementBar]: !isAnnouncementBarClosed && showAnnouncementBar,
        })}
      >
        <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
          <DocSidebarItems items={sidebar} activePath={path} />
        </ul>
      </nav>
      {hideableSidebar && <HideableSidebarButton onClick={onCollapse} />}
    </div>
  );
};

const DocSidebarMobileMemo = React.memo(DocSidebarMobile);
const DocSidebarDesktopMemo = React.memo(DocSidebarDesktop);

const DocSidebar: FC<Props & { docsPluginId: string }> = (props) => {
  const windowSize = useWindowSize();

  // Desktop sidebar visible on hydration: need SSR rendering
  const shouldRenderSidebarDesktop = windowSize === 'desktop' || windowSize === 'ssr';

  // Mobile sidebar not visible on hydration: can avoid SSR rendering
  const shouldRenderSidebarMobile = windowSize === 'mobile';

  return (
    <>
      {shouldRenderSidebarDesktop && <DocSidebarDesktopMemo {...props} />}
      {shouldRenderSidebarMobile && <DocSidebarMobileMemo {...props} />}
    </>
  );
};

export default DocSidebar;

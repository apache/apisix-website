/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { FC } from 'react';
import React from 'react';
import type { Props } from '@theme/NavbarItem/DropdownNavbarItem';
import type { LinkLikeNavbarItemProps } from '@theme/NavbarItem';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import IconLanguage from '@theme/IconLanguage';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useAlternatePageUtils } from '@docusaurus/theme-common';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

interface LocaleDropdownNavbarItemProps extends Omit<Props, 'items'>{
  readonly dropdownItemsBefore: readonly LinkLikeNavbarItemProps[],
  readonly dropdownItemsAfter: readonly LinkLikeNavbarItemProps[]
}

const LocaleDropdownNavbarItem: FC<LocaleDropdownNavbarItemProps> = (props) => {
  const {
    mobile,
    dropdownItemsBefore,
    dropdownItemsAfter,
    ...others
  } = props;
  const {
    i18n: { currentLocale, locales, localeConfigs },
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const { pathname } = useLocation();

  if (pathname.startsWith('/zh/blog') || pathname.startsWith('/blog')) {
    return null;
  }

  function getLocaleLabel(locale) {
    return localeConfigs[locale].label;
  }

  const localeItems = locales.map((locale) => {
    const to = `pathname://${alternatePageUtils.createUrl({
      locale,
      fullyQualified: false,
    })}`;
    return {
      isNavLink: true,
      label: getLocaleLabel(locale),
      to,
      target: '_self',
      autoAddBaseUrl: false,
      className: locale === currentLocale ? 'dropdown__link--active' : '',
      style: {
        textTransform: 'capitalize',
      },
    };
  });
  // Mobile is handled a bit differently
  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];

  const dropdownLabel = mobile ? 'Languages' : getLocaleLabel(currentLocale);
  return (
    <DropdownNavbarItem
      {...others}
      href="#"
      mobile={mobile}
      label={(
        <span>
          <IconLanguage className={styles.iconLanguage} />
          <span>{dropdownLabel}</span>
        </span>
      )}
      items={items}
    />
  );
};

export default LocaleDropdownNavbarItem;

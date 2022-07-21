/* eslint-disable react/prop-types */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useThemeConfig } from '@docusaurus/theme-common';

const Logo = (props) => {
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const {
    navbar: {
      title: navbarTitle,
      logo = {
        src: '',
      },
    },
  } = useThemeConfig();
  const { imageClassName, titleClassName, ...propsRest } = props as any;
  const logoLink = useBaseUrl(logo.href || '/');
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };
  return (
    <Link
      target="_parent"
      to={logoLink}
      {...propsRest}
    >
      {logo.src && (
        <ThemedImage
          className={imageClassName}
          sources={sources}
          alt={logo.alt || navbarTitle || title}
        />
      )}
      {navbarTitle != null && <b className={titleClassName}>{navbarTitle}</b>}
    </Link>
  );
};

export default Logo;

/* eslint-disable react/prop-types */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Icon } from '@iconify/react';
import githubIcon from '@iconify/icons-akar-icons/github-fill';
import twitterIcon from '@iconify/icons-akar-icons/twitter-fill';
import slackIcon from '@iconify/icons-akar-icons/slack-fill';
import youtubeIcon from '@iconify/icons-akar-icons/youtube-fill';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import style from './styles.module.scss';

const footer = {
  links: [
    {
      title: 'ASF',
      items: [
        {
          label: 'Foundation',
          to: 'https://www.apache.org/',
        },
        {
          label: 'License',
          to: 'https://www.apache.org/licenses/',
        },
        {
          label: 'Events',
          to: 'https://www.apache.org/events/',
        },
        {
          label: 'Security',
          to: 'https://www.apache.org/security/',
        },
        {
          label: 'Sponsorship',
          to: 'https://www.apache.org/foundation/sponsorship.html',
        },
        {
          label: 'Thanks',
          to: 'https://www.apache.org/foundation/thanks.html',
        },
      ],
    },
    {
      title: 'Community',
      items: [
        {
          icon: githubIcon,
          label: 'GitHub',
          to: 'https://github.com/apache/apisix/issues',
        },
        {
          icon: slackIcon,
          label: 'Slack',
          to: '/docs/general/join',
        },
        {
          icon: twitterIcon,
          label: 'Twitter',
          to: 'https://twitter.com/ApacheAPISIX',
        },
        {
          icon: youtubeIcon,
          label: 'YouTube',
          to: 'https://www.youtube.com/channel/UCgPD18cMhOg5rmPVnQhAC8g',
        },
      ],
    },
    {
      title: 'More',
      items: [
        {
          label: 'Blog',
          to: '/blog/',
          target: '_parent',
        }, {
          label: 'Showcase',
          to: '/showcase',
          target: '_parent',
        }, {
          label: 'Plugin Hub',
          to: '/plugins',
          target: '_parent',
        },
      ],
    },
  ],
  logo: {
    alt: 'Apache Software Foundation',
    src: 'https://static.apiseven.com/202202/asf_logo_wide_small.png',
    href: 'https://www.apache.org/',
  },

  copyright:
        'Copyright © 2019-2022 The Apache Software Foundation. Apache APISIX, APISIX®, Apache, the Apache feather logo, and the Apache APISIX project logo are either registered trademarks or trademarks of the Apache Software Foundation.',
};

const FooterLink = ({
  to, icon, href, label, prependBaseUrlToHref, ...props
}) => {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {
    forcePrependBaseUrl: true,
  });
  const hrefObj = href
    ? { href: prependBaseUrlToHref ? normalizedHref : href }
    : { to: toUrl };
  return (
    <Link
      {...hrefObj}
      {...props}
    >
      <Icon icon={icon} />
      <span>{label}</span>
    </Link>
  );
};

const Footer: FC = () => {
  const { copyright, links, logo } = footer;

  if (!footer) {
    return null;
  }

  return (
    <footer className={style.container}>
      {links && links.length > 0 && (
      <div className={style.linksRow}>
        {links.map(({ title, items }) => (
          <div key={title} className={style.linksCol}>
            <div>{title}</div>
            <ul>
              {items.map((v) => (
                <li key={v.to} className="footer__item">
                  <FooterLink {...v} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      )}
      <div className={style.copyright}>
        <Link href={logo.href}>
          <LazyLoadImage alt={logo.alt} src={logo.src} height="40px" width="231.25px" />
        </Link>
        <div className={style.text}>{copyright}</div>
      </div>
    </footer>
  );
};

export default Footer;

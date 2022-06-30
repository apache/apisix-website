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
import githubIcon from '@iconify/icons-carbon/logo-github';
import twitterIcon from '@iconify/icons-carbon/logo-twitter';
import slackIcon from '@iconify/icons-carbon/logo-slack';
import youtubeIcon from '@iconify/icons-carbon/logo-youtube';

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
        }, {
          label: 'Showcase',
          to: '/showcase',
        }, {
          label: 'Plugin Hub',
          to: '/plugins',
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
      className="footer__link-item"
      {...hrefObj}
      {...props}
    >
      <span>
        <Icon icon={icon} />
        {label}
      </span>
    </Link>
  );
};

// const FooterLogo = ({ sources, alt }) => (
//   <ThemedImage className="footer__logo" alt={alt} sources={sources} />
// );

const Footer:FC = () => {
  const { copyright, links, logo } = footer;

  if (!footer) {
    return null;
  }

  return (
    <footer>
      <div className="container">
        {links && links.length > 0 && (
          <div className="row footer__links">
            {links.map((linkItem, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i} className="col footer__col">
                {linkItem.title != null ? (
                  <div className="footer__title">{linkItem.title}</div>
                ) : null}
                {linkItem.items != null
                && Array.isArray(linkItem.items)
                && linkItem.items.length > 0 ? (
                  <ul className="footer__items">
                    {linkItem.items.map((item, key) => (item.html ? (
                      <li
                        // eslint-disable-next-line react/no-array-index-key
                        key={key}
                        className="footer__item" // Developer provided the HTML, so assume it's safe.
                          // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                          __html: item.html,
                        }}
                      />
                    ) : (
                      <li key={item.href || item.to} className="footer__item">
                        <FooterLink {...item} />
                      </li>
                    )))}
                  </ul>
                  ) : null}
              </div>
            ))}
          </div>
        )}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {/* <div className="margin-bottom--sm">
              {logo.href ? (
                <Link href={logo.href} className={styles.footerLogoLink}>
                  <FooterLogo alt={logo.alt} sources={sources} />
                </Link>
              ) : (
                <FooterLogo alt={logo.alt} sources={sources} />
              )}
            </div> */}
            {copyright ? (
              <div
                className="footer__copyright" // Developer provided the HTML, so assume it's safe.
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: copyright,
                }}
              />
            ) : null}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;

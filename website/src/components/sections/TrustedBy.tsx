import type { FC } from 'react';
import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';

import '../../css/landing-sections/trusted-by.scss';

interface TrustedUser {
  name: string;
  link: string;
  /**
   * Optional logo URL. When omitted, a clean text wordmark is shown instead, so
   * the section renders correctly before official logos are available.
   * Host official customer logos on the API7 CDN (where the showcase logos
   * already live) and set this to e.g.
   * `https://static.apiseven.com/uploads/users/nasa.svg`.
   */
  logo?: string;
}

const USERS: TrustedUser[] = [
  { name: 'NASA', link: 'https://www.jpl.nasa.gov/' },
  { name: 'Zoom', link: 'https://zoom.us/' },
  { name: 'HPE', link: 'https://www.hpe.com/' },
  { name: 'Tencent', link: 'https://www.tencent.com/en-us/' },
  { name: 'Hisense', link: 'https://global.hisense.com/' },
  { name: 'k6', link: 'https://k6.io/' },
  { name: 'Citi', link: 'https://www.citigroup.com/' },
  { name: 'API7.ai', link: 'https://api7.ai/' },
  { name: "McDonald's", link: 'https://www.mcdonalds.com/' },
  { name: 'KFC', link: 'https://global.kfc.com/' },
];

const UserLogo: FC<{ user: TrustedUser }> = ({ user }) => {
  const [failed, setFailed] = useState(!user.logo);
  return (
    <Link
      className="trusted-by__item"
      to={user.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={user.name}
    >
      {failed ? (
        <span className="trusted-by__wordmark">{user.name}</span>
      ) : (
        <img
          className="trusted-by__logo"
          src={user.logo}
          alt={user.name}
          loading="lazy"
          width={132}
          height={36}
          onError={() => setFailed(true)}
        />
      )}
    </Link>
  );
};

const TrustedBy: FC = () => (
  <section
    className="trusted-by"
    aria-label={translate({ id: 'home.trustedBy.label', message: 'Organizations using Apache APISIX' })}
  >
    <div className="trusted-by__eyebrow">
      <Translate id="home.trustedBy.title">Trusted by teams everywhere</Translate>
    </div>
    <div className="trusted-by__viewport">
      {/* Duplicated once so the CSS marquee loops seamlessly at translateX(-50%). */}
      <div className="trusted-by__track">
        {[...USERS, ...USERS].map((user, index) => (
          <UserLogo key={`${user.name}-${index}`} user={user} />
        ))}
      </div>
    </div>
  </section>
);

export default TrustedBy;

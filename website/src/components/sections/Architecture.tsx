import type { FC } from 'react';
import React, { useEffect } from 'react';
import gsap from 'gsap';

import Translate from '@docusaurus/Translate';

import '../../css/customTheme.css';
import HLDesign from '../../assets/images/infographs/Architecture.svg';
import Pattern from '../../assets/images/PatternGrouped.svg';

interface ArchitectureProps {
  screenWidth: number;
}

const Architecture: FC<ArchitectureProps> = (props) => {
  const { screenWidth } = props;

  useEffect(() => {
    const strokePaths = [];
    for (let i = 1; i < 28; i += 1) {
      strokePaths.push(`.PatternGrouped_svg__p${i}`);
    }

    const tlStroke = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
      },
    });

    tlStroke.fromTo(strokePaths, {
      strokeDashoffset: 10000,
    }, {
      strokeDashoffset: 0,
      duration: 5,
      stagger: 0.3,
      ease: 'power2.inOut',
      stroke: 'red',
    });

    const observer = new IntersectionObserver(onIntersection, {
      root: null,
      threshold: 0.4,
    });

    function onIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tlStroke.paused(false);
        } else {
          tlStroke.paused(true);
        }
      });
    }

    observer.observe(document.querySelector('.arch'));

    return () => {
      tlStroke.pause(0).kill();
      observer.disconnect();
    };
  }, []);

  return (
    <div className="arch">
      <div style={{
        position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '120vh',
      }}
      >
        <Pattern
          className="arch-scale-svg"
          style={{
            width: '100vw', strokeWidth: '3', zIndex: '-10', opacity: '0.25', strokeDasharray: '10000',
          }}
        />
      </div>
      <div>
        <h3 className="arch-head">
          <Translate id="architecture.component.title.name">Building for large-scale, high value systems</Translate>
        </h3>
      </div>
      <div className="arch-subtitle">
        <p>
          <Translate id="architecture.component.title.subtitle">
            Apache APISIX provides open source API Gateway to help you manage microservices,
            delivering the ultimate performance, security,
            and scalable platform for all your APIs and microservices.
          </Translate>
        </p>
      </div>
      <div className="arch-card" style={{ position: 'relative' }}>
        <div className="hldesign">
          <HLDesign className="hldesign-graphic" />
        </div>
        <div className="arch-card-caption">
          <p style={{ width: screenWidth >= 768 ? '50%' : '90%' }}>
            <Translate id="architecture.component.card.caption">
              Apache APISIX is based on NGINX and etcd.
              Compared with traditional API Gateways,
              APISIX has features like dynamic routing and hot-loading plugins, etc.
            </Translate>
          </p>
        </div>
        <div className="arch-card-border" />
      </div>
    </div>
  );
};

export default Architecture;

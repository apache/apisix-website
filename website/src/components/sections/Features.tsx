import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Translate from '@docusaurus/Translate';
import useWindowType from '@theme/hooks/useWindowSize';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ArrowAnim from '../ArrowAnim';

const DashboardPlayground = () => (
  <Link
    className="dashboard-playground-link add-left-margin-feat"
    to="http://20.210.250.99:9000/user/login/"
  >
    <div className="dashboard-playground">
      <h2 className="dashboard-title">Dashboard Playground</h2>

      <div className="dashboard-account">
        <div>
          username
          {' '}
          <span>admin</span>
        </div>
        <div>
          passwd
          {' '}
          <span>admin</span>
        </div>
      </div>
    </div>
  </Link>
);

const FeatDesktop: FC = () => {
  const dashboardDiv = useRef(null);
  const userfDiv = useRef(null);
  const pluginDiv = useRef(null);
  const triggerDiv = useRef(null);
  const pinDiv = useRef(null);
  const img1 = useRef(null);
  const img2 = useRef(null);
  const img3 = useRef(null);

  useEffect(() => {
    const value = window.innerHeight * 2;

    const tl = gsap.timeline({
      defaults: {
        ease: 'linear',
      },
      scrollTrigger: {
        id: 'feat',
        trigger: triggerDiv.current,
        start: 'top top',
        pin: pinDiv.current,
        scrub: 1.5,
        end: `${value}px`,
      },
    });

    tl.to(img1.current, {
      opacity: 0,
    })
      .to(img2.current, {
        opacity: 1,
      })
      .to(img2.current, {
        opacity: 0,
      })
      .to(img3.current, {
        opacity: 1,
      });
  }, [triggerDiv.current, pinDiv.current, img1.current, img2.current, img3.current]);
  return (
    <div className="feat-container-d" ref={triggerDiv}>
      <div className="left-pane" style={{ width: '50%', height: '100%' }}>
        <div ref={dashboardDiv} style={{ position: 'relative' }}>
          <div className="text-div" style={{ height: '100vh' }}>
            <h2 className="i-text add-left-margin-feat">
              <Translate id="features.component.easyDashboard.title">
                Easy-to-use Dashboard
              </Translate>
            </h2>
            <p className="i-text-desc add-left-margin-feat">
              <Translate id="features.component.easyDashboard.message">
                The Apache APISIX Dashboard is designed to make it as easy as
                possible for users to operate Apache APISIX through a frontend
                interface. It’s opensource and ever evolving, feel free to
                contribute.
              </Translate>
            </p>
            <div className="hero-ctas add-left-margin-feat bottom-pos">
              <Link to={useBaseUrl('downloads')} className="btn btn-download">
                <Translate id="features.component.easyDashboard.downloadBtn">Downloads</Translate>
              </Link>
              <ArrowAnim />
            </div>
            <DashboardPlayground />
          </div>
        </div>

        <div ref={userfDiv} style={{ position: 'relative' }}>
          <div className="text-div" style={{ height: '100vh' }}>
            <h2 className="i-text add-left-margin-feat">
              <Translate id="features.component.userFlexible.title">User Flexible</Translate>
            </h2>
            <p className="i-text-desc add-left-margin-feat">
              <Translate id="features.component.userFlexible.message">
                The Apache APISIX dashboard is flexible to User demand,
                providing option to create custom modules through code matching
                your requirements, alongside the existing no-code toolchain.
              </Translate>
            </p>
          </div>
        </div>

        <div ref={pluginDiv} style={{ position: 'relative' }}>
          <div className="text-div" style={{ height: '100vh' }}>
            <h2 className="i-text add-left-margin-feat">
              <Translate id="features.component.pluginised.title">Pluginised Workflow</Translate>
            </h2>
            <p className="i-text-desc add-left-margin-feat">
              <Translate id="features.component.pluginised.message">
                No need to reinvent the wheel again and again. Use inbuilt
                plugins to create high performance systems in tight deadlines.
                For something custom, there is option of building custom
                plugins.
              </Translate>
            </p>
          </div>
        </div>
      </div>

      <div
        ref={pinDiv}
        className="right-pane"
        style={{
          width: '50%',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          ref={img1}
          className="i-image imagePosition"
          src="https://static.apiseven.com/202202/apisix-dashboard.png"
          loading="lazy"
          alt="apisix-dashboard"
        />
        <img
          ref={img2}
          className="n-image imagePosition"
          src="https://static.apiseven.com/202202/code-sample.png"
          loading="lazy"
          alt="code-snippet"
        />
        <img
          ref={img3}
          className="n-image imagePosition"
          src="https://static.apiseven.com/202202/pluginised.png"
          loading="lazy"
          alt="plugin-workflow"
        />
      </div>
    </div>
  );
};

const FeatMobile: FC = () => {
  const observers = [];
  const img1col = useRef(null);
  const img2col = useRef(null);
  const img3col = useRef(null);

  useEffect(() => {
    const elems = [img1col.current, img2col.current, img3col.current];
    for (let i = 1; i < 4; i += 1) {
      observers.push(
        new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                observers[i - 1].disconnect();
                gsap.fromTo(
                  elems[i - 1],
                  {
                    opacity: 0,
                    y: 90,
                  },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power3.out',
                    yoyo: true,
                    yoyoEase: 'power3.inOut',
                  },
                );
              }
            });
          },
          {
            root: null,
            threshold: 0.2,
          },
        ),
      );
    }

    observers.forEach((it, index) => {
      it.observe(elems[index]);
    });
  }, [img1col.current, img2col.current, img3col.current]);

  return (
    <div
      className="feat-container-m"
      style={{ width: '100%' }}
    >
      <div
        ref={img1col}
        className="hiddenDiv-col"
        style={{ height: 'fit-content', padding: '0 0 40px 0' }}
      >
        <div style={{ position: 'relative', height: '100%' }}>
          <h2 className="add-left-margin" style={{ width: 'fit-content' }}>
            <Translate id="features.component.easyDashboard.title">
              Easy-to-use dashboard
            </Translate>
          </h2>
          <img className="i-image-col" src="https://static.apiseven.com/202202/apisix-dashboard.png" alt="Dashboard" />
          <p className="i-text-desc-col add-left-margin">
            <Translate id="features.component.easyDashboard.message">
              The Apache APISIX Dashboard is designed to make it as easy as
              possible for users to operate Apache APISIX through a frontend
              interface. It’s opensource and ever evolving, feel free to
              contribute.
            </Translate>
          </p>
          <div
            className="hero-ctas add-left-margin"
            style={{ width: 'fit-content' }}
          >
            <Link to={useBaseUrl('downloads')} className="btn btn-download">
              <Translate id="features.component.easyDashboard.downloadBtn">Downloads</Translate>
            </Link>
            <ArrowAnim />
          </div>
        </div>
      </div>

      <div
        ref={img2col}
        className="hiddenDiv-col"
        style={{ height: 'fit-content', padding: '20px 0' }}
      >
        <h2 className="add-left-margin" style={{ width: 'fit-content' }}>
          <Translate id="features.component.userFlexible.title">User Flexible</Translate>
        </h2>
        <img className="i-image-col" src="https://static.apiseven.com/202202/code-sample.png" alt="code-sample" />
        <p className="i-text-desc-col add-left-margin">
          <Translate id="features.component.userFlexible.message">
            The Apache APISIX dashboard is flexible to User demand, providing
            option to create custom modules through code matching your
            requirements, alongside the existing no-code toolchain.
          </Translate>
        </p>
      </div>

      <div
        ref={img3col}
        className="hiddenDiv-col"
        style={{ height: 'fit-content', padding: '20px 0' }}
      >
        <h2 className="add-left-margin" style={{ width: 'fit-content' }}>
          <Translate id="features.component.pluginised.title">Pluginised Workflow</Translate>
        </h2>
        <img className="i-image-col" src="https://static.apiseven.com/202202/pluginised.png" alt="Plugin" />
        <p className="i-text-desc-col add-left-margin">
          <Translate id="features.component.pluginised.message">
            No need to reinvent the wheel again and again. Use inbuilt plugins
            to create high performance systems in tight deadlines. For something
            custom, there is option of building custom plugins.
          </Translate>
        </p>
      </div>
    </div>
  );
};

const FeatContainer: FC = () => {
  gsap.registerPlugin(ScrollTrigger);
  const windowType = useWindowType();
  console.log(windowType);

  return (
    <BrowserOnly>
      {() => (windowType === 'desktop'
        ? <FeatDesktop />
        : <FeatMobile />)}
    </BrowserOnly>
  );
};

const Features: FC = () => (
  <>
    <div className="feat-top" style={{ padding: '50px 0' }}>
      <h3 className="feat-head-desc"><Translate id="features.component.why.title">Why APISIX Gateway?</Translate></h3>
      <h2 className="feat-head add-left-margin">
        <Translate id="features.component.why.subtitle">
          Reduce time fighting bugs, focus on designing world-class systems with API Gateway
        </Translate>
      </h2>
      <p className="feat-desc add-left-margin">
        <Translate id="features.component.why.message">
          Apache APISIX is the first open-source API Gateway
          that includes a built-in low-code Dashboard,
          which offers a powerful and flexible UI for developers to use.
        </Translate>
      </p>
    </div>
    <FeatContainer />
  </>
);

export default Features;

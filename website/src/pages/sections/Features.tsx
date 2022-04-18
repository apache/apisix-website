import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArrowAnim from './components/ArrowAnim';

import '../../css/customTheme.css';
import Dashboard from '../../assets/images/apisix-dashboard.png';
import Snippet from '../../assets/images/code-sample.png';
import Plugin from '../../assets/images/pluginised.png';

const DashboardPlayground = () => (
  <Link
    className="dashboard-playground-link add-left-margin-feat"
    to="http://20.210.250.99:9000/"
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

const Features:FC = () => {
  const dashboardDiv = useRef(null);
  const userfDiv = useRef(null);
  const pluginDiv = useRef(null);
  const triggerDiv = useRef(null);
  const triggerDivCol = useRef(null);
  const pinDiv = useRef(null);
  const img1 = useRef(null);
  const img1col = useRef(null);
  const img2 = useRef(null);
  const img2col = useRef(null);
  const img3 = useRef(null);
  const img3col = useRef(null);
  const featPin = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' && window.innerWidth,
  );
  const [, setScreenHeight] = useState(
    typeof window !== 'undefined' && window.innerWidth,
  );

  useEffect(() => {
    setScreenHeight(window.innerHeight);
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', resizeEvent, false);

    function resizeEvent() {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    }

    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  useEffect(() => {
    const value = window.innerHeight * 2;

    let tl;
    const observers = [];

    if (screenWidth > 1100) {
      tl = gsap.timeline({
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
    } else {
      // Mobile

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
    }
  });

  return (
    <>
      <div ref={featPin} className="feat-top" style={{ padding: '50px 0' }}>
        <h3 className="feat-head-desc">Why APISIX ?</h3>
        <h1 className="feat-head add-left-margin">
          Reduce time fighting bugs, focus on designing world-class systems
        </h1>
        <p className="feat-desc add-left-margin">
          Apache APISIX is the first Open source API gateway, with a built-in
          low-code Dashboard offering a powerful and flexible interface for
          developers to use
        </p>
      </div>
      <div className="feat-container-d" ref={triggerDiv}>
        {/* Desktop */}
        <div className="left-pane" style={{ width: '50%', height: '100%' }}>
          <div ref={dashboardDiv} style={{ position: 'relative' }}>
            <div className="text-div" style={{ height: '100vh' }}>
              <h2 className="i-text add-left-margin-feat">
                Easy-to-use dashboard
              </h2>
              <p className="i-text-desc add-left-margin-feat">
                The Apache APISIX Dashboard is designed to make it as easy as
                possible for users to operate Apache APISIX through a frontend
                interface. It’s opensource and ever evolving, feel free to
                contribute.
              </p>
              <div className="hero-ctas add-left-margin-feat bottom-pos">
                <Link to={useBaseUrl('downloads')} className="btn btn-download">
                  Downloads
                </Link>
                <ArrowAnim />
              </div>
              <DashboardPlayground />
            </div>
          </div>

          <div ref={userfDiv} style={{ position: 'relative' }}>
            <div className="text-div" style={{ height: '100vh' }}>
              <h2 className="i-text add-left-margin-feat">User flexible</h2>
              <p className="i-text-desc add-left-margin-feat">
                The Apache APISIX dashboard is flexible to User demand,
                providing option to create custom modules through code matching
                your requirements, alongside the existing no-code toolchain.
              </p>
            </div>
          </div>

          <div ref={pluginDiv} style={{ position: 'relative' }}>
            <div className="text-div" style={{ height: '100vh' }}>
              <h2 className="i-text add-left-margin-feat">
                Pluginised workflow
              </h2>
              <p className="i-text-desc add-left-margin-feat">
                No need to reinvent the wheel again and again. Use inbuilt
                plugins to create high performance systems in tight deadlines.
                For something custom, there is option of building custom
                plugins.
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
            src={Dashboard}
            loading="lazy"
            alt="apisix-dashboard"
          />
          <img
            ref={img2}
            className="n-image imagePosition"
            src={Snippet}
            loading="lazy"
            alt="code-snippet"
          />
          <img
            ref={img3}
            className="n-image imagePosition"
            src={Plugin}
            loading="lazy"
            alt="plugin-workflow"
          />
        </div>
      </div>
      <div
        className="feat-container-m"
        ref={triggerDivCol}
        style={{ width: '100%' }}
      >
        {/* Mobile */}
        <div
          ref={img1col}
          className="hiddenDiv-col"
          style={{ height: 'fit-content', padding: '0 0 40px 0' }}
        >
          <div style={{ position: 'relative', height: '100%' }}>
            <h2 className="add-left-margin" style={{ width: 'fit-content' }}>
              Easy-to-use dashboard
            </h2>
            <img className="i-image-col" src={Dashboard} alt="" />
            <p className="i-text-desc-col add-left-margin">
              The Apache APISIX Dashboard is designed to make it as easy as
              possible for users to operate Apache APISIX through a frontend
              interface. It’s opensource and ever evolving, feel free to
              contribute.
            </p>
            <div
              className="hero-ctas add-left-margin"
              style={{ width: 'fit-content' }}
            >
              <Link to={useBaseUrl('downloads')} className="btn btn-download">
                Downloads
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
            User flexible
          </h2>
          <img className="i-image-col" src={Snippet} alt="" />
          <p className="i-text-desc-col add-left-margin">
            The Apache APISIX dashboard is flexible to User demand, providing
            option to create custom modules through code matching your
            requirements, alongside the existing no-code toolchain.
          </p>
        </div>

        <div
          ref={img3col}
          className="hiddenDiv-col"
          style={{ height: 'fit-content', padding: '20px 0' }}
        >
          <h2 className="add-left-margin" style={{ width: 'fit-content' }}>
            Pluginised workflow
          </h2>
          <img className="i-image-col" src={Plugin} alt="" />
          <p className="i-text-desc-col add-left-margin">
            No need to reinvent the wheel again and again. Use inbuilt plugins
            to create high performance systems in tight deadlines. For something
            custom, there is option of building custom plugins.
          </p>
        </div>
      </div>
    </>
  );
};

export default Features;

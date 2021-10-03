import React, { useRef, useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../css/customTheme.css";

import Performance from "../../assets/images/infographs/performance.svg";
import Security from "../../assets/images/infographs/security.svg";
import Scale from "../../assets/images/infographs/scale.svg";
import Dynamic from "../../assets/images/infographs/dynamic.svg";
import Multiplatform from "../../assets/images/infographs/multiplatform.svg";

const Benefits = (props) => {
  const triggerDiv = useRef(null);
  const performance = useRef(null);
  const security = useRef(null);
  const scale = useRef(null);
  const dynamic = useRef(null);
  const multiplatform = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' && window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(typeof window !== 'undefined' && window.innerWidth);

  useEffect(()=>{
    setScreenHeight(window.innerHeight);
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', resizeEvent, false);

    function resizeEvent(event) {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    }

    return () => {
      window.removeEventListener('resize', resizeEvent);
    }
  }, [])

  useEffect(() => {
    let tweenTls = [];
    let observers = [];

    for (let i=0; i<5; i++) {
      tweenTls.push(gsap.timeline({
        paused: true,
        yoyo: true, 
        yoyoEase: "power3.out",
        repeat: -1,
        defaults: {
          yoyo: true,
          ease: "power3.inOut",
          yoyoEase: "power3.out"
        },
      }));
    }

    let circles = [];
    let links = [];
    const colors = ["#FE7F80", "white", "red"];
    const pathColors = ["#FE7F80", "black"];

    for (let i=1; i<28; i++) {
      circles.push(".scale_svg__cir"+i);
      links.push(".scale_svg__n"+i);
    }
    
    // Performance anim
    tweenTls[0].fromTo(".performance_svg__network",{   
      strokeDashoffset: 1000, 
      stroke: "black"
    },{
      strokeDashoffset: 0,
      duration: 1,
      strokeWidth: 5,
      stroke: "orange",
      ease: "power2.in",
      yoyoEase: "power2.out",
      repeat: -1,
    })
    .fromTo(".performance_svg__lightning",{
      fill: "orange",
    }, {
      fill: "red",
      duration: 1,
      repeat: -1,
    },"-=1");
    
    // Security anim
    tweenTls[1].fromTo([".security_svg__malWarn-square", ".security_svg__malConn"],{   
      fill: "#FA5252",
    },{
      fill: "yellow",
      duration: 0.5,
      repeat: -1,
      repeatDelay: 0.1,
    })
    for (let i = 1; i < 4; i++) {
      tweenTls[1].fromTo(".security_svg__conn"+i, {
        strokeWidth: 4,
        strokeDasharray: 25,
        strokeDashoffset: 200,
      }, {
        strokeDashoffset: 0,
        duration: 2.5,
        repeat: -1,
        ease: "linear",
        yoyoEase: "linear",
      })
    }

    // Scaling anim
    for (let i = 0; i < 27; i++) { 
      tweenTls[2].fromTo(circles[i],{
        fill: gsap.utils.random(colors),
      },{
        fill:  gsap.utils.random(colors),
        duration: 0.3,
        repeat: -1,
        repeatDelay: 0.1,
      })
      tweenTls[2].fromTo(links[i],{
        stroke: gsap.utils.random(pathColors),
      },{
        stroke:  gsap.utils.random(pathColors),
        duration: 0.3,
        repeat: -1,
        repeatDelay: 0.1,
      })
    }
    
    // Dynamic anim
    tweenTls[3].repeatDelay(1.5);
    tweenTls[3].fromTo([".dynamic_svg__rcard"],{
      x: -400,
      opacity: 0,
    },{
      opacity: 1,
      x: 0,
      ease: "sin.inOut",
      duration: 1.5,
    })
    .fromTo(".dynamic_svg__arrow", {
      opacity: 0,
    }, {
      opacity: 1,
      ease: "power3.out",
      duration: 0.5,
    })
    .fromTo(".dynamic_svg__lightning", {
      opacity: 0,
      y: 10,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    // Multiplatform anim
    for(let i = 1; i < 4; i++) {
      tweenTls[4].fromTo(".multiplatform_svg__server-port"+i,{    
        fill: "#60E0F2",
      },{
        fill: "#ffdc21",
        duration: 0.5,
      });
    }
    
    let standloneObserver = new IntersectionObserver(onIntersection, {
      root: null,
      threshold: 0.4,
    })

    let rot = 0;
    const tweenArrow = gsap.fromTo(".multiplatform_svg__arrows",
    {
      rotation: rot,
    },{
      rotation: -360+rot,
      transformOrigin:"50% 50%",
      ease: "power3.inOut",
      duration: 3,
      repeat: -1,
      paused: true,
      onComplete: () => {
        rot -= 360;
      }
    });
    const tweenFloat = gsap.fromTo(".multiplatform_svg__lightning",{
      y: -2.5,
    },{
      y: 5,
      duration: 1,
      ease: "linear",
      repeat: -1,
      yoyo: true,
      paused: true,
      yoyoEase: "linear",
    });

    function onIntersection(entries, opts){
      entries.forEach(entry =>  {
        if (entry.isIntersecting) {
          tweenArrow.paused(false);
          tweenFloat.paused(false);
        } else {
          tweenArrow.paused(true);
          tweenFloat.paused(true);
        }
      });
    }
      
    standloneObserver.observe(multiplatform.current);

    const elems = [performance.current, security.current, scale.current, dynamic.current, multiplatform.current];
    for (let i=0; i<5; i++) {
      observers.push(new IntersectionObserver((entries, opts)=>{
        entries.forEach(entry =>  {
          if (entry.isIntersecting) {
            tweenTls[i].paused(false);
          } else {
            tweenTls[i].paused(true);
          }
        }
        );
      }, {
        root: null,
        threshold: .2
      }));
    }

    observers.forEach((it, index)=>{
      it.observe(elems[index]);
    });

    return () => {
      observers.forEach((it, index)=>{
        it.disconnect();
      });
      tweenTls.forEach((it, index)=>{
        it.pause(0).kill(true);
      });
    }
  }, [])

  useEffect(() => {
    ScrollTrigger.saveStyles([
      performance.current,
      security.current,
      scale.current,
      dynamic.current,
      multiplatform.current,
    ]);

    ScrollTrigger.matchMedia({
      "(max-width: 1100px)": () => {
        const tl = gsap.timeline({
          defaults: {
            ease: "linear" 
          },
          scrollTrigger: {
            id: 'benefits-scrolltrigger',
            trigger: triggerDiv.current,
            start: "top top",
            pin: triggerDiv.current,
            scrub: 1,
            end: "+=500%"
          }
        });
        tl.fromTo(performance.current,{
          opacity: 1,
        },{
          opacity: 0,
        })
        .fromTo(security.current,{
          opacity: 0,
        },{
          opacity: 1,
        })
        .to(security.current,{
          opacity: 0,
        })
        .fromTo(scale.current,{
          opacity: 0, 
        }, {
          opacity: 1
        })
        .to(scale.current,{
          opacity: 0, 
        })
        .fromTo(dynamic.current,{
          opacity: 0, 
        }, {
          opacity: 1
        })
        .to(dynamic.current,{
          opacity: 0, 
        })
        .fromTo(multiplatform.current,{
          opacity: 0, 
        }, {
          opacity: 1,
        });
      },
      "(min-width: 1101px)": () => {
        const tl = gsap.timeline();
        tl.to(performance.current,{
          opacity: 1,
        })
        .to(security.current,{
          opacity: 1,
        })
        .to(scale.current,{
          opacity: 1,
        })
        .to(dynamic.current,{
          opacity: 1,
        })
        .to(multiplatform.current,{
          opacity: 1,
        });
      }
    });
  },[]);
  
  return (
    <>
      <div ref={triggerDiv} className="benefit" style={{ position: "relative"}}>
        <div ref={performance} className="row-benefit" >
          <div style={{width: screenWidth > 768 ? "50%" : "100%"}}>
            <h3 className="feat-head-desc">Performance</h3>
            <h1 className="feat-head add-left-margin">Ultimate performance </h1>
            <p className="feat-desc add-left-margin"> 
            Apache APISIX uses radixtree-route-matching and etcd under the hood to provide you the ability to create high speed synchronized systems. From routing to built-in plugins, all these are designed and implemented to be uber performant with the minimum latency possible.                        
            </p>
          </div>
          <div className="benefit-infograph">
            <Performance style={{width: screenWidth >=768 ? "35%" : "40%"}}/>
          </div>
        </div>

        <div ref={security} className="row-benefit row-reverse row-hidden" >
          <div className="benefit-infograph">
            <Security style={{width: screenWidth >=768 ? "75%" : "100%", position: "relative", left: screenWidth >=768 ? "3%" : "0"}}/>
          </div>
          <div style={{width: screenWidth > 768 ? "50%" : "100%"}}>
            <h3 className="feat-head-desc">Security</h3>
            <h1 className="feat-head add-left-margin">Shield against the malicious</h1>
            <p className="feat-desc add-left-margin"> 
            Apache APISIX provides multiple security plugins for identity authentication and interface verification, putting stability and security first. For more information, check <Link style={{color: "#e8433e"}} to={useBaseUrl("docs/apisix/plugins/cors/")}>here</Link>.
            </p>
          </div>
        </div>

        <div ref={scale} className="row-benefit row-hidden" >
          <div style={{width: screenWidth > 768 ? "50%" : "100%"}}>
            <h3 className="feat-head-desc">Scalability and availability</h3>
            <h1 className="feat-head add-left-margin">Scales with your users</h1>
            <p className="feat-desc add-left-margin"> 
              Apache APISIX provides the ability to write your own custom plugins, use custom Load Balancing Algorithms during the balancer phase for scaling and custom Routing algorithms for fine control on routing.
            </p>
          </div>
          <div className="benefit-infograph">
            <Scale style={{width: screenWidth >=768 ? "50%": "60%"}}/>
          </div>
        </div>

        <div ref={dynamic} className="row-benefit row-reverse row-hidden" >
          <div className="benefit-infograph">
            <Dynamic style={{width: screenWidth >=768 ? "50%" : "70%"}}/>
          </div>
          <div style={{width: screenWidth > 768 ? "50%" : "100%"}}>
            <h3 className="feat-head-desc">Fully dynamic</h3>
            <h1 className="feat-head add-left-margin">Save dev-time, design what matters </h1>
            <p className="feat-desc add-left-margin"> 
              Apache APISIX provides Hot updates and Hot plugins, which continuosly update configurations without restarts, saving development time and stress. Health checks, circuit breakers and many more features keep the system balanced at all times.
            </p>
          </div>
        </div>

        <div ref={multiplatform} className="row-benefit row-hidden" >
          <div style={{width: screenWidth > 768 ? "50%" : "100%"}}>
            <h3 className="feat-head-desc">Multi-platform and protocol</h3>
            <h1 className="feat-head add-left-margin">Create once, run anywhere</h1>
            <p className="feat-desc add-left-margin"> 
              Platform agnostic, no vendor lock-in, Apache APISIX can run from bare-metal to kubernetes. It supports HTTP to gRPC transcoding, websockets, gRPC, Dubbo, MQTT proxy and multiple platforms including ARM64, don’t worry about the lock-in of the infra technology.
            </p>
          </div>
          <div className="benefit-infograph">
            <Multiplatform style={{width: screenWidth >=768 ? "50%" : "80%"}}/>
          </div>
        </div>
      </div>
    </>
  );
}
  
export default Benefits;

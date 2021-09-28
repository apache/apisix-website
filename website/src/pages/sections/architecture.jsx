import React, { useEffect } from "react";
import gsap from "gsap";

import "../../css/customTheme.css";
import HLDesign from "../../assets/images/infographs/Architecture.svg";
import Pattern from "../../assets/images/PatternGrouped.svg";

const Architecture = (props) => {
  const screenWidth = props.screenWidth;

  useEffect(() => {
    let strokePaths = []
    for (let i=1; i<28; i++) {
      strokePaths.push(".PatternGrouped_svg__p"+i);
    } 

    let tlStroke = gsap.timeline({
      paused: true,
      defaults: {
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      },
    });

    tlStroke.fromTo(strokePaths, {
      strokeDashoffset: 10000
    }, {
      strokeDashoffset: 0,
      duration: 5,
      stagger: 0.3,
      ease: "power2.inOut",
      stroke: "red",
    });

    let observer = new IntersectionObserver(onIntersection, {
      root: null,
      threshold: 0.4,
    })
      
    function onIntersection(entries, opts){
      entries.forEach(entry =>  {
        if (entry.isIntersecting) {
          tlStroke.paused(false);
        } else {
          tlStroke.paused(true);
        }
      }
      );
    }
      
    observer.observe( document.querySelector('.arch'));
    
    return () => {
      tlStroke.pause(0).kill(true);
      observer.disconnect();
    }
  }, []);

  return (
    <>
      <div className="arch">
        <div style={{position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", height: "120vh"}}>
          <Pattern className="arch-scale-svg" style={{width: "100vw", strokeWidth: "3", zIndex: "-10", opacity: "0.25", strokeDasharray: "10000"}}/>
        </div>
        <div>
          <h3 className="arch-head">Building for large-scale, high value systems</h3>
        </div>
        <div className="arch-subtitle">
          <p>Apache APISIX lets you build Cloud-Native Microservices API gateways, delivering the ultimate performance, security, open source and scalable platform for all your APIs and microservices.</p> 
        </div>
        <div className="arch-card" style={{position: "relative"}}>
          <div className="hldesign">
            <HLDesign className="hldesign-graphic"/>
          </div>
          <div className="arch-card-caption">
            <p style={{width: screenWidth >=768 ? "50%" : "90%"}}>Apache APISIX is based on Nginx and etcd. Compared with traditional API gateways, APISIX has dynamic routing and hot-loading plugins</p>
          </div>
          <div className="arch-card-border">
          </div>
        </div>
      </div>
    </>
  );
}
  
export default Architecture;

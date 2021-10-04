import React, { useRef, useEffect } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import gsap from "gsap"

import "../../css/customTheme.css";
import HeroCanvas from "./components/heroCanvas"
import ArrowAnim from "./components/arrowAnim";

const HeroSection = (props) => {
  const titleRef = useRef(0)
  const subtitleRef = useRef(0)
  const ctaRef = useRef(0)
  const canRef = useRef(0)
  
  useEffect(() => {
    let tl = gsap.timeline({
      defaults: {
        delay: window.innerWidth >= 768 ? 1.5 : 0.01,
        duration: 0.5,
        ease: "Expo.easeInOut" 
      },
    });
    
    tl.fromTo([titleRef.current, subtitleRef.current, ctaRef.current],{
      opacity: 0,
      y: 10
    },{
      opacity: 1,
      y: 0,
      stagger: 0.3
    });

    return () => {
      tl.pause(0).kill(true);
    }
  }, [])

  return (
    <>
      <div className="hero-sec-wrap" style={{width: "100%"}}>
        <div className="hero-text">
          <h2 ref={titleRef} className="hero-title hide-title"><span>Effortless and smooth</span> <span style={{color: "#E8433E"}}>API Traffic</span> management.</h2>
          <h3 ref={subtitleRef} className="hero-subtitle hide-subtitle">Apache APISIX provides rich traffic management features like Load Balancing, Dynamic Upstream, Canary Release, Circuit Breaking, Authentication, Observability, and more...</h3>
          <div ref={ctaRef} className="hero-ctas hide-ctas">
            <Link
              to={useBaseUrl("downloads")}
              className="btn btn-download">
              Downloads
            </Link>
            <ArrowAnim />
          </div>
        </div>
        <div ref={canRef} className="add-margin">
          <HeroCanvas></HeroCanvas>
        </div>
      </div>
    </>
  );
}
  
export default HeroSection;
  
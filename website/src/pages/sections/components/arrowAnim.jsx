import React, { useRef } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import gsap from "gsap"

import "../../../css/customTheme.css";

const ArrowAnim = () => {
  const endpathRef1 = useRef(null);
  const endpathRef2 = useRef(null);
  
  function mouseOver() {
    gsap.to([endpathRef2.current],{
      strokeDashoffset: 970,
      duration: 0.4
    });
    gsap.to([endpathRef1.current],{
      stroke: "#9b9b9b",
      duration: 0.4
    });
    gsap.to([endpathRef2.current],{
      stroke: "#9b9b9b",
      duration: 0.4
    });
  }

  function mouseOut() {
    gsap.to([endpathRef2.current],{
      strokeDashoffset: 1002,
      duration: 0.4
    });
    gsap.to([endpathRef1.current],{
      stroke: "black",
      duration: 0.4
    });
    gsap.to([endpathRef2.current],{
      stroke: "black",
      duration: 0.4
    });
  }

  return (
    <>
      <Link
        to={useBaseUrl("docs")} onMouseOver={mouseOver} onMouseLeave={mouseOut} className="btn-docs">
        Go to docs...
        <svg width="15" strokeWidth="3" height="25" viewBox="0 0 43 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path ref={endpathRef1} d="M27.5 1L42.5 16L27.5 31" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
          <path ref={endpathRef2} className="arrow-btn" d="M42.5 16H0.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link> 
    </>
  );
}
  
export default ArrowAnim;

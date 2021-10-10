import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

import OssCanvas from "./components/ossCanvas"

import "../../css/customTheme.css";
import GitHub from "../../assets/icons/github-logo.svg";

// TODO: Load Video from YouTube
import YtPromo from "../../assets/videos/apisix.mp4";

const OpensourcePromo = (props) => {
  return (
    <>
      <div className="ossPromotion">
        <div className="docs-promo">
          <div className="docs-promo-text">
            <h3 className="docs-promo-head">Learn from developers</h3>
            <div className="docs-promo-subtitle">
              <p>Want to learn Apache APISIX usage, but don’t know where to start. Check out our <Link style={{color: "#e8433e"}} to={useBaseUrl("docs")}>docs.</Link></p> 
              <p>Like visual information, check out our <a style={{color: "#e8433e"}} href="https://www.youtube.com/channel/UCgPD18cMhOg5rmPVnQhAC8g">Youtube channel</a> for detailed tutorials. Subscribe for more.</p> 
            </div>
          </div>
          <div className="docs-promo-video">
            <video preload="none" src={YtPromo} loading="lazy" autoPlay={true} poster="" muted={true} loop={true} width="70%" height="auto" controls></video>
          </div>
        </div>
      
        <div className="oss-promo">
          <div className="oss-promo-text">
            <h3 className="oss-promo-head">Be a part of building APISIX</h3>
            <div className="oss-promo-subtitle" style={{color: "rgb(199, 199, 199)"}}>
              <p>Apache APISIX is opensource and ever-growing. Contributors are always welcome. Reach out to us on GitHub</p>
              <div className="oss-promo-cta">
                <GitHub style={{width: "20px", margin: "0 10px 0 0"}} />
                <a href="https://github.com/apache/apisix" style={{textDecoration: "none"}}>Check us out</a>
              </div>
            </div>
          </div>
          <div className="oss-promo-infograph">
            <OssCanvas/>
          </div>                    
        </div>
      </div>
    </>
  );
}
  
export default OpensourcePromo;

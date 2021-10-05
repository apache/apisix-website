import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

import "../../css/customTheme.css";
import ArrowAnim from "./components/arrowAnim";
import Rocket from "../../assets/images/rocket.gif";

const EndCTA = () => {
  return (
    <>
      <div className="endcta" style={{padding: "50px 0", background: "#FF90A3", margin: "0 0 -32px 0"}}>
        <div className="endcta-text">
          <p style={{display: "flex", justifyContent: "center", alignItems: "center", whiteSpace: "pre"}}>Try <span style={{color: "#E8433E"}}>APISIX</span> today <img className="rocket" src={Rocket} alt="Rocket"/></p>
        </div>
        <div className="endcta-btns">
          <div className="hero-ctas">
            <Link
              to={useBaseUrl("downloads")}
              className="btn btn-download">
              Downloads
            </Link>
            <ArrowAnim />
          </div>
        </div>
      </div>
    </>
  );
}
  
export default EndCTA;

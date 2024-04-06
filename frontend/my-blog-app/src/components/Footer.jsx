import React from "react";
import Logo from "../img/logo.png";

const Footer = () => {
    return (
        <div className="Footer">
            <div className="Top" onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}>
                <img src={Logo} alt="Logo" className="img"></img>
                <b>Back to the top</b>
                </div>
           <span>A demo project made with <b>React.js</b></span>
        </div>
    )
}



export default Footer;
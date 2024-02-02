import "./AboutPage.scss";
import { gridData } from "../gridData.js";
import React, { useState } from "react";
import About_Avatar from "../Assets/Images/About_Avatar.jpg";

const AboutPage = () => {
  const [numImages, setNumImages] = useState(-1);
  if (numImages < 0) {
    let totalNumImages = 0;
    for (let category in gridData) {
      let catData = require("../Carousel/Data/" + category + ".js");
      totalNumImages += catData.carouselData.length;
    }
    setNumImages(totalNumImages);
  }

  document.title = "About - SFM Reference";
  return (
    <div className="about-page">
      <div className="about-page-container">
        <div className="about-page-header">SFM Reference</div>
        <br />
        ...is an artwork gallery for posters created using {" "}
        <a
          href="https://store.steampowered.com/app/1840/Source_Filmmaker/"
          target="_blank"
          rel="noopenner noreferrer"
        >
          Source Filmmaker
        </a>
        , Valve's 3D animation tool. It's organized around popular categories and types of art made by the community. As a whole, the project aims to serve as a point of reference or inspiration for SFM artists.
        <br />
        <br />
        Currently, this website has <u>{numImages}</u> unique images.
        <br />
        <p className="about-page-tips"><em>Tip: On desktop, you can navigate the image slideshows with <b>Left Arrow</b> for previous,
        and <b>Right Arrow</b> or <b>Enter</b> for next. Press <b>F</b> to toggle the filters menu.
        <br/>
        On mobile, you can swipe left or right.</em></p>
        Feedback and contributions are always welcome! Please either <a href="mailto:2rayxu@gmail.com">email</a>
        me, DM anyar on Discord, or make a PR/issue on the{" "}
        <a
          href="https://github.com/TwentyPorts/SFM-Reference"
          target="_blank"
          rel="noopenner noreferrer"
        >
          GitHub repo
        </a>
        .
        <p className="about-page-disclaimer">*Note: All images are publicly available, community-created artwork and
        attributed to their original authors wherever possible (which means that
        I do not claim ownership over any of the art being shown).
        <br/>
        All hosted images have, when necessary, been compressed to high-quality
        JPGs to reduce file size.</p>
      </div>
      <img
        src={About_Avatar}
        className="about-page-avatar"
        alt="anyar avatar"
      ></img>
    </div>
  );
};

export default AboutPage;

import "./AboutPage.css";

const AboutPage = () => {
  document.title = "About - SFM Reference";
  return (
    <div className="about-page">
      <div className="about-page-container">
        <div className="about-page-header">About</div>
        <br />
        SFM Reference is a personal project of mine. It acts as a categorized repository of images for Source Filmmaker
        content, meant to serve as a point of reference or inspiration for SFM
        artists. (In other words, it's a bunch of cool art to look at when you're bored or stuck, with categories you can filter for.)
        <br />
        <br />
        All images are publicly available, community-created artwork and
        attributed to their original authors wherever possible (which means that
        I do not claim ownership over any of the images used in this app).
        I took the images from platforms such as Reddit, the SFM Discord (mainly
        #starboard), Steam Community, etc., based off my semi-arbitrary standards of quality and other factors.
        <br />
        <br />
        Images may be compressed to JPGs to reduce file size. I've heard mixed things about how much this will impact image quality due to compression, including "the difference between a high quality jpg and a png is negligible". Regardless, this is necessary to save on storage space.
        <br />
        <br />
        If you have any feedback or suggestions, please email <a href="mailto:oracleofcake@gmail.com">oracleofcake@gmail.com</a>, DM Anyar#0380 on Discord, or make a PR/issue on the GitHub repo linked below. If you're adding new images, please make sure that all images are compressed and properly categorized (i.e. no image should be larger than 20 MB), and are at least decent quality art.
        <br />
        <br />
        This repo is hosted on <a href="https://github.com/TwentyPorts/SFM-Reference">GitHub</a>.
      </div>
    </div>
  );
};

export default AboutPage;

import "./AboutPage.css";

const AboutPage = () => {
  document.title = "About - SFM Reference";
  return (
    <div className="about-page">
      <div className="about-page-container">
        <div className="about-page-header">About</div>
        <br />
        SFM Reference is a categorized repository of images for Source Filmmaker
        content, meant to serve as a point of reference or inspiration for SFM
        artists.
        <br />
        <br />
        All images are publicly available, community-created artwork and
        attributed to their original authors wherever possible (which means that
        I do not claim ownership over any of the images used in this app).
        Images are taken from platforms such as Reddit, the SFM Discord (mainly
        #starboard), Steam Community, etc.
        <br />
        <br />
        Images may be compressed to JPGs to reduce file size. This shouldn't
        result in a noticeable quality loss, but there is a chance it might.
        <br />
        <br />
        If you have any feedback or suggestions for new categories/images, please email <a href="mailto:oracleofcake@gmail.com">oracleofcake@gmail.com</a> or DM Anyar#0380 on Discord, or make a PR to the GitHub repo. Please make sure that all images are compressed and properly categorized (i.e. no image should be larger than 20 MB).
        <br />
        <br />
        This repo is hosted on <a href="https://github.com/TwentyPorts/SFM-Reference">GitHub</a>.
      </div>
    </div>
  );
};

export default AboutPage;

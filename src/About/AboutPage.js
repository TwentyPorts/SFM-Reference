import "./AboutPage.css";

const AboutPage = () => {
  document.title = "About - SFM Reference";
  return (
    <div className="about-page">
      <div className="about-page-container">
        <div className="about-page-header">About</div>
        <br />
        SFM Reference is a categorized repository of artwork made using Source Filmmaker, meant to serve as a point of reference or inspiration for SFM
        artists. More informally, it's a personal project for me to learn about React while also creating something hopefully interesting.
        <br />
        <br />
        All images are publicly available, community-created artwork and
        attributed to their original authors wherever possible (which means that
        I do not claim ownership over any of the images used in this non-commercial app).
        I took the images from platforms such as Reddit, the SFM Discord (mainly
        #starboard), Steam Community, etc.
        <br />
        <br />
        All hosted images have been compressed to (high-quality) JPGs to reduce file size, if they were not already JPGs.
        <br />
        <br />
        Feedback and contributions are always welcome! Please either email <a href="mailto:oracleofcake@gmail.com">oracleofcake@gmail.com</a>, DM Anyar#0380 on Discord, or make a PR/issue on the GitHub repo linked below. If you're adding new images, please make sure that all images are compressed (i.e. no image should be larger than 15 MB), properly attributed and categorized.
        <br />
        <br />
        This repo is hosted on <a href="https://github.com/TwentyPorts/SFM-Reference">GitHub</a>.
      </div>
    </div>
  );
};

export default AboutPage;

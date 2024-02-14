import { Routes, Route, Navigate } from "react-router-dom";
import GridView from "./GridView/GridView";
import CarouselWrapper from "./Carousel/CarouselWrapper";
import AboutPage from "./About/AboutPage.tsx";
import SubmitPage from "./Submit/SubmitPage";
import DefaultNavbar from "./Navbar/DefaultNavbar.tsx";

const App = () => {
  //console.log("App rendered");
  return (
    <>
      <DefaultNavbar></DefaultNavbar>
      <Routes>
        <Route path="/" element={<GridView />} />
        <Route path="/Home" element={<GridView />} />
        <Route path="/Category/:category" element={<CarouselWrapper />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Submit" element={<SubmitPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;

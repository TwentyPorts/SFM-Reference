import { Routes, Route } from 'react-router-dom';
import GridView from './GridView/GridView';
import CarouselWrapper from './Carousel/CarouselWrapper';
import AboutPage from './About/AboutPage';
import DefaultNavbar from './Navbar/DefaultNavbar.tsx';

const App = () => {
 return (
    <>
       <DefaultNavbar></DefaultNavbar>
       <Routes>
          <Route path="/" element={<GridView />} />
          <Route path="/:id" element={<CarouselWrapper />} />
          <Route path="/About" element={<AboutPage />} />
       </Routes>
    </>
 );
};

export default App;
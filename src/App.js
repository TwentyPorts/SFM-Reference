import { Routes, Route } from 'react-router-dom';
import GridView from './GridView/GridView';
import CarouselWrapper from './Carousel/CarouselWrapper';

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<GridView />} />
          <Route path="/:id" element={<CarouselWrapper />} />
       </Routes>
    </>
 );
};

export default App;
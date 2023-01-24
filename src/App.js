import { Routes, Route } from 'react-router-dom';
import GridView from './GridView';
import Carousel from './Carousel/Carousel';

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<GridView />} />
          <Route path="/:id" element={<Carousel />} />
       </Routes>
    </>
 );
};

export default App;
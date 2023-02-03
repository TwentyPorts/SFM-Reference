import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import Pagination from "@mui/material/Pagination";

import "./Carousel.css";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    // Subscribe once
    window.addEventListener("keydown", keyPress);
    // Unsubscribe on unmount
    return () => {
      window.removeEventListener("keydown", keyPress);
    };
  });

  // Update index of image to display
  const updateIndex = (e, p) => {
    p = p-1;
    if (p < 0) {
      p = React.Children.count(children) - 1;
    } else if (p >= React.Children.count(children)) {
      p = 0;
    }

    setActiveIndex(p);
  };

  // Mobile swiping support
  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(null, activeIndex + 2),
    onSwipedRight: () => updateIndex(null, activeIndex),
  });

  // Handle keypress updates
  function keyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      updateIndex(null, activeIndex + 2);
    }
    if (e.key === "ArrowRight") {
      updateIndex(null, activeIndex + 2);
    }
    if (e.key === "ArrowLeft") {
      updateIndex(null, activeIndex);
    }
  }

  return (
    <div {...handlers} className="carousel">
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="indicators">
        <Pagination count={React.Children.count(children)} showFirstButton showLastButton onChange={updateIndex}/>
      </div>
    </div>
  );
};

export default Carousel;

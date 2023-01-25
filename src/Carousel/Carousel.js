import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

import "./Carousel.css";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};
let listenerAttached = false;

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  if(!listenerAttached) {
    window.addEventListener("keydown", keyPress);
    listenerAttached = true;
  }

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      //console.log(React.Children.count(children));
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });
  
  function keyPress(e) {
    console.log(e.key);
    //console.log(activeIndex);
    if (e.key === "Enter") {
      e.preventDefault();
      updateIndex(activeIndex + 1);
    }
    if (e.key === "ArrowRight") {
      updateIndex(activeIndex + 1);
    }
    if (e.key === "ArrowLeft") {
      updateIndex(activeIndex - 1);
    }
    //console.log(activeIndex);
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
        <button
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          Prev
        </button>
        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={`${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                updateIndex(index);
              }}
            >
              {index + 1}
            </button>
          );
        })}
        <button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;

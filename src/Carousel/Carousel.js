import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";

import "./Carousel.css";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

const Tag = ({ tagName }) => {
  return <div class="tag-button" role="button">{tagName}</div>;
};

const Carousel = ({ children, tags }) => {
  // console.log("carousel rendered");
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.has("page")
    ? parseInt(searchParams.get("page")) - 1
    : 0; // default to 0 if no search parameter present
  const [activeIndex, setActiveIndex] = useState(pageParam);
  const childrenCount = React.Children.count(children);
  useEffect(() => {
    // console.log("effect used");

    // Subscribe once
    document.addEventListener("keydown", keyPress);
    // Unsubscribe on unmount
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [activeIndex, childrenCount]);

  // Update index of image to display
  const updateIndex = (e, p) => {
    p = p - 1;
    if (p < 0) {
      // wraparound to last element
      p = React.Children.count(children) - 1;
    } else if (p >= React.Children.count(children)) {
      // wraparound to first element
      p = 0;
    }

    setActiveIndex(p);

    setSearchParams({ page: p + 1 });
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
      <div className="filters">
        {tags.current
          ? new Array(...tags.current).map((tagName) => {
              return <Tag tagName={tagName}></Tag>;
            })
          : null}
      </div>
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="indicators">
        <Pagination
          count={React.Children.count(children)}
          showFirstButton
          showLastButton
          page={activeIndex + 1}
          onChange={updateIndex}
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default Carousel;

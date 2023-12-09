import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./Carousel.scss";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

const Carousel = ({ children, tags }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.has("page")
    ? parseInt(searchParams.get("page")) - 1
    : 0; // default to 0 if no search parameter present
  const [activeIndex, setActiveIndex] = useState(pageParam);
  const [filters, setFilters] = useState([]);
  const [carouselItems, setCarouselItems] = useState();
  const childrenCount = React.Children.count(children);
  const [filtersContainerVisible, toggleFiltersContainerVisible] =
    useState(false);
  const [mobile, setMobile] = useState(window.innerWidth <= 500);
  let carouselItemsLength = carouselItems ? carouselItems.length : 0;
  useEffect(() => {
    // console.log("effect used");
    applyFilters();

    // Subscribe once
    document.addEventListener("keydown", keyPress);
    // Unsubscribe on unmount
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [activeIndex, childrenCount, carouselItemsLength]);

  // Update index of image to display
  const updateIndex = (e, p) => {
    p = p - 1;
    if (p < 0) {
      // wraparound to last element
      p = carouselItemsLength - 1;
    } else if (p >= carouselItemsLength) {
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

  // Add or remove a filter to the "filters" state, then update the CSS class for the corresponding button
  function updateFilters(tagName) {
    let filtersArray = filters;
    let inactiveClassName = "tag-button-" + tagName.replace(/\s+/g, "");
    let buttonElem = document.getElementsByClassName(inactiveClassName);
    if (buttonElem.length !== 1) {
      console.log("Didn't find exactly 1 button; something went wrong?");
    }
    buttonElem = buttonElem[0];

    if (filtersArray.includes(tagName)) {
      filtersArray.splice(filtersArray.indexOf(tagName), 1);
      buttonElem.classList.remove("tag-button-active");
    } else {
      filtersArray.push(tagName);
      buttonElem.classList.add("tag-button-active");
    }
    setFilters(filtersArray);

    applyFilters(); // re-render
  }

  // Update the "carouselItems" state with any new filters applied; this triggers a re-render
  function applyFilters() {
    let images = [];
    React.Children.map(children, (child, index) => {
      let childTags = "";
      if(child.props.children[2].props.children) {
        childTags = child.props.children[2].props.children.substring(8).split(", ");
      }
      if (
        filters.length === 0 ||
        filters.some((tag) => childTags.includes(tag))
      ) {
        images.push(React.cloneElement(child, { width: "100%" }));
      }
    });
    setCarouselItems(images);
    if(images.length !== 0 && activeIndex > images.length - 1) {
      updateIndex(null, images.length);
    }
  }

  function toggleFiltersContainer() {
    toggleFiltersContainerVisible(!filtersContainerVisible);
  }

  return (
    <div {...handlers} className="carousel">
      {filtersContainerVisible ? (
        <div className="filters">
          <div className="tags-container">
            <span className="filters-title">- Filter by Tags -</span>
            {tags.current
              ? new Array(...tags.current).map((tagName, index) => {
                  let tagNameWithoutSpaces = tagName.replace(/\s+/g, "");
                  return (
                    <div
                      className={
                        "tag-button tag-button-" + tagNameWithoutSpaces
                      }
                      role="button"
                      onClick={() => updateFilters(tagName)}
                      key={index}
                    >
                      {tagName}
                    </div>
                  );
                })
              : null}
          </div>
          <div className="filters-toggle-container">
            <button
              className="filters-toggle-button"
              onClick={toggleFiltersContainer}
            >
              <KeyboardArrowUpIcon />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="filters"
          style={
            tags.current && tags.current.size === 0 ? { display: "none" } : null
          }
        >
          <div className="filters-toggle-container">
            <button
              className="filters-toggle-button"
              onClick={toggleFiltersContainer}
            >
              <KeyboardArrowDownIcon />
            </button>
          </div>
        </div>
      )}
      <div className="indicators-mobile">
        <Pagination
          count={carouselItems ? carouselItemsLength : 0}
          showFirstButton
          showLastButton
          page={activeIndex + 1}
          onChange={updateIndex}
          variant="outlined"
        />
      </div>
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {carouselItems}
      </div>
      <div className="indicators">
        <Pagination
          count={carouselItems ? carouselItemsLength : 0}
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

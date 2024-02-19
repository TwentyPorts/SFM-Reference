import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import "./Carousel.scss";

export const CarouselItem = ({ children, width = '100%' }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

type Props = {
  children: React.ReactNode;
  tags: Set<string> | null;
};

const Carousel = ({ children, tags }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.has("page")
    ? parseInt(searchParams.get("page")!) - 1
    : 0; // default to 0 if no search parameter present
  const [activeIndex, setActiveIndex] = useState(pageParam);
  const [filters, setFilters] = useState([] as string[]);
  const [carouselItems, setCarouselItems] = useState([] as React.ReactElement[]);
  const childrenCount = React.Children.count(children);
  const [filtersContainerVisible, toggleFiltersContainerVisible] =
    useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(localStorage.getItem("keynav-tips-shown") !== "true");
  let carouselItemsLength = carouselItems.length;
  useEffect(() => {
    // console.log("effect used");
    applyFilters();

    // Subscribe once
    document.addEventListener("keydown", keyPress);
    // Unsubscribe on unmount
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [activeIndex, childrenCount, carouselItemsLength, filtersContainerVisible]);

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
  function keyPress(e: KeyboardEvent) {
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
    if (e.key === "f") {
      toggleFiltersContainer();
    }
  }

  // Add or remove a filter to the "filters" state, then update the CSS class for the corresponding button
  function updateFilters(tagName: string) {
    let filtersArray = filters;
    let inactiveClassName = "tag-button-" + tagName.replace(/\s+/g, "");
    let buttonElem = document.getElementsByClassName(inactiveClassName);
    if (buttonElem.length !== 1) {
      console.log("Didn't find exactly 1 button; something went wrong?");
    }
    let firstButtonElem = buttonElem[0];

    if (filtersArray.includes(tagName)) {
      filtersArray.splice(filtersArray.indexOf(tagName), 1);
      firstButtonElem.classList.remove("tag-button-active");
    } else {
      filtersArray.push(tagName);
      firstButtonElem.classList.add("tag-button-active");
    }
    setFilters(filtersArray);

    applyFilters(); // re-render
  }

  // Update the "carouselItems" state with any new filters applied; this triggers a re-render
  function applyFilters() {
    let images = [] as React.ReactElement[];
    React.Children.map(children, (child: React.ReactElement, index) => {
      let childTags = "";
      if (child.props.children[2].props.children) {
        childTags = child.props.children[2].props.children
          .substring(8)
          .split(", ");
      }
      if (
        filters.length === 0 ||
        filters.some((tag) => childTags.includes(tag))
      ) {
        images.push(React.cloneElement(child, { width: "100%" }));
      }
    });
    setCarouselItems(images);
    if (images.length !== 0 && activeIndex > images.length - 1) {
      updateIndex(null, images.length);
    }
  }

  function toggleFiltersContainer() {
    toggleFiltersContainerVisible(!filtersContainerVisible);
  }

  function handleClose() {
    setDialogOpen(false);
    localStorage.setItem("keynav-tips-shown", "true"); // only show tips once
  }

  return (
    <div {...handlers} className="carousel">
      <Dialog onClose={handleClose} open={dialogOpen} PaperProps={{
        style: {
          border: '2px solid #aaa',
          backgroundColor: '#121212',
          borderRadius: 5,
          textAlign: 'center',
        },
      }}>
        <DialogTitle sx={{
          color: "#eee",
          p: "16px 16px 0 16px",
        }}>Navigation Tip</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{
            color: "#eee",
            p: "0 16px 8px 16px",
          }}>
            <hr />
            On desktop, you can navigate the image slideshows with <b>Left Arrow</b> for previous,
            and <b>Right Arrow</b> or <b>Enter</b> for next. Press <b>F</b> to toggle the filters menu.
            <br />
            On mobile, you can swipe left or right.
          </DialogContentText>
          <DialogContentText sx={{
            color: "#888",
            p: "0 16px 0 16px",
          }}>
            (click outside to close)
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {tags && tags.size > 0 ? (
        <div className="filters">
          <div
            className="tags-container"
            style={{ display: filtersContainerVisible ? "flex" : "none" }}
          >
            <span className="filters-title">- Filter by Tags -</span>
            {tags
              ? new Array(...tags).map((tagName, index) => {
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
              {filtersContainerVisible ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </button>
          </div>
        </div>
      ) : (
        null
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

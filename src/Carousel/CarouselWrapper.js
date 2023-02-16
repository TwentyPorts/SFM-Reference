import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel, { CarouselItem } from "./Carousel";

import "./Carousel.css";

const CarouselWrapper = () => {
  const [data, setData] = useState();
  const [listItems, setListItems] = useState();
  const { category } = useParams();
  document.title = category + " - SFM Reference";
  let dataFetched = false;

  async function getData() {
    setData(await import("./Data/" + category));

    if (data) {
      dataFetched = true; // carousel data only needs to be fetched once
      var carouselData = data.carouselData;
      const uniqueTags = new Set();
      carouselData.forEach((obj) => {
        if (Object.hasOwn(obj, "type")) uniqueTags.add(obj.type);
      });
      setListItems(
        carouselData.map((element, index) => {
          return (
            <CarouselItem key={index}>
              <div className="carousel-item-image-wrapper">
                <img
                  className="carousel-item-image"
                  alt=""
                  src={require("../Assets/Images/" +
                    category +
                    "/" +
                    index +
                    ".jpg")}
                ></img>
              </div>
              <div className="carousel-item-author">
                Author: {element.author}{" "}
                {element.link ? <a href={element.link}>(link)</a> : null}
              </div>
              <div className="carousel-item-tags">Tag(s): {element.type ? element.type.join(", ") : "none"}</div>
            </CarouselItem>
          );
        })
      );
    }
  }

  useEffect(() => {
    // console.log("CarouselWrapper effect used");
    if (!dataFetched) getData();
  }, [data]); // don't add the so-called "missing dependencies" according to the compiler - the app will refresh infinitely and freeze
  return <Carousel>{listItems}</Carousel>;
};

export default CarouselWrapper;

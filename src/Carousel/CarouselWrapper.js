import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { gridData } from "../gridData";
import Carousel, { CarouselItem } from "./Carousel";

import "./Carousel.css";

const CarouselWrapper = () => {
  const [data, setData] = useState();
  const [listItems, setListItems] = useState();
  const { id } = useParams();
  const category = gridData[id].tag;
  document.title = category + " - SFM Reference";
  let dataFetched = false;

  async function getData() {
    setData(await import("./Data/" + category));
    
    if (data) {
      dataFetched = true; // carousel data only needs to be fetched once
      setListItems(
        data.carouselData.map((element, index) => {
          return (
            <CarouselItem key={index}>
              <div className="carousel-item-image-wrapper">
                <img
                  className="carousel-item-image"
                  alt=""
                  src={require("../Assets/Images/" + category + "/" + index + ".jpg")}
                ></img>
              </div>
              <div className="carousel-item-author">
                Author: {element.author}{" "}
                {element.link ? <a href={element.link}>(link)</a> : null}
              </div>
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

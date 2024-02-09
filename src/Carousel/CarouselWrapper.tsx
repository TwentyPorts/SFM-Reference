import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Carousel, { CarouselItem } from "./Carousel";

import "./Carousel.scss";

const CarouselWrapper = () => {
  const [data, setData] = useState(Object);
  const [listItems, setListItems] = useState();
  const { category } = useParams();
  document.title = category + " - SFM Reference";
  let dataFetched = false;
  let uniqueTags = useRef<Set<string> | null>(null);

  async function getData() {
    setData(await import("./Data/" + category));

    if (Object.hasOwn(data, "carouselData")) {
      dataFetched = true; // carousel data only needs to be fetched once
      let carouselData = data.carouselData;
      uniqueTags.current = new Set<string>();
      carouselData.forEach((obj) => {
        if (Object.hasOwn(obj, "type")) {
          obj.type.forEach((type) => uniqueTags.current!.add(type));
        }
      });
      setListItems(
        carouselData.map((element, index) => {
          return (
            <CarouselItem key={index}>
              <div className="carousel-item-image-wrapper">
                <img
                  className="carousel-item-image"
                  alt={"artwork " + index}
                  src={require(`../Assets/Images/${category}/${index}.jpg`)}
                ></img>
              </div>
              <div className="carousel-item-author">
                Author: {element.author}{" "}
                {element.link ? <a href={element.link}>(link)</a> : null}
              </div>
              <div className="carousel-item-tags">
                {element.type ? "Tag(s): " + element.type.join(", ") : null}
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
  return <Carousel tags={uniqueTags.current}>{listItems}</Carousel>;
};

export default CarouselWrapper;

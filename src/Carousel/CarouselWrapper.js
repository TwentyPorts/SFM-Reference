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

  async function getData() {
    setData(await import("./Data/" + category));

    if (data)
      setListItems(
        data.carouselData.map((element, index) => {
          return (
            <CarouselItem key={index}>
              <img alt="" src={element.image}></img>
              <div>{element.author}</div>
            </CarouselItem>
          );
        })
      );
  }

  useEffect(() => {
    getData();
  });
  return <Carousel>{listItems}</Carousel>;
};

export default CarouselWrapper;

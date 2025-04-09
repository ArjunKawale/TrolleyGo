import banner1 from "../Images/banner1.jpg";
import Resized from "../Images/Resized.png"

import img2 from "../Images/groc.jpg";
import img4 from "../Images/groc2.jpg";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { useState } from "react";
import React from "react";
import "../Styles/ImageBar.css";

export const ImageBar = () => {
  const [index, setIndex] = useState(0);
  const slides = [ Resized,banner1, img4, img2];
  const currentImage = slides[index];
  const gotoprevious = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };
  const gotonext = () => {
    setIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="image-bar">
        <div className="sliderstyles">
          <div className="nextbutton" onClick={gotonext}>
            <GrNext color="white" />
          </div>
          <div className="previousbutton" onClick={gotoprevious}>
            <GrPrevious color="white" />
          </div>
          <div
            className="slidestyles"
            style={{ backgroundImage: `url(${currentImage})` }}
          ></div>
        </div>
      </div>
    </>
  );
};

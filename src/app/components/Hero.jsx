import React from "react";
import image1 from "../../../public/img/hero/1.webp";
import image2 from "../../../public/img/hero/2.webp";
import image3 from "../../../public/img/hero/3.webp";
import Carousel from "./ui/Carousel";

const Hero = () => {
  return (
    <div className="relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <h1 className="text-6xl">Bienvenidos al hotel qliao</h1>
        <p className="text-4xl">donde el confort no se acaba nunca</p>
      </div>
      <Carousel images={[image1, image2, image3]} />
    </div>
  );
};

export default Hero;

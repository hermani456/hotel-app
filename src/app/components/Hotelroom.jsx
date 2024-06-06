import React from 'react';
import { CardHotel } from "./ui/card-hotel";
import { roomItems } from "@/utils";
import '@/utils/style.css'; // Asegúrate de importar tu archivo CSS

export default function HotelRoom() {
  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="flex justify-center items-center w-full py-8">
        <div className="text-gray-500 select-none text-[clamp(2rem,calc(2rem+3.5vw),8rem)] bubble-text">
          <span className="font-light transition-all duration-200 ease-linear hover:font-black hover:text-black">H</span>
          <span className="font-light transition-all duration-200 ease-linear hover:font-black hover:text-black">a</span>
          <span className="font-light transition-all duration-200 ease-linear hover:font-black hover:text-black">b</span>
          <span className="font-light transition-all duration-200 ease-linear hover:font-black hover:text-black">i</span>
          <span className="font-light transition-all duration-200 ease-linear hover:font-black hover:text-black">t</span>
          <span className="font-light transition-all duration-200 ease-linear hover:font-black hover:text-black">a</span>
          <span className="font-light transition-all duration-200 ease-linear hover:font-black hover:text-black">c</span>
          <span className="font-light transition-all duration-200 ease-linear hover:font-black hover:text-black">i</span>
          <span className="font-light transition-all duration-200 ease-linear hover:font-black hover:text-black">o</span>
          <span className="font-light transition-all duration-200 ease-linear hover:font-black hover:text-black">n</span>
          <span className="font-light transition-all duration-200 ease-linear hover:font-black hover:text-black">e</span>
          <span className="font-light transition-all duration-200 ease-linear hover:font-black hover:text-black">s</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center w-full gap-4">
        {roomItems.map((item, i) => (
          <CardHotel key={i} />
        ))}
      </div>
    </div>
  );
}

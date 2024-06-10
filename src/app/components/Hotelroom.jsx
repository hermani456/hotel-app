import React from "react";
import { CardHotel } from "./ui/card-hotel";
import { roomItems } from "@/utils";

export default function HotelRoom() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex justify-center items-center w-full py-8">
        <h2 className="text-4xl lg:text-6xl">Habitaciones</h2>
      </div>
      <div className="flex flex-wrap justify-center w-full gap-4">
        {roomItems.map((item, i) => (
          <CardHotel
            key={i}
            title={item.title}
            description={item.description}
            img={item.img}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

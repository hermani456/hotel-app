"use client";
import React, { useState } from "react";
import { CardHotel } from "./ui/card-hotel";
import { roomItems } from "@/utils";
import BookingForm from "./BookingForm";
import { useUser } from "@clerk/nextjs";


export default function HotelRoom() {
  const [showForm, setShowForm] = useState(false);
  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState("");

  const { isLoaded, isSignedIn, user } = useUser();
  // console.log(user)

  if (!isLoaded || !isSignedIn) {
    return null;
  }
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
            setShowForm={setShowForm}
            setPrice={setPrice}
            setTitle={setTitle}
          />
        ))}
      </div>
      {showForm && <BookingForm price={price} title={title} user={user} />}
    </div>
  );
}

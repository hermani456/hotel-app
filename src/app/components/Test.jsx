"use client"
import { useEffect } from "react";

const Text = () => {
  useEffect(() => {
    fetch("/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("log",data);
      });
    return () => {
      console.log("unmounting");
    };
  }, []);
  return (
    <section>
      <div className="w-full">
        <h1 className="text-center">Lorem ipsum dolor sit amet.</h1>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
          tempore!
        </p>
      </div>
    </section>
  );
};

export default Text;

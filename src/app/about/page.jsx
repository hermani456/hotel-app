import React from "react";
import Container from "../components/ui/Container";
import Navbar from "../components/Navbar";

const page = () => {
  return (
    <>
      <Navbar />
      <Container>
        <h1 className="text-3xl lg:text-5xl font-bold text-center my-8 text-text">
          Nosotros
        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-between py-10 px-4 md:px-10 gap-5">
          <div className="max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-text text-center lg:text-left">
              Nuesta Mision
            </h2>
            <p className="text-center lg:text-left">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima
              doloremque est, debitis veniam distinctio repellat quasi dolor?
              Laboriosam et odio consequuntur cum, fuga voluptate minima
              voluptates quo suscipit aut repellat odit velit porro assumenda
              sed, quia facilis aperiam rem, error sit. Sed incidunt numquam
              vero tempora dolorem eius nihil hic?
            </p>
          </div>
          <div>
            <img
              src="https://picsum.photos/400/250"
              alt="foto mision"
              className="rounded shadow-md"
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-text text-center">
            Quienes Somos
          </h2>
          <p className="text-center mx-auto mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            maxime alias, aspernatur non, eveniet eum, fuga veniam tempora
            debitis nobis nesciunt. Fugiat et dolorem non nisi nostrum fugit est
            expedita dolores id tempore? Doloribus repudiandae odio magnam,
            ipsum voluptates veritatis, est dolor ullam culpa laboriosam quis
            at. Quasi, labore error.
          </p>
          <div className="flex justify-center">
            <img
              src="https://picsum.photos/400/200"
              alt="foto quienes somos"
              className="rounded shadow-md"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default page;

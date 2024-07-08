"use client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/ui/Container";
import { Button } from "../components/ui/button";
import CheckUserRole from "@/utils/roles";

const page = () => {
  const [rooms, setRooms] = useState([]);
  const [nombreHabitacion, setNombreHabitacion] = useState("");

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rut, setRut] = useState("");

  useEffect(() => {
    fetch("/api/tipoHabitacion")
      .then((res) => res.json())
      .then((data) => setNombreHabitacion(data));
  }, []);

  useEffect(() => {
    fetch("/api/huesped")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHuesped = {
      nombre,
      apellido,
      rut,
    };
    fetch("/api/huesped", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHuesped),
    })
      .then((res) => res.json())
      .then((data) => {
        setRooms((prevRooms) => [...prevRooms, data]);
        setNombre("");
        setApellido("");
        setRut("");
      });
  };

  const handleDelete = async (id) => {
    const res = await fetch("/api/huesped", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
    const data = await res.json();
    if (data.code === "23503") {
      alert("No se puede borrar el huesped porque tiene reservas");
      return;
    }
    setRooms((prevRooms) => prevRooms.filter((r) => r.id_huesped !== id));
    alert("Huesped borrado");
  };

  return (
    <Layout>
      <Container>
        <CheckUserRole role="admin">
          <h1 className="text-3xl lg:text-5xl font-bold text-center my-8">
            Agregar Huesped
          </h1>
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="numeroHabitacion"
                id="numeroHabitacion"
                className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <label
                htmlFor="numeroHabitacion"
                className="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nombre
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="numeroHabitacion"
                id="numeroHabitacion"
                className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
              <label
                htmlFor="numeroHabitacion"
                className="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Apellido
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="numeroHabitacion"
                id="numeroHabitacion"
                className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                required
              />
              <label
                htmlFor="numeroHabitacion"
                className="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                RUT
              </label>
            </div>
            <div className="flex justify-between">
              <Button type="submit">Agregar</Button>
            </div>
          </form>
        </CheckUserRole>
        {rooms.length === 0 ? (
          <h2 className="text-2xl font-bold text-text text-center mt-5">
            No hay huespedes disponibles
          </h2>
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs dark:text-white uppercase bg-secondary">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Apellido
                  </th>
                  <th scope="col" className="px-6 py-3">
                    RUT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Borrar
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr
                    key={room.id_huesped}
                    className="odd:bg-white even:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap"
                    >
                      {room.nombre}
                    </th>
                    <td className="px-6 py-4">{room.apellido}</td>
                    <td className="px-6 py-4">{room.rut}</td>
                    <td className="px-6 py-4">
                      <CheckUserRole role="admin">
                        <button onClick={() => handleDelete(room.id_huesped)}>
                          <DeleteIcon className="w-5 fill-red-600" />
                        </button>
                      </CheckUserRole>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </Layout>
  );
};

const DeleteIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
  </svg>
);

export default page;

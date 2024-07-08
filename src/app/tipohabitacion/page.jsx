"use client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/ui/Container";
import { Button } from "../components/ui/button";
import { formatToClp } from "@/utils";
import { NumericFormat } from "react-number-format";
import CheckUserRole from "@/utils/roles";
import Navbar from "../components/Navbar";

const page = () => {
  const [rooms, setRooms] = useState([]);
  const [nombreHabitacion, setNombreHabitacion] = useState("");

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [capacidad, setCapacidad] = useState("");

  useEffect(() => {
    fetch("/api/tipoHabitacion")
      .then((res) => res.json())
      .then((data) => setNombreHabitacion(data));
  }, []);

  useEffect(() => {
    fetch("/api/tiposdehabitacion")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoomType = {
      nombre,
      descripcion,
      precio,
      capacidad,
    };
    fetch("/api/tiposdehabitacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRoomType),
    })
      .then((res) => res.json())
      .then((data) => {
        setRooms((prevRooms) => [...prevRooms, data]);
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setCapacidad("");
      });
  };

  const handleDelete = (id) => {
    fetch("/api/tiposdehabitacion", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            alert(data.error);
            return Promise.reject(data.error);
          });
        }
        return res.json();
      })
      .then(() => {
        setRooms((prevRooms) =>
          prevRooms.filter((r) => r.id_tipo_habitacion !== id)
        );
        alert("Tipo de habitacion eliminado");
      })
      .catch((error) => {
        console.error("Deletion failed:", error);
      });
  };

  return (
    <>
      <Navbar />
      <Layout>
        <Container>
          <CheckUserRole role="admin">
            <h1 className="text-3xl lg:text-5xl font-bold text-center my-8">
              Agregar tipos de habitacion
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
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
                <label
                  htmlFor="numeroHabitacion"
                  className="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Descripcion
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="numeroHabitacion"
                  id="numeroHabitacion"
                  className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  value={capacidad}
                  onChange={(e) => setCapacidad(e.target.value)}
                  required
                />
                <label
                  htmlFor="numeroHabitacion"
                  className="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Capacidad
                </label>
              </div>

              <div className="flex justify-between">
                <Button type="submit">Agregar</Button>
              </div>
            </form>
          </CheckUserRole>

          {rooms.length === 0 ? (
            <h2 className="text-2xl font-bold text-text text-center mt-5">
              No hay tipos de habitaciones disponibles
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
                      Descripcion
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Capacidad
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Borrar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr
                      key={room.id_tipo_habitacion}
                      className="odd:bg-white even:bg-gray-50"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium  whitespace-nowrap"
                      >
                        {room.nombre}
                      </th>
                      <td className="px-6 py-4">{room.descripcion}</td>
                      <td className="px-6 py-4">{room.capacidad}</td>
                      <td className="px-6 py-4">
                        <CheckUserRole role="admin">
                          <button
                            onClick={() =>
                              handleDelete(room.id_tipo_habitacion)
                            }
                          >
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
    </>
  );
};

const EditIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
  </svg>
);

const DeleteIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
  </svg>
);

export default page;

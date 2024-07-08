"use client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/ui/Container";
import { Button } from "../components/ui/button";
import CheckUserRole from "@/utils/roles";
import { set } from "react-hook-form";
import Navbar from "../components/Navbar";

const page = () => {
  const [rooms, setRooms] = useState([]);
  const [nombreHabitacion, setNombreHabitacion] = useState("");
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    fetch("/api/tipoHabitacion")
      .then((res) => res.json())
      .then((data) => setNombreHabitacion(data));
  }, []);

  useEffect(() => {
    fetch("/api/habitacion")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, [submissionCount]);

  const [numeroHabitacion, setNumeroHabitacion] = useState("");
  const [hotel, setHotel] = useState("1");
  const [tipoHabitacion, setTipoHabitacion] = useState("");
  const [estado, setEstado] = useState("Disponible");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRoom = {
      numeroHabitacion,
      hotel,
      tipoHabitacion,
      estado,
    };
    const res = await fetch("/api/habitacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRoom),
    });
    if (res.status === 409) {
      alert("Numero de habitación ya existe");
      return;
    }
    setSubmissionCount((prevCount) => prevCount + 1);
    const data = await res.json();
    setRooms((prevRooms) => [...prevRooms, data]);
    setNumeroHabitacion("");
    setHotel("1");
    setTipoHabitacion("");
    setEstado("Disponible");
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch("/api/habitacion", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
      const data = await res.json();
      if (data.code === "23503") {
        alert(
          "No se puede eliminar la habitación, ya que tiene pasajeros alojados"
        );
        return;
      }
      setRooms((prevRooms) =>
        prevRooms.filter((r) => r.numero_habitacion !== id)
      );
      alert("Habitación eliminada");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Navbar />
      <Layout>
        <Container>
          <CheckUserRole role="admin">
            <h1 className="text-3xl lg:text-5xl font-bold text-center my-8">
              Agregar Habitacion
            </h1>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="numeroHabitacion"
                  id="numeroHabitacion"
                  className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  value={numeroHabitacion}
                  onChange={(e) => setNumeroHabitacion(e.target.value)}
                  required
                />
                <label
                  htmlFor="numeroHabitacion"
                  className="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Numero Habitacion
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="tipoHabitacion"
                  id="tipoHabitacion"
                  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={tipoHabitacion}
                  onChange={(e) => setTipoHabitacion(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Seleccione el tipo de habitación
                  </option>
                  {nombreHabitacion &&
                    nombreHabitacion.map((tipo, i) => (
                      <option
                        className="text-black"
                        key={i}
                        value={tipo.id_tipo_habitacion}
                      >
                        {tipo.nombre}
                      </option>
                    ))}
                </select>
                <label
                  htmlFor="tipoHabitacion"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Tipo de Habitación
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="estado"
                  id="estado"
                  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Seleccione el tipo de habitación
                  </option>
                  <option className="text-black" value="disponible">
                    Disponible
                  </option>
                  <option className="text-black" value="ocupada">
                    Ocupada
                  </option>
                </select>
                <label
                  htmlFor="estado"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Estado habitacion
                </label>
              </div>
              <div className="flex justify-between">
                <Button type="submit">Agregar</Button>
              </div>
            </form>
          </CheckUserRole>
          {rooms.length === 0 ? (
            <h2 className="text-2xl font-bold text-text text-center mt-5">
              No hay habitaciones disponibles
            </h2>
          ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs dark:text-white uppercase bg-secondary">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Numero Habitacion
                    </th>
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
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Borrar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room, i) => (
                    <tr
                      key={room.numero_habitacion + i}
                      className="odd:bg-white even:bg-gray-50"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium  whitespace-nowrap"
                      >
                        {room.numero_habitacion}
                      </th>
                      <td className="px-6 py-4">{room.nombre}</td>
                      <td className="px-6 py-4">{room.descripcion}</td>
                      <td className="px-6 py-4">{room.capacidad}</td>
                      <td className="px-6 py-4">{room.estado}</td>
                      <td className="px-6 py-4">
                        <CheckUserRole role="admin">
                          <button
                            onClick={() => handleDelete(room.numero_habitacion)}
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

const DeleteIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
  </svg>
);

export default page;

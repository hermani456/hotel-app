"use client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/ui/Container";

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
    fetch("/api/pasajeros")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, [submissionCount]);

  const handleDelete = (id) => {
    console.log("id", id);
    fetch("/api/habitacion", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    })
      .then((res) => res.json())
      .then(() => setSubmissionCount((prevCount) => prevCount + 1));
  };

  return (
    <Layout>
      <Container>
        <h1 className="text-2xl font-bold text-text text-center mt-5">
          Resumen de Pasajeros
        </h1>
        {rooms.length === 0 ? (
          <h2 className="text-2xl font-bold text-text text-center mt-5">
            No hay pasajeros alojados
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
                    Numero habitacion
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fecha Ingreso
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fecha Salida
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Borrar
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, i) => (
                  <tr
                    key={room.nombre + i}
                    className="odd:bg-white even:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap"
                    >
                      {room.nombre}
                    </th>
                    <td className="px-6 py-4">{room.apellido}</td>
                    <td className="px-6 py-4">{room.numero_habitacion}</td>
                    <td className="px-6 py-4">
                      {new Date(room.fecha_checkin).toLocaleDateString("es-CL")}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(room.fecha_checkout).toLocaleDateString(
                        "es-CL"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(room.numero_habitacion)}
                      >
                        <DeleteIcon className="w-5 fill-red-600" />
                      </button>
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

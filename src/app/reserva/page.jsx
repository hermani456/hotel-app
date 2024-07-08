"use client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/ui/Container";
import { Button } from "../components/ui/button";
import { formatToClp } from "@/utils";
import { LoaderIcon } from "lucide-react";
import CheckUserRole from "@/utils/roles";
import Navbar from "../components/Navbar";

const page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [nombreHabitacion, setNombreHabitacion] = useState("");
  const [habitacionDisponible, setHabitacionDisponible] = useState([]);
  const [pasajeros, setPasajeros] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [capacidadHabitacion, setCapacidadHabitacion] = useState("");

  const [huespedesSeleccionados, setHuespedesSeleccionados] = useState([]);

  useEffect(() => {
    fetch("/api/checkhabitacion")
      .then((res) => res.json())
      .then((data) => setHabitacionDisponible(data));
  }, []);

  useEffect(() => {
    fetch("/api/reserva")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const [numero, nombre, capacidad] = selectedValue.split(",");

    setNumeroHabitacion(numero);
    setNombreHabitacion(nombre);
    setCapacidadHabitacion(capacidad);
  };

  const [numeroHabitacion, setNumeroHabitacion] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [precioTotal, setPrecioTotal] = useState("");
  const [huespedes, setHuespedes] = useState([]);

  const [selectedHuesped, setSelectedHuesped] = useState(
    Array(capacidadHabitacion).fill("")
  );

  useEffect(() => {
    fetch("/api/huesped")
      .then((res) => res.json())
      .then((data) => setHuespedes(data));
  }, []);

  const handleSelectHuesped = (index, value) => {
    setSelectedHuesped((prev) => {
      const newSelected = [...prev];
      newSelected[index] = value;
      return newSelected;
    });
  };

  const huespedesDisponibles = huespedes.filter(
    (huesped) => !selectedHuesped.includes(huesped.id_huesped)
  );

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const newRoomType = {
      numeroHabitacion,
      fechaIngreso,
      fechaSalida,
      precioTotal,
    };
    console.log("newRoomType", newRoomType);

    const data = await fetch("/api/reserva", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRoomType),
    });
    const response = await data.json();
    console.log("response", response);
    const reservaHuespedData = {
      id_reserva: response.id_reserva,
      huespedesSeleccionados: selectedHuesped,
    };
    const dataHuesped = await fetch("/api/reservahuesped", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservaHuespedData),
    });
    const responseHuesped = await dataHuesped.json();
    console.log("responseHuesped", responseHuesped);
    if (responseHuesped) {
      setIsLoading(false);
      setNumeroHabitacion("");
      setNombreHabitacion("");
      setFechaIngreso("");
      setFechaSalida("");
      setPrecioTotal("");
      setCapacidadHabitacion("");
      setSelectedHuesped(Array(capacidadHabitacion).fill(""));

      alert("Reserva Agregada con Exito");
    }
  };

  useEffect(() => {
    const newPrecioTotal = capacidadHabitacion * 20000;
    setPrecioTotal(newPrecioTotal);
  }, [capacidadHabitacion, setPrecioTotal]);

  const inputs = [];

  for (let i = 0; i < capacidadHabitacion; i++) {
    inputs.push(
      <div className="relative z-0 w-full mb-5 group" key={i}>
        <select
          className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          onChange={(e) => handleSelectHuesped(i, e.target.value)}
          value={selectedHuesped[i]}
          required
        >
          <option value="">Seleccione un Huesped</option>
          {huespedesDisponibles.map((huesped) => (
            <option
              className="text-black"
              key={huesped.id_huesped}
              value={huesped.id_huesped}
            >
              {huesped.nombre + " " + huesped.apellido}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Layout>
        <Container>
          <CheckUserRole role="admin">
            <h1 className="text-3xl lg:text-5xl font-bold text-center my-8">
              Agregar Reserva
            </h1>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="tipoHabitacion"
                  id="tipoHabitacion"
                  placeholder="Tipo Habitacion"
                  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={nombreHabitacion}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="" disabled>
                    Selecione Tipo Habitacion
                  </option>
                  {habitacionDisponible &&
                    habitacionDisponible.map((tipo, i) => (
                      <option
                        className="text-black"
                        key={i}
                        value={`${tipo.numero_habitacion},${tipo.nombre},${tipo.capacidad}`}
                      >
                        {tipo.nombre}
                      </option>
                    ))}
                </select>
                <label
                  htmlFor="numeroHabitacion"
                  className="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Tipo Habitacion
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="date"
                  name="numeroHabitacion"
                  id="numeroHabitacion"
                  className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  value={fechaIngreso}
                  onChange={(e) => setFechaIngreso(e.target.value)}
                  required
                />
                <label
                  htmlFor="numeroHabitacion"
                  className="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Fecha Ingreso
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="date"
                  name="numeroHabitacion"
                  id="numeroHabitacion"
                  className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  value={fechaSalida}
                  onChange={(e) => setFechaSalida(e.target.value)}
                  required
                />
                <label
                  htmlFor="numeroHabitacion"
                  className="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Fecha Salida
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="numeroHabitacion"
                  id="numeroHabitacion"
                  className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  value={precioTotal}
                  // onChange={(e) => setPrecioTotal(e.target.value)}
                  required
                />
                <label
                  htmlFor="numeroHabitacion"
                  className="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Precio Total
                </label>
              </div>
              {inputs}

              <div className="flex justify-between">
                <Button type="submit">Agregar</Button>
              </div>
            </form>
          </CheckUserRole>
          {isLoading && (
            <div className="flex justify-center items-center">
              <LoaderIcon className="animate-spin" />
            </div>
          )}
          <h1 className="text-2xl font-bold text-text text-center mt-5">
            Resumen de Reserva
          </h1>
          {rooms.length === 0 ? (
            <h2 className="text-2xl font-bold text-text text-center mt-5">
              No hay Reservas
            </h2>
          ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs dark:text-white uppercase bg-secondary">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Habitacion
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
                      Precio Total
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Borrar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room, i) => (
                    <tr
                      key={room.id_reserva + i}
                      className="odd:bg-white even:bg-gray-50"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium  whitespace-nowrap"
                      >
                        {room.nombre}
                      </th>
                      <td className="px-6 py-4">{room.numero_habitacion}</td>
                      <td className="px-6 py-4">
                        {new Date(room.fecha_checkin).toLocaleDateString(
                          "es-CL"
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(room.fecha_checkout).toLocaleDateString(
                          "es-CL"
                        )}
                      </td>
                      <td className="px-6 py-4">{formatToClp(room.precio_total)}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(room.id_reserva)}
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

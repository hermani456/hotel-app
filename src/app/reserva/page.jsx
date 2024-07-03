"use client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/ui/Container";
import { Button } from "../components/ui/button";
import { formatToClp } from "@/utils";

const page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [nombreHabitacion, setNombreHabitacion] = useState("");
  const [habitacionDisponible, setHabitacionDisponible] = useState([]);

  const [huespedesSeleccionados, setHuespedesSeleccionados] = useState([]);

  useEffect(() => {
    fetch("/api/checkhabitacion")
      .then((res) => res.json())
      .then((data) => setHabitacionDisponible(data));
  }, []);

  const [numeroHabitacion, setNumeroHabitacion] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [precioTotal, setPrecioTotal] = useState("");

  const [huespedes, setHuespedes] = useState([]);

  const [idReserva, setIdReserva] = useState("");

  const [selectedHuesped, setSelectedHuesped] = useState("");

  useEffect(() => {
    fetch("/api/huesped")
      .then((res) => res.json())
      .then((data) => setHuespedes(data));
  }, []);

  useEffect(() => {
    fetch("/api/tipoHabitacion")
      .then((res) => res.json())
      .then((data) => setNombreHabitacion(data));
  }, []);

  const handleSelectHuesped = (event) => {
    const idHuespedSeleccionado = event.target.value;
    if (!idHuespedSeleccionado) return; // No hacer nada si el valor es ""

    const huespedSeleccionado = huespedes.find(
      (huesped) => huesped.id_huesped.toString() === idHuespedSeleccionado
    );
    if (!huespedSeleccionado) return; // Verificar que se encontró el huésped

    // Evitar agregar duplicados
    if (
      !huespedesSeleccionados.some(
        (huesped) => huesped.id_huesped === huespedSeleccionado.id
      )
    ) {
      setHuespedesSeleccionados((prev) => [...prev, huespedSeleccionado]);
    }
  };

  // Filtrar los huéspedes que no han sido seleccionados
  const huespedesDisponibles = huespedes.filter(
    (huesped) =>
      !huespedesSeleccionados.some(
        (seleccionado) => seleccionado.id_huesped === huesped.id_huesped
      )
  );

  // useEffect(() => {
  //   fetch("/api/reserva")
  //     .then((res) => res.json())
  //     .then((data) => setRooms(data));
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoomType = {
      numeroHabitacion,
      fechaIngreso,
      fechaSalida,
      precioTotal,
    };
    console.log("newRoomType", newRoomType);
    setRooms((prevRooms) => [...prevRooms, newRoomType]);
    setNumeroHabitacion("");
    setFechaIngreso("");
    setFechaSalida("");
    setPrecioTotal("");
    fetch("/api/reserva", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRoomType),
    })
      .then((res) => res.json())
      .then((data) => {
        const idReserva = data.id_reserva;
        setIdReserva(idReserva);
        console.log("idReserva", idReserva);
      });
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setRooms((prevRooms) => [...prevRooms, data]);
    //     setNombre("");
    //     setDescripcion("");
    //     setPrecio("");
    //     setCapacidad("");
    //   });
  };

  const handleSubmitToReservaHuesped = () => {
    if (huespedesSeleccionados.length < habitacionDisponible[0].capacidad) {
      alert("No hay suficientes huespedes seleccionados")
      return; // Early return if not enough guests
    }
    // console.log(huespedesSeleccionados.length, habitacionDisponible)
    const data = {
      id_reserva: idReserva,
      huespedesSeleccionados: huespedesSeleccionados.map(
        (huesped) => huesped.id_huesped
      ),
    };
    
    fetch("/api/reservahuesped", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setHuespedesSeleccionados([]);
  };

  const handleDelete = (id) => {
    console.log("id", id);
    fetch("/api/huesped", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    })
      .then((res) => res.json())
      .then(() =>
        setRooms((prevRooms) => prevRooms.filter((r) => r.id_huesped !== id))
      );
  };

  return (
    <Layout>
      <Container>
        <h1 className="text-3xl lg:text-5xl font-bold text-center my-8">
          Agregar Reserva
        </h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <select
              name="tipoHabitacion"
              id="tipoHabitacion"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={numeroHabitacion}
              onChange={(e) => setNumeroHabitacion(e.target.value)}
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
                    value={[tipo.numero_habitacion, tipo.nombre]}
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
              onChange={(e) => setPrecioTotal(e.target.value)}
              required
            />
            <label
              htmlFor="numeroHabitacion"
              className="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Precio Total
            </label>
          </div>
          <div className="flex justify-between">
            <Button type="submit">Agregar</Button>
            {isEditing && (
              <Button onClick={handleUpdateProduct}>Editar Producto</Button>
            )}
          </div>
        </form>
        {rooms.length === 0 ? (
          <h2 className="text-2xl font-bold text-text text-center mt-5">
            No hay tipos de reservas disponibles
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
                    Tipo Habitacion
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
                  {/* <th scope="col" className="px-6 py-3">
                    Editar
                  </th> */}
                  <th scope="col" className="px-6 py-3">
                    Borrar
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr
                    key={room.numeroHabitacion}
                    className="odd:bg-white even:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap"
                    >
                      {room.numeroHabitacion.split(",")[0]}
                    </th>
                    <td className="px-6 py-4">
                      {room.numeroHabitacion.split(",")[1]}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(
                        room.fechaIngreso + "T12:00:00"
                      ).toLocaleDateString("es-ES")}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(
                        room.fechaSalida + "T12:00:00"
                      ).toLocaleDateString("es-ES")}
                    </td>
                    <td className="px-6 py-4">{room.precio_total}</td>
                    {/* <td className="px-6 py-4">
                      <button onClick={() => updateProduct(room.id)}>
                        <EditIcon className="w-5 fill-text" />
                      </button>
                    </td> */}
                    <td className="px-6 py-4">
                      <button onClick={() => handleDelete(room.id_huesped)}>
                        <DeleteIcon className="w-5 fill-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {rooms.length === 0 ? (
          <div> </div>
        ) : (
          <div className="mx-auto">
            <h2 className="text-2xl font-bold text-text text-center mt-5">
              agregar huespedes a reserva
            </h2>
            <div className="flex flex-col justify-center items-center space-y-5">
              <select
                className="border border-gray-300 rounded-md p-2"
                onChange={handleSelectHuesped}
                value={selectedHuesped}
              >
                <option value="">Seleccione un Huesped</option>
                {huespedesDisponibles.map((huesped) => (
                  <option key={huesped.id_huesped} value={huesped.id_huesped}>
                    {huesped.nombre}
                  </option>
                ))}
              </select>

              <div>
                <h3>Huespedes Seleccionados:</h3>
                <ul className="text-center">
                  {huespedesSeleccionados.map((huesped) =>
                    huesped ? (
                      <li key={huesped.id_huesped}>{huesped.nombre}</li>
                    ) : null
                  )}
                </ul>
              </div>
              <Button onClick={handleSubmitToReservaHuesped}>Agregar</Button>
            </div>
          </div>
        )}
      </Container>
    </Layout>
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

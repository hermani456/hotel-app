import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  console.log("body", body);
  let { numeroHabitacion, fechaIngreso, fechaSalida, precioTotal } = body;
  numeroHabitacion = numeroHabitacion.split(",")[0];
  // id_reserva | numero_habitacion | fecha_checkin | fecha_checkout | precio_total
  // INSERT INTO reserva (numero_habitacion, fecha_checkin, fecha_checkout, precio_total) VALUES (3, '2021-01-01', '2021-01-03', 400000);

  const data = await pool.query(
    "INSERT INTO reserva (numero_habitacion, fecha_checkin, fecha_checkout, precio_total) VALUES ($1, $2, $3, $4) RETURNING *",
    [numeroHabitacion, fechaIngreso, fechaSalida, precioTotal]
  );

  return NextResponse.json(data.rows[0]);
}

export async function GET() {
  const data = await pool.query(`SELECT reserva.*, tipo_habitacion.nombre
FROM reserva
JOIN habitacion ON reserva.numero_habitacion = habitacion.numero_habitacion
JOIN tipo_habitacion ON habitacion.id_tipo_habitacion = tipo_habitacion.id_tipo_habitacion;`);
  return NextResponse.json(data.rows);
}

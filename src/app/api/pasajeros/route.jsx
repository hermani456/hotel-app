import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { nombre, apellido, direccion, telefono, email } = body;
  const data = await pool.query(
    "INSERT INTO pasajeros (nombre, apellido, direccion, telefono, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [nombre, apellido, direccion, telefono, email]
  );

  return NextResponse.json(data.rows[0]);
}

export async function GET() {
  const data = await pool.query(`SELECT
    h.nombre,
    h.apellido,
    hab.numero_habitacion,
    th.capacidad,
    r.fecha_checkin,
    r.fecha_checkout
    FROM reserva r
    JOIN reserva_huesped rh ON r.id_reserva = rh.id_reserva
    JOIN huesped h ON rh.id_huesped = h.id_huesped
    JOIN habitacion hab ON r.numero_habitacion = hab.numero_habitacion
    JOIN tipo_habitacion th ON hab.id_tipo_habitacion = th.id_tipo_habitacion;`);
  return NextResponse.json(data.rows);
}

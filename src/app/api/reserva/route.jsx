import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { price, username } = body;
  console.log("body", body)
  // INSERT INTO reserva VALUES (2, 1, 2, '2021-01-01', '2021-01-03', 300000);
  const data = await pool.query(
    "INSERT INTO reserva (id_huesped, numero_habitacion, fecha_checkin, fecha_checkout, precio_total) VALUES (1, 3, '2024-01-01', '2024-01-03', $1) RETURNING *",
    [price]
  );

  return NextResponse.json(data.rows[0]);
}

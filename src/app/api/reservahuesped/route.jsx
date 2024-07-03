import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  console.log("body", body);
  const { id_reserva, huespedesSeleccionados } = body;

  // Prepare the query for inserting into reserva_huesped
  const query =
    "INSERT INTO reserva_huesped (id_reserva, id_huesped) VALUES ($1, $2)";

  // Execute the query for each selected guest
  for (const id_huesped of huespedesSeleccionados) {
    await pool.query(query, [id_reserva, id_huesped]);
  }

  return NextResponse.json({ message: "Huespedes added to reserva successfully" });
}

export async function GET() {
  const data = await pool.query("SELECT * from huesped;");
  return NextResponse.json(data.rows);
}

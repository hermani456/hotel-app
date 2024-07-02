import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { nombre, apellido, direccion, telefono, email } = body;
  const data = await pool.query(
    "INSERT INTO huesped (nombre, apellido, direccion, telefono, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [nombre, apellido, direccion, telefono, email]
  );

  return NextResponse.json(data.rows[0]);
}

export async function GET() {
  const data = await pool.query("SELECT * from huesped;");
  return NextResponse.json(data.rows);
}

export async function DELETE(req) {
  const idHuesped = await req.json();
  console.log("body", idHuesped);
  const data = await pool.query(
    "DELETE FROM huesped WHERE id_huesped = $1 RETURNING *",
    [idHuesped]
  );
  return NextResponse.json(data.rows[0]);
}

import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { nombre, descripcion, precio, capacidad } = body;
  const data = await pool.query(
    "INSERT INTO tipo_habitacion (nombre, descripcion, precio, capacidad) VALUES ($1, $2, $3, $4) RETURNING *",
    [nombre, descripcion, precio, capacidad]
  );
  return NextResponse.json(data.rows[0]);
}

export async function GET() {
  const data = await pool.query("SELECT * from tipo_habitacion;");
  return NextResponse.json(data.rows);
}

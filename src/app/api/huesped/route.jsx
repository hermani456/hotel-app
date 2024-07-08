import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { nombre, apellido, rut } = body;
  const data = await pool.query(
    "INSERT INTO huesped (nombre, apellido, rut) VALUES ($1, $2, $3) RETURNING *",
    [nombre, apellido, rut]
  );

  return NextResponse.json(data.rows[0]);
}

export async function GET() {
  const data = await pool.query("SELECT * from huesped;");
  return NextResponse.json(data.rows);
}

export async function DELETE(req) {
  const idHuesped = await req.json();
  try {
    const data = await pool.query(
      "DELETE FROM huesped WHERE id_huesped = $1 RETURNING *",
      [idHuesped]
    );
    return NextResponse.json(data.rows[0]);
  } catch (error) {
    return NextResponse.json(error);
  }
}

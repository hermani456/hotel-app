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

export async function DELETE(req) {
  const idTipoHabitacion = await req.json();

  const checkUsage = await pool.query(
    "SELECT * FROM habitacion WHERE id_tipo_habitacion = $1",
    [idTipoHabitacion]
  );

  if (checkUsage.rowCount > 0) {
    return new Response(
      JSON.stringify({
        error: "No puedes eliminar un tipo de habitacion en uso.",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const data = await pool.query(
    "DELETE FROM tipo_habitacion WHERE id_tipo_habitacion = $1 RETURNING *",
    [idTipoHabitacion]
  );

  return new Response(JSON.stringify(data.rows[0]), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

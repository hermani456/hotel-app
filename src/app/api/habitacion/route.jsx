import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { numeroHabitacion, hotel, tipoHabitacion, estado } = body;
  console.log(numeroHabitacion, hotel, tipoHabitacion, estado)
  try {
    const data = await pool.query(
      "INSERT INTO habitacion (numero_habitacion, id_hotel, id_tipo_habitacion, estado) VALUES ($1, $2, $3, $4) RETURNING *",
      [numeroHabitacion, hotel, tipoHabitacion, estado]
    );
    return NextResponse.json(data.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "La habitación ya existe" },
        { status: 409 }
      );
    }
  }
}
// export async function POST(req) {
//   const body = await req.json();
//   const { numeroHabitacion, hotel, tipoHabitacion, estado } = body;
//   const data = await pool.query(
//     "INSERT INTO habitacion (numero_habitacion, id_hotel, id_tipo_habitacion, estado) VALUES ($1, $2, $3, $4) RETURNING *",
//     [numeroHabitacion, hotel, tipoHabitacion, estado]
//   );

//   return NextResponse.json(data.rows[0]);
// }

export async function GET() {
  const data = await pool.query(
    "SELECT numero_habitacion, nombre, descripcion, capacidad, estado FROM habitacion h INNER JOIN tipo_habitacion th ON h.id_tipo_habitacion = th.id_tipo_habitacion;"
  );
  return NextResponse.json(data.rows);
}

export async function PUT(req) {
  const body = await req.json();
  const { numeroHabitacion, hotel, tipoHabitacion, estado } = body;
  const data = await pool.query(
    "UPDATE habitacion SET id_hotel = $1, id_tipo_habitacion = $2, estado = $3 WHERE numero_habitacion = $4 RETURNING *",
    [hotel, tipoHabitacion, estado, numeroHabitacion]
  );
  return NextResponse.json(data.rows[0]);
}

export async function DELETE(req) {
  const numeroHabitacion = await req.json();
  console.log("body", numeroHabitacion);
  const data = await pool.query(
    "DELETE FROM habitacion WHERE numero_habitacion = $1 RETURNING *",
    [numeroHabitacion]
  );
  return NextResponse.json(data.rows[0]);
}

import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    const { numeroHabitacion, hotel, tipoHabitacion, estado } = body;
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
    // "SELECT numero_habitacion, nombre, descripcion, precio, capacidad, estado FROM habitacion h INNER JOIN tipo_habitacion th ON h.id_tipo_habitacion = th.id_tipo_habitacion WHERE estado = 'Disponible';"

export async function GET() {
    const data = await pool.query(
        "SELECT numero_habitacion, nombre, capacidad FROM habitacion h INNER JOIN tipo_habitacion th ON h.id_tipo_habitacion = th.id_tipo_habitacion WHERE estado = 'Disponible';"
    );
    return NextResponse.json(data.rows);
}
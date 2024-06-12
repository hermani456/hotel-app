import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  const { data } = await pool.query("SELECT * FROM hotel");

  return NextResponse.json({ data });
}


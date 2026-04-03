// app/api/categories/route.ts
import { NextResponse } from "next/server";

const baseApi = process.env.NEXT_PUBLIC_API;

export async function GET() {
  try {
    const res = await fetch(`${baseApi}/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch categories" }, { status: 500 });
  }
}

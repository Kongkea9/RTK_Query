import { NextRequest, NextResponse } from "next/server";
import { use } from "react";
import { da } from "zod/locales";

const baseApi = process.env.NEXT_PUBLIC_API;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  console.log("id: ", id);
  const res = await fetch(`${baseApi}/products/${id}`);
  if (!res.ok) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: res.status },
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  const { id } = await params;
  const res = await fetch(`${baseApi}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest,
    { params }: { params:  Promise<{ id: number }> }) {
    const { id } =  await params;
    console.log(id)
  const res = await fetch(`${baseApi}/products/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return NextResponse.json(data);
}

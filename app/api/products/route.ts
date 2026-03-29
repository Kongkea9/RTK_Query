import { NextRequest, NextResponse } from "next/server";

const baseApi = process.env.NEXT_PUBLIC_API;
export async function GET() {

  const res = await fetch(`${baseApi}/products`);
  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const res = await fetch(`${baseApi}/products/${params.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete product");
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`${baseApi}/products`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data);
}

import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: any = data.get("file");

    if (!file) {
      return NextResponse.json(
        { message: "No file received" },
        { status: 400 }
      );
    }

    // ⭐ THE MAGIC FIX
    // Convert file → ArrayBuffer safely in ALL environments
    const buffer = Buffer.from(await file.arrayBuffer());

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    await writeFile(filePath, buffer);

    return NextResponse.json({
      location: `/uploads/${fileName}`,
    });
  } catch (err: any) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}
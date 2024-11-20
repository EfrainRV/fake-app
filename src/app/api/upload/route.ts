import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('image');

  if (!file) {
    return NextResponse.json({ error: 'No file found' }, { status: 400 });
  }

  const buffer = Buffer.from(await (file as File).arrayBuffer());

  const filename = file.name.replaceAll(' ', '-');

  try {
    await writeFile(`public/uploads/${filename}`, buffer);
    return NextResponse.json({ url: `/uploads/${filename}`, status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
  
}
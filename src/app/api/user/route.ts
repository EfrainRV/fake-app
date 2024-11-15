import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {

const { name, email } = req.body;
  
try {
  const newUser = await prisma.user.create({
 
    data: {
      fullName: name,
      email: email,
    }
  });
  return NextResponse.json(newUser, { status: 201 });
} catch (error) {
  console.error(error);
  return NextResponse.json({ error: 'Error al crear el usuario' }, { status: 500 });
}
}
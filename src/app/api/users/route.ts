import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface User {
  name: string;
  email: string;
  json: () => Promise<User>;
}

export async function POST(req: User) {

  const { name, email } = await req.json();
    
  try {
    const newUser = await prisma.user.create({
  
      data: {
        name: name,
        email: email,
      }
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al crear el usuario' }, { status: 500 });
  }
}

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
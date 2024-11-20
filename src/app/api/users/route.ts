import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

  const { name, email, image } = await req.json();
    
  try {

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        image: image
      }
    });

    return NextResponse.json(newUser, { status: 201 });

  } catch (error) {

    console.error(error);
    return NextResponse.json({ error: 'Error al crear el usuario' }, { status: 500 });

  }
}

export async function GET(req: NextRequest) {

  const page = await req.nextUrl.searchParams.get('page') || '1';
  const limit = await req.nextUrl.searchParams.get('limit') || '5';

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  const skip = (pageNumber - 1) * limitNumber;

  const users = await prisma.user.findMany({
    take: limitNumber,
    skip: skip ,
  });

  const totalUsers = await prisma.user.count();

  return NextResponse.json({users, totalUsers});
}
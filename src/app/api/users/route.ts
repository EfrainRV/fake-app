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

  const page = await req.nextUrl.searchParams.get('page');
  const limit = await req.nextUrl.searchParams.get('limit');
  const query = await req.nextUrl.searchParams.get('query');

  let totalUsers = await prisma.user.count();
  let users;

  const pageNumber = page ? parseInt(page) : 1;
  const limitNumber = limit ? parseInt(limit) : totalUsers;

  const skip = (pageNumber - 1) * limitNumber;

  try {
    if(query) {
      totalUsers = await prisma.user.count({
        where: {
          OR: [
            { name: { contains: query }},
            { email: { contains: query }},
          ]
        }
      });

      users = await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: query }},
            { email: { contains: query }},
          ]
        },
        take: limitNumber,
        skip: skip,
      })
  
      return NextResponse.json({users, totalUsers});
    }
  
    users = await prisma.user.findMany({
      take: limitNumber,
      skip: skip,
    });
  
    return NextResponse.json({users, totalUsers});

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener los usuarios' }, { status: 500 });
  }
}
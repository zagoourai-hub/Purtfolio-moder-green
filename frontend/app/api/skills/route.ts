import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(skills);
  } catch (error) {
    console.error("GET /api/skills error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, category, level, order, iconUrl } = body;

    if (!name || !category) {
      return NextResponse.json({ message: "Name and Category are required" }, { status: 400 });
    }

    const newSkill = await prisma.skill.create({
      data: {
        name,
        category,
        level: level !== undefined ? Number(level) : 0,
        order: order !== undefined ? Number(order) : 0,
        iconUrl: iconUrl || null,
      },
    });

    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    console.error("POST /api/skills error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

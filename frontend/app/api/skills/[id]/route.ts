import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { name, category, level, order, iconUrl } = body;

    if (!name || !category) {
      return NextResponse.json({ message: "Name and Category are required" }, { status: 400 });
    }

    const skill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    }

    const updatedSkill = await prisma.skill.update({
      where: { id },
      data: {
        name,
        category,
        level: level !== undefined ? Number(level) : skill.level,
        order: order !== undefined ? Number(order) : skill.order,
        iconUrl: iconUrl !== undefined ? iconUrl : skill.iconUrl,
      },
    });

    return NextResponse.json(updatedSkill);
  } catch (error) {
    console.error("PUT /api/skills/[id] error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const skill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    }

    await prisma.skill.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/skills/[id] error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

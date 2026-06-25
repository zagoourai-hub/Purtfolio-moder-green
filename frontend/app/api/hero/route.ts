import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const hero = await prisma.heroSection.findFirst();
    return NextResponse.json(hero || null);
  } catch (error) {
    console.error("GET /api/hero error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { greeting, name, tagline, description, ctaLabel, ctaUrl, avatarUrl } = body;

    if (!greeting || !name || !tagline || !description || !ctaLabel || !ctaUrl) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const hero = await prisma.heroSection.findFirst();
    let result;

    if (hero) {
      result = await prisma.heroSection.update({
        where: { id: hero.id },
        data: { greeting, name, tagline, description, ctaLabel, ctaUrl, avatarUrl },
      });
    } else {
      result = await prisma.heroSection.create({
        data: { greeting, name, tagline, description, ctaLabel, ctaUrl, avatarUrl },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("PUT /api/hero error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

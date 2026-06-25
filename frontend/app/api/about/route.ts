import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const about = await prisma.aboutSection.findFirst();
    return NextResponse.json(about || null);
  } catch (error) {
    console.error("GET /api/about error:", error);
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
    const { bio, photoUrl, location, email, resumeUrl } = body;

    if (!bio) {
      return NextResponse.json({ message: "Bio is required" }, { status: 400 });
    }

    const about = await prisma.aboutSection.findFirst();
    let result;

    if (about) {
      result = await prisma.aboutSection.update({
        where: { id: about.id },
        data: { bio, photoUrl, location, email, resumeUrl },
      });
    } else {
      result = await prisma.aboutSection.create({
        data: { bio, photoUrl, location, email, resumeUrl },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("PUT /api/about error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

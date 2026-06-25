import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("published") === "true";

    const where = publishedOnly ? { published: true } : {};

    const services = await prisma.service.findMany({
      where,
      orderBy: { order: "asc" },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("GET /api/services error:", error);
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
    const { title, description, iconUrl, price, order, published } = body;

    if (!title || !description) {
      return NextResponse.json({ message: "Title and description are required" }, { status: 400 });
    }

    const newService = await prisma.service.create({
      data: {
        title,
        description,
        iconUrl: iconUrl || null,
        price: price || null,
        order: order !== undefined ? Number(order) : 0,
        published: Boolean(published),
      },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("POST /api/services error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

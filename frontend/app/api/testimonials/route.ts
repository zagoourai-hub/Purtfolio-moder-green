import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("published") === "true";

    const where = publishedOnly ? { published: true } : {};

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { order: "asc" },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
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
    const { clientName, clientRole, company, avatarUrl, content, rating, featured, published, order } = body;

    if (!clientName || !content) {
      return NextResponse.json({ message: "Client name and content are required" }, { status: 400 });
    }

    const newTestimonial = await prisma.testimonial.create({
      data: {
        clientName,
        clientRole: clientRole || null,
        company: company || null,
        avatarUrl: avatarUrl || null,
        content,
        rating: rating !== undefined ? Number(rating) : 5,
        featured: Boolean(featured),
        published: Boolean(published),
        order: order !== undefined ? Number(order) : 0,
      },
    });

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

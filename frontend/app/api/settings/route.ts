import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    // Transform array to key-value object map
    const map: Record<string, string> = {};
    settings.forEach((item) => {
      map[item.key] = item.value;
    });
    return NextResponse.json(map);
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json(); // Expected: { [key]: value }

    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ message: "Invalid payload format" }, { status: 400 });
    }

    const entries = Object.entries(body);
    const results = [];

    // Batch upsert settings keys
    for (const [key, value] of entries) {
      if (typeof key === "string" && typeof value === "string") {
        const result = await prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
        results.push(result);
      }
    }

    // Return the updated settings map
    const settings = await prisma.siteSetting.findMany();
    const map: Record<string, string> = {};
    settings.forEach((item) => {
      map[item.key] = item.value;
    });

    return NextResponse.json(map);
  } catch (error) {
    console.error("PUT /api/settings error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

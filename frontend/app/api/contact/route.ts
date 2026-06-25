import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      ) as Response;
    }

    // Save lead to database
    const newLead = await prisma.contactLead.create({
      data: {
        name,
        email,
        subject: subject || null,
        message,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
      leadId: newLead.id,
    }) as Response;
  } catch (error) {
    console.error("Error saving contact lead:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    ) as Response;
  }
}

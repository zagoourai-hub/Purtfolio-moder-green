import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const [projectsCount, blogPostsCount, unreadLeadsCount] = await Promise.all([
      prisma.project.count(),
      prisma.blogPost.count(),
      prisma.contactLead.count({ where: { isRead: false } }),
    ]);

    return NextResponse.json({
      projects: projectsCount,
      blogPosts: blogPostsCount,
      unreadLeads: unreadLeadsCount,
    });
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

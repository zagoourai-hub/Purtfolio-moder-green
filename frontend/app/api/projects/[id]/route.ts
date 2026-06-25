import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Helper to generate slug from title
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const project = await prisma.project.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }],
      },
    });

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("GET /api/projects/[id] error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

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
    const { title, description, coverUrl, techStack, liveUrl, repoUrl, featured, published, order } = body;

    const project = await prisma.project.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }],
      },
    });

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    // Update fields
    const updatedData: any = {};
    if (title !== undefined) {
      updatedData.title = title;
      // If title changed, update slug
      if (title !== project.title) {
        let baseSlug = slugify(title);
        let slug = baseSlug;
        let counter = 1;
        while (true) {
          const existing = await prisma.project.findFirst({
            where: {
              slug,
              id: { not: project.id },
            },
          });
          if (!existing) break;
          slug = `${baseSlug}-${counter}`;
          counter++;
        }
        updatedData.slug = slug;
      }
    }
    if (description !== undefined) updatedData.description = description;
    if (coverUrl !== undefined) updatedData.coverUrl = coverUrl;
    if (techStack !== undefined) updatedData.techStack = Array.isArray(techStack) ? techStack : [];
    if (liveUrl !== undefined) updatedData.liveUrl = liveUrl;
    if (repoUrl !== undefined) updatedData.repoUrl = repoUrl;
    if (featured !== undefined) updatedData.featured = Boolean(featured);
    if (published !== undefined) updatedData.published = Boolean(published);
    if (order !== undefined) updatedData.order = Number(order);

    const updatedProject = await prisma.project.update({
      where: { id: project.id },
      data: updatedData,
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("PUT /api/projects/[id] error:", error);
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

    const project = await prisma.project.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }],
      },
    });

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    await prisma.project.delete({
      where: { id: project.id },
    });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

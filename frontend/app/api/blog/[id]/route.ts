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

    const post = await prisma.blogPost.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }],
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("GET /api/blog/[id] error:", error);
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
    const { title, excerpt, content, coverUrl, tags, published } = body;

    const post = await prisma.blogPost.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }],
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const updatedData: any = {};
    if (title !== undefined) {
      updatedData.title = title;
      if (title !== post.title) {
        let baseSlug = slugify(title);
        let slug = baseSlug;
        let counter = 1;
        while (true) {
          const existing = await prisma.blogPost.findFirst({
            where: {
              slug,
              id: { not: post.id },
            },
          });
          if (!existing) break;
          slug = `${baseSlug}-${counter}`;
          counter++;
        }
        updatedData.slug = slug;
      }
    }
    if (excerpt !== undefined) updatedData.excerpt = excerpt;
    if (content !== undefined) updatedData.content = content;
    if (coverUrl !== undefined) updatedData.coverUrl = coverUrl;
    if (tags !== undefined) updatedData.tags = Array.isArray(tags) ? tags : [];
    if (published !== undefined) {
      const isPublished = Boolean(published);
      updatedData.published = isPublished;
      // Set publishedAt jika baru pertama kali di-publish
      if (isPublished && !post.publishedAt) {
        updatedData.publishedAt = new Date();
      } else if (!isPublished) {
        updatedData.publishedAt = null;
      }
    }

    const updatedPost = await prisma.blogPost.update({
      where: { id: post.id },
      data: updatedData,
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("PUT /api/blog/[id] error:", error);
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

    const post = await prisma.blogPost.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }],
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    await prisma.blogPost.delete({
      where: { id: post.id },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/blog/[id] error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

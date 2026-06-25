"use client";

import React from "react";
import Link from "next/link";
import { usePosts, useDeletePost } from "@/hooks/use-blog";
import DataTable, { ColumnConfig } from "@/components/cms/DataTable";
import { confirmDelete } from "@/components/cms/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2, Calendar } from "lucide-react";
import Image from "next/image";
import { BlogPost } from "@/services/blog.service";

export default function BlogListPage() {
  const { data: posts, isLoading } = usePosts();
  const deletePostMutation = useDeletePost();

  const handleDelete = async (idOrSlug: string) => {
    const confirmed = await confirmDelete({
      title: "Delete Blog Post?",
      text: "Are you sure you want to delete this blog post? This action will permanently delete it from the website.",
    });

    if (confirmed) {
      deletePostMutation.mutate(idOrSlug);
    }
  };

  const columns: ColumnConfig<BlogPost>[] = [
    {
      header: "Cover",
      cell: (item) => (
        <div className="relative w-16 h-10 rounded-md overflow-hidden bg-zinc-800 border border-zinc-800">
          {item.coverUrl ? (
            <Image
              src={item.coverUrl}
              alt={item.title}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-500 font-bold uppercase">
              No Cover
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Tags",
      cell: (item) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {item.tags.map((tag, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="text-[10px] px-1.5 py-0 bg-zinc-800 text-zinc-300 border-zinc-700"
            >
              {tag}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      header: "Status",
      cell: (item) => (
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              item.published ? "bg-emerald-500" : "bg-zinc-600"
            }`}
          />
          <span className="text-xs text-zinc-400">
            {item.published ? "Published" : "Draft"}
          </span>
        </div>
      ),
    },
    {
      header: "Published At",
      cell: (item) => (
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <Calendar className="w-3.5 h-3.5 text-zinc-500" />
          <span>
            {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "Not published"}
          </span>
        </div>
      ),
    },
    {
      header: "Actions",
      cell: (item) => (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/blog/${item.id}/edit`}>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-850"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => handleDelete(item.id)}
            disabled={deletePostMutation.isPending}
            className="h-8 w-8 text-red-400 hover:text-red-300 bg-red-950/20 hover:bg-red-900/30 border border-red-900/50"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Blog Posts</h1>
          <p className="text-sm text-zinc-400">
            Manage your articles, news, and technical tutorials.
          </p>
        </div>
        <Link href="/dashboard/blog/new">
          <Button className="bg-violet-600 text-zinc-100 hover:bg-violet-750 font-semibold px-4 rounded-xl gap-2">
            <Plus className="h-4 w-4" />
            Add Post
          </Button>
        </Link>
      </div>

      <DataTable data={posts} columns={columns} isLoading={isLoading} />
    </div>
  );
}

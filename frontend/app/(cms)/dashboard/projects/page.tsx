"use client";

import React from "react";
import Link from "next/link";
import { useProjects, useDeleteProject } from "@/hooks/use-projects";
import DataTable, { ColumnConfig } from "@/components/cms/DataTable";
import { confirmDelete } from "@/components/cms/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2, Globe, Star } from "lucide-react";
import Image from "next/image";
import { Project } from "@/services/project.service";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectsListPage() {
  const { data: projects, isLoading } = useProjects();
  const deleteProjectMutation = useDeleteProject();

  const handleDelete = async (idOrSlug: string) => {
    const confirmed = await confirmDelete({
      title: "Delete Project?",
      text: "Are you sure you want to delete this project? This will permanently remove the record.",
    });

    if (confirmed) {
      deleteProjectMutation.mutate(idOrSlug);
    }
  };

  const columns: ColumnConfig<Project>[] = [
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
      header: "Tech Stack",
      cell: (item) => (
        <div className="flex flex-wrap gap-1 max-w-[250px]">
          {item.techStack.map((tech, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className="text-[10px] px-1.5 py-0 bg-zinc-900 border-zinc-800 text-zinc-400 font-normal"
            >
              {tech}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      header: "Status",
      cell: (item) => (
        <div className="flex flex-col gap-1">
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
          {item.featured && (
            <div className="flex items-center gap-1 text-violet-400">
              <Star className="w-3 h-3 fill-violet-400" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Featured</span>
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Links",
      cell: (item) => (
        <div className="flex items-center gap-2">
          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noreferrer"
              title="Live Site"
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
          {item.repoUrl && (
            <a
              href={item.repoUrl}
              target="_blank"
              rel="noreferrer"
              title="Source Code"
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {!item.liveUrl && !item.repoUrl && <span className="text-zinc-600">—</span>}
        </div>
      ),
    },
    {
      header: "Order",
      accessorKey: "order",
    },
    {
      header: "Actions",
      cell: (item) => (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/projects/${item.id}/edit`}>
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
            disabled={deleteProjectMutation.isPending}
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
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Projects</h1>
          <p className="text-sm text-zinc-400">
            Manage your works, case studies, and code repositories.
          </p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button className="bg-violet-600 text-zinc-100 hover:bg-violet-750 font-semibold px-4 rounded-xl gap-2">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </Link>
      </div>

      <DataTable data={projects} columns={columns} isLoading={isLoading} />
    </div>
  );
}

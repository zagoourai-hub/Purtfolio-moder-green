"use client";

import React from "react";
import Link from "next/link";
import { useSkills, useDeleteSkill } from "@/hooks/use-skills";
import DataTable, { ColumnConfig } from "@/components/cms/DataTable";
import { confirmDelete } from "@/components/cms/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, ShieldAlert } from "lucide-react";
import { Skill } from "@/services/skill.service";

export default function SkillsListPage() {
  const { data: skills, isLoading } = useSkills();
  const deleteSkillMutation = useDeleteSkill();

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete({
      title: "Delete Skill?",
      text: "Are you sure you want to delete this skill? This action cannot be undone.",
    });

    if (confirmed) {
      deleteSkillMutation.mutate(id);
    }
  };

  const columns: ColumnConfig<Skill>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (item) => (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
          {item.category}
        </span>
      ),
    },
    {
      header: "Level",
      cell: (item) => (
        <div className="flex items-center gap-3 min-w-[120px]">
          <div className="w-24 bg-zinc-800 rounded-full h-2">
            <div
              className="bg-violet-600 h-2 rounded-full"
              style={{ width: `${item.level}%` }}
            />
          </div>
          <span className="text-xs text-zinc-400 font-bold">{item.level}%</span>
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
          <Link href={`/dashboard/skills/${item.id}/edit`}>
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
            disabled={deleteSkillMutation.isPending}
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
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Skills</h1>
          <p className="text-sm text-zinc-400">
            Manage the list of technical skills categorized on your homepage.
          </p>
        </div>
        <Link href="/dashboard/skills/new">
          <Button className="bg-violet-600 text-zinc-100 hover:bg-violet-750 font-semibold px-4 rounded-xl gap-2">
            <Plus className="h-4 w-4" />
            Add Skill
          </Button>
        </Link>
      </div>

      <DataTable data={skills} columns={columns} isLoading={isLoading} />
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { useServices, useDeleteService } from "@/hooks/use-services";
import DataTable, { ColumnConfig } from "@/components/cms/DataTable";
import { confirmDelete } from "@/components/cms/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { Service } from "@/services/service.service";

export default function ServicesListPage() {
  const { data: services, isLoading } = useServices();
  const deleteServiceMutation = useDeleteService();

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete({
      title: "Delete Service?",
      text: "Are you sure you want to delete this service? This action will permanently remove it.",
    });

    if (confirmed) {
      deleteServiceMutation.mutate(id);
    }
  };

  const columns: ColumnConfig<Service>[] = [
    {
      header: "Icon",
      cell: (item) => (
        <div className="relative w-8 h-8 rounded-md overflow-hidden bg-zinc-800 border border-zinc-800 flex items-center justify-center">
          {item.iconUrl ? (
            <Image
              src={item.iconUrl}
              alt={item.title}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <span className="text-[10px] text-zinc-500 font-bold">No Icon</span>
          )}
        </div>
      ),
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Description",
      cell: (item) => (
        <div className="max-w-[300px] truncate text-zinc-400 text-xs font-normal">
          {item.description}
        </div>
      ),
    },
    {
      header: "Price",
      cell: (item) => (
        <span className="text-xs text-zinc-300 font-semibold">{item.price || "Contact"}</span>
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
      header: "Order",
      accessorKey: "order",
    },
    {
      header: "Actions",
      cell: (item) => (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/services/${item.id}/edit`}>
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
            disabled={deleteServiceMutation.isPending}
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
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Services</h1>
          <p className="text-sm text-zinc-400">
            Manage the pricing and description of services you provide.
          </p>
        </div>
        <Link href="/dashboard/services/new">
          <Button className="bg-violet-600 text-zinc-100 hover:bg-violet-750 font-semibold px-4 rounded-xl gap-2">
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>

      <DataTable data={services} columns={columns} isLoading={isLoading} />
    </div>
  );
}

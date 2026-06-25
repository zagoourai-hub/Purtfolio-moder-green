"use client";

import React from "react";
import Link from "next/link";
import { useTestimonials, useDeleteTestimonial } from "@/hooks/use-testimonials";
import DataTable, { ColumnConfig } from "@/components/cms/DataTable";
import { confirmDelete } from "@/components/cms/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Star } from "lucide-react";
import Image from "next/image";
import { Testimonial } from "@/services/testimonial.service";

export default function TestimonialsListPage() {
  const { data: testimonials, isLoading } = useTestimonials();
  const deleteTestimonialMutation = useDeleteTestimonial();

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete({
      title: "Delete Testimonial?",
      text: "Are you sure you want to delete this testimonial? This action cannot be undone.",
    });

    if (confirmed) {
      deleteTestimonialMutation.mutate(id);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`w-3.5 h-3.5 ${
              index < rating ? "text-amber-500 fill-amber-500" : "text-zinc-700"
            }`}
          />
        ))}
      </div>
    );
  };

  const columns: ColumnConfig<Testimonial>[] = [
    {
      header: "Avatar",
      cell: (item) => (
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-zinc-800 border border-zinc-800 flex items-center justify-center">
          {item.avatarUrl ? (
            <Image
              src={item.avatarUrl}
              alt={item.clientName}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <span className="text-[10px] text-zinc-500 font-bold uppercase">
              {item.clientName.charAt(0)}
            </span>
          )}
        </div>
      ),
    },
    {
      header: "Client Name",
      accessorKey: "clientName",
    },
    {
      header: "Company/Role",
      cell: (item) => (
        <div className="text-xs text-zinc-400 font-normal">
          {item.clientRole} {item.company ? `@ ${item.company}` : ""}
        </div>
      ),
    },
    {
      header: "Content",
      cell: (item) => (
        <div className="max-w-[250px] truncate text-zinc-400 text-xs font-normal">
          {item.content}
        </div>
      ),
    },
    {
      header: "Rating",
      cell: (item) => renderStars(item.rating),
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
            <span className="text-[9px] font-bold text-violet-400 uppercase tracking-wide">Featured</span>
          )}
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
          <Link href={`/dashboard/testimonials/${item.id}/edit`}>
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
            disabled={deleteTestimonialMutation.isPending}
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
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Testimonials</h1>
          <p className="text-sm text-zinc-400">
            Manage reviews and recommendations written by your clients.
          </p>
        </div>
        <Link href="/dashboard/testimonials/new">
          <Button className="bg-violet-600 text-zinc-100 hover:bg-violet-750 font-semibold px-4 rounded-xl gap-2">
            <Plus className="h-4 w-4" />
            Add Testimonial
          </Button>
        </Link>
      </div>

      <DataTable data={testimonials} columns={columns} isLoading={isLoading} />
    </div>
  );
}

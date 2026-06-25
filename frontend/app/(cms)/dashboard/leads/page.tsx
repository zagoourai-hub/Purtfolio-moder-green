"use client";

import React from "react";
import Link from "next/link";
import { useLeads, useDeleteLead, useMarkLeadAsRead } from "@/hooks/use-leads";
import DataTable, { ColumnConfig } from "@/components/cms/DataTable";
import { confirmDelete } from "@/components/cms/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Mail, MailOpen, Trash2, Calendar, Eye } from "lucide-react";
import { ContactLead } from "@/services/lead.service";

export default function LeadsListPage() {
  const { data: leads, isLoading } = useLeads();
  const deleteLeadMutation = useDeleteLead();
  const markAsReadMutation = useMarkLeadAsRead();

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete({
      title: "Delete Inquiry?",
      text: "Are you sure you want to delete this contact inquiry? This action cannot be undone.",
    });

    if (confirmed) {
      deleteLeadMutation.mutate(id);
    }
  };

  const handleToggleRead = (id: string, currentReadState: boolean) => {
    markAsReadMutation.mutate({ id, isRead: !currentReadState });
  };

  const columns: ColumnConfig<ContactLead>[] = [
    {
      header: "Status",
      cell: (item) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleToggleRead(item.id, item.isRead)}
          className={`h-8 w-8 rounded-full ${
            item.isRead ? "text-zinc-500 hover:text-zinc-350" : "text-violet-400 hover:text-violet-300"
          }`}
          title={item.isRead ? "Mark as Unread" : "Mark as Read"}
        >
          {item.isRead ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
        </Button>
      ),
    },
    {
      header: "Sender",
      cell: (item) => (
        <div className="flex flex-col">
          <span className={`text-sm ${item.isRead ? "text-zinc-455 font-normal" : "text-zinc-100 font-bold"}`}>
            {item.name}
          </span>
          <span className="text-xs text-zinc-500">{item.email}</span>
        </div>
      ),
    },
    {
      header: "Subject",
      cell: (item) => (
        <span className={`text-xs ${item.isRead ? "text-zinc-400 font-normal" : "text-zinc-200 font-semibold"}`}>
          {item.subject || "(No Subject)"}
        </span>
      ),
    },
    {
      header: "Message",
      cell: (item) => (
        <span className="text-xs text-zinc-400 max-w-[200px] truncate block">
          {item.message}
        </span>
      ),
    },
    {
      header: "Received",
      cell: (item) => (
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Calendar className="w-3.5 h-3.5" />
          <span>{new Date(item.createdAt).toLocaleString()}</span>
        </div>
      ),
    },
    {
      header: "Actions",
      cell: (item) => (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/leads/${item.id}`}>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-850"
              title="View Detail"
            >
              <Eye className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => handleDelete(item.id)}
            disabled={deleteLeadMutation.isPending}
            className="h-8 w-8 text-red-400 hover:text-red-300 bg-red-950/20 hover:bg-red-900/30 border border-red-900/50"
            title="Delete"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  const unreadCount = leads?.filter((l) => !l.isRead).length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Contact Leads</h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-400">
            Inbox for form submissions sent from your website's contact section.
          </p>
        </div>
      </div>

      <DataTable data={leads} columns={columns} isLoading={isLoading} />
    </div>
  );
}

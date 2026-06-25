"use client";

import React, { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLead, useDeleteLead, useMarkLeadAsRead } from "@/hooks/use-leads";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { confirmDelete } from "@/components/cms/ConfirmDialog";
import { Loader2, ArrowLeft, Trash2, Mail, MailOpen, Calendar } from "lucide-react";

interface LeadDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function LeadDetailPage({ params }: LeadDetailPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const queryClient = useQueryClient();

  const { data: lead, isLoading } = useLead(id);
  const deleteLeadMutation = useDeleteLead();
  const markAsReadMutation = useMarkLeadAsRead();

  useEffect(() => {
    if (lead) {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    }
  }, [lead, queryClient]);

  const handleDelete = async () => {
    const confirmed = await confirmDelete({
      title: "Delete Lead?",
      text: "Are you sure you want to delete this contact lead inquiry permanently?",
    });

    if (confirmed && lead) {
      deleteLeadMutation.mutate(lead.id, {
        onSuccess: () => {
          router.push("/dashboard/leads");
        },
      });
    }
  };

  const handleToggleRead = () => {
    if (lead) {
      markAsReadMutation.mutate({ id: lead.id, isRead: !lead.isRead });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-center py-10">
        <p className="text-zinc-400">Lead inquiry not found or has been deleted.</p>
        <Button onClick={() => router.push("/dashboard/leads")} className="mt-4">
          Go Back to Inbox
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/dashboard/leads")}
          className="border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-xl"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Inbox
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleRead}
            className="border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-900 rounded-xl gap-2"
          >
            {lead.isRead ? (
              <>
                <Mail className="h-4 w-4" />
                Mark Unread
              </>
            ) : (
              <>
                <MailOpen className="h-4 w-4" />
                Mark Read
              </>
            )}
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={deleteLeadMutation.isPending}
            className="text-red-400 hover:text-red-300 bg-red-950/20 hover:bg-red-900/30 border border-red-900/50 rounded-xl gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete Lead
          </Button>
        </div>
      </div>

      <Card className="border-zinc-800 bg-zinc-900/20 backdrop-blur-md">
        <CardHeader className="border-b border-zinc-800/80 pb-6">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <CardTitle className="text-zinc-100 text-2xl font-bold">
                {lead.subject || "(No Subject)"}
              </CardTitle>
              <CardDescription className="text-zinc-400 mt-2 flex flex-col gap-1 text-sm font-medium">
                <div>
                  <span className="text-zinc-500 font-normal">From:</span>{" "}
                  <span className="text-zinc-200">{lead.name}</span>{" "}
                  <span className="text-zinc-550">&lt;{lead.email}&gt;</span>
                </div>
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-900">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(lead.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Message</span>
            <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-900 text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap font-sans min-h-[150px]">
              {lead.message}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

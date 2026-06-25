import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { leadService, ContactLeadInput } from "@/services/lead.service";
import { toast } from "sonner";

export const leadKeys = {
  all: ["leads"] as const,
  detail: (id: string) => ["leads", id] as const,
};

export function useLeads() {
  return useQuery({
    queryKey: leadKeys.all,
    queryFn: leadService.getLeads,
  });
}

export function useLead(id: string) {
  return useQuery({
    queryKey: leadKeys.detail(id),
    queryFn: () => leadService.getLead(id),
    enabled: Boolean(id),
  });
}

export function useMarkLeadAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isRead }: { id: string; isRead: boolean }) => leadService.markAsRead(id, isRead),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: leadKeys.all });
      queryClient.setQueryData(leadKeys.detail(data.id), data);
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("Failed to update status");
    },
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leadService.deleteLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadKeys.all });
      toast.success("Lead deleted successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete lead");
    },
  });
}

export function useSubmitLead() {
  return useMutation({
    mutationFn: leadService.submitLead,
    onSuccess: () => {
      toast.success("Message sent successfully! We will get back to you soon.");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
    },
  });
}

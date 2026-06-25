import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { settingService, SiteSettings } from "@/services/setting.service";
import { toast } from "sonner";

export const settingKeys = {
  all: ["settings"] as const,
};

export function useSettings() {
  return useQuery({
    queryKey: settingKeys.all,
    queryFn: settingService.getSettings,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: settingService.updateSettings,
    onSuccess: (data) => {
      queryClient.setQueryData(settingKeys.all, data);
      toast.success("Site settings updated successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update site settings");
    },
  });
}

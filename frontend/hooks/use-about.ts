import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { aboutService, AboutSection } from "@/services/about.service";
import { toast } from "sonner";

export const aboutKeys = {
  all: ["about"] as const,
};

export function useAbout() {
  return useQuery({
    queryKey: aboutKeys.all,
    queryFn: aboutService.getAbout,
  });
}

export function useUpdateAbout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: aboutService.updateAbout,
    onSuccess: (data) => {
      queryClient.setQueryData(aboutKeys.all, data);
      toast.success("About section updated successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update About section");
    },
  });
}

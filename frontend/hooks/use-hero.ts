import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { heroService, HeroSection } from "@/services/hero.service";
import { toast } from "sonner";

export const heroKeys = {
  all: ["hero"] as const,
};

export function useHero() {
  return useQuery({
    queryKey: heroKeys.all,
    queryFn: heroService.getHero,
  });
}

export function useUpdateHero() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: heroService.updateHero,
    onSuccess: (data) => {
      queryClient.setQueryData(heroKeys.all, data);
      toast.success("Hero section updated successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update Hero section");
    },
  });
}

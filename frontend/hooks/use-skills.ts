import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { skillService, SkillInput } from "@/services/skill.service";
import { toast } from "sonner";

export const skillKeys = {
  all: ["skills"] as const,
  detail: (id: string) => ["skills", id] as const,
};

export function useSkills() {
  return useQuery({
    queryKey: skillKeys.all,
    queryFn: skillService.getSkills,
  });
}

export function useSkill(id: string) {
  return useQuery({
    queryKey: skillKeys.detail(id),
    queryFn: () => skillService.getSkill(id),
    enabled: Boolean(id),
  });
}

export function useCreateSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: skillService.createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: skillKeys.all });
      toast.success("Skill created successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create skill");
    },
  });
}

export function useUpdateSkill(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SkillInput) => skillService.updateSkill(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: skillKeys.all });
      queryClient.setQueryData(skillKeys.detail(id), data);
      toast.success("Skill updated successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update skill");
    },
  });
}

export function useDeleteSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: skillService.deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: skillKeys.all });
      toast.success("Skill deleted successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete skill");
    },
  });
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService, ProjectInput, Project } from "@/services/project.service";
import { toast } from "sonner";

export const projectKeys = {
  all: ["projects"] as const,
  list: (published?: boolean) => ["projects", "list", { published }] as const,
  detail: (idOrSlug: string) => ["projects", "detail", idOrSlug] as const,
};

export function useProjects(published?: boolean) {
  return useQuery({
    queryKey: projectKeys.list(published),
    queryFn: () => projectService.getProjects(published),
  });
}

export function useProject(idOrSlug: string) {
  return useQuery({
    queryKey: projectKeys.detail(idOrSlug),
    queryFn: () => projectService.getProject(idOrSlug),
    enabled: Boolean(idOrSlug),
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      toast.success("Project created successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create project");
    },
  });
}

export function useUpdateProject(idOrSlug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ProjectInput>) => projectService.updateProject(idOrSlug, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      queryClient.setQueryData(projectKeys.detail(idOrSlug), data);
      // Invalidate specific slug and id just in case they differ
      if (data.id) queryClient.invalidateQueries({ queryKey: projectKeys.detail(data.id) });
      if (data.slug) queryClient.invalidateQueries({ queryKey: projectKeys.detail(data.slug) });
      toast.success("Project updated successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update project");
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      toast.success("Project deleted successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete project");
    },
  });
}

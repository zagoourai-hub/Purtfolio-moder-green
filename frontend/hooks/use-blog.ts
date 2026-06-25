import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogService, BlogPostInput, BlogPost } from "@/services/blog.service";
import { toast } from "sonner";

export const blogKeys = {
  all: ["blog"] as const,
  list: (published?: boolean) => ["blog", "list", { published }] as const,
  detail: (idOrSlug: string) => ["blog", "detail", idOrSlug] as const,
};

export function usePosts(published?: boolean) {
  return useQuery({
    queryKey: blogKeys.list(published),
    queryFn: () => blogService.getPosts(published),
  });
}

export function usePost(idOrSlug: string) {
  return useQuery({
    queryKey: blogKeys.detail(idOrSlug),
    queryFn: () => blogService.getPost(idOrSlug),
    enabled: Boolean(idOrSlug),
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
      toast.success("Blog post created successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create blog post");
    },
  });
}

export function useUpdatePost(idOrSlug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<BlogPostInput>) => blogService.updatePost(idOrSlug, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
      queryClient.setQueryData(blogKeys.detail(idOrSlug), data);
      if (data.id) queryClient.invalidateQueries({ queryKey: blogKeys.detail(data.id) });
      if (data.slug) queryClient.invalidateQueries({ queryKey: blogKeys.detail(data.slug) });
      toast.success("Blog post updated successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update blog post");
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
      toast.success("Blog post deleted successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete blog post");
    },
  });
}

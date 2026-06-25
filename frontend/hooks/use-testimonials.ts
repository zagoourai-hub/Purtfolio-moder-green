import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { testimonialService, TestimonialInput } from "@/services/testimonial.service";
import { toast } from "sonner";

export const testimonialKeys = {
  all: ["testimonials"] as const,
  list: (published?: boolean) => ["testimonials", "list", { published }] as const,
  detail: (id: string) => ["testimonials", "detail", id] as const,
};

export function useTestimonials(published?: boolean) {
  return useQuery({
    queryKey: testimonialKeys.list(published),
    queryFn: () => testimonialService.getTestimonials(published),
  });
}

export function useTestimonial(id: string) {
  return useQuery({
    queryKey: testimonialKeys.detail(id),
    queryFn: () => testimonialService.getTestimonial(id),
    enabled: Boolean(id),
  });
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: testimonialService.createTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testimonialKeys.all });
      toast.success("Testimonial created successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create testimonial");
    },
  });
}

export function useUpdateTestimonial(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<TestimonialInput>) => testimonialService.updateTestimonial(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: testimonialKeys.all });
      queryClient.setQueryData(testimonialKeys.detail(id), data);
      toast.success("Testimonial updated successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update testimonial");
    },
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: testimonialService.deleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testimonialKeys.all });
      toast.success("Testimonial deleted successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete testimonial");
    },
  });
}

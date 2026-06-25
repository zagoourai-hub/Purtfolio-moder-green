import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceService, ServiceInput } from "@/services/service.service";
import { toast } from "sonner";

export const serviceKeys = {
  all: ["services"] as const,
  list: (published?: boolean) => ["services", "list", { published }] as const,
  detail: (id: string) => ["services", "detail", id] as const,
};

export function useServices(published?: boolean) {
  return useQuery({
    queryKey: serviceKeys.list(published),
    queryFn: () => serviceService.getServices(published),
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: serviceKeys.detail(id),
    queryFn: () => serviceService.getService(id),
    enabled: Boolean(id),
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: serviceService.createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      toast.success("Service created successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create service");
    },
  });
}

export function useUpdateService(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ServiceInput>) => serviceService.updateService(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      queryClient.setQueryData(serviceKeys.detail(id), data);
      toast.success("Service updated successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update service");
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: serviceService.deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      toast.success("Service deleted successfully!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete service");
    },
  });
}

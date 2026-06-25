import { api } from "@/lib/axios";

export interface Service {
  id: string;
  title: string;
  description: string;
  iconUrl?: string | null;
  price?: string | null;
  order: number;
  published: boolean;
}

export interface ServiceInput {
  title: string;
  description: string;
  iconUrl?: string | null;
  price?: string | null;
  order: number;
  published: boolean;
}

export const serviceService = {
  getServices: (published?: boolean) => {
    const url = published ? "/services?published=true" : "/services";
    return api.get<Service[]>(url).then((res) => res.data);
  },
  getService: (id: string) => api.get<Service>(`/services/${id}`).then((res) => res.data),
  createService: (data: ServiceInput) => api.post<Service>("/services", data).then((res) => res.data),
  updateService: (id: string, data: Partial<ServiceInput>) =>
    api.put<Service>(`/services/${id}`, data).then((res) => res.data),
  deleteService: (id: string) => api.delete<{ message: string }>(`/services/${id}`).then((res) => res.data),
};

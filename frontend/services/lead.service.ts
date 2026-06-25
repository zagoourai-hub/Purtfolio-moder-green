import { api } from "@/lib/axios";

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ContactLeadInput {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
}

export const leadService = {
  getLeads: () => api.get<ContactLead[]>("/leads").then((res) => res.data),
  getLead: (id: string) => api.get<ContactLead>(`/leads/${id}`).then((res) => res.data),
  markAsRead: (id: string, isRead: boolean) =>
    api.put<ContactLead>(`/leads/${id}`, { isRead }).then((res) => res.data),
  deleteLead: (id: string) => api.delete<{ message: string }>(`/leads/${id}`).then((res) => res.data),
  submitLead: (data: ContactLeadInput) => api.post<ContactLead>("/leads", data).then((res) => res.data),
};

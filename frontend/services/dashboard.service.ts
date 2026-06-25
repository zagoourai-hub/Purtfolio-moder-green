import { api } from "@/lib/axios";

export interface DashboardStats {
  projects: number;
  blogPosts: number;
  unreadLeads: number;
}

export const dashboardService = {
  getStats: () => api.get<DashboardStats>("/dashboard/stats").then((res) => res.data),
};

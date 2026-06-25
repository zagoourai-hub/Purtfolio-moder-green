import { api } from "@/lib/axios";

export type SiteSettings = Record<string, string>;

export const settingService = {
  getSettings: () => api.get<SiteSettings>("/settings").then((res) => res.data),
  updateSettings: (data: SiteSettings) => api.put<SiteSettings>("/settings", data).then((res) => res.data),
};

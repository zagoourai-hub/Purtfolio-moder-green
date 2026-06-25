import { api } from "@/lib/axios";

export interface AboutSection {
  id?: string;
  bio: string;
  photoUrl?: string | null;
  location?: string | null;
  email?: string | null;
  resumeUrl?: string | null;
  updatedAt?: string;
}

export const aboutService = {
  getAbout: () => api.get<AboutSection | null>("/about").then((res) => res.data),
  updateAbout: (data: AboutSection) => api.put<AboutSection>("/about", data).then((res) => res.data),
};

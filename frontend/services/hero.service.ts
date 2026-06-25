import { api } from "@/lib/axios";

export interface HeroSection {
  id?: string;
  greeting: string;
  name: string;
  tagline: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string;
  avatarUrl?: string | null;
  updatedAt?: string;
}

export const heroService = {
  getHero: () => api.get<HeroSection | null>("/hero").then((res) => res.data),
  updateHero: (data: HeroSection) => api.put<HeroSection>("/hero", data).then((res) => res.data),
};

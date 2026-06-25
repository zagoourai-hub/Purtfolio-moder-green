import { api } from "@/lib/axios";

export interface Skill {
  id: string;
  name: string;
  category: string;
  iconUrl?: string | null;
  level: number;
  order: number;
}

export interface SkillInput {
  name: string;
  category: string;
  iconUrl?: string | null;
  level: number;
  order: number;
}

export const skillService = {
  getSkills: () => api.get<Skill[]>("/skills").then((res) => res.data),
  getSkill: (id: string) => api.get<Skill>(`/skills/${id}`).then((res) => res.data),
  createSkill: (data: SkillInput) => api.post<Skill>("/skills", data).then((res) => res.data),
  updateSkill: (id: string, data: SkillInput) => api.put<Skill>(`/skills/${id}`, data).then((res) => res.data),
  deleteSkill: (id: string) => api.delete<{ message: string }>(`/skills/${id}`).then((res) => res.data),
};

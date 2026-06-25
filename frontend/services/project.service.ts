import { api } from "@/lib/axios";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverUrl?: string | null;
  techStack: string[];
  liveUrl?: string | null;
  repoUrl?: string | null;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  coverUrl?: string | null;
  techStack: string[];
  liveUrl?: string | null;
  repoUrl?: string | null;
  featured: boolean;
  published: boolean;
  order: number;
}

export const projectService = {
  getProjects: (published?: boolean) => {
    const url = published ? "/projects?published=true" : "/projects";
    return api.get<Project[]>(url).then((res) => res.data);
  },
  getProject: (idOrSlug: string) => api.get<Project>(`/projects/${idOrSlug}`).then((res) => res.data),
  createProject: (data: ProjectInput) => api.post<Project>("/projects", data).then((res) => res.data),
  updateProject: (idOrSlug: string, data: Partial<ProjectInput>) =>
    api.put<Project>(`/projects/${idOrSlug}`, data).then((res) => res.data),
  deleteProject: (idOrSlug: string) => api.delete<{ message: string }>(`/projects/${idOrSlug}`).then((res) => res.data),
};

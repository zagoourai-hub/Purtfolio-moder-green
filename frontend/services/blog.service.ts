import { api } from "@/lib/axios";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverUrl?: string | null;
  tags: string[];
  published: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostInput {
  title: string;
  excerpt: string;
  content: string;
  coverUrl?: string | null;
  tags: string[];
  published: boolean;
}

export const blogService = {
  getPosts: (published?: boolean) => {
    const url = published ? "/blog?published=true" : "/blog";
    return api.get<BlogPost[]>(url).then((res) => res.data);
  },
  getPost: (idOrSlug: string) => api.get<BlogPost>(`/blog/${idOrSlug}`).then((res) => res.data),
  createPost: (data: BlogPostInput) => api.post<BlogPost>("/blog", data).then((res) => res.data),
  updatePost: (idOrSlug: string, data: Partial<BlogPostInput>) =>
    api.put<BlogPost>(`/blog/${idOrSlug}`, data).then((res) => res.data),
  deletePost: (idOrSlug: string) => api.delete<{ message: string }>(`/blog/${idOrSlug}`).then((res) => res.data),
};

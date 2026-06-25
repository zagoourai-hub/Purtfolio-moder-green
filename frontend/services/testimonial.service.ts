import { api } from "@/lib/axios";

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole?: string | null;
  company?: string | null;
  avatarUrl?: string | null;
  content: string;
  rating: number;
  featured: boolean;
  published: boolean;
  order: number;
}

export interface TestimonialInput {
  clientName: string;
  clientRole?: string | null;
  company?: string | null;
  avatarUrl?: string | null;
  content: string;
  rating: number;
  featured: boolean;
  published: boolean;
  order: number;
}

export const testimonialService = {
  getTestimonials: (published?: boolean) => {
    const url = published ? "/testimonials?published=true" : "/testimonials";
    return api.get<Testimonial[]>(url).then((res) => res.data);
  },
  getTestimonial: (id: string) => api.get<Testimonial>(`/testimonials/${id}`).then((res) => res.data),
  createTestimonial: (data: TestimonialInput) => api.post<Testimonial>("/testimonials", data).then((res) => res.data),
  updateTestimonial: (id: string, data: Partial<TestimonialInput>) =>
    api.put<Testimonial>(`/testimonials/${id}`, data).then((res) => res.data),
  deleteTestimonial: (id: string) =>
    api.delete<{ message: string }>(`/testimonials/${id}`).then((res) => res.data),
};

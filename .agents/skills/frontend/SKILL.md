---
name: frontend
description: Implementasi fitur frontend Next.js 16. Gunakan saat diminta membuat halaman, komponen, layout, form, tabel, modal, state management, API call, atau UI apapun di sisi frontend.
allowed-tools: Read Write Bash(npx *) Bash(npm *) Bash(pnpm *) Bash(node *)
argument-hint: "deskripsi fitur atau komponen"
---

# Frontend Skill — Next.js 16

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack default)
- **UI:** shadcn/ui + Tailwind CSS v4
- **State:** Zustand (client/UI state), TanStack Query v5 (server state)
- **Form:** React Hook Form + Zod (validasi)
- **HTTP Client:** Axios (via TanStack Query)
- **Notifikasi:** Sonner (toast)
- **Animasi:** Motion (penerus Framer Motion)

## Folder Structure

```
frontend/
├── src/
│   ├── app/                   # App Router pages & layouts
│   │   ├── (auth)/            # Route group: login, register
│   │   ├── (dashboard)/       # Route group: protected pages
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── shared/            # Reusable across features
│   │   └── [feature]/         # Feature-specific components
│   ├── hooks/                 # Custom hooks
│   ├── lib/
│   │   ├── axios.ts           # Axios instance + interceptors
│   │   ├── utils.ts           # cn() helper, formatters
│   │   └── validators/        # Zod schemas
│   ├── providers/
│   │   ├── query-provider.tsx # TanStack Query provider
│   │   └── theme-provider.tsx
│   ├── services/              # API service functions (axios calls)
│   ├── stores/                # Zustand stores
│   └── types/                 # TypeScript interfaces & types
├── public/
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Implementation Rules

### Query Provider (singleton — hindari recreate tiap render)

```tsx
// providers/query-provider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

export function QueryProvider({ children }: { children: ReactNode }) {
  // useState lazy init → QueryClient hanya dibuat sekali per mount (SSR-safe)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

```tsx
// app/layout.tsx — bungkus children dengan provider
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
```

### Component Pattern

```tsx
// Komponen interaktif → "use client". Komponen statis → server component (default).
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
});

type FormValues = z.infer<typeof formSchema>;

export function MyComponent() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = (data: FormValues) => {
    // handle submit
  };

  return (/* JSX */ null);
}
```

### API Service Pattern

```tsx
// services/example.service.ts
import { api } from "@/lib/axios";
import type { Example, CreateExampleDto } from "@/types/example";

export const exampleService = {
  getAll: () => api.get<Example[]>("/examples").then((res) => res.data),
  getById: (id: string) => api.get<Example>(`/examples/${id}`).then((res) => res.data),
  create: (dto: CreateExampleDto) => api.post<Example>("/examples", dto).then((res) => res.data),
  update: (id: string, dto: Partial<CreateExampleDto>) =>
    api.patch<Example>(`/examples/${id}`, dto).then((res) => res.data),
  delete: (id: string) => api.delete(`/examples/${id}`),
};
```

### TanStack Query Hook Pattern

```tsx
// hooks/use-examples.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { exampleService } from "@/services/example.service";
import { toast } from "sonner";

export const exampleKeys = {
  all: ["examples"] as const,
  detail: (id: string) => ["examples", id] as const,
};

export function useExamples() {
  return useQuery({
    queryKey: exampleKeys.all,
    queryFn: exampleService.getAll,
  });
}

export function useCreateExample() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: exampleService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exampleKeys.all });
      toast.success("Berhasil dibuat");
    },
    onError: () => toast.error("Gagal membuat data"),
  });
}
```

### Zustand Store Pattern (UI state only)

```tsx
// stores/use-sidebar-store.ts
import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
}));
```

### Axios Instance (SSR-safe, anti redirect-loop)

```tsx
// lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // httpOnly cookie JWT
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Guard: hanya redirect di browser, dan jangan loop kalau sudah di /login
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      !window.location.pathname.startsWith("/login")
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
```

## Design-Match Routine (Pencocokan UI dengan Referensi)

Pakai routine ini saat ada gambar referensi di folder `design/` dan tugasnya bikin/ubah UI agar sama dengan referensi. Butuh **Playwright MCP terpasang** + **dev server jalan**.

### Langkah

1. **Petakan referensi.** Baca gambar di `design/` (vision). Cocokkan nama file dengan halaman: `design/login.png` → route `/login`, `design/dashboard.png` → `/dashboard`. Kalau pemetaan tidak jelas, tanya bigboss dulu.

2. **Implementasi awal.** Build halaman/komponen dari referensi (layout, tipografi, warna, spacing) pakai stack standar (shadcn/ui + Tailwind v4).

3. **Capture UI yang berjalan.** Pastikan dev server hidup (`npm run dev`), lalu screenshot via Playwright ke `design/.work/`:

```typescript
// scripts/capture.ts — dijalankan agent untuk ambil screenshot
import { chromium } from "playwright";

const TARGET = process.argv[2] ?? "/";       // mis. "/login"
const OUT = process.argv[3] ?? "design/.work/current.png";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`http://localhost:3000${TARGET}`, { waitUntil: "networkidle" });
await page.screenshot({ path: OUT, fullPage: true });
await browser.close();
```

> Atau langsung lewat Playwright MCP (`browser_navigate` + `browser_take_screenshot`) tanpa file script.

4. **Bandingkan.** Sandingkan `design/<page>.png` (referensi) vs screenshot. Cek beda pada: **layout & posisi**, **spacing/padding/margin**, **warna** (background, teks, aksen), **tipografi** (font, size, weight, line-height), **ukuran & radius komponen**, **state** (hover/active bila terlihat).

5. **Perbaiki & ulangi.** Edit kode untuk menutup selisih → screenshot ulang → bandingkan lagi. Ulangi sampai mirip.

### Aturan iterasi

- **Maksimal 3 iterasi** otomatis. Kalau setelah 3x masih ada selisih signifikan, **berhenti dan lapor ke bigboss** dengan: apa yang sudah sama, apa yang belum, dan kenapa (mis. aset/font tidak tersedia, ambiguitas referensi).
- Target: **visually match (mirip dekat)**, BUKAN pixel-perfect. Mockup tangan jarang 100% identik (font rendering, anti-alias, spacing responsif).
- Jangan ubah logic/data demi tampilan — hanya layer presentasi (markup + Tailwind classes).
- Screenshot kerja taruh di `design/.work/` (tambahkan ke `.gitignore`), jangan timpa file referensi asli di `design/`.

### Prasyarat & fallback

- **Browser belum terpasang** → kalau screenshot pertama gagal dengan pesan browser tidak ditemukan, jalankan `npx playwright install chromium` sekali via terminal, lalu ulangi. Ini idempotent (kalau sudah ada, cepat selesai). Lakukan otomatis, tidak perlu tanya bigboss.
- **Playwright MCP belum aktif** → beri tahu bigboss: pastikan `.mcp.json` ada di root project lalu restart sesi (`claude` / `codex` / `agy`), cek dengan `/mcp`.
- **Dev server mati** → minta bigboss jalankan `npm run dev` dulu (routine butuh URL hidup untuk di-screenshot).
- Kalau referensi cuma sebagian (mis. 1 komponen), cocokkan komponen itu saja, jangan paksa seluruh halaman.

## Larangan

- JANGAN gunakan `any` — selalu definisikan type/interface
- JANGAN fetch data di component langsung — selalu via service + TanStack Query hook
- JANGAN simpan server state di Zustand — Zustand hanya untuk UI/client state
- JANGAN gunakan `useEffect` untuk data fetching — gunakan TanStack Query
- JANGAN buat `new QueryClient()` di dalam body komponen tanpa `useState` (recreate tiap render)
- JANGAN akses `window`/`document` tanpa guard `typeof window !== "undefined"`
- JANGAN hardcode warna — gunakan Tailwind CSS classes
- JANGAN buat component > 200 baris — pecah jadi sub-components

## Task

$ARGUMENTS

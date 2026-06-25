# AGENTS.md — Zagoour Engineering Standards

Konstitusi global untuk semua agent (Antigravity CLI, Codex CLI, Claude Code) di project ini.
Detail implementasi per domain ada di skill (`.agents/skills/` atau `.claude/skills/`). File ini = aturan wajib, skill = how-to.

---

## Persona

- Panggil user dengan **"bigboss"**. Nama asisten: **"Zagoour"**.
- Peran: senior software engineer + product architect + technical consultant.

## Bahasa & Output

- **Penjelasan: Bahasa Indonesia.** **Kode, variabel, komentar kode: Bahasa Inggris.**
- Kode selalu dalam code block dengan label bahasa.
- Respons panjang: pakai heading & section jelas.
- Jawab langsung ke inti — tanpa basa-basi pembuka.

## Aturan Perilaku Wajib

1. Jawab LANGSUNG ke inti, tidak ada kalimat pembuka tak perlu.
2. Kode selalu: TypeScript, clean, modular, **production-ready** (bisa langsung dijalankan).
3. Bug → **root cause analysis dulu**, baru solusi.
4. Pilihan teknis → berikan **2-3 opsi dengan trade-off**.
5. PRD/dokumentasi → format terstruktur dengan task atomik.
6. **Sebelum implement modul/PRD apa pun: `web_fetch` dokumentasi resmi library** untuk konfirmasi versi terbaru, breaking change, dan API terkini. JANGAN andalkan training data.


##  Halaman atau Link Web yang akan di fecth

Selalu `web_fetch` doc resmi untuk konfirmasi versi terbaru, breaking changes & API terkini. **Jangan andalkan training data.** Prioritaskan MCP server untuk shadcn/ui & Aceternity UI. Pakai varian LLM-friendly bila ada (`/llms.txt`).

| Tool | URL |
|---|---|
| Next.js | https://nextjs.org/docs · LLM: https://nextjs.org/docs/llms.txt |
| React | https://react.dev/reference/react |
| Tailwind | https://tailwindcss.com/docs/installation |
| shadcn/ui | https://ui.shadcn.com/docs |
| Magic UI | https://magicui.design/docs |
| Aceternity UI | https://ui.aceternity.com/docs/add-utilities |
| Zustand | https://zustand.docs.pmnd.rs/getting-started/introduction |
| TanStack Query | https://tanstack.com/query/latest/docs/framework/react/overview |
| React Hook Form | https://react-hook-form.com/get-started |
| Zod | https://zod.dev |
| Sonner | https://sonner.emilkowal.ski/getting-started |
| SweetAlert2 | https://sweetalert2.github.io |
| Framer Motion | https://motion.dev/docs/react |
| NestJS | https://docs.nestjs.com |
| Prisma v7 | https://www.prisma.io/docs/orm |
| BullMQ | https://docs.bullmq.io |
| FastAPI | https://fastapi.tiangolo.com |
| Gemini API | https://ai.google.dev/gemini-api/docs |
| Ollama API | https://github.com/ollama/ollama/blob/main/docs/api.md |
| Docker Compose | https://docs.docker.com/compose |
| Coolify | https://coolify.io/docs |

---

## Larangan

- JANGAN jawab dengan asumsi — tanya kalau konteks kurang.
- JANGAN buat kode yang tidak bisa langsung dijalankan.
- JANGAN pakai `any` di TypeScript tanpa alasan kuat.
- JANGAN rekomendasikan stack yang belum mature untuk production.

---

## Struktur Folder (WAJIB atau ambil dari PRD)

Selalu `frontend/` + `backend/` (+ `ai-service/` bila ada). **JANGAN `apps/`.**

```
project/
├── frontend/     # Next.js 16
├── backend/      # NestJS v11 (jika ada di prd buat)
├── ai-service/   # FastAPI (Python) ATAU Node.js (opsional)
└── docker/
    ├── frontend/Dockerfile
    ├── backend/Dockerfile    (opsional jika ada di prd buat)
    ├── ai-service/Dockerfile (opsional jika ada di prd buat)
    └── docker-compose.yml
```


## STANDING TECH STANDARDS (FIXED — selalu berlaku)

**Folder structure:** selalu `frontend/` + `backend/` (➕ `ai-service/` kalau PRD butuh). **Bukan** `apps/`.


**Folder internal — separation of concerns (UI ≠ logic):**

Frontend (Next.js, **feature-based**):
```
frontend/
├── app/                 # ROUTING ONLY — page tipis, cuma compose
├── features/<nama>/     # per domain
│   ├── components/      # UI MURNI (presentational, terima props)
│   ├── hooks/           # LOGIC: state, effect, orchestration
│   ├── api/             # DATA: TanStack Query (query/mutation)
│   ├── store/           # Zustand slice (opsional)
│   ├── schema/          # Zod schema + inferred types
│   └── types.ts
├── components/ui/       # shadcn/ui — shared UI murni
├── components/layout/   # navbar, sidebar, shell
├── hooks/               # shared hooks lintas-fitur
├── lib/                 # api-client, utils, config
├── stores/              # global store (opsional)
└── types/               # global types
```
Aturan keras pemisahan:
- `app/` → cuma compose + layout. ❌ no business logic, no fetch langsung.
- `components/` → terima props → render JSX. ❌ no useQuery / fetch / kalkulasi.
- `hooks/` → semua state & logic, panggil `api/`. ❌ no return JSX.
- `api/` → semua data fetching lewat `lib/api-client`.

Backend (NestJS, **module-based**): tiap modul = `dto/` · `*.controller.ts` (HTTP tipis) · `*.service.ts` (business logic) · `*.guard.ts` · `*.module.ts`. **Controller tipis, Service pegang logic.** Shared guard/interceptor/filter → `common/`.

**Next.js:** `16` (patch terbaru 16.2.7). Turbopack = default bundler. Scaffold: `npx create-next-app@16`.

---


## Stack Default

- **Frontend:** Next.js 16 (App Router, Turbopack) + shadcn/ui + Tailwind v4 + Zustand (UI state) + TanStack Query v5 (server state) + React Hook Form + Zod + Sonner + Motion.
  - UI libs: shadcn/ui + Magic UI + Aceternity UI — **free components only** (no Pro/All-Access).
- **Backend:** NestJS v11 + Prisma v7 + PostgreSQL 16 + Redis + JWT (httpOnly cookie) + class-validator.
- **AI:** OpenRouter multi-provider gateway; Gemini primary + Ollama fallback.
- **DevOps:** Docker + Coolify + GitHub Actions.



## Prisma v7 (WAJIB, locked)

- `generator client { provider = "prisma-client"; output = "../generated/prisma" }`.
- **`url` TIDAK ditulis di `datasource` block** `schema.prisma` (Prisma 7 → error P1012). URL pindah ke `prisma.config.ts`.
- `prisma.config.ts` di root: `import "dotenv/config"`, `defineConfig` + `env` dari `prisma/config`, `datasource: { url: env("DATABASE_URL") }`. **JANGAN pakai `earlyAccess`** (sudah dihapus di v7).
- PrismaClient via driver adapter (`@prisma/adapter-pg` + `pg`). Import dari `../generated/prisma/client`.
- Runtime: Node >= 20.19, TypeScript >= 5.4.

## NestJS Pattern (WAJIB)

- Pisahkan concern: **DTO → Service → Controller → Guard**.
- Business logic HANYA di service. Controller tipis. Query Prisma HANYA via service.
- Semua input via DTO + class-validator. `ValidationPipe` global: `whitelist`, `forbidNonWhitelisted`, `transform`.
- JANGAN return field sensitif (password) — pakai `select`/`omit`.
- File > 200 baris → pecah.

## Keamanan (WAJIB)

- Enkripsi key sensitif: **AES-256-GCM** (authenticated). JANGAN < 256-bit atau non-authenticated.
- Password: bcryptjs salt rounds 12.
- JWT: httpOnly + Secure + SameSite, access token pendek + refresh token rotation.
- BYOK: API key dienkripsi server-side, **tidak pernah** terekspos ke browser/response/log.
- CORS: origin eksplisit, bukan `*` di production.
- Rate limit di semua endpoint publik. CSRF: double-submit cookie (BUKAN `csurf`).

## Pencocokan UI dengan Referensi Desain

Jika ada gambar referensi di folder `design/` DAN tugasnya implement/ubah UI:
1. Baca gambar referensi di `design/` (vision) sebagai sumber kebenaran tampilan.
2. Jalankan dev server, lalu pakai Playwright untuk screenshot halaman yang dikerjakan.
3. Bandingkan screenshot vs referensi: layout, spacing, warna, tipografi, komponen.
4. Kalau belum sama → perbaiki kode → screenshot ulang → ulangi sampai mirip.
5. Target: visually match (mirip dekat), bukan wajib pixel-perfect.

Prasyarat: tool/MCP Playwright terpasang + dev server jalan. Gambar referensi dibaca langsung (vision); Playwright hanya untuk menangkap UI yang sedang berjalan.

## Proses PRD

User umumnya **sudah punya PRD** — tugas utama: review/validasi, bukan bikin baru. Saat butuh, ikuti skill `analyze-prd` (mode `review | validate | gap`).
Kalau memang diminta buat PRD baru: tanya dulu 6 hal (target user & business model, prioritas fitur, state/form/server-state mgmt, struktur folder, versi Next/shadcn/Prisma/Nest, UI libs). Format: phase → atomic task, tag wajib `[FE]` `[BE]` `[AI]` `[OPS]`, output `.md`, MVP lean.

## List Fitur Selesai tandai dengan [x]
> Sumber kebenaran task detail = `PRD.md` (atomik). Section ini = ledger progres level-grup.
> Workflow: saat one grup beres → ubah `[ ]`→`[x]` di "Belum Selesai", lalu pindahkan barisnya ke sini.
- [x] Phase 1.1: Init Project (Next.js 16, deps: Prisma v7, shadcn/ui, NextAuth v5, Motion, Sonner, SweetAlert2, react-md-editor, .env setup)
- [x] Phase 1.2: Database & Prisma Setup (PrismaClient singleton lib/prisma.ts, Generate client, Seed database)
- [x] Phase 1.3: Auth Setup (lib/auth.ts configuration, api/auth route, auth middleware, Login page /login)
- [x] Phase 2.1: Dashboard Layout & Stats (Sidebar, Topbar layout, Stats count cards & API)
- [x] Phase 2.2: Reusable CMS Components (DataTable, ImageUploader, MarkdownEditor, ConfirmDialog, local uploads API Route)
- [x] Phase 3.1: Hero & About CMS Module (Hero form, About bio markdown editor, GET/PUT APIs)
- [x] Phase 3.2: Skills CMS Module (Skills list, CRUD views & API, ordering)
- [x] Phase 3.3: Projects CMS Module (Projects list, CRUD views & API, slug generator, cover upload)
- [x] Phase 3.4: Blog CMS Module (Blog list, CRUD views & API, tag management, publishedAt logic)
- [x] Phase 3.5: Services CMS Module (Services list, CRUD views & API, ordering)
- [x] Phase 3.6: Testimonials CMS Module (Testimonials list, CRUD views & API)
- [x] Phase 3.7: Contact Leads CMS Module (Leads inbox list, view detail, mark as read / delete API)
- [x] Phase 3.8: Site Settings Panel (Site configuration form, key-value settings API)
- [x] Phase 4.1: Homepage (Public Navbar/Footer, Hero, About, Skills, Projects grid, Services, Testimonials, Contact form, SSR integration)
- [x] Phase 4.2: Projects Page (Public Projects listing, Project slug detail page with SSG)
- [x] Phase 4.3: Blog Page (Public Blog listing, tag filter, Blog slug detail page with SSR)
- [x] Phase 4.4: Services Page (Public Services listing)
- [x] Phase 4.5: SEO & Meta (Root default metadata, sitemap.xml, robots.txt, dynamic OG Image support)
- [x] Phase 5.1: Motion Animations (Fade-in-up scroll reveal, staggered text entry, reduced-motion fallback)
- [x] Phase 5.2: UI Polish (Responsive layout testing, skeletons, error boundaries, dark/light mode setup)
- [x] Phase 6.1: Dockerfile (Next.js standalone multi-stage build)
- [x] Phase 6.2: Docker Compose Setup (Next.js standalone + PostgreSQL + Nginx)
- [x] Phase 6.3: Nginx Container Config (Reverse proxy, direct static serve for /uploads)
- [x] Phase 6.4: Prisma Docker Migration (Entrypoint script migration deploy)
- [x] Phase 6.5: Setup Script & README (One-click setup.sh, README deployment manual)

## List Fitur Belum Selesai ( -Buat Secara rapih Terstruktur- )
> Sumber kebenaran task detail = `PRD.md`

---

> Skill terkait: `frontend`, `backend`, `ai-service`, `schema`, `security`, `testing`, `docker`, `debug`, `git-workflow`, `analyze-code`, `analyze-prd`.
> Untuk Claude Code: salin/symlink file ini sebagai `CLAUDE.md` di root.


## Log Perubahan

- **2026-06-25** - Inisialisasi project Next.js 16 fullstack monolith (Opsi 1), setup database schema Prisma v7, konfigurasi Docker Compose database lokal, inisialisasi shadcn/ui dan dependensi utama, integrasi task list terstruktur. Menjalankan Docker container PostgreSQL, migrasi skema database, dan database seeding untuk admin user & data dummy. Menyelesaikan Phase 2.1 dengan membuat layout dashboard admin, Sidebar, Topbar, API Route statistik, dan halaman dashboard overview yang memuat data via TanStack Query. Menyelesaikan Phase 2.2 dengan membuat komponen reusable: DataTable, ImageUploader, MarkdownEditor (dengan dynamic client-side loading), ConfirmDialog (wrapper SweetAlert2), dan API route POST /api/upload dengan validasi proteksi admin & batasan size 5MB.
- **2026-06-25 (Milestone CMS Modules)** - Menyelesaikan seluruh modul CMS Backend APIs & Frontend UI Dashboard (Phase 3). Membuat dan menghubungkan custom Axios API services dan custom React Query hooks untuk Hero, About, Skills, Projects, Blog, Services, Testimonials, Leads, dan Settings. Mengintegrasikan reusable components (DataTable, ImageUploader, MarkdownEditor, dan ConfirmDialog) dengan error handling dan loading state premium. Melakukan instalasi dan konfigurasi komponen tabs `@/components/ui/tabs` dari shadcn/ui. Menyelesaikan seluruh compiler check dan build Next.js 16 production secara sukses tanpa error.
- **2026-06-25 (Milestone Public Pages)** - Menyelesaikan seluruh halaman publik (Phase 4). Membuat layout publik dengan Navbar & Footer dinamis, homepage SSR terintegrasi direct database fetch, halaman listing & detail projects (SSG dengan generateStaticParams & generateMetadata SEO), halaman blog listing dengan filters & blog detail (SSR), serta halaman services. Menambahkan robots.txt, dynamic sitemap XML generator, dan dynamic OpenGraph Image generation via Edge Runtime ImageResponse. Memvalidasi production build Next.js sukses tanpa error.
- **2026-06-25 (Milestone Animation & Polish)** - Menyelesaikan optimalisasi UI & Animasi (Phase 5). Mengonfigurasi reduced-motion secara global menggunakan MotionConfig Next.js. Memoles detail responsive layout, membuat error boundary global (app/error.tsx), loading fallback global (app/loading.tsx), dan memastikan semua form CMS memiliki disabled submit + loading state indicator yang premium.
- **2026-06-25 (Milestone DevOps & Docker)** - Menyelesaikan konfigurasi deployment produksi (Phase 6). Membuat multi-stage Dockerfile Next.js standalone, Nginx proxy configuration, docker-compose.yml orkestrasi 3 container (frontend, database, proxy), setup script instalasi otomatis sekali-klik (setup.sh), serta file instruksi README.md.
- **2026-06-25 (Docker Run, Seeding, & Playwright MCP Activation)** - Menjalankan rebuild image frontend, merecreate docker container, dan berhasil mengeksekusi database seeding (`npx prisma db seed`) di dalam docker container `porto-frontend` untuk mengisi dummy data dan admin user default. Mengonfigurasi Playwright MCP server baik di tingkat workspace (`.mcp.json`) maupun global (`mcp_config.json`) agar siap digunakan untuk UI testing/screenshot matching.
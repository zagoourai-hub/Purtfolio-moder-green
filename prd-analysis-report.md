# PRD Analysis Report — Web Portfolio CMS Template

**Author:** Zagoour (Senior Software Engineer & Product Architect)  
**Date:** 2026-06-25  
**Project:** Web Portfolio CMS Template  

---

## 1. PRD Review Report (Kelengkapan & Kualitas)

### ✅ Kelengkapan Struktur
| Section | Status | Catatan |
|---------|--------|---------|
| Overview & Tujuan | ✅ Ada | Dijelaskan di Section 1 & 2. Sangat jelas untuk template portfolio single-admin. |
| Target User & Persona | ⚠️ Kurang detail | Disebutkan "Agency / Freelancer Template (Single Admin)", tapi tidak ada profil persona spesifik. |
| Business Model | ❌ Tidak ada | Tidak ada penjelasan model monetisasi (apakah opensource gratis, self-hosted paid license, dll). |
| Feature List & Prioritas | ✅ Ada | Didetailkan di Section 6 (Feature Spec) dan Section 10 (Post-MVP Roadmap). |
| Tech Stack | ⚠️ Inkonsisten | Didefinisikan di Section 3. Namun, ada inkonsistensi kritis antara PRD (Next.js fullstack monolithic) dengan Zagoour Engineering Standards di `AGENTS.md` (Next.js + NestJS v11). |
| Task List | ✅ Ada | Tersedia di Section 7 dengan breakdown per fase. |
| Non-functional Requirements | ❌ Tidak ada | Tidak ada sub-section khusus untuk performa (target Lighthouse score), keamanan (selain hash password), dan batasan upload VPS. |
| Out of Scope | ✅ Ada | Didefinisikan dengan baik di Section 2 (Non-Goals). |
| Success Metrics / KPI | ❌ Tidak ada | Tidak ada indikator performa untuk template ini (misalnya tingkat adopsi, kemudahan deploy). |
| Timeline / Milestone | ❌ Tidak ada | Hanya ada estimasi jumlah task (~123 tasks), tanpa timeline waktu. |

---

### 🔴 Ambiguitas Ditemukan
1. **[Section 6.1 - Skills Section]** *"Skills — grid/list per kategori dengan level indicator"*  
   ❓ **Ambiguitas:** Bagaimana visualisasi dari "level indicator"? Apakah menggunakan progress bar persentase (0-100), ataukah tingkatan kualitatif (Beginner, Intermediate, Expert)?  
   💡 **Saran:** Tentukan level indicator menggunakan progress bar horizontal (0-100%) dengan input slider di sisi CMS admin.
2. **[Section 6.1 - Contact Section]** *"Contact — form (nama, email, subject, pesan) → simpan ke DB"*  
   ❓ **Ambiguitas:** Apakah ada mekanisme notifikasi real-time ke admin (Websocket/SSE) saat lead baru masuk, atau hanya sekadar bertambah angkanya saat refresh dashboard?  
   💡 **Saran:** Untuk MVP, notifikasi real-time via SSE/Websocket ditiadakan (sesuai Non-Goals: no real-time push). Notifikasi ditunjukkan via badge angka unread di Sidebar CMS yang di-refresh secara polling atau layout load.
3. **[Section 6.3 - Media Upload]** *"Simpan ke public/uploads/[timestamp]-[filename]"*  
   ❓ **Ambiguitas:** Bagaimana penanganan file name collision yang aman? Jika nama file asli mengandung karakter aneh atau spasi, bagaimana sanitasi namanya?  
   💡 **Saran:** Gunakan format sanitasi: `[timestamp]-[slugified-filename]`.
4. **[Section 6.4 - Auth Flow]** *"NextAuth v5 Credentials provider → bcrypt password compare"*  
   ❓ **Ambiguitas:** Bagaimana mekanisme pembuatan admin pertama kali (bootstrap)? Jika DB kosong dan belum ada seeder yang jalan, admin tidak bisa masuk.  
   💡 **Saran:** Wajibkan running script `prisma/seed.ts` saat inisialisasi awal. Jika di-deploy ke production, izinkan pembuatan admin pertama via route register khusus yang hanya aktif jika tabel `Admin` kosong (`/register-admin-once`).

---

### 🟡 Missing Edge Case
1. **Orphan Media Files (File Sampah):**  
   Ketika admin menghapus project, blog post, atau mengganti avatar, file gambar lama yang tersimpan di `/uploads` tidak ikut terhapus di disk. Hal ini akan menyebabkan disk VPS penuh seiring waktu.  
   💡 **Solusi:** Buat hook/utility pada API Route penghapusan data untuk menghapus file terkait di local disk menggunakan `fs.unlinkSync()`.
2. **Draft Content Route Protection:**  
   Jika sebuah project atau blog post di-set `published: false` (draft), konten tersebut harus tidak bisa diakses secara langsung oleh publik via link langsung `/projects/[slug]` atau `/blog/[slug]`.  
   💡 **Solusi:** Tambahkan validasi pada server-side render (`page.tsx` publik) untuk mengembalikan `notFound()` (404) jika data yang di-fetch berstatus `published: false` dan user tidak terautentikasi sebagai admin.
3. **Slug Collision (Tabrakan Slug):**  
   Slug di-generate otomatis dari Title. Jika admin membuat 2 project dengan judul yang sama (misal "My Awesome App"), Prisma akan melempar error unique constraint pada field `slug`.  
   💡 **Solusi:** Tambahkan helper suffix angka acak/increment jika slug sudah ada di database (misal `my-awesome-app-1`, `my-awesome-app-2`).
4. **Rate Limiting untuk Contact Leads:**  
   Form contact publik rentan di-spam oleh bot. Tanpa rate limiter, database PostgreSQL bisa overload karena spamming leads.  
   💡 **Solusi:** Tambahkan middleware rate limiter (misalnya menggunakan token bucket sederhana di Next.js route memory, atau Google reCAPTCHA v3/Cloudflare Turnstile pada form).

---

### 🟠 Scope Creep Risk
1. **[Section 6.2 - CMS Skills]** *"...reorder (drag or order field)"*  
   ⚠️ **Risiko:** Implementasi Drag and Drop sorting di React (seperti `dnd-kit` atau `@hello-pangea/dnd`) dengan Tailwind v4 dan Server Actions/API Route sering kali memakan waktu pengerjaan yang signifikan dan memicu bug layout.  
   💡 **Rekomendasi:** Untuk MVP, gunakan input field angka `order` (1, 2, 3) di form edit/tambah untuk menentukan urutan tampil secara manual daripada drag & drop interaktif.
2. **[Section 7.6 - Nginx Container Config]** *"...serve langsung dari volume mount (bypass Next.js)"*  
   ⚠️ **Risiko:** Mengonfigurasi volume sharing antara container `frontend` (Next.js) dan `nginx` untuk static uploads membutuhkan konfigurasi path absolute Docker volume yang presisi. Setup SSL (Let's Encrypt/Certbot) di Nginx container juga seringkali terhambat oleh pengaturan DNS VPS client yang bervariasi.  
   💡 **Rekomendasi:** Dokumentasikan skrip setup SSL Certbot secara terpisah di `README.md` dan pastikan named volume Docker didefinisikan dengan tepat di `docker-compose.yml`.

---

### 📊 Skor Kelengkapan PRD
- **Struktur:** 6 / 10
- **Kejelasan:** 7 / 10
- **Edge Case Coverage:** 5 / 10
- **Total: 18 / 30 (Cukup - Perlu klarifikasi stack & penambahan edge cases)**

---

## 2. Task List Validation Report

### 🔴 Inkonsistensi Kritis Stack (Arsitektur Folder)
Ada ketidakcocokan besar antara **Zagoour Engineering Standards (`AGENTS.md`)** dengan **PRD (`PRD.md`)**:
* **Standar AGENTS.md (WAJIB):** Harus dipisah menjadi folder `frontend/` (Next.js 16) + `backend/` (NestJS v11 + Prisma v7).
* **Spesifikasi PRD.md:** Menggunakan arsitektur monolithic fullstack Next.js 16 (NextAuth v5 + Prisma v7 terpasang langsung di Next.js API Routes). Bebas NestJS ("NestJS-free").

#### Opsi Solusi yang Direkomendasikan untuk Bigboss:
1. **Opsi 1 (Sesuai PRD — Recommended untuk Kecepatan MVP):**  
   Tetap gunakan Next.js 16 Fullstack Monolith. Seluruh database logic, ORM Prisma v7, dan Auth ditangani di route `/api/*` Next.js.  
   * *Trade-off:* Lebih cepat dideploy, deployment footprint kecil di VPS (cukup container Next.js + DB), tidak perlu overhead setup CORS & sync model. Melanggar standard `AGENTS.md`, namun sangat efisien untuk scope single admin template.
2. **Opsi 2 (Sesuai Standard Zagoour — Clean Architecture):**  
   Pecah proyek menjadi `frontend/` (Next.js 16) dan `backend/` (NestJS v11). Pindahkan Prisma v7, database migrations, authentication logic (JWT), media uploads, dan API endpoints ke NestJS. Next.js hanya bertindak sebagai consumer API dan penyedia UI.  
   * *Trade-off:* Pemisahan domain logic yang sangat bersih, reusable jika client ingin membuat mobile app, mematuhi standar folder `frontend/` + `backend/`. Namun, waktu development bertambah ~40% karena setup CORS, pemisahan schema, integrasi auth token, dan Docker compose multi-service.

---

### 🟡 Task Tidak Atomik
1. **[Phase 1 > 1.2 Database & Prisma Setup]** *"Tulis full schema.prisma sesuai spec section 5"*  
   💡 **Pecah menjadi:**
   - [BE] Buat file `frontend/prisma/schema.prisma` dan isi dengan basic configuration.
   - [BE] Definisikan model `Admin` dan `SiteSetting` di `schema.prisma`.
   - [BE] Definisikan model `HeroSection`, `AboutSection`, dan `Skill` di `schema.prisma`.
   - [BE] Definisikan model `Project`, `BlogPost`, `Service`, `Testimonial`, dan `ContactLead` di `schema.prisma`.
2. **[Phase 3 > 3.3 Projects]** *"Buat app/(cms)/dashboard/projects/new/page.tsx — form create project (cover upload, markdown desc, tech stack tags, toggle featured/published)"*  
   💡 **Pecah menjadi:**
   - [FE] Buat halaman form dasar `new/page.tsx` dengan react-hook-form dan zod validation.
   - [FE] Integrasikan `ImageUploader` untuk input `coverUrl`.
   - [FE] Integrasikan `MarkdownEditor` untuk field `description`.
   - [FE] Implementasikan input array dinamis untuk `techStack` tags.

---

### 🟠 Urutan Fase & Dependency Issue
1. **NextAuth Secret Setup (.env):**  
   `[Phase 1 > 1.1]` memasang NextAuth tapi env variable `NEXTAUTH_SECRET` baru disebut di akhir sub-task 1.1. Inisialisasi awal Next.js build akan gagal jika library auth tidak mendeteksi secret.  
   💡 **Solusi:** Pindahkan task setup `.env.local` ke urutan kedua setelah inisialisasi framework, sebelum instalasi library auth.
2. **Media Upload & Nginx Volume Mount:**  
   `[Phase 2 > 2.2]` membuat endpoint upload lokal `/api/upload` yang menulis ke `public/uploads/`. Tetapi folder ini baru di-mount sebagai shared Docker volume di `[Phase 6]`.  
   💡 **Solusi:** Pastikan setup `.gitignore` membiarkan folder `public/uploads/` tetap ada (dengan `.gitkeep`) agar development secara lokal tidak memicu error direktori tidak ditemukan (`ENOENT`).

---

### 🔵 Task Missing (Implisit tapi tidak ada)
1. **Next.js Standalone Config Task:**  
   Di Phase 6.1 disebutkan "Set `output: 'standalone'` di `next.config.ts`". Namun tidak ada task khusus untuk mengedit file `next.config.ts` tersebut di fase setup.
2. **Prisma v7 Client Adapter Setup:**  
   Inisialisasi PrismaClient di Next.js dengan driver adapter `@prisma/adapter-pg` memerlukan file inisialisasi singleton yang tepat. Butuh task eksplisit untuk membuat `lib/prisma.ts` yang mengimpor `pg.Pool` dan menghubungkannya dengan adapter Prisma.

---

### 📊 Skor Task List
- **Atomik:** 8 / 10
- **Tag Compliance:** 10 / 10
- **Logical Order:** 9 / 10
- **Completeness:** 8 / 10
- **Total: 35 / 40 (Sangat Baik - Butuh sedikit fine-tuning)**

---

## 3. Gap Analysis Report

### Feature Coverage

Saat ini proyek berada dalam status **Not Started (Inisialisasi Awal)**. Seluruh fitur dari PRD belum diimplementasikan di kode.

| Fitur | PRD Section | Status Implementasi | Catatan |
|---|---|---|---|
| Infrastructure & Setup | Phase 1 | ❌ Not Started | Proyek baru berisi config files (`AGENTS.md`, `CLAUDE.md`, `.mcp.json`). |
| Database Migration & Seed | Phase 1.2 | ❌ Not Started | Skema Prisma belum didefinisikan dan seeder belum dibuat. |
| Authentication (NextAuth v5) | Phase 1.3 | ❌ Not Started | Belum ada logic auth dan login page. |
| Dashboard Layout & Sidebar | Phase 2.1 | ❌ Not Started | Folder `(cms)` dan layout sidebar belum di-scaffold. |
| Media Upload Local Route | Phase 2.2 | ❌ Not Started | Endpoint `/api/upload` belum ada. |
| Hero & About CMS Module | Phase 3.1 | ❌ Not Started | Form edit hero & bio markdown belum dibuat. |
| Skills CRUD Module | Phase 3.2 | ❌ Not Started | CRUD dan rating level belum diimplementasikan. |
| Projects CRUD Module | Phase 3.3 | ❌ Not Started | UI list & form create project belum ada. |
| Blog CRUD Module | Phase 3.4 | ❌ Not Started | Halaman kelola blog post belum dibuat. |
| Services CRUD Module | Phase 3.5 | ❌ Not Started | Halaman kelola services belum dibuat. |
| Testimonials CRUD Module | Phase 3.6 | ❌ Not Started | Halaman kelola testimoni belum dibuat. |
| Contact Leads List & View | Phase 3.7 | ❌ Not Started | Inbox contact form submission belum ada. |
| Site Settings Panel | Phase 3.8 | ❌ Not Started | Halaman kustomisasi SEO/Social links belum ada. |
| Public Portfolio Pages | Phase 4 | ❌ Not Started | Landing page publik (`(public)/page.tsx`) belum ada. |
| Public Projects & Blog Detail | Phase 4.2 - 4.4 | ❌ Not Started | Halaman detail project & blog dengan SSG/SSR belum ada. |
| Motion Animations | Phase 5.1 | ❌ Not Started | Animasi scroll-reveal dan entrance belum diterapkan. |
| Docker Compose Setup | Phase 6 | ❌ Not Started | Dockerfile, Nginx config, dan docker-compose.yml belum dibuat. |

---

### 🔵 Fitur Undocumented (Ada di kode, tidak di PRD)
* *Tidak ada file kode aktual saat ini.*

---

### 📊 Progress Summary
* **Total Fitur Utama di PRD:** 17
* **Implemented:** 0 (0%)
* **Partial:** 0 (0%)
* **Not Started:** 17 (100%)
* **Undocumented Features:** 0
* **Status Proyek:** 🆕 *Inception Phase / Setup*

---

## 4. Rekomendasi Arsitektur & Tindakan Selanjutnya

1. **Keputusan Mengenai NestJS Backend:**  
   Bigboss perlu menentukan apakah kita akan menggunakan **Next.js Fullstack Monolith (Opsi 1)** sesuai PRD, atau **Next.js + NestJS (Opsi 2)** sesuai standar default `AGENTS.md`.  
   *Zagoour merekomendasikan **Opsi 1 (Next.js Fullstack Monolith)** karena aplikasi ini didesain sebagai template portfolio single-admin yang ter-deploy mandiri di VPS. Pendekatan fullstack Next.js 16 menggunakan API Routes dan Prisma v7 akan meminimalkan memori VPS, mempermudah deployment via Docker, dan menyederhanakan authenthication flow.*
   
2. **Langkah Awal Eksekusi (Phase 1):**  
   Setelah keputusan arsitektur diambil, Zagoour akan langsung memulai dengan:
   - Membuat folder `frontend` (Next.js 16) menggunakan Turbopack.
   - Menginisialisasi skema Prisma v7 dan file konfigurasi `prisma.config.ts` canonical.
   - Membuat environment variables dasar dan docker-compose development untuk database PostgreSQL.

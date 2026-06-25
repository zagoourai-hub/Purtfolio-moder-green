# 🐞 Bug Ledger — Porto Modern

> Catatan temuan dari live testing Playwright (2026-06-25). **Belum diperbaiki — untuk dikerjakan nanti.**
> Detail lengkap (langkah reproduksi, bukti, snippet fix): lihat [`test-playwright.md`](./test-playwright.md).

**Legend status:** `🔴 OPEN` belum dikerjakan · `🟡 IN PROGRESS` · `🟢 FIXED` · `⚪ WONTFIX`

---

## Bug Aktif

| ID | Severity | Status | Judul | Lokasi |
|----|----------|--------|-------|--------|
| BUG-01 | 🔴 High | 🟢 FIXED | Proyek "hantu" di homepage nge-link ke 404 | `frontend/components/public/ProjectsSection.tsx` (50–66) |
| BUG-02 | 🟠 Medium | 🟢 FIXED | Login gagal tanpa feedback (toast tidak render) | `frontend/app/(cms)/login/page.tsx` (17–45) |

---

### [x] BUG-01 — Proyek "hantu" di homepage → 404  `🟢 FIXED`

- **Status:** 🟢 FIXED
- **File:** `frontend/components/public/ProjectsSection.tsx` (loop padding baris 50–66)
- **Masalah:** Section "Proyek Unggulan" memaksa selalu 4 kartu dengan mem-*pad* hasil DB pakai data **mock hardcoded**. DB cuma 2 proyek → homepage menyuntik 2 proyek palsu (**"Aplikasi Mobile Banking"**, **"Desain Identitas Brand"**) yang slug-nya **404**.
- **Reproduksi:** Homepage → klik kartu "Aplikasi Mobile Banking" → `404: This page could not be found`.
- **Bukti:** Homepage = 4 kartu · `/projects` = 2 · Dashboard TOTAL PROJECTS = 2 · DB = 2 baris.
- **Dampak:** Broken link (404) di section utama, buruk untuk SEO, konten tak terkelola di CMS, inkonsisten homepage vs `/projects`.
- **Fix (ringkas):** Hapus padding mock → render hanya proyek asli dari DB (1–3 kartu OK). Alternatif: filler "Coming Soon" non-clickable.

---

### [x] BUG-02 — Login gagal tidak menampilkan feedback  `🟢 FIXED`

- **Status:** 🟢 FIXED
- **File:** `frontend/app/(cms)/login/page.tsx` (`handleLogin`, baris 17–45)
- **Masalah:** Kredensial salah ditolak benar (no session, tetap di `/login`) — **tapi tidak ada pesan error** ke user. `toast.error()` dipanggil tapi toast **tidak pernah render** ke DOM.
- **Reproduksi:** `/login` → `admin@porto.com` + password salah → Sign In → diam, tanpa pesan.
- **Bukti:** `POST /api/auth/callback/credentials → 200`, tak ada nav ke `/dashboard` (⟹ res.error truthy), console bersih, region notifikasi DOM kosong 0.7s setelah klik.
- **Root cause:** Flow `signIn("credentials", { redirect: false })` NextAuth v5 beta mereset/membuang state client → toast terbuang. `<Toaster richColors>` sudah benar di root layout.
- **Fix (ringkas):** Pakai **inline error state** (`useState`) yang persisten, jangan andalkan toast pasca-`signIn`. Verifikasi bentuk return `signIn` (`res?.error` / `res?.ok`).

---

## Observasi Minor (low priority / bukan bug fungsional)

| ID | Level | Status | Catatan |
|----|-------|--------|---------|
| OBS-01 | LOW | 🟢 FIXED | `/login` tetap bisa diakses walau sudah login (diarahkan ke `/dashboard` lewat middleware matcher). |
| OBS-02 | LOW | 🔴 OPEN | Warning console `/dashboard`: CSS chunk di-preload tapi tak terpakai. Benign (hint Next.js). |
| OBS-03 | INFO | ⚪ — | Section "kosong" di full-page screenshot = artefak animasi `whileInView` (scroll-reveal). Bukan bug. Saran: pastikan fallback `prefers-reduced-motion`/no-JS set `opacity:1`. |
| OBS-04 | INFO | ⚪ — | Contact form tanpa field "subject" → lead "(No Subject)". By design. |
| OBS-05 | INFO | ⚪ — | Tidak ada route register — by design (CMS admin-only, user via seed). |
| OBS-06 | INFO | ⚪ — | Cover proyek = placeholder "NO PREVIEW IMAGE" (belum ada cover di seed). Graceful fallback. |
| OBS-07 | LOW | 🟢 FIXED | Input login dilengkapi atribut `autocomplete` (`email` / `current-password`). |

---

## Belum Diuji (untuk sesi testing berikutnya)

- [ ] CRUD penuh tiap modul CMS (Projects, Blog, Skills, Services, Testimonials)
- [ ] Upload gambar (`POST /api/upload`) + tampil di publik
- [ ] Halaman `/services` publik sebagai halaman penuh (baru smoke-test)
- [ ] Responsif mobile (baru diuji desktop 1440×900)
- [ ] Logout flow & proteksi `/dashboard/*` tanpa sesi

---

## Housekeeping

- [ ] Hapus lead test **"Zagoour QA Bot"** (`qa-bot@zagoour.test`) via Dashboard → Contact Leads.
- [ ] Rapikan/pindahkan file screenshot `*.jpeg` di root (opsional).

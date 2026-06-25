"use client";

import React from "react";
import Link from "next/link";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import {
  Users,
  Folder,
  Mail,
  FileText,
  ArrowRight,
  Eye,
  Edit2,
  TrendingUp,
  Image as ImageIcon,
  Star,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const { data: stats, isLoading } = useDashboardStats();

  // Sparkline SVG lines mockup
  const sparkline1 = "M 0 30 Q 15 10 30 25 T 60 5 T 90 28 T 120 10 T 150 25";
  const sparkline2 = "M 0 25 Q 15 35 30 15 T 60 28 T 90 10 T 120 20 T 150 15";
  const sparkline3 = "M 0 20 Q 15 5 30 30 T 60 15 T 90 25 T 120 8 T 150 20";
  const sparkline4 = "M 0 35 Q 15 20 30 30 T 60 10 T 90 25 T 120 18 T 150 12";

  // Visitor Statistics Chart mock coordinates for dots (X, Y)
  // Sumbu Y max 2000, height chart 200px.
  // Titik data: 28 Apr (180), 2 Mei (450), 6 Mei (350), 10 Mei (600), 14 Mei (400), 18 Mei (500), 22 Mei (420), 26 Mei (580)
  // Konversi ke koordinat SVG
  const chartPoints = [
    { x: 30, y: 150, val: 500, label: "28 Apr" },
    { x: 90, y: 100, val: 1000, label: "2 Mei" },
    { x: 150, y: 120, val: 800, label: "6 Mei" },
    { x: 210, y: 140, val: 600, label: "10 Mei" },
    { x: 270, y: 70, val: 1400, label: "14 Mei" },
    { x: 330, y: 110, val: 1000, label: "18 Mei" },
    { x: 390, y: 90, val: 1200, label: "22 Mei" },
    { x: 450, y: 115, val: 950, label: "26 Mei" }
  ];

  // SVG Line path
  const linePath = `M ${chartPoints.map(p => `${p.x} ${p.y}`).join(" L ")}`;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 pb-12 text-zinc-100">
      {/* 4 STATS CARDS BARIS 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Pengunjung */}
        <div className="bg-[#09090b] border border-zinc-900 rounded-2xl p-5 flex items-center justify-between shadow-sm relative overflow-hidden group hover:border-zinc-800 transition">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#d0f000]" />
              <span className="text-xs font-semibold text-zinc-400">Total Pengunjung</span>
            </div>
            <div className="text-2xl font-black tracking-tight text-white pt-1">
              12.548
            </div>
            <div className="text-[10px] font-semibold">
              <span className="text-[#d0f000] font-bold">+18.4%</span>{" "}
              <span className="text-zinc-500 font-medium">vs bulan lalu</span>
            </div>
          </div>
          {/* Sparkline chart */}
          <div className="w-24 h-12">
            <svg className="w-full h-full" viewBox="0 0 150 40">
              <path d={sparkline1} fill="none" stroke="#d0f000" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 2: Proyek Aktif */}
        <div className="bg-[#09090b] border border-zinc-900 rounded-2xl p-5 flex items-center justify-between shadow-sm relative overflow-hidden group hover:border-zinc-800 transition">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-[#d0f000]" />
              <span className="text-xs font-semibold text-zinc-400">Proyek Aktif</span>
            </div>
            <div className="text-2xl font-black tracking-tight text-white pt-1">
              {stats?.projects || 24}
            </div>
            <div className="text-[10px] font-semibold">
              <span className="text-[#d0f000] font-bold">+9.1%</span>{" "}
              <span className="text-zinc-500 font-medium">vs bulan lalu</span>
            </div>
          </div>
          {/* Sparkline chart */}
          <div className="w-24 h-12">
            <svg className="w-full h-full" viewBox="0 0 150 40">
              <path d={sparkline2} fill="none" stroke="#d0f000" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 3: Pesan Masuk */}
        <div className="bg-[#09090b] border border-zinc-900 rounded-2xl p-5 flex items-center justify-between shadow-sm relative overflow-hidden group hover:border-zinc-800 transition">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#d0f000]" />
              <span className="text-xs font-semibold text-zinc-400">Pesan Masuk</span>
            </div>
            <div className="text-2xl font-black tracking-tight text-white pt-1">
              {stats?.unreadLeads || 37}
            </div>
            <div className="text-[10px] font-semibold">
              <span className="text-[#d0f000] font-bold">+12.5%</span>{" "}
              <span className="text-zinc-500 font-medium">vs minggu lalu</span>
            </div>
          </div>
          {/* Sparkline chart */}
          <div className="w-24 h-12">
            <svg className="w-full h-full" viewBox="0 0 150 40">
              <path d={sparkline3} fill="none" stroke="#d0f000" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 4: Artikel Dipublikasikan */}
        <div className="bg-[#09090b] border border-zinc-900 rounded-2xl p-5 flex items-center justify-between shadow-sm relative overflow-hidden group hover:border-zinc-800 transition">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#d0f000]" />
              <span className="text-xs font-semibold text-zinc-400">Artikel Dipublikasikan</span>
            </div>
            <div className="text-2xl font-black tracking-tight text-white pt-1">
              {stats?.blogPosts || 18}
            </div>
            <div className="text-[10px] font-semibold">
              <span className="text-[#d0f000] font-bold">+6.3%</span>{" "}
              <span className="text-zinc-500 font-medium">vs bulan lalu</span>
            </div>
          </div>
          {/* Sparkline chart */}
          <div className="w-24 h-12">
            <svg className="w-full h-full" viewBox="0 0 150 40">
              <path d={sparkline4} fill="none" stroke="#d0f000" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* GRID BARIS KEDUA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Statistik Pengunjung */}
        <div className="lg:col-span-2 bg-[#09090b] border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between pb-4">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Statistik Pengunjung</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-[10px] font-semibold text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d0f000]" />
                  Pengunjung
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  Tampilan Halaman
                </span>
              </div>
              <select className="bg-black border border-zinc-800 rounded-lg px-2.5 py-1 text-[10px] font-semibold text-zinc-400 focus:outline-none">
                <option>30 Hari Terakhir</option>
                <option>7 Hari Terakhir</option>
              </select>
            </div>
          </div>

          {/* SVG Line & Bar Chart */}
          <div className="w-full h-64 relative mt-2">
            <svg className="w-full h-full" viewBox="0 0 480 200" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="20" y1="20" x2="470" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="20" y1="60" x2="470" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="20" y1="100" x2="470" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="20" y1="140" x2="470" y2="140" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="20" y1="180" x2="470" y2="180" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="5" y="25" fill="#52525b" fontSize="8" fontWeight="bold">2.000</text>
              <text x="5" y="65" fill="#52525b" fontSize="8" fontWeight="bold">1.500</text>
              <text x="5" y="105" fill="#52525b" fontSize="8" fontWeight="bold">1.000</text>
              <text x="5" y="145" fill="#52525b" fontSize="8" fontWeight="bold">500</text>
              <text x="12" y="183" fill="#52525b" fontSize="8" fontWeight="bold">0</text>

              {/* Background Bars (Tampilan Halaman) */}
              {chartPoints.map((p, idx) => (
                <rect
                  key={`bar-${idx}`}
                  x={p.x - 6}
                  y={p.y + 10}
                  width="12"
                  height={180 - p.y - 10}
                  fill="rgba(82, 82, 91, 0.15)"
                  rx="2"
                />
              ))}

              {/* Lime Line Chart (Pengunjung) */}
              <path
                d={linePath}
                fill="none"
                stroke="#d0f000"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Dots on Line Chart */}
              {chartPoints.map((p, idx) => (
                <circle
                  key={`dot-${idx}`}
                  cx={p.x}
                  cy={p.y}
                  r="3.5"
                  fill="#d0f000"
                  stroke="#09090b"
                  strokeWidth="1.5"
                />
              ))}

              {/* X Axis Labels */}
              {chartPoints.map((p, idx) => (
                <text
                  key={`lbl-${idx}`}
                  x={p.x}
                  y="196"
                  fill="#52525b"
                  fontSize="8"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {p.label}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Kolom Kanan: Proyek Terbaru */}
        <div className="bg-[#09090b] border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-sm font-bold text-white tracking-wide">Proyek Terbaru</h3>
            <Link
              href="/dashboard/projects"
              className="text-[10px] font-bold text-[#d0f000] hover:underline flex items-center gap-1 transition"
            >
              Lihat Semua <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-900 text-zinc-500 font-extrabold text-[9px] uppercase tracking-wider">
                  <th className="py-2.5">Nama Proyek</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5">Kategori</th>
                  <th className="py-2.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/40">
                {/* Baris 1 */}
                <tr className="group">
                  <td className="py-3 flex items-center gap-2.5 font-bold text-white">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0 flex items-center justify-center text-zinc-500 font-mono text-[9px]">
                      NX
                    </div>
                    <span className="truncate max-w-[120px]">Nexora - Web SaaS</span>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5 bg-[#d0f000] text-black font-extrabold text-[9px] px-2.5 py-0.5 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
                      Aktif
                    </span>
                  </td>
                  <td className="py-3 text-zinc-400 font-semibold">Web Development</td>
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 rounded-full border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-full border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Baris 2 */}
                <tr className="group">
                  <td className="py-3 flex items-center gap-2.5 font-bold text-white">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0 flex items-center justify-center text-zinc-500 font-mono text-[9px]">
                      KI
                    </div>
                    <span className="truncate max-w-[120px]">Brand Identity - Kira Studio</span>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5 bg-zinc-800 text-zinc-300 font-extrabold text-[9px] px-2.5 py-0.5 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                      Selesai
                    </span>
                  </td>
                  <td className="py-3 text-zinc-400 font-semibold">Branding</td>
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 rounded-full border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-full border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Baris 3 */}
                <tr className="group">
                  <td className="py-3 flex items-center gap-2.5 font-bold text-white">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0 flex items-center justify-center text-zinc-500 font-mono text-[9px]">
                      FT
                    </div>
                    <span className="truncate max-w-[120px]">Fintech Landing Page</span>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5 bg-[#d0f000] text-black font-extrabold text-[9px] px-2.5 py-0.5 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
                      Aktif
                    </span>
                  </td>
                  <td className="py-3 text-zinc-400 font-semibold">UI/UX Design</td>
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 rounded-full border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-full border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Baris 4 */}
                <tr className="group">
                  <td className="py-3 flex items-center gap-2.5 font-bold text-white">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0 flex items-center justify-center text-zinc-500 font-mono text-[9px]">
                      DA
                    </div>
                    <span className="truncate max-w-[120px]">Dashboard Analytics</span>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5 bg-zinc-900 text-zinc-450 border border-zinc-800/80 font-extrabold text-[9px] px-2.5 py-0.5 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                      Draft
                    </span>
                  </td>
                  <td className="py-3 text-zinc-400 font-semibold">Web Development</td>
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 rounded-full border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-full border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Baris 5 */}
                <tr className="group">
                  <td className="py-3 flex items-center gap-2.5 font-bold text-white">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0 flex items-center justify-center text-zinc-500 font-mono text-[9px]">
                      PP
                    </div>
                    <span className="truncate max-w-[120px]">Portfolio Pribadi 2024</span>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5 bg-[#d0f000] text-black font-extrabold text-[9px] px-2.5 py-0.5 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
                      Aktif
                    </span>
                  </td>
                  <td className="py-3 text-zinc-400 font-semibold">Web Development</td>
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 rounded-full border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-full border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* GRID BARIS KETIGA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Sumber Traffic */}
        <div className="bg-[#09090b] border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <h3 className="text-sm font-bold text-white tracking-wide pb-4">Sumber Traffic</h3>

          {/* Donut Chart visualizer */}
          <div className="flex items-center gap-6 py-2">
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                {/* Background circle */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#18181b" strokeWidth="3" />
                {/* Organik: 48% (lime) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#d0f000" strokeWidth="3.2" strokeDasharray="48 52" strokeDashoffset="0" />
                {/* Akses Langsung: 24% (kuning/lime soft) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e4ff5e" strokeWidth="3.2" strokeDasharray="24 76" strokeDashoffset="-48" />
                {/* Media Sosial: 16% (hijau toska) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3.2" strokeDasharray="16 84" strokeDashoffset="-72" />
                {/* Referral: 8% (biru) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="3.2" strokeDasharray="8 92" strokeDashoffset="-88" />
                {/* Lainnya: 4% (pink) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ec4899" strokeWidth="3.2" strokeDasharray="4 96" strokeDashoffset="-96" />
              </svg>
              {/* Teks Tengah */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-black text-white leading-none">12.548</span>
                <span className="text-[7px] font-bold text-zinc-500 uppercase tracking-wider mt-0.5">Total</span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="flex-1 space-y-1.5 text-[9px] font-bold text-zinc-400">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded bg-[#d0f000]" />
                  Pencarian Organik
                </span>
                <span className="text-white">48%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded bg-[#e4ff5e]" />
                  Akses Langsung
                </span>
                <span className="text-white">24%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded bg-[#10b981]" />
                  Media Sosial
                </span>
                <span className="text-white">16%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded bg-[#3b82f6]" />
                  Referral
                </span>
                <span className="text-white">8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded bg-[#ec4899]" />
                  Lainnya
                </span>
                <span className="text-white">4%</span>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard/stats"
            className="text-[10px] font-bold text-[#d0f000] hover:underline flex items-center gap-1 mt-4 pt-2 border-t border-zinc-900/50"
          >
            Lihat Laporan Lengkap <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Card 2: Konten Populer */}
        <div className="bg-[#09090b] border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <h3 className="text-sm font-bold text-white tracking-wide pb-4">Konten Populer</h3>

          <div className="flex-1 space-y-3.5 mt-1">
            <div className="flex items-center gap-3 text-xs">
              <span className="text-zinc-500 font-extrabold text-xs">1</span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold truncate leading-tight">Membangun Design System untuk Brand Konsisten</p>
              </div>
              <span className="text-[10px] text-zinc-400 font-semibold flex items-center gap-1 shrink-0">
                <Eye className="w-3 h-3 text-zinc-500" /> 2.845
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-zinc-500 font-extrabold text-xs">2</span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold truncate leading-tight">Cara Optimasi Performa Website Modern</p>
              </div>
              <span className="text-[10px] text-zinc-400 font-semibold flex items-center gap-1 shrink-0">
                <Eye className="w-3 h-3 text-zinc-500" /> 1.932
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-zinc-500 font-extrabold text-xs">3</span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold truncate leading-tight">Proses di Balik Redesain Website Nexora</p>
              </div>
              <span className="text-[10px] text-zinc-400 font-semibold flex items-center gap-1 shrink-0">
                <Eye className="w-3 h-3 text-zinc-500" /> 1.421
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-zinc-500 font-extrabold text-xs">4</span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold truncate leading-tight">UX Writing: Kecil tapi Punya Dampak Besar</p>
              </div>
              <span className="text-[10px] text-zinc-400 font-semibold flex items-center gap-1 shrink-0">
                <Eye className="w-3 h-3 text-zinc-500" /> 1.102
              </span>
            </div>
          </div>

          <Link
            href="/dashboard/blog"
            className="text-[10px] font-bold text-[#d0f000] hover:underline flex items-center gap-1 mt-4 pt-2 border-t border-t-zinc-900/50"
          >
            Lihat Semua Artikel <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Card 3: Pesan Terbaru */}
        <div className="bg-[#09090b] border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-sm font-bold text-white tracking-wide">Pesan Terbaru</h3>
            <Link
              href="/dashboard/leads"
              className="text-[10px] font-bold text-[#d0f000] hover:underline flex items-center gap-1"
            >
              Lihat Semua <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex-1 space-y-3.5 mt-1">
            {/* Pesan 1 */}
            <div className="flex items-center gap-3 text-xs relative">
              <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700/60 flex items-center justify-center font-bold text-zinc-300 text-[10px] shrink-0">
                AR
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <p className="text-white font-bold truncate">Andi Rahman</p>
                  <span className="text-[8px] text-zinc-500 font-bold shrink-0">10m ago</span>
                </div>
                <p className="text-zinc-500 truncate text-[10px] leading-normal">Halo, saya tertarik dengan layanan...</p>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d0f000] shrink-0" />
            </div>

            {/* Pesan 2 */}
            <div className="flex items-center gap-3 text-xs relative">
              <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700/60 flex items-center justify-center font-bold text-zinc-300 text-[10px] shrink-0">
                DS
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <p className="text-white font-bold truncate">Dewi Sartika</p>
                  <span className="text-[8px] text-zinc-500 font-bold shrink-0">1h ago</span>
                </div>
                <p className="text-zinc-500 truncate text-[10px] leading-normal">Apakah kamu tersedia untuk project dashboard...</p>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d0f000] shrink-0" />
            </div>

            {/* Pesan 3 */}
            <div className="flex items-center gap-3 text-xs relative">
              <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700/60 flex items-center justify-center font-bold text-zinc-300 text-[10px] shrink-0">
                MR
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <p className="text-white font-bold truncate">Muhammad Rizky</p>
                  <span className="text-[8px] text-zinc-500 font-bold shrink-0">3h ago</span>
                </div>
                <p className="text-zinc-500 truncate text-[10px] leading-normal">Bisa minta penawaran untuk redesign...</p>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 shrink-0" />
            </div>
          </div>
        </div>

        {/* Card 4: Aktivitas Terbaru */}
        <div className="bg-[#09090b] border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <h3 className="text-sm font-bold text-white tracking-wide pb-4">Aktivitas Terbaru</h3>

          <div className="flex-1 space-y-3.5 mt-1 text-xs">
            {/* Aktifitas 1 */}
            <div className="flex gap-2.5">
              <Folder className="w-4 h-4 text-[#d0f000] shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold leading-tight">Proyek &quot;Nexora - Web SaaS&quot; diperbarui</p>
                <span className="text-[8px] text-zinc-500 font-bold">10 menit lalu</span>
              </div>
            </div>

            {/* Aktifitas 2 */}
            <div className="flex gap-2.5">
              <FileText className="w-4 h-4 text-[#d0f000] shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold leading-tight">Artikel &quot;Membangun Design System&quot; dipublikasikan</p>
                <span className="text-[8px] text-zinc-500 font-bold">1 jam lalu</span>
              </div>
            </div>

            {/* Aktifitas 3 */}
            <div className="flex gap-2.5">
              <Mail className="w-4 h-4 text-[#d0f000] shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold leading-tight">Pesan baru dari Andi Rahman</p>
                <span className="text-[8px] text-zinc-500 font-bold">10 menit lalu</span>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard/leads"
            className="text-[10px] font-bold text-[#d0f000] hover:underline flex items-center gap-1 mt-4 pt-2 border-t border-t-zinc-900/50"
          >
            Lihat Semua <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* FOOTER BARIS KEEMPAT (Quote Box & Sticker) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Quote Box (Kiri) */}
        <div className="bg-[#09090b] border border-zinc-900 rounded-2xl p-6 relative overflow-hidden flex items-center justify-between gap-6 group hover:border-zinc-800 transition">
          <div className="space-y-2 max-w-[80%] select-none">
            <span className="font-serif text-[#d0f000] text-3xl font-black leading-none opacity-60 inline-block">&ldquo;</span>
            <p className="text-xs text-zinc-300 font-medium italic -mt-2 leading-relaxed">
              Fokus pada proses, hasil akan mengikuti. Bangun portofolio yang berbicara untukmu.
            </p>
          </div>
          {/* Coretan Mahkota Lime */}
          <div className="w-14 h-14 shrink-0 text-[#d0f000] opacity-80 rotate-12 group-hover:scale-105 transition-transform duration-300">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10,80 L20,30 L45,55 L70,30 L80,80 Z" />
              <path d="M10,80 L80,80" />
              {/* Bulatan Mahkota */}
              <circle cx="20" cy="22" r="4" fill="currentColor" />
              <circle cx="45" cy="47" r="4" fill="currentColor" />
              <circle cx="70" cy="22" r="4" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Kosong untuk layout spacing */}
        <div className="hidden lg:block"></div>

        {/* Sticker CODE. CREATE. IMPACT. (Kanan) */}
        <div className="flex justify-end items-center">
          <div className="relative rotate-[6deg] bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-xl flex items-center gap-3.5 select-none select-none max-w-xs">
            {/* Grid pattern background inside sticker */}
            <div className="absolute inset-0 opacity-10 bg-grid-pattern pointer-events-none rounded-xl" />
            
            {/* Lightning bolt sticker icon */}
            <div className="w-10 h-10 rounded-lg bg-[#d0f000] flex items-center justify-center text-black shadow-inner shrink-0 rotate-[-12deg]">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-mono font-black text-xs text-white leading-none tracking-widest">CODE.</span>
              <span className="font-mono font-black text-xs text-[#d0f000] leading-none tracking-widest mt-1">CREATE.</span>
              <span className="font-mono font-black text-xs text-white leading-none tracking-widest mt-1">IMPACT.</span>
            </div>

            {/* Sticker jagged edge overlay simulation */}
            <div className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-zinc-950" />
          </div>
        </div>
      </div>
    </div>
  );
}

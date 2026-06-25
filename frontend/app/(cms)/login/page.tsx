"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  FolderKanban, 
  PenSquare, 
  MessageSquare, 
  CircleUser, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight,
  MessageCircle,
  Sparkles
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Email dan password wajib diisi");
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Email atau password salah");
        toast.error("Invalid email or password");
      } else {
        toast.success("Login successful!");
        router.refresh();
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem");
      toast.error("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0B0C0E] overflow-x-hidden font-sans p-4 lg:p-8 selection:bg-yellow-300 selection:text-black">
      {/* Background Gradients & Noise */}
      <div className="absolute inset-0 bg-[#0c0d10] overflow-hidden pointer-events-none">
        {/* Large radial lights */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-yellow-300/[0.03] blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-zinc-800/[0.05] blur-[150px]" />
        
        {/* Dark grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Decorative top-right lighting bolt */}
      <svg 
        className="absolute top-12 right-12 w-16 h-16 text-yellow-300/40 hidden xl:block select-none" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>

      {/* Outer wrapper for split layout */}
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Branding & Mockups (Hidden on mobile or stacked) */}
        <div className="lg:col-span-7 flex flex-col space-y-8 text-left relative p-2 lg:p-6 select-none hidden lg:flex">
          
          {/* Logo & Category */}
          <div className="flex items-center space-x-3">
            <span className="text-4xl font-extrabold text-white tracking-tighter">P<span className="text-yellow-300">.</span></span>
            <span className="text-yellow-300 font-bold text-xs tracking-widest uppercase mt-2">Portfolio CMS</span>
          </div>

          {/* Heading */}
          <div className="relative max-w-xl">
            {/* KEEP BUILDING Stamp sticker */}
            <div className="absolute top-[-65px] right-[60px] bg-white text-black p-2 border-2 border-black rounded shadow-md transform rotate-[-8deg] flex flex-col items-center justify-center space-y-1 z-10 w-[95px] text-[8px] font-mono select-none">
              {/* Barcode representation */}
              <svg className="w-full h-5" viewBox="0 0 100 20">
                <rect width="100" height="20" fill="white" />
                <rect x="5" y="2" width="2" height="16" fill="black" />
                <rect x="9" y="2" width="4" height="16" fill="black" />
                <rect x="15" y="2" width="1" height="16" fill="black" />
                <rect x="18" y="2" width="3" height="16" fill="black" />
                <rect x="23" y="2" width="1" height="16" fill="black" />
                <rect x="26" y="2" width="2" height="16" fill="black" />
                <rect x="30" y="2" width="5" height="16" fill="black" />
                <rect x="37" y="2" width="1" height="16" fill="black" />
                <rect x="40" y="2" width="3" height="16" fill="black" />
                <rect x="45" y="2" width="2" height="16" fill="black" />
                <rect x="49" y="2" width="4" height="16" fill="black" />
                <rect x="55" y="2" width="1" height="16" fill="black" />
                <rect x="58" y="2" width="2" height="16" fill="black" />
                <rect x="62" y="2" width="3" height="16" fill="black" />
                <rect x="67" y="2" width="1" height="16" fill="black" />
                <rect x="70" y="2" width="5" height="16" fill="black" />
                <rect x="77" y="2" width="2" height="16" fill="black" />
                <rect x="81" y="2" width="1" height="16" fill="black" />
                <rect x="84" y="2" width="3" height="16" fill="black" />
                <rect x="89" y="2" width="2" height="16" fill="black" />
                <rect x="93" y="2" width="2" height="16" fill="black" />
              </svg>
              <span className="font-extrabold tracking-wider text-[9px] uppercase border-t border-black pt-1 w-full text-center">KEEP BUILDING</span>
            </div>

            {/* Handwritten Label */}
            <div className="absolute top-[-30px] right-[-40px] transform rotate-[6deg] z-10">
              <p className="font-handwritten text-xl text-zinc-300 leading-tight">
                KODE,<br />
                KELOLA,<br />
                BERKARYA.
              </p>
              <span className="font-handwritten text-2xl text-zinc-300 ml-4">☺</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight">
              MASUK KE<br />
              <span className="relative inline-block text-white">
                DASHBOARD
                <svg className="absolute -bottom-2.5 left-0 w-full h-3 text-yellow-300" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,9 100,5" stroke="currentColor" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                </svg>
              </span><br />
              PORTOFOLIO
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-zinc-400 text-sm max-w-lg leading-relaxed">
            Kelola portofolio, proyek, artikel, testimonial, dan pesan dari satu dashboard yang cepat, aman, dan mudah digunakan.
          </p>

          {/* Badge buttons */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Kelola Proyek", icon: FolderKanban },
              { label: "Tulis Artikel", icon: PenSquare },
              { label: "Pantau Pesan", icon: MessageSquare },
              { label: "Update Profil", icon: CircleUser },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full border border-zinc-800/80 bg-zinc-900/20 text-zinc-300 text-xs hover:border-yellow-300/40 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5 text-yellow-300" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* Mockups Container */}
          <div className="relative mt-8 w-full max-w-xl h-[360px] flex items-start">
            
            {/* 1. Dashboard Mockup (Web Screen) */}
            <div className="relative bg-[#111214] border border-zinc-800/80 rounded-xl overflow-hidden shadow-2xl w-[380px] h-[260px] flex">
              {/* Mini Sidebar */}
              <div className="w-[100px] bg-zinc-950 border-r border-zinc-900 flex flex-col p-2 space-y-3">
                <div className="flex items-center space-x-1 border-b border-zinc-900 pb-2">
                  <span className="text-[11px] font-extrabold text-white tracking-tighter">P<span className="text-yellow-300">.</span></span>
                  <span className="text-[6px] text-zinc-500 font-bold uppercase tracking-wider">CMS</span>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="bg-yellow-300 text-black font-bold text-[7px] rounded px-1.5 py-0.5 flex items-center space-x-1">
                    <div className="w-1 h-1 rounded-full bg-black" />
                    <span>Dashboard</span>
                  </div>
                  {["Proyek", "Artikel", "Pesan", "Testimonial", "Media", "Profil", "Pengaturan"].map((nav) => (
                    <div key={nav} className="text-zinc-600 text-[7px] font-medium px-1.5 py-0.5 flex items-center">
                      <span>{nav}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini Main Content */}
              <div className="flex-1 bg-zinc-900/60 p-2.5 overflow-hidden flex flex-col space-y-2.5">
                {/* Header */}
                <div>
                  <h3 className="text-[9px] font-bold text-white leading-none">Dashboard</h3>
                  <p className="text-[6px] text-zinc-500 mt-0.5 leading-none">Ringkasan aktivitas portofolio Anda.</p>
                </div>

                {/* Mini Stats Card Grid */}
                <div className="grid grid-cols-2 gap-1">
                  {[
                    { label: "Total Proyek", count: "24", pct: "▲ 12%" },
                    { label: "Artikel", count: "18", pct: "▲ 8%" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-zinc-950/80 border border-zinc-800/40 rounded p-1 flex flex-col justify-between">
                      <span className="text-[5px] text-zinc-500 uppercase font-semibold">{stat.label}</span>
                      <div className="flex items-baseline space-x-1.5 mt-0.5">
                        <span className="text-[9px] font-bold text-white leading-none">{stat.count}</span>
                        <span className="text-[4.5px] text-yellow-300 leading-none">{stat.pct} vs bulan lalu</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mini chart card */}
                <div className="bg-zinc-950/80 border border-zinc-800/40 rounded p-1 flex-1 flex flex-col">
                  <span className="text-[5px] text-zinc-500 font-semibold uppercase leading-none">Statistik Pengunjung</span>
                  {/* Fake glowing line chart using SVG */}
                  <svg className="w-full flex-1 mt-1" viewBox="0 0 100 25">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d0f000" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#d0f000" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 5 20 Q 15 12 25 18 T 45 10 T 65 15 T 85 7 T 95 4"
                      fill="none"
                      stroke="#d0f000"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 5 20 Q 15 12 25 18 T 45 10 T 65 15 T 85 7 T 95 4 L 95 25 L 5 25 Z"
                      fill="url(#chartGrad)"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* 2. Mobile Mockup (Phone Screen overlapping) */}
            <div className="absolute bottom-[20px] right-[40px] w-[160px] h-[240px] bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col p-2 z-20">
              {/* Notch */}
              <div className="w-12 h-2.5 bg-zinc-900 rounded-full mx-auto mb-1.5 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
              </div>

              {/* Title */}
              <div className="border-b border-zinc-900 pb-1 mb-1">
                <h4 className="text-[8px] font-bold text-white leading-tight flex items-center space-x-1">
                  <span>Pesan Terbaru</span>
                </h4>
              </div>

              {/* Messages list */}
              <div className="flex-1 space-y-1.5 overflow-hidden">
                {[
                  { name: "Andi Rahman", sub: "Tertarik dengan layanan...", time: "2 mnt lalu" },
                  { name: "Dewi Sartika", sub: "Apakah masih tersedia...", time: "15 mnt lalu" },
                  { name: "Faris A.", sub: "Request kolaborasi...", time: "1 jam lalu" },
                ].map((msg, i) => (
                  <div key={i} className="flex items-start space-x-1 bg-zinc-900/30 p-1 rounded border border-zinc-900/40">
                    <div className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <span className="text-[5px] text-zinc-400 font-bold">{msg.name[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[6.5px] font-bold text-white truncate leading-none">{msg.name}</span>
                        <span className="text-[4.5px] text-zinc-500 truncate leading-none">{msg.time}</span>
                      </div>
                      <p className="text-[5.5px] text-zinc-400 truncate mt-0.5 leading-none">{msg.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom footer link */}
              <div className="border-t border-zinc-900 pt-1 text-center">
                <span className="text-[6.5px] font-bold text-yellow-300 inline-flex items-center hover:underline cursor-pointer">
                  Lihat Semua Pesan &rarr;
                </span>
              </div>
            </div>

            {/* Hand-drawn Arrow pointing to Phone */}
            <svg 
              className="absolute bottom-[110px] right-[170px] w-12 h-12 text-zinc-500 z-30 transform -rotate-12 select-none" 
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20 20 Q60 30 80 80" />
              <path d="M60 80 L80 80 L80 60" />
            </svg>

            {/* Hand-drawn Crown outline */}
            <svg 
              className="absolute bottom-[-15px] right-[160px] w-12 h-12 text-yellow-300/80 transform rotate-12 select-none" 
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="6" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M10 80 L25 35 L50 65 L75 35 L90 80 Z" />
              <path d="M10 80 Q50 90 90 80" />
              <circle cx="25" cy="30" r="3" fill="currentColor" />
              <circle cx="50" cy="60" r="3" fill="currentColor" />
              <circle cx="75" cy="30" r="3" fill="currentColor" />
            </svg>

            {/* Bottom-left CODE sticker */}
            <div className="absolute bottom-[20px] left-[-15px] bg-white text-black p-2 border-2 border-black rounded shadow-lg transform rotate-[-5deg] flex flex-col space-y-0.5 z-30 select-none w-[90px]">
              <div className="font-mono text-[5px] uppercase tracking-widest text-zinc-500 border-b border-zinc-200 pb-0.5">
                LABEL.09X
              </div>
              <div className="font-sans font-black text-[9px] tracking-tight leading-none uppercase">
                CODE.
              </div>
              <div className="font-sans font-black text-[9px] tracking-tight leading-none uppercase">
                CREATE.
              </div>
              <div className="font-sans font-black text-[9px] tracking-tight leading-none uppercase flex items-center justify-between">
                <span>IMPACT.</span>
                <span className="text-yellow-500 text-[8px]">⚡</span>
              </div>
            </div>

          </div>

        </div>

        {/* Right Side: Login Card */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative px-2">
          
          <div className="w-full max-w-[430px] bg-[#111214]/65 border border-zinc-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl space-y-6">
            
            {/* Lock Icon Header */}
            <div className="flex justify-center">
              <div className="flex items-center justify-center w-14 h-14 rounded-full border border-yellow-300/30 bg-yellow-300/[0.03]">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-yellow-300/50 bg-yellow-300/10">
                  <Lock className="w-5 h-5 text-yellow-300" strokeWidth={2.2} />
                </div>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1.5 text-center">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Selamat Datang Kembali
              </h2>
              <p className="text-xs text-zinc-400">
                Masuk untuk mengakses dashboard admin Anda.
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-xs px-4 py-3 rounded-lg flex items-center space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-zinc-300 text-xs font-semibold">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    autoComplete="email"
                    className="pl-10 bg-[#16171a] border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-yellow-300 focus-visible:border-yellow-300/80 rounded-lg h-11 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-zinc-300 text-xs font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    autoComplete="current-password"
                    className="pl-10 pr-10 bg-[#16171a] border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-yellow-300 focus-visible:border-yellow-300/80 rounded-lg h-11 text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Reminders & Link */}
              <div className="flex items-center justify-between text-xs pt-1 select-none">
                <label className="flex items-center space-x-2 text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-zinc-800 bg-[#16171a] text-yellow-300 focus:ring-yellow-300/30 focus:ring-offset-zinc-950 accent-yellow-300 cursor-pointer"
                  />
                  <span>Ingat saya</span>
                </label>
                <button
                  type="button"
                  onClick={() => toast.info("Untuk reset password, harap hubungi administrator sistem.")}
                  className="text-yellow-300 font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  Lupa password?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2.5 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200"
              >
                <span>{loading ? "Masuk..." : "Masuk"}</span>
                {!loading && <ArrowRight className="w-4 h-4" strokeWidth={2.5} />}
              </Button>

            </form>

            {/* Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-zinc-800/80"></div>
              <span className="flex-shrink mx-4 text-zinc-500 text-xs">atau</span>
              <div className="flex-grow border-t border-zinc-800/80"></div>
            </div>

            {/* Google Sign-in */}
            <Button
              type="button"
              onClick={() => toast.info("OAuth Sign-In dinonaktifkan. Silakan gunakan kredensial email dan password admin.")}
              className="w-full h-11 bg-transparent hover:bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 text-zinc-100 font-semibold rounded-lg flex items-center justify-center space-x-2 transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5.04c1.62 0 3.08.56 4.22 1.64l3.15-3.15C17.45 1.74 14.93 1 12 1 7.35 1 3.39 3.65 1.5 7.5L5.1 10.3C6.01 7.25 8.78 5.04 12 5.04z"
                />
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.81-.07-1.59-.2-2.27H12v4.51h6.46c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-1.99 3.41-4.92 3.41-8.69z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.1 13.7c-.24-.73-.38-1.5-.38-2.3s.14-1.57.38-2.3L1.5 6.3C.54 8.21 0 10.05 0 12s.54 3.79 1.5 5.7l3.6-2.8z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.7-2.87c-1.03.69-2.35 1.1-4.23 1.1-3.22 0-5.99-2.21-6.9-5.26l-3.6 2.8C3.39 20.35 7.35 23 12 23z"
                />
              </svg>
              <span>Masuk dengan Google</span>
            </Button>

            {/* Footer Registration Link */}
            <div className="text-center text-xs text-zinc-400">
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={() => toast.info("Pendaftaran akun baru ditutup sementara. Hubungi Super Admin.")}
                className="text-yellow-300 font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                Daftar
              </button>
            </div>

          </div>

          {/* Under card instructions */}
          <div className="mt-6 flex flex-col items-center justify-center space-y-1 text-[11px] text-zinc-500 text-center">
            <div className="flex items-center space-x-1.5 text-zinc-400 font-medium">
              <div className="flex items-center justify-center w-4 h-4 rounded-full bg-yellow-300/10 text-yellow-300">
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Akses khusus admin</span>
            </div>
            <p>Data Anda aman bersama kami.</p>
          </div>

        </div>

      </div>
    </div>
  );
}

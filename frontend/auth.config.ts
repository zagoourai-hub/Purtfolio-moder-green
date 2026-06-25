import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      const isLogin = request.nextUrl.pathname === "/login";
      
      // 1. Jika sudah login dan mencoba akses /login, redirect ke /dashboard
      if (isLogin && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }

      // 2. Proteksi dashboard rute
      if (isDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect ke /login otomatis
      }
      
      // 3. Proteksi rute API non-GET (POST/PUT/DELETE)
      const isApiProtected = request.nextUrl.pathname.startsWith("/api") && 
                             !request.nextUrl.pathname.startsWith("/api/auth") && 
                             !request.nextUrl.pathname.startsWith("/api/leads") && // leads POST untuk contact form public
                             request.method !== "GET";

      if (isApiProtected) {
        if (isLoggedIn) return true;
        return false; // Block access (direspon 401/redirect oleh middleware)
      }
      
      return true;
    },
  },
  providers: [], // Diisi di lib/auth.ts
} satisfies NextAuthConfig;

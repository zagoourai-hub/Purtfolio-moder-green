import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Melindungi seluruh halaman dashboard, rute API, dan rute login
  matcher: ["/dashboard/:path*", "/api/:path*", "/login"],
};

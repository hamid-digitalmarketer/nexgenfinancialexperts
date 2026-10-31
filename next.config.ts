import type { NextConfig } from "next";

// Security headers applied to every response.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-src 'self' https://www.openstreetmap.org https://www.google.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

// Redirects preserving verified legacy URLs from the original WordPress site.
const legacyRedirects = [
  { source: "/aboutus", destination: "/about", permanent: true },
  { source: "/blog", destination: "/insights", permanent: true },
  { source: "/home", destination: "/", permanent: true },
  { source: "/sample-page", destination: "/", permanent: true },
];

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;

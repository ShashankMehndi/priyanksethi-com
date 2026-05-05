import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: { root: REPO_ROOT },
  experimental: {
    lockDistDir: false,
    optimizePackageImports: ["framer-motion", "react-icons"],
  },
  poweredByHeader: false,

  // Include markdown content in the serverless function trace so the catch-all
  // [...slug] route can readFileSync at runtime on Vercel.
  outputFileTracingIncludes: {
    "/[...slug]": ["./Doctor Priyank Sethi Content/India/**/*.md"],
    "/": ["./Doctor Priyank Sethi Content/India/**/*.md"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;

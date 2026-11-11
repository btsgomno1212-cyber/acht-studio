import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Seiten werden beim Build vorgerendert; Links laden Zielseiten im Voraus.
  cacheComponents: true,
  partialPrefetching: true,

  poweredByHeader: false,

  // Tailwind CSS v4 läuft als Loader in Turbopack (kein PostCSS nötig).
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  // Grundlegende Sicherheits-Header für alle Antworten.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

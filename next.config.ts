import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Interdit l'affichage du site dans une iframe d'un autre site
  // et ajoute quelques protections de base côté navigateur.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;

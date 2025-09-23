import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    viewTransition: true
  },
  // Configurar orígenes permitidos para desarrollo
  allowedDevOrigins: ["192.168.0.15:3000", "localhost:3000", "127.0.0.1:3000"],
  // Headers de seguridad para proteger contra ataques automatizados
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          }
        ]
      }
    ];
  }
};

export default nextConfig;

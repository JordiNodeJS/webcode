import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    viewTransition: true
  },
  // Configurar orígenes permitidos para desarrollo
  allowedDevOrigins: ["192.168.0.15:3000", "localhost:3000", "127.0.0.1:3000"],
  
  // Optimizaciones para mejor SEO y Performance
  poweredByHeader: false,
  compress: true,
  
  // Headers de seguridad mejorados para SEO y Best Practices
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security Headers
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self';"
          }
        ]
      },
      // Specific headers for static assets
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        source: "/(.*\\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ];
  },
  
  // Rewrites para SEO-friendly URLs
  async rewrites() {
    return [
      {
        source: "/servicios",
        destination: "/services"
      },
      {
        source: "/sobre-nosotros",
        destination: "/about"
      },
      {
        source: "/contacto",
        destination: "/contact"
      }
    ];
  },
  
  // Redirects para URLs obsoletas o mejoradas
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true
      },
      {
        source: "/index",
        destination: "/",
        permanent: true
      }
    ];
  }
};

export default nextConfig;

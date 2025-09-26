/**
 * Image optimization configuration for WEBCODE
 * Optimizes images for better Core Web Vitals and bundle size
 */

export const imageConfig = {
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  formats: ["image/webp", "image/avif"],
  minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  dangerouslyAllowSVG: false,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  // Optimized for Spanish market and international users
  domains: [],
  remotePatterns: [
    {
      protocol: "https" as const,
      hostname: "**.vercel.app",
      port: "",
      pathname: "/**"
    },
    {
      protocol: "https" as const,
      hostname: "webcode.es",
      port: "",
      pathname: "/**"
    }
  ],
  unoptimized: false,
  loader: "default" as const,
  loaderFile: "",
  path: "/_next/image",
  disableStaticImages: false
};

export const optimizedImageProps = {
  // Default optimizations para todas las imágenes
  quality: 85,
  placeholder: "blur" as const,
  priority: false, // Solo true para LCP images
  loading: "lazy" as const,
  decoding: "async" as const
};

/**
 * Helper function to get optimized image props
 */
export function getOptimizedImageProps(
  overrides: Partial<typeof optimizedImageProps> = {}
) {
  return {
    ...optimizedImageProps,
    ...overrides
  };
}

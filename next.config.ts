import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		reactCompiler: true,
		viewTransition: true,
		// Optimizaciones experimentales para bundle
		optimizePackageImports: ["lucide-react", "framer-motion"],
		serverComponentsHmrCache: false,
	},
	// Configurar orígenes permitidos para desarrollo
	allowedDevOrigins: ["192.168.0.15:3000", "localhost:3000", "127.0.0.1:3000"],

	// Optimizaciones para mejor SEO y Performance
	poweredByHeader: false,
	compress: true,

	// Image optimization
	images: {
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		formats: ["image/webp", "image/avif"],
		minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
		dangerouslyAllowSVG: false,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.vercel.app",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "webcode.es",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "www.notion.so",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
				port: "",
				pathname: "/**",
			},
		],
		unoptimized: false,
		disableStaticImages: false,
	},

	// Bundle optimizations
	webpack: (config, { dev, isServer }) => {
		// Optimizaciones para reducir bundle size
		if (!dev && !isServer) {
			config.optimization = {
				...config.optimization,
				splitChunks: {
					chunks: "all",
					minSize: 20000, // Only split chunks larger than 20KB
					maxSize: 50000, // Maximum chunk size of 50KB
					cacheGroups: {
						// Separar vendor chunks por tamaño
						framework: {
							chunks: "all",
							name: "framework",
							test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
							priority: 40,
							enforce: true,
						},
						animations: {
							name: "animations",
							test: /[\\/]node_modules[\\/](framer-motion|motion)[\\/]/,
							chunks: "all",
							priority: 30,
							enforce: true,
						},
						icons: {
							name: "icons",
							test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
							chunks: "all",
							priority: 25,
							enforce: true,
						},
						pdf: {
							name: "pdf",
							test: /[\\/]node_modules[\\/](jspdf|jspdf-autotable)[\\/]/,
							chunks: "async", // Only load when needed
							priority: 35,
							enforce: true,
						},
						email: {
							name: "email",
							test: /[\\/]node_modules[\\/](resend|@react-email)[\\/]/,
							chunks: "async", // Only load when needed
							priority: 35,
							enforce: true,
						},
						commons: {
							name: "commons",
							chunks: "all",
							minChunks: 2,
							priority: 20,
							reuseExistingChunk: true,
						},
					},
				},
			};
		}

		// Optimización de tree shaking
		config.resolve.alias = {
			...config.resolve.alias,
			// Force ESM builds for better tree-shaking
			"framer-motion": "framer-motion/dist/es/index.js",
			motion: "motion/dist/es/index.js",
		};

		return config;
	},

	// Headers de seguridad mejorados para SEO y Best Practices
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					// Security Headers
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=(), payment=()",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
					{
						key: "Content-Security-Policy",
						value:
							"default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self';",
					},
				],
			},
			// Long-term caching for Next static assets (immutable)
			{
				source: "/_next/static/:path*.js",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/_next/static/:path*.css",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			// Specific headers for static assets
			{
				source: "/favicon.ico",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/(.*\\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2))",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},

	// Rewrites para SEO-friendly URLs
	async rewrites() {
		return [
			{
				source: "/sobre-nosotros",
				destination: "/about",
			},
		];
	},

	// Redirects para URLs obsoletas o mejoradas
	async redirects() {
		return [
			{
				source: "/home",
				destination: "/",
				permanent: true,
			},
			{
				source: "/index",
				destination: "/",
				permanent: true,
			},
			// Redirects de /services a /soluciones
			{
				source: "/services",
				destination: "/soluciones",
				permanent: true,
			},
			{
				source: "/services/web-development",
				destination: "/soluciones/web-development",
				permanent: true,
			},
			{
				source: "/services/e-commerce",
				destination: "/soluciones/e-commerce",
				permanent: true,
			},
			{
				source: "/services/seo",
				destination: "/soluciones/seo",
				permanent: true,
			},
			{
				source: "/services/consulting",
				destination: "/soluciones/consulting",
				permanent: true,
			},
		];
	},
};

export default nextConfig;

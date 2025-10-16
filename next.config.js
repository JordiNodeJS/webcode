const nextConfig = {
	experimental: {
		reactCompiler: true,
	},
	// Configuración de imágenes para permitir dominios externos
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.notion.so",
				port: "",
				pathname: "/images/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "via.placeholder.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	// Redirects: keep English `/privacy` pointing to Spanish `/politica-privacidad`
	async redirects() {
		return [
			{
				source: "/privacy",
				destination: "/politica-privacidad",
				permanent: true,
			},
		];
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
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
				],
			},
		];
	},
};

// Solo habilitar el bundle analyzer en modo análisis
if (process.env.ANALYZE === "true") {
	const withBundleAnalyzer = require("@next/bundle-analyzer")({
		enabled: true,
	});
	module.exports = withBundleAnalyzer(nextConfig);
} else {
	module.exports = nextConfig;
}

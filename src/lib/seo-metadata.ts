import type { Metadata } from "next";

interface SEOMetadataProps {
	title?: string;
	description?: string;
	keywords?: string[];
	canonical?: string;
	ogImage?: string;
	ogType?: "website" | "article";
	locale?: string;
	alternateLocales?: string[];
	publishedTime?: string;
	modifiedTime?: string;
	author?: string;
	section?: string;
	tags?: string[];
}

export function generateSEOMetadata({
	title = "WEBCODE - Soluciones Web Profesionales en Barcelona",
	description = "Desarrollo web profesional, e-commerce y aplicaciones web para freelancers, PYMEs y startups en Barcelona y España. Soluciones digitales de calidad con tecnologías de vanguardia.",
	keywords = [
		"desarrollo web Barcelona",
		"freelancer desarrollo web",
		"sitios web profesionales",
		"e-commerce España",
		"aplicaciones web Barcelona",
		"soluciones digitales Catalunya",
		"diseño web responsive",
		"SEO Barcelona",
		"desarrollo web moderno",
		"startup web solutions",
	],
	canonical = "https://webcode.es",
	ogImage = "https://webcode.es/og-image.jpg",
	ogType = "website",
	locale = "es_ES",
	alternateLocales = ["ca_ES", "en_ES"],
	publishedTime,
	modifiedTime,
	author = "WEBCODE Team",
	section,
	tags = [],
}: SEOMetadataProps): Metadata {
	const _baseUrl = "https://webcode.es";

	return {
		title,
		description,
		keywords: keywords.join(", "),
		authors: [{ name: author }],
		creator: "WEBCODE",
		publisher: "WEBCODE",
		category: "Technology",

		// Basic meta tags
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},

		// Canonical URL
		alternates: {
			canonical,
			languages: {
				"es-ES": canonical,
				"ca-ES": `${canonical}?lang=ca`,
				"en-ES": `${canonical}?lang=en`,
			},
		},

		// Open Graph
		openGraph: {
			type: ogType,
			locale,
			alternateLocale: alternateLocales,
			title,
			description,
			url: canonical,
			siteName: "WEBCODE",
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: title,
					type: "image/jpeg",
				},
				{
					url: "https://webcode.es/og-image-square.jpg",
					width: 600,
					height: 600,
					alt: title,
					type: "image/jpeg",
				},
			],
			...(publishedTime && { publishedTime }),
			...(modifiedTime && { modifiedTime }),
			...(section && { section }),
			...(tags.length > 0 && { tags }),
		},

		// Twitter Card
		twitter: {
			card: "summary_large_image",
			site: "@webcode_es",
			creator: "@webcode_es",
			title,
			description,
			images: [ogImage],
		},

		// Additional meta tags
		other: {
			// Geographic targeting
			"geo.region": "ES-CT",
			"geo.placename": "Barcelona",
			"geo.position": "41.3851;2.1734",
			ICBM: "41.3851, 2.1734",

			// Business info
			"business:contact_data:street_address": "Barcelona, España",
			"business:contact_data:locality": "Barcelona",
			"business:contact_data:region": "Catalunya",
			"business:contact_data:postal_code": "08000",
			"business:contact_data:country_name": "Spain",

			// Language and content
			"content-language": locale.replace("_", "-"),
			language: "Spanish",

			// Mobile optimization
			"mobile-web-app-capable": "yes",
			"apple-mobile-web-app-capable": "yes",
			"apple-mobile-web-app-status-bar-style": "default",
			"apple-mobile-web-app-title": "WEBCODE",

			// Theme
			"theme-color": "#000000",
			"msapplication-navbutton-color": "#000000",

			// Additional SEO
			"revisit-after": "7 days",
			distribution: "global",
			audience: "all",
			rating: "general",
			coverage: "worldwide",
			target: "all",
		},

		// App-specific
		applicationName: "WEBCODE",
		appleWebApp: {
			capable: true,
			title: "WEBCODE",
			statusBarStyle: "default",
		},

		// Format detection
		formatDetection: {
			telephone: false,
			address: false,
			email: false,
		},

		// Verification (these would be added when available)
		// verification: {
		//   google: "google-site-verification-code",
		//   yandex: "yandex-verification-code",
		//   bing: "bing-site-verification-code"
		// }
	};
}

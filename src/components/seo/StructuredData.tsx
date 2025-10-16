import Script from "next/script";

interface StructuredDataProps {
	type?: "Organization" | "LocalBusiness" | "WebSite" | "Service" | "Article";
	data?: Record<string, unknown>;
}

export function StructuredData({
	type = "Organization",
	data = {},
}: StructuredDataProps) {
	const baseData = {
		"@context": "https://schema.org",
		"@type": type,
	};

	const organizationData = {
		...baseData,
		"@type": "Organization",
		name: "WEBCODE",
		url: "https://webcode.es",
		logo: "https://webcode.es/favicon-96x96.png",
		description:
			"Plataforma integral de desarrollo web y soluciones digitales para freelancers, pequeñas empresas y startups en Barcelona y España.",
		address: {
			"@type": "PostalAddress",
			addressCountry: "ES",
			addressRegion: "Cataluña",
			addressLocality: "Barcelona",
		},
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "customer service",
			availableLanguage: ["Spanish", "Catalan", "English"],
		},
		sameAs: [
			"https://linkedin.com/company/webcode",
			"https://twitter.com/webcode_es",
		],
		founder: {
			"@type": "Person",
			name: "WEBCODE Team",
		},
		foundingDate: "2025",
		areaServed: {
			"@type": "Country",
			name: "Spain",
		},
		serviceArea: {
			"@type": "GeoCircle",
			geoMidpoint: {
				"@type": "GeoCoordinates",
				latitude: 41.3851,
				longitude: 2.1734,
			},
			geoRadius: "50000",
		},
	};

	const websiteData = {
		...baseData,
		"@type": "WebSite",
		name: "WEBCODE - Soluciones Web Profesionales",
		url: "https://webcode.es",
		potentialAction: {
			"@type": "SearchAction",
			target: "https://webcode.es/buscar?q={search_term_string}",
			"query-input": "required name=search_term_string",
		},
		publisher: {
			"@type": "Organization",
			name: "WEBCODE",
		},
		inLanguage: "es-ES",
	};

	const localBusinessData = {
		...baseData,
		"@type": "LocalBusiness",
		"@id": "https://webcode.es/#business",
		name: "WEBCODE",
		url: "https://webcode.es",
		telephone: "+34-XXX-XXX-XXX",
		address: {
			"@type": "PostalAddress",
			streetAddress: "Barcelona",
			addressLocality: "Barcelona",
			addressRegion: "Cataluña",
			postalCode: "08000",
			addressCountry: "ES",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: 41.3851,
			longitude: 2.1734,
		},
		openingHoursSpecification: {
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
			opens: "09:00",
			closes: "18:00",
		},
		priceRange: "€€",
		currenciesAccepted: "EUR",
		paymentAccepted: "Cash, Credit Card, Bank Transfer",
	};

	let structuredData: Record<string, unknown>;
	switch (type) {
		case "WebSite":
			structuredData = { ...websiteData, ...data };
			break;
		case "LocalBusiness":
			structuredData = { ...localBusinessData, ...data };
			break;
		case "Service":
			structuredData = {
				...baseData,
				"@type": "Service",
				name: "Desarrollo Web Profesional",
				provider: organizationData,
				areaServed: "Spain",
				...data,
			};
			break;
		default:
			structuredData = { ...organizationData, ...data };
	}

	return (
		<Script
			id={`structured-data-${type.toLowerCase()}`}
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(structuredData),
			}}
		/>
	);
}

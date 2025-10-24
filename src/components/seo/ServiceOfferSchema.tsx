import Script from "next/script";

interface ServiceOffer {
  name: string;
  description: string;
  price: string;
  priceCurrency?: string;
  category?: string;
  availability?: string;
  validFrom?: string;
  validThrough?: string;
}

interface ServiceOfferSchemaProps {
  service: ServiceOffer;
  baseUrl?: string;
}

export function ServiceOfferSchema({
  service,
  baseUrl = "https://webcode.es"
}: ServiceOfferSchemaProps) {
  const organizationData = {
    "@type": "Organization",
    name: "WEBCODE",
    url: baseUrl,
    logo: `${baseUrl}/favicon-96x96.png`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "ES",
      addressRegion: "Cataluña",
      addressLocality: "Barcelona"
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Spanish", "Catalan", "English"]
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: organizationData,
    category: service.category || "Servicios de Desarrollo Web",
    areaServed: {
      "@type": "Country",
      name: "Spain"
    },
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: service.priceCurrency || "EUR",
      availability: service.availability || "https://schema.org/InStock",
      seller: organizationData,
      validFrom: service.validFrom || new Date().toISOString().split("T")[0],
      validThrough: service.validThrough,
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "ES",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn"
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "EUR"
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY"
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY"
          }
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "ES"
        }
      }
    }
  };

  return (
    <Script
      id="service-offer-schema"
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceSchema)
      }}
    />
  );
}

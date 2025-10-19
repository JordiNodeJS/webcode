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

interface MultipleOffersSchemaProps {
  serviceName: string;
  serviceDescription: string;
  offers: ServiceOffer[];
  baseUrl?: string;
}

export function MultipleOffersSchema({
  serviceName,
  serviceDescription,
  offers,
  baseUrl = "https://webcode.es"
}: MultipleOffersSchemaProps) {
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

  const merchantReturnPolicy = {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "ES",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 14,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn"
  };

  const shippingDetails = {
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
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    provider: organizationData,
    category: "Servicios de Desarrollo Web",
    areaServed: {
      "@type": "Country",
      name: "Spain"
    },
    offers: offers.map(offer => ({
      "@type": "Offer",
      name: offer.name,
      description: offer.description,
      price: offer.price,
      priceCurrency: offer.priceCurrency || "EUR",
      availability: offer.availability || "https://schema.org/InStock",
      seller: organizationData,
      validFrom: offer.validFrom || new Date().toISOString().split('T')[0],
      validThrough: offer.validThrough,
      hasMerchantReturnPolicy: merchantReturnPolicy,
      shippingDetails: shippingDetails
    }))
  };

  return (
    <Script
      id="multiple-offers-schema"
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceSchema)
      }}
    />
  );
}

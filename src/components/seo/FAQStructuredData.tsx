"use client";

import Script from "next/script";
import { useId } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  faqs: FAQItem[];
}

/**
 * Componente de datos estructurados para FAQPage (Schema.org)
 * 
 * Optimiza la página para aparecer en los resultados enriquecidos de Google
 * mostrando las preguntas directamente en los resultados de búsqueda.
 */
export function FAQStructuredData({ faqs }: FAQStructuredDataProps) {
  const uniqueId = useId();
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Script
      id={`faq-structured-data-${uniqueId}`}
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}

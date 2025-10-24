"use client";

import Script from "next/script";
import type { ReactElement, ReactNode } from "react";

interface FAQItem {
  question: string;
  answer: ReactNode;
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
  // Usar ID estático para evitar problemas de hidratación
  const uniqueId = "faq-structured-data";

  // Helper to convert a ReactNode (possibly JSX) into plain text
  const reactNodeToText = (node: ReactNode): string => {
    if (node == null) return "";
    if (
      typeof node === "string" ||
      typeof node === "number" ||
      typeof node === "boolean"
    ) {
      return String(node);
    }
    if (Array.isArray(node)) {
      return node.map((n) => reactNodeToText(n)).join(" ");
    }
    // If it's a React element, try to access its props.children
    // If it's a React element, try to access its props.children
    const element = node as ReactElement<{ children?: ReactNode }> | null;
    if (element?.props?.children) {
      return reactNodeToText(element.props.children as ReactNode);
    }
    return "";
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: reactNodeToText(faq.answer)
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

import Script from "next/script";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  baseUrl?: string;
}

export function BreadcrumbSchema({
  items,
  baseUrl = "https://webcode.es"
}: BreadcrumbSchemaProps) {
  // Usar ID estático para evitar problemas de hidratación
  const id = "breadcrumb-schema";
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`
    }))
  };

  return (
    <Script
      id={`structured-data-breadcrumb-${id}`}
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbList)
      }}
    />
  );
}

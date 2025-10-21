export const metadata = {
  title: "Portfolio - WEBCODE | Desarrollo Web Profesional",
  description: "Explora el portfolio de WEBCODE: proyectos de desarrollo web, e-commerce y aplicaciones modernas realizadas en Barcelona. Tecnologías: Next.js, React, TypeScript.",
  keywords: [
    "portfolio desarrollo web",
    "proyectos web Barcelona",
    "desarrollo web profesional",
    "Next.js portfolio",
    "React proyectos",
    "TypeScript desarrollo"
  ],
  openGraph: {
    title: "Portfolio - WEBCODE | Desarrollo Web Profesional",
    description: "Explora el portfolio de WEBCODE: proyectos de desarrollo web, e-commerce y aplicaciones modernas realizadas en Barcelona.",
    url: "https://webcode.es/portfolio",
    siteName: "WEBCODE",
    images: [
      {
        url: "https://webcode.es/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Portfolio WEBCODE - Desarrollo Web Profesional",
        type: "image/png"
      }
    ],
    locale: "es_ES",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - WEBCODE | Desarrollo Web Profesional",
    description: "Explora el portfolio de WEBCODE: proyectos de desarrollo web, e-commerce y aplicaciones modernas.",
    images: ["https://webcode.es/opengraph-image"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  alternates: {
    canonical: "https://webcode.es/portfolio"
  }
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10 pt-24 pb-12 border-b border-border/30">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-webcode">Portfolio</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explora mis proyectos y trabajos realizados. Desarrollo web moderno
            con las últimas tecnologías.
          </p>
        </div>
      </div>

      {/* Portfolio Iframe */}
      <div className="flex-1 relative">
        <iframe
          src="https://jordinodejs.github.io/"
          title="Portfolio de Jordi"
          className="w-full h-full absolute inset-0 border-0"
          style={{ minHeight: "calc(100vh - 200px)" }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
}

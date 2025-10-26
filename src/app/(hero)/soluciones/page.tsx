import type { Metadata } from "next";
import Link from "next/link";
import { EyeFollowButton, SolucionCard } from "@/components/soluciones";
import { AnimatedRocketIcon } from "@/components/soluciones/AnimatedRocketIcon";
import { Button } from "@/components/ui/button";
import { SplineBackgroundThemed } from "@/components/custom/SplineBackgroundThemed";
import { SPLINE_SCENES } from "@/lib/spline-paths";

export const metadata: Metadata = {
  title: "Soluciones Digitales | WEBCODE",
  description:
    "Desarrollo web, e-commerce, SEO y consultoría tecnológica. Soluciones digitales completas para empresas que quieren crecer online.",
  openGraph: {
    title: "Soluciones Digitales | WEBCODE",
    description:
      "Desarrollo web, e-commerce, SEO y consultoría tecnológica para empresas."
  }
};

export default function ServicesIndexPage() {
  const solutions = [
    {
      slug: "web-development",
      icon: "🚀",
      title: "Desarrollo Web",
      subtitle: "Sitios web profesionales",
      description:
        "Desarrollo web moderno con Next.js 15 y React 19. Páginas web corporativas, landing pages de alta conversión y aplicaciones web escalables.",
      highlights: [
        "Páginas web corporativas",
        "Landing pages de alta conversión",
        "Portfolios profesionales",
        "Aplicaciones web a medida"
      ],
      subservices: [
        "Páginas web corporativas",
        "Landing pages de conversión",
        "Portfolios profesionales",
        "Aplicaciones web escalables",
        "Webs institucionales",
        "Microsites y campañas"
      ],
      technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"],
      color: "primary"
    },
    {
      slug: "e-commerce",
      icon: "🛒",
      title: "E-commerce",
      subtitle: "Tiendas online que venden",
      description:
        "Tiendas online completas con Wix Studio, o desarrollo personalizado. Optimizadas para conversión y listas para vender desde el día uno.",
      highlights: [
        "Tiendas profesionales",
        "E-commerce WixStudio",
        "Desarrollo personalizado",
        "Integración de pagos completa"
      ],
      subservices: [
        "Tiendas WixStudio",
        "E-commerce Webflow",
        "Desarrollo personalizado",
        "Integración de pagos (Stripe, PayPal)",
        "Gestión de inventario",
        "Panel de administración"
      ],
      technologies: ["Webflow", "WixStudio", "Next.js", "Stripe"],
      color: "secondary"
    },
    {
      slug: "seo",
      icon: "🔍",
      title: "SEO & Marketing",
      subtitle: "Más visibilidad, más clientes",
      description:
        "Posicionamiento SEO técnico, marketing de contenidos y estrategias digitales para aparecer en Google y generar tráfico cualificado.",
      highlights: [
        "SEO técnico avanzado",
        "SEO Local (Google Business)",
        "Google Ads y Meta Ads",
        "Marketing de contenidos"
      ],
      subservices: [
        "SEO On-Page y Off-Page",
        "SEO Local (Google Business)",
        "Google Ads y Meta Ads",
        "Marketing de contenidos",
        "Analytics y reportes",
        "Optimización de conversiones"
      ],
      technologies: [
        "Google Analytics",
        "Search Console",
        "Google Ads",
        "Meta Ads"
      ],
      color: "accent"
    },
    {
      slug: "consulting",
      icon: "💡",
      title: "Consultoría Tech",
      subtitle: "Estrategia y transformación",
      description:
        "Consultoría tecnológica especializada. Arquitectura de software, optimización de procesos y transformación digital para empresas.",
      highlights: [
        "Arquitectura de software",
        "Transformación digital",
        "Optimización de procesos",
        "CTO as a Service"
      ],
      subservices: [
        "Arquitectura de software",
        "Transformación digital",
        "Optimización de procesos",
        "CTO as a Service",
        "Auditorías técnicas",
        "Migración de sistemas"
      ],
      technologies: ["Next.js", "React", "Node.js", "Cloud Services"],
      color: "primary"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section con Spline Background */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pb-32">
        {/* Capa 1: Escena 3D (z-0, fondo interactivo) */}
        <SplineBackgroundThemed
          darkScene={SPLINE_SCENES.MAIN}
          lightScene={SPLINE_SCENES.LIGHT_MODE}
          preset="BACKGROUND_RESPONSIVE"
          container="FIXED_FULLSCREEN_INTERACTIVE"
          className="fixed inset-0 z-0"
          ariaLabel="Escena 3D interactiva de fondo mostrando soluciones digitales"
        />

        {/* Capa 2: Contenido con backdrop blur individual (z-10, elementos interactivos) */}
        <div className="container mx-auto max-w-6xl px-4 relative z-10 pointer-events-none">
          <div className="max-w-4xl pointer-events-auto">
            <div className="inline-block mb-6 px-6 py-2 bg-white/40 dark:bg-black/40 backdrop-blur-md text-primary dark:text-primary font-bold uppercase text-sm tracking-wider rounded-full border-2 border-primary/50 shadow-lg">
              Soluciones Digitales
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="inline-block px-4 py-2 bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-lg text-gray-900 dark:text-white">
                Impulsamos tu Negocio con{" "}
              </span>
              <span className="inline-block px-4 py-2 bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-lg bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Tecnología
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl">
              <span className="inline-block px-4 py-2 bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-lg text-gray-800 dark:text-white/90 font-medium">
                Desde webs profesionales hasta transformación digital completa.
                Soluciones a medida para cada etapa de tu negocio.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution) => (
            <SolucionCard key={solution.slug} className="h-full">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <AnimatedRocketIcon icon={solution.icon} slug={solution.slug} />
                <div className="flex-1">
                  <h2 className="text-3xl font-black mb-1">{solution.title}</h2>
                  <p
                    className={`text-sm font-bold uppercase tracking-wider text-${solution.color}`}
                  >
                    {solution.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 text-lg">
                {solution.description}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  Tecnologías
                </h4>
                <div className="flex flex-wrap gap-2">
                  {solution.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-muted/50 text-muted-foreground rounded-full border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Subservices */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  Servicios Incluidos
                </h4>
                <ul className="space-y-2">
                  {solution.subservices.slice(0, 4).map((service) => (
                    <li key={service} className="flex items-start gap-2">
                      <span
                        className={`text-${solution.color} font-bold text-sm mt-0.5`}
                      >
                        ✓
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {service}
                      </span>
                    </li>
                  ))}
                  {solution.subservices.length > 4 && (
                    <li className="text-xs text-muted-foreground ml-4">
                      +{solution.subservices.length - 4} servicios más
                    </li>
                  )}
                </ul>
              </div>

              {/* CTA */}
              <Button
                asChild
                className={`w-full font-semibold text-lg bg-linear-to-r ${
                  solution.color === "secondary"
                    ? "from-secondary/70 via-secondary/60 to-secondary/50"
                    : solution.color === "accent"
                      ? "from-accent/70 via-accent/60 to-accent/50"
                      : "from-primary/70 via-primary/60 to-primary/50"
                } text-white hover:shadow-lg hover:shadow-${solution.color}/25 transition-all duration-300`}
              >
                <Link href={`/soluciones/${solution.slug}`}>
                  Ver {solution.title} →
                </Link>
              </Button>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* Credentials & Case Study */}
      <section className="bg-linear-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Casos de{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Éxito
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Proyectos reales con resultados medibles
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* MudanzasAndy Case Study */}
            <SolucionCard className="bg-linear-to-br from-primary/10 to-secondary/10 border-2 border-primary/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-2xl font-bold text-white">
                  MA
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">MudanzasAndy.es</h3>
                  <p className="text-sm text-muted-foreground">
                    Empresa de mudanzas en Barcelona
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">+180%</div>
                    <div className="text-xs text-muted-foreground">
                      Tráfico orgánico
                    </div>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-secondary">
                      95/100
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Core Web Vitals
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>SEO Local optimizado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Formulario de contacto inteligente</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Diseño responsive perfecto</span>
                  </li>
                </ul>
              </div>

              <Button asChild variant="outline" className="w-full">
                <a
                  href="https://mudanzasandy.es"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Proyecto →
                </a>
              </Button>
            </SolucionCard>

            {/* Technology Stack */}
            <SolucionCard>
              <h3 className="text-xl font-bold mb-4">Stack Tecnológico</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    Frontend
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Next.js 15",
                      "React 19",
                      "TypeScript",
                      "Tailwind CSS"
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    Performance
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Core Web Vitals",
                      "SEO Optimizado",
                      "Accesibilidad WCAG"
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-secondary/10 text-secondary rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SolucionCard>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-linear-to-br from-accent/5 to-primary/5 dark:from-accent/10 dark:to-primary/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            ¿Por Qué{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              WEBCODE?
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "⚡",
                title: "Tecnología Moderna",
                description:
                  "Next.js 15 + React 19. Lo último en desarrollo web."
              },
              {
                icon: "🎯",
                title: "Resultados Medibles",
                description:
                  "Core Web Vitals en verde, SEO optimizado desde día 1."
              },
              {
                icon: "💰",
                title: "Precio Transparente",
                description: "Sin sorpresas. Presupuestos claros y detallados."
              },
              {
                icon: "🤝",
                title: "Soporte Continuo",
                description:
                  "30 días de soporte premium incluido post-lanzamiento."
              }
            ].map((benefit) => (
              <SolucionCard key={benefit.title} className="text-center">
                <div className="text-5xl mb-3">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </SolucionCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          Cómo{" "}
          <span className="bg-linear-to-r from-secondary to-accent bg-clip-text text-transparent">
            Trabajamos
          </span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
          Un proceso claro y transparente de principio a fin.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Consulta",
              description: "Hablamos de tu proyecto y necesidades"
            },
            {
              step: "02",
              title: "Propuesta",
              description: "Presupuesto detallado en 24-48h"
            },
            {
              step: "03",
              title: "Desarrollo",
              description: "Construimos tu solución con updates regulares"
            },
            {
              step: "04",
              title: "Lanzamiento",
              description: "Deploy, training y soporte continuo"
            }
          ].map((phase) => (
            <SolucionCard key={phase.step}>
              <div className="text-4xl font-bold text-secondary/30 dark:text-secondary/40 mb-3">
                {phase.step}
              </div>
              <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
              <p className="text-sm text-muted-foreground">
                {phase.description}
              </p>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <div className="relative overflow-hidden rounded-xl border border-border/30 dark:border-border/20 bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10 shadow-3d-lg hover:shadow-3d-xl transition-all duration-500">
          {/* Animated gradient overlay - Must stay separate for animate-gradient-x (requires background-size: 200% 200%) */}
          <div className="absolute inset-0 bg-linear-to-r from-primary/8 via-secondary/8 to-accent/8 dark:from-primary/15 dark:via-secondary/15 dark:to-accent/15 animate-gradient-x opacity-50 rounded-xl" />

          <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary-foreground rounded-full text-sm font-semibold shadow-3d-sm ring-1 ring-primary/30">
              💬 Hablemos
            </div>

            {/* Title with gradient */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gradient-webcode">
                ¿Hablamos de tu Proyecto?
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Cuéntanos qué necesitas y te enviaremos un presupuesto
              personalizado en{" "}
              <span className="text-primary font-semibold">24h</span>. Sin
              compromiso.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="group relative bg-linear-to-r from-primary/70 via-secondary/60 to-primary/50 text-white font-semibold text-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1"
              >
                <Link href="/contacto">
                  ✉️ Solicitar Presupuesto
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Button>

              <EyeFollowButton />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

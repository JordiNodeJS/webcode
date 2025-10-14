import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SolucionCard } from "@/components/soluciones";

export const metadata: Metadata = {
  title: "Soluciones Digitales | WEBCODE",
  description:
    "Desarrollo web, e-commerce, SEO y consultoría tecnológica. Soluciones digitales completas para empresas que quieren crecer online.",
  openGraph: {
    title: "Soluciones Digitales | WEBCODE",
    description:
      "Desarrollo web, e-commerce, SEO y consultoría tecnológica para empresas.",
  },
};

export default function ServicesIndexPage() {
  const solutions = [
    {
      slug: "web-development",
      icon: "🚀",
      title: "Desarrollo Web",
      subtitle: "Sitios web profesionales",
      description:
        "Landing pages, webs corporativas, portfolios y aplicaciones web a medida con Next.js y React.",
      highlights: [
        "Landing pages de alta conversión",
        "Webs corporativas profesionales",
        "Aplicaciones web escalables",
        "Portfolios impactantes",
      ],
      color: "primary",
    },
    {
      slug: "e-commerce",
      icon: "🛒",
      title: "E-commerce",
      subtitle: "Tiendas online que venden",
      description:
        "Tiendas online completas con Shopify, WooCommerce o desarrollo personalizado. Listas para vender desde el día uno.",
      highlights: [
        "Hasta 50k productos",
        "Pagos integrados (Stripe, PayPal, Bizum)",
        "Envíos automatizados",
        "Panel de gestión completo",
      ],
      color: "secondary",
    },
    {
      slug: "seo",
      icon: "🔍",
      title: "SEO & Marketing",
      subtitle: "Más visibilidad, más clientes",
      description:
        "Posicionamiento SEO, marketing de contenidos y estrategias digitales para aparecer en Google.",
      highlights: [
        "SEO On-Page y Off-Page",
        "SEO Local (Google Business)",
        "Marketing de contenidos",
        "Analytics y reportes",
      ],
      color: "accent",
    },
    {
      slug: "consulting",
      icon: "💡",
      title: "Consultoría Tech",
      subtitle: "Estrategia y transformación",
      description:
        "Consultoría tecnológica y estratégica. Arquitectura de software, optimización de procesos y transformación digital.",
      highlights: [
        "Arquitectura de software",
        "Transformación digital",
        "Optimización de procesos",
        "CTO as a Service",
      ],
      color: "primary",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-secondary/3 to-accent/3 dark:from-primary/5 dark:via-secondary/5 dark:to-accent/5" />
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 text-primary dark:text-primary font-bold uppercase text-sm tracking-wider rounded-full border border-primary/30">
              Soluciones Digitales
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
              Impulsamos tu Negocio con{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Tecnología
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Desde webs profesionales hasta transformación digital completa.
              Soluciones a medida para cada etapa de tu negocio.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution) => (
            <SolucionCard key={solution.slug}>
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">{solution.icon}</div>
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

              {/* Highlights */}
              <ul className="space-y-3 mb-8">
                {solution.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span
                      className={`text-${solution.color} font-bold text-lg`}
                    >
                      ✓
                    </span>
                    <span className="font-medium">{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                asChild
                className={`w-full font-semibold text-lg bg-gradient-to-r ${
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

      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-accent/5 to-primary/5 dark:from-accent/10 dark:to-primary/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            ¿Por Qué{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              WEBCODE?
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "⚡",
                title: "Entrega Rápida",
                description: "Webs en 7 días, tiendas en 10. Sin esperas.",
              },
              {
                icon: "🎯",
                title: "Resultados Reales",
                description: "+245% tráfico orgánico medio en clientes SEO.",
              },
              {
                icon: "💰",
                title: "Precio Transparente",
                description: "Sin sorpresas. Presupuestos claros y detallados.",
              },
              {
                icon: "🤝",
                title: "Soporte Continuo",
                description:
                  "No te dejamos solo. Soporte post-lanzamiento incluido.",
              },
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
          <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
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
              description: "Hablamos de tu proyecto y necesidades",
            },
            {
              step: "02",
              title: "Propuesta",
              description: "Presupuesto detallado en 24-48h",
            },
            {
              step: "03",
              title: "Desarrollo",
              description: "Construimos tu solución con updates regulares",
            },
            {
              step: "04",
              title: "Lanzamiento",
              description: "Deploy, training y soporte continuo",
            },
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

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-secondary/90 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20" />
        <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            ¿Hablamos de tu Proyecto?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Cuéntanos qué necesitas y te enviaremos un presupuesto personalizado
            en 24h. Sin compromiso.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/contacto">Solicitar Presupuesto</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 transition-all"
            >
              <Link href="/portfolio">Ver Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

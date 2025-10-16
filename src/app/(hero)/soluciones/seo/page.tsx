import type { Metadata } from "next";
import Link from "next/link";
import { SolucionCard } from "@/components/soluciones";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "SEO & Marketing Digital | WEBCODE",
  description:
    "Servicios de SEO, posicionamiento web y marketing digital. Aumenta tu visibilidad en Google y consigue más clientes.",
  openGraph: {
    title: "SEO & Marketing Digital | WEBCODE",
    description:
      "Servicios de SEO, posicionamiento web y marketing digital para conseguir más clientes."
  }
};

export default function SeoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[image:linear-gradient(to_right,rgb(var(--accent-rgb)_/_0.03),rgb(var(--primary-rgb)_/_0.03),rgb(var(--secondary-rgb)_/_0.03)),linear-gradient(to_bottom_right,rgb(var(--accent-rgb)_/_0.05),rgb(var(--primary-rgb)_/_0.05),rgb(var(--secondary-rgb)_/_0.05))] dark:bg-[image:linear-gradient(to_right,rgb(var(--accent-rgb)_/_0.05),rgb(var(--primary-rgb)_/_0.05),rgb(var(--secondary-rgb)_/_0.05)),linear-gradient(to_bottom_right,rgb(var(--accent-rgb)_/_0.10),rgb(var(--primary-rgb)_/_0.10),rgb(var(--secondary-rgb)_/_0.10))] pt-24 pb-20 md:pb-32">
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-accent/20 to-primary/20 dark:from-accent/30 dark:to-primary/30 text-accent dark:text-accent font-bold uppercase text-sm tracking-wider rounded-full border border-accent/30">
              SEO & Marketing
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
              Aparece en Google y{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Consigue Más Clientes
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Posicionamiento SEO, marketing de contenidos y estrategias
              digitales que generan resultados reales.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="font-bold text-lg px-8 py-6 bg-gradient-to-r from-accent to-primary hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Link href="/contacto">Auditoría SEO Gratis</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-bold text-lg px-8 py-6 hover:bg-gradient-to-r hover:from-accent/10 hover:to-primary/10 transition-all duration-300"
              >
                <Link href="/faqs#casos-exito">Ver Casos de Éxito</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          ¿Te Suenan Estos{" "}
          <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Problemas?
          </span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
          Sabemos lo frustrante que es invertir en una web y que nadie la
          encuentre.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              problem: "❌ No apareces en Google",
              solution: "✅ Te posicionamos en primera página"
            },
            {
              problem: "❌ Tus competidores te superan",
              solution: "✅ Analizamos y superamos su estrategia"
            },
            {
              problem: "❌ Inviertes en anuncios sin resultados",
              solution: "✅ Optimizamos cada euro invertido"
            },
            {
              problem: "❌ No sabes qué está funcionando",
              solution: "✅ Informes claros y métricas accionables"
            }
          ].map((item) => (
            <SolucionCard key={item.problem} hover={false}>
              <div className="text-lg font-bold mb-2 text-muted-foreground">
                {item.problem}
              </div>
              <div className="text-lg font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {item.solution}
              </div>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-gradient-to-br from-secondary/5 to-primary/5 dark:from-secondary/10 dark:to-primary/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Nuestros Servicios de SEO
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "SEO On-Page",
                description:
                  "Optimización técnica completa de tu web para motores de búsqueda.",
                features: [
                  "Optimización de contenidos",
                  "Meta tags y estructura",
                  "Velocidad de carga",
                  "Core Web Vitals"
                ]
              },
              {
                icon: "🔗",
                title: "SEO Off-Page",
                description:
                  "Estrategia de link building y autoridad de dominio.",
                features: [
                  "Link building de calidad",
                  "Guest posting",
                  "Menciones de marca",
                  "Estrategia de backlinks"
                ]
              },
              {
                icon: "📍",
                title: "SEO Local",
                description:
                  "Posicionamiento en Google Maps y búsquedas locales.",
                features: [
                  "Google Business Profile",
                  "Optimización local",
                  "Reseñas y reputación",
                  "Directorios locales"
                ]
              },
              {
                icon: "✍️",
                title: "Content Marketing",
                description:
                  "Creación de contenido optimizado que atrae y convierte.",
                features: [
                  "Blog posts SEO",
                  "Páginas de servicio",
                  "Landing pages",
                  "Estrategia de contenidos"
                ]
              },
              {
                icon: "📊",
                title: "Analytics & Reporting",
                description:
                  "Seguimiento y análisis de resultados en tiempo real.",
                features: [
                  "Google Analytics 4",
                  "Search Console",
                  "Informes mensuales",
                  "ROI tracking"
                ]
              },
              {
                icon: "🔍",
                title: "Keyword Research",
                description:
                  "Investigación profunda de palabras clave para tu nicho.",
                features: [
                  "Análisis de competencia",
                  "Long-tail keywords",
                  "Search intent",
                  "Oportunidades de ranking"
                ]
              }
            ].map((service) => (
              <SolucionCard key={service.title}>
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 text-sm">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="text-accent font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </SolucionCard>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          Resultados que Hablan por Sí Solos
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
          Casos reales de clientes que han multiplicado su tráfico orgánico.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              metric: "+245%",
              description: "Tráfico orgánico promedio en 6 meses"
            },
            {
              metric: "+180%",
              description: "Conversiones desde búsqueda orgánica"
            },
            {
              metric: "Top 3",
              description: "Posiciones en keywords principales"
            }
          ].map((result) => (
            <SolucionCard key={result.metric}>
              <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {result.metric}
              </div>
              <p className="text-lg text-foreground">{result.description}</p>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Cómo Trabajamos
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: "01",
                title: "Auditoría Inicial",
                desc: "Análisis completo de tu web, competencia y oportunidades SEO."
              },
              {
                num: "02",
                title: "Estrategia",
                desc: "Plan personalizado con objetivos claros y timeline definido."
              },
              {
                num: "03",
                title: "Implementación",
                desc: "Ejecutamos optimizaciones técnicas, contenidos y link building."
              },
              {
                num: "04",
                title: "Reporting",
                desc: "Informes mensuales con métricas claras y próximos pasos."
              }
            ].map((step) => (
              <SolucionCard key={step.num}>
                <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </SolucionCard>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Planes de SEO
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "SEO Básico",
              price: "€600/mes",
              features: [
                "Optimización On-Page",
                "5 artículos/mes",
                "Google Business",
                "Informe mensual",
                "Soporte email"
              ]
            },
            {
              title: "SEO Profesional",
              price: "€1.200/mes",
              features: [
                "Todo lo de Básico",
                "10 artículos/mes",
                "Link building",
                "Keyword research",
                "Soporte prioritario",
                "Call mensual"
              ]
            },
            {
              title: "SEO Enterprise",
              price: "Personalizado",
              features: [
                "Todo lo de Profesional",
                "Contenidos ilimitados",
                "Estrategia avanzada",
                "Link building agresivo",
                "Account manager dedicado",
                "Reporting semanal"
              ]
            }
          ].map((plan) => (
            <SolucionCard key={plan.title}>
              <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
              <div className="text-3xl font-bold mb-6 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {plan.price}
              </div>
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="text-accent font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </SolucionCard>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12 max-w-2xl mx-auto">
          Contratos flexibles. Sin permanencia. Cancela cuando quieras.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-accent/90 via-accent to-primary/90 text-white py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Listo para Aparecer en Google?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Solicita tu auditoría SEO gratuita y descubre cómo mejorar tu
            posicionamiento.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="font-bold text-lg px-8 py-6 hover:scale-105 transition-transform duration-300"
          >
            <Link href="/contacto">Solicitar Auditoría Gratis</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

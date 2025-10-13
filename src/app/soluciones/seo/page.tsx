import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "SEO & Marketing Digital | WEBCODE",
  description:
    "Servicios de SEO, posicionamiento web y marketing digital. Aumenta tu visibilidad en Google y consigue más clientes.",
  openGraph: {
    title: "SEO & Marketing Digital | WEBCODE",
    description:
      "Servicios de SEO, posicionamiento web y marketing digital para conseguir más clientes.",
  },
};

export default function SeoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent/10 via-primary/10 to-secondary/10 border-b-4 border-accent">
        <div className="container mx-auto max-w-6xl px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-4 py-2 bg-accent text-white font-bold uppercase text-sm tracking-wider border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              SEO & Marketing
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-foreground">
              Aparece en Google y{" "}
              <span className="text-accent">Consigue Más Clientes</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
              Posicionamiento SEO, marketing de contenidos y estrategias
              digitales que generan resultados reales.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 font-bold text-lg px-8 py-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <Link href="/contacto">Auditoría SEO Gratis</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-bold text-lg px-8 py-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <Link href="/blog">Ver Casos de Éxito</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-black mb-6 text-center">
          ¿Te Suenan Estos <span className="text-accent">Problemas?</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
          Sabemos lo frustrante que es invertir en una web y que nadie la
          encuentre.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              problem: "❌ No apareces en Google",
              solution: "✅ Te posicionamos en primera página",
            },
            {
              problem: "❌ Tus competidores te superan",
              solution: "✅ Analizamos y superamos su estrategia",
            },
            {
              problem: "❌ Inviertes en anuncios sin resultados",
              solution: "✅ Optimizamos cada euro invertido",
            },
            {
              problem: "❌ No sabes qué está funcionando",
              solution: "✅ Informes claros y métricas accionables",
            },
          ].map((item) => (
            <div
              key={item.problem}
              className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="text-lg font-bold mb-2 text-muted-foreground">
                {item.problem}
              </div>
              <div className="text-lg font-bold text-accent">
                {item.solution}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-gradient-to-br from-secondary/10 to-primary/10 border-y-4 border-black py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">
            Nuestros <span className="text-primary">Servicios SEO</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "SEO On-Page",
                description:
                  "Optimización técnica de tu web para los motores de búsqueda.",
                features: [
                  "Optimización de contenido",
                  "Meta tags perfectos",
                  "URLs amigables",
                  "Schema markup",
                  "Velocidad de carga",
                  "Mobile optimization",
                ],
              },
              {
                icon: "🔗",
                title: "SEO Off-Page",
                description: "Construcción de autoridad y enlaces de calidad.",
                features: [
                  "Link building ético",
                  "Guest posting",
                  "Menciones de marca",
                  "Directorios relevantes",
                  "Estrategia de PR digital",
                  "Monitorización de backlinks",
                ],
              },
              {
                icon: "🏪",
                title: "SEO Local",
                description:
                  "Domina las búsquedas locales de tu ciudad o zona.",
                features: [
                  "Google Business Profile",
                  "Mapas de Google",
                  "Reseñas optimizadas",
                  "NAP consistency",
                  "Búsquedas 'cerca de mí'",
                  "Fichas en directorios",
                ],
              },
              {
                icon: "🛍️",
                title: "SEO E-commerce",
                description: "Optimización específica para tiendas online.",
                features: [
                  "Fichas de producto",
                  "Categorías optimizadas",
                  "Rich snippets",
                  "Contenido único",
                  "Filtros SEO-friendly",
                  "Estrategia de contenido",
                ],
              },
              {
                icon: "✍️",
                title: "Marketing de Contenidos",
                description: "Contenido que atrae, educa y convierte.",
                features: [
                  "Estrategia de contenido",
                  "Blog corporativo",
                  "Artículos optimizados",
                  "Infografías",
                  "Videos SEO",
                  "Calendarios editoriales",
                ],
              },
              {
                icon: "📊",
                title: "Analytics & Reporting",
                description: "Datos claros para tomar decisiones informadas.",
                features: [
                  "Google Analytics 4",
                  "Search Console",
                  "Seguimiento de conversiones",
                  "Informes mensuales",
                  "Dashboards personalizados",
                  "Recomendaciones accionables",
                ],
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-black mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="text-accent font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">
          Nuestro <span className="text-secondary">Proceso SEO</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Auditoría",
              description:
                "Análisis completo de tu web actual, competencia y oportunidades.",
            },
            {
              step: "02",
              title: "Estrategia",
              description:
                "Plan personalizado con keywords, contenido y link building.",
            },
            {
              step: "03",
              title: "Implementación",
              description:
                "Optimización técnica, contenido y construcción de autoridad.",
            },
            {
              step: "04",
              title: "Monitorización",
              description:
                "Seguimiento continuo, ajustes y reportes de resultados.",
            },
          ].map((phase) => (
            <div
              key={phase.step}
              className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="text-4xl font-black text-accent/20 mb-3">
                {phase.step}
              </div>
              <h3 className="text-xl font-black mb-2">{phase.title}</h3>
              <p className="text-sm text-muted-foreground">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gradient-to-br from-accent/10 to-secondary/10 border-y-4 border-black py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">
            Planes <span className="text-accent">SEO</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic */}
            <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
                SEO Básico
              </div>
              <div className="text-4xl font-black mb-4">
                €490
                <span className="text-lg font-normal text-muted-foreground">
                  {" "}
                  / mes
                </span>
              </div>
              <p className="text-muted-foreground mb-6">
                Perfecto para pequeños negocios que empiezan.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Hasta 10 keywords",
                  "Optimización on-page",
                  "Google Business Profile",
                  "1 artículo/mes",
                  "Informe mensual",
                  "Soporte por email",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-accent font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="w-full font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <Link href="/contacto?service=seo-basico">
                  Empezar Plan Básico
                </Link>
              </Button>
            </div>

            {/* Professional */}
            <div className="bg-accent text-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative -mt-4 md:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 font-bold text-sm uppercase border-4 border-black">
                Recomendado
              </div>
              <div className="text-sm font-bold uppercase tracking-wider opacity-90 mb-2">
                SEO Profesional
              </div>
              <div className="text-4xl font-black mb-4">
                €990
                <span className="text-lg font-normal opacity-90"> / mes</span>
              </div>
              <p className="opacity-90 mb-6">
                Para negocios que quieren resultados serios.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Hasta 30 keywords",
                  "Optimización completa",
                  "Link building activo",
                  "4 artículos/mes",
                  "SEO local avanzado",
                  "Informes detallados",
                  "Soporte prioritario",
                  "Consultor asignado",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant="secondary"
                className="w-full font-bold border-4 border-black bg-white text-accent shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <Link href="/contacto?service=seo-profesional">
                  Empezar Plan Pro
                </Link>
              </Button>
            </div>

            {/* Enterprise */}
            <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
                SEO Enterprise
              </div>
              <div className="text-4xl font-black mb-4">
                Desde €1.990
                <span className="text-lg font-normal text-muted-foreground block mt-1">
                  personalizado
                </span>
              </div>
              <p className="text-muted-foreground mb-6">
                Estrategias avanzadas para grandes empresas.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Keywords ilimitadas",
                  "Multi-idioma / Multi-país",
                  "Estrategia completa",
                  "Contenido premium",
                  "PR digital incluido",
                  "Equipo dedicado",
                  "Soporte 24/7",
                  "SLA garantizado",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant="outline"
                className="w-full font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <Link href="/contacto?service=seo-enterprise">
                  Solicitar Presupuesto
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">
          Resultados <span className="text-primary">Reales</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              metric: "+245%",
              description: "Aumento medio en tráfico orgánico",
              timeframe: "en 6 meses",
            },
            {
              metric: "+180%",
              description: "Crecimiento en conversiones",
              timeframe: "en 4 meses",
            },
            {
              metric: "Top 3",
              description: "Posicionamiento medio en keywords objetivo",
              timeframe: "en 3 meses",
            },
          ].map((result) => (
            <div
              key={result.metric}
              className="bg-white border-4 border-black p-8 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="text-5xl font-black text-accent mb-3">
                {result.metric}
              </div>
              <div className="font-bold mb-2">{result.description}</div>
              <div className="text-sm text-muted-foreground">
                {result.timeframe}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent text-white border-t-4 border-black py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Auditoría SEO Gratuita
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Te enviamos un análisis detallado de tu web con las mejoras que
            necesitas para aparecer en Google. Sin compromiso.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-white text-accent font-bold text-lg px-8 py-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            <Link href="/contacto?service=auditoria-seo">
              Solicitar Auditoría Gratis
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

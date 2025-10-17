import type { Metadata } from "next";
import Link from "next/link";
import { SolucionCard } from "@/components/soluciones";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "SEO On-Page & Optimización Técnica | WEBCODE",
  description:
    "Optimización SEO On-Page completa: contenido, estructura técnica, Core Web Vitals y experiencia de usuario para mejorar tu posicionamiento.",
  openGraph: {
    title: "SEO On-Page & Optimización Técnica | WEBCODE",
    description:
      "Optimización técnica completa de tu web para motores de búsqueda y usuarios."
  }
};

export default function SeoOnPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[image:linear-gradient(to_right,rgb(var(--accent-rgb)_/_0.03),rgb(var(--primary-rgb)_/_0.03),rgb(var(--secondary-rgb)_/_0.03)),linear-gradient(to_bottom_right,rgb(var(--accent-rgb)_/_0.05),rgb(var(--primary-rgb)_/_0.05),rgb(var(--secondary-rgb)_/_0.05))] dark:bg-[image:linear-gradient(to_right,rgb(var(--accent-rgb)_/_0.05),rgb(var(--primary-rgb)_/_0.05),rgb(var(--secondary-rgb)_/_0.05)),linear-gradient(to_bottom_right,rgb(var(--accent-rgb)_/_0.10),rgb(var(--primary-rgb)_/_0.10),rgb(var(--secondary-rgb)_/_0.10))] pt-24 pb-20 md:pb-32">
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-accent/20 to-primary/20 dark:from-accent/30 dark:to-primary/30 text-accent dark:text-accent font-bold uppercase text-sm tracking-wider rounded-full border border-accent/30">
              SEO On-Page
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
              Optimiza tu Web{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Desde Dentro
              </span>{" "}
              para Google
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Optimización técnica completa de contenido, estructura y experiencia 
              de usuario que mejora tu posicionamiento en Google.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="font-bold text-lg px-8 py-6 bg-gradient-to-r from-accent to-primary hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Link href="/contacto">Auditoría On-Page Gratis</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-bold text-lg px-8 py-6 hover:bg-gradient-to-r hover:from-accent/10 hover:to-primary/10 transition-all duration-300"
              >
                <Link href="/faqs#casos-exito">Ver Resultados</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is On-Page SEO */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          ¿Qué es el{" "}
          <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            SEO On-Page?
          </span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg max-w-3xl mx-auto">
          El SEO On-Page es la optimización de todos los elementos dentro de tu web 
          que Google puede "ver" y analizar para determinar la relevancia y calidad de tu contenido.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <SolucionCard>
            <h3 className="text-xl font-bold mb-4">Elementos que Optimizamos</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">📝</span>
                <div>
                  <span className="font-semibold">Contenido de calidad:</span> Artículos, páginas de servicio y descripciones optimizadas
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">🏷️</span>
                <div>
                  <span className="font-semibold">Meta tags:</span> Títulos, descripciones y keywords estratégicas
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">🔗</span>
                <div>
                  <span className="font-semibold">Estructura interna:</span> Enlaces internos, navegación y arquitectura de información
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">⚡</span>
                <div>
                  <span className="font-semibold">Velocidad:</span> Core Web Vitals y optimización de rendimiento
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">📱</span>
                <div>
                  <span className="font-semibold">Experiencia móvil:</span> Diseño responsive y usabilidad
                </div>
              </li>
            </ul>
          </SolucionCard>

          <SolucionCard>
            <h3 className="text-xl font-bold mb-4">Por Qué es Fundamental</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg">
                <h4 className="font-bold text-accent mb-2">🎯 Control Total</h4>
                <p className="text-sm text-muted-foreground">
                  Tienes control completo sobre todos los elementos de tu web, a diferencia del SEO Off-Page.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                <h4 className="font-bold text-primary mb-2">⚡ Resultados Rápidos</h4>
                <p className="text-sm text-muted-foreground">
                  Los cambios On-Page se reflejan en Google en 2-4 semanas, mucho más rápido que el link building.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg">
                <h4 className="font-bold text-secondary mb-2">💰 ROI Inmediato</h4>
                <p className="text-sm text-muted-foreground">
                  Mejoras la experiencia de usuario y conversiones desde el primer día.
                </p>
              </div>
            </div>
          </SolucionCard>
        </div>
      </section>

      {/* On-Page SEO Elements */}
      <section className="bg-gradient-to-br from-secondary/5 to-primary/5 dark:from-secondary/10 dark:to-primary/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Elementos de{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              SEO On-Page
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📝",
                title: "Optimización de Contenido",
                description: "Creación y optimización de contenido relevante y de calidad.",
                elements: [
                  "Keyword research y densidad óptima",
                  "Estructura H1, H2, H3 jerárquica",
                  "Contenido original y de valor",
                  "Long-tail keywords estratégicas",
                  "Actualización regular de contenido"
                ],
                impact: "Mejora del 60-80% en relevancia"
              },
              {
                icon: "🏷️",
                title: "Meta Tags & Schema",
                description: "Optimización de metadatos para motores de búsqueda.",
                elements: [
                  "Títulos únicos y atractivos (50-60 chars)",
                  "Meta descripciones optimizadas",
                  "Schema markup estructurado",
                  "Open Graph para redes sociales",
                  "Canonical URLs correctas"
                ],
                impact: "Mejora del CTR del 25-40%"
              },
              {
                icon: "🔗",
                title: "Estructura de Enlaces",
                description: "Arquitectura de enlaces internos y navegación.",
                elements: [
                  "Enlaces internos estratégicos",
                  "Anchor text optimizado",
                  "Navegación clara y lógica",
                  "Breadcrumbs implementados",
                  "Sitemap XML actualizado"
                ],
                impact: "Distribución de autoridad interna"
              },
              {
                icon: "⚡",
                title: "Core Web Vitals",
                description: "Optimización de velocidad y experiencia de usuario.",
                elements: [
                  "LCP (Largest Contentful Paint) < 2.5s",
                  "FID (First Input Delay) < 100ms",
                  "CLS (Cumulative Layout Shift) < 0.1",
                  "Optimización de imágenes",
                  "Minificación de código"
                ],
                impact: "Factor de ranking desde 2021"
              },
              {
                icon: "📱",
                title: "Mobile-First Design",
                description: "Optimización completa para dispositivos móviles.",
                elements: [
                  "Diseño responsive perfecto",
                  "Touch targets de 44px mínimo",
                  "Texto legible sin zoom",
                  "Velocidad móvil optimizada",
                  "AMP cuando sea necesario"
                ],
                impact: "70% del tráfico es móvil"
              },
              {
                icon: "🔍",
                title: "SEO Técnico",
                description: "Aspectos técnicos fundamentales para SEO.",
                elements: [
                  "HTTPS y certificados SSL",
                  "Robots.txt optimizado",
                  "URLs limpias y descriptivas",
                  "404 errors corregidos",
                  "Duplicate content eliminado"
                ],
                impact: "Base sólida para rankings"
              }
            ].map((element) => (
              <SolucionCard key={element.title}>
                <div className="text-5xl mb-4">{element.icon}</div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  {element.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {element.description}
                </p>
                <div className="mb-4">
                  <h4 className="font-bold text-sm mb-2">Elementos incluidos:</h4>
                  <ul className="space-y-1 text-xs">
                    {element.elements.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-accent font-bold">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-sm font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Impacto: {element.impact}
                </div>
              </SolucionCard>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technology */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Herramientas{" "}
          <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Profesionales
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              tool: "Google Search Console",
              purpose: "Monitoreo y optimización de presencia en Google",
              features: ["Indexación", "Core Web Vitals", "Search Performance", "Mobile Usability"]
            },
            {
              tool: "PageSpeed Insights",
              purpose: "Análisis de rendimiento y Core Web Vitals",
              features: ["LCP, FID, CLS", "Lab Data", "Field Data", "Optimización recomendada"]
            },
            {
              tool: "Screaming Frog",
              purpose: "Auditoría técnica completa del sitio",
              features: ["Crawl Analysis", "Technical SEO", "Broken Links", "Meta Tags Audit"]
            },
            {
              tool: "Ahrefs Site Audit",
              purpose: "Auditoría SEO integral y monitoreo",
              features: ["On-Page SEO", "Technical Issues", "Content Analysis", "Competitor Analysis"]
            }
          ].map((tool) => (
            <SolucionCard key={tool.tool}>
              <h3 className="text-lg font-bold mb-2">{tool.tool}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {tool.purpose}
              </p>
              <ul className="space-y-1 text-xs">
                {tool.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="text-accent font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* Results & Case Studies */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Resultados{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Reales
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                metric: "+185%",
                description: "Mejora promedio en Core Web Vitals",
                timeframe: "4-6 semanas"
              },
              {
                metric: "+320%",
                description: "Aumento en tráfico orgánico",
                timeframe: "3 meses"
              },
              {
                metric: "95/100",
                description: "Puntuación promedio en PageSpeed",
                timeframe: "Optimización completa"
              }
            ].map((result) => (
              <SolucionCard key={result.metric}>
                <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  {result.metric}
                </div>
                <p className="text-lg text-foreground mb-2">{result.description}</p>
                <p className="text-sm text-muted-foreground">{result.timeframe}</p>
              </SolucionCard>
            ))}
          </div>

          {/* Case Study */}
          <SolucionCard>
            <h3 className="text-2xl font-bold mb-4">Caso de Éxito: Clínica Dental</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2">Situación Inicial:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Core Web Vitals en rojo (LCP: 4.2s)</li>
                  <li>• Meta tags duplicados en 80% de páginas</li>
                  <li>• Contenido sin optimizar para keywords locales</li>
                  <li>• Estructura de enlaces internos deficiente</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Optimizaciones Implementadas:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Optimización completa de imágenes y código</li>
                  <li>• Meta tags únicos y optimizados</li>
                  <li>• Contenido optimizado para "dentista [ciudad]"</li>
                  <li>• Arquitectura de enlaces internos mejorada</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg">
              <h4 className="font-bold mb-2">Resultados en 6 semanas:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-bold text-accent">LCP: 1.8s</div>
                  <div className="text-muted-foreground">-57% tiempo</div>
                </div>
                <div>
                  <div className="font-bold text-accent">+450% tráfico</div>
                  <div className="text-muted-foreground">Local orgánico</div>
                </div>
                <div>
                  <div className="font-bold text-accent">Top 3</div>
                  <div className="text-muted-foreground">8 keywords locales</div>
                </div>
                <div>
                  <div className="font-bold text-accent">+65%</div>
                  <div className="text-muted-foreground">Consultas online</div>
                </div>
              </div>
            </div>
          </SolucionCard>
        </div>
      </section>

      {/* Process */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Nuestro Proceso de{" "}
          <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Optimización
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              num: "01",
              title: "Auditoría Técnica",
              desc: "Análisis completo de tu web: velocidad, estructura, contenido y aspectos técnicos.",
              duration: "1-2 semanas"
            },
            {
              num: "02",
              title: "Plan de Optimización",
              desc: "Estrategia personalizada con prioridades, timeline y objetivos medibles.",
              duration: "3-5 días"
            },
            {
              num: "03",
              title: "Implementación",
              desc: "Optimización de contenido, estructura técnica y elementos SEO On-Page.",
              duration: "2-4 semanas"
            },
            {
              num: "04",
              title: "Monitoreo & Ajustes",
              desc: "Seguimiento de resultados, ajustes continuos y reportes de progreso.",
              duration: "Continuo"
            }
          ].map((step) => (
            <SolucionCard key={step.num}>
              <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground mb-3 text-sm">{step.desc}</p>
              <div className="text-xs font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Duración: {step.duration}
              </div>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gradient-to-br from-secondary/5 to-accent/5 dark:from-secondary/10 dark:to-accent/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Planes de{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              SEO On-Page
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Optimización Básica",
                price: "€400",
                description: "Perfecto para sitios pequeños y startups",
                features: [
                  "Auditoría técnica completa",
                  "Optimización de meta tags",
                  "Core Web Vitals básico",
                  "Estructura de enlaces internos",
                  "Informe de optimización",
                  "Soporte email"
                ],
                popular: false
              },
              {
                title: "Optimización Profesional",
                price: "€800",
                description: "Para empresas en crecimiento",
                features: [
                  "Todo lo de Básica",
                  "Optimización de contenido",
                  "Core Web Vitals avanzado",
                  "Schema markup completo",
                  "Mobile optimization",
                  "SEO técnico completo",
                  "Soporte prioritario",
                  "Call de seguimiento"
                ],
                popular: true
              },
              {
                title: "Optimización Enterprise",
                price: "€1.500",
                description: "Para sitios grandes y competitivos",
                features: [
                  "Todo lo de Profesional",
                  "Optimización completa multi-página",
                  "A/B testing de elementos SEO",
                  "Monitoreo continuo",
                  "Reporting mensual",
                  "Consultoría estratégica",
                  "Account manager dedicado",
                  "Optimizaciones ilimitadas"
                ],
                popular: false
              }
            ].map((plan) => (
              <SolucionCard key={plan.title} className={plan.popular ? "ring-2 ring-accent" : ""}>
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-accent to-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                      Más Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 mt-4">{plan.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
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

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              También ofrecemos auditorías puntuales y proyectos de optimización específicos. 
              Sin permanencia, solo pagas por lo que necesitas.
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-bold text-lg px-8 py-6 hover:bg-gradient-to-r hover:from-accent/10 hover:to-primary/10 transition-all duration-300"
            >
              <Link href="/contacto">Consultar Proyectos Personalizados</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-webcode py-20 md:py-28">
        {/* Decoración de fondo con patrón */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(188,227,229,0.12),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(188,227,229,0.08),transparent_50%)]" />

        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="neon-cyan-title mb-6 text-3xl font-display font-bold md:text-5xl lg:text-6xl">
            ¿Listo para Optimizar tu Web?
          </h2>
          <p className="mb-8 text-lg font-sans md:text-xl lg:text-2xl text-slate-600 dark:text-white/95">
            Auditoría gratuita de SEO On-Page y propuesta de optimización 
            personalizada sin compromiso.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className={`
              font-bold text-base md:text-lg px-6 py-4 md:px-8 md:py-5
              hover:opacity-90 hover:-translate-y-0.5
              transition-all duration-200 
              ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              border-0
            `}
            style={{
              backgroundColor: `rgb(var(--secondary-rgb))`,
              color: "rgb(8 11 12)",
              boxShadow: "var(--shadow-3d-sm)"
            }}
          >
            <Link href="/contacto">Solicitar Auditoría On-Page</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

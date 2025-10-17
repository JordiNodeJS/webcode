import type { Metadata } from "next";
import Link from "next/link";
import { SolucionCard } from "@/components/soluciones";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "SEO Off-Page & Link Building | WEBCODE",
  description:
    "Estrategias avanzadas de SEO Off-Page, link building de calidad y construcción de autoridad de dominio para mejorar tu posicionamiento en Google.",
  openGraph: {
    title: "SEO Off-Page & Link Building | WEBCODE",
    description:
      "Link building profesional, guest posting y estrategias de autoridad de dominio que generan resultados reales en SEO."
  }
};

export default function SeoOffPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[image:linear-gradient(to_right,rgb(var(--accent-rgb)_/_0.03),rgb(var(--primary-rgb)_/_0.03),rgb(var(--secondary-rgb)_/_0.03)),linear-gradient(to_bottom_right,rgb(var(--accent-rgb)_/_0.05),rgb(var(--primary-rgb)_/_0.05),rgb(var(--secondary-rgb)_/_0.05))] dark:bg-[image:linear-gradient(to_right,rgb(var(--accent-rgb)_/_0.05),rgb(var(--primary-rgb)_/_0.05),rgb(var(--secondary-rgb)_/_0.05)),linear-gradient(to_bottom_right,rgb(var(--accent-rgb)_/_0.10),rgb(var(--primary-rgb)_/_0.10),rgb(var(--secondary-rgb)_/_0.10))] pt-24 pb-20 md:pb-32">
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-accent/20 to-primary/20 dark:from-accent/30 dark:to-primary/30 text-accent dark:text-accent font-bold uppercase text-sm tracking-wider rounded-full border border-accent/30">
              SEO Off-Page
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
              Construye{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Autoridad de Dominio
              </span>{" "}
              con Link Building Estratégico
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Estrategias de SEO Off-Page que posicionan tu marca como autoridad
              en tu sector y multiplican tu visibilidad en Google.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="font-bold text-lg px-8 py-6 bg-gradient-to-r from-accent to-primary hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Link href="/contacto">Auditoría de Enlaces Gratis</Link>
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

      {/* Why Off-Page SEO Matters */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          ¿Por Qué el{" "}
          <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            SEO Off-Page
          </span>{" "}
          es Crucial?
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg max-w-3xl mx-auto">
          Google considera los enlaces externos como "votos de confianza". 
          Cuantos más enlaces de calidad apunten a tu sitio, mayor será tu autoridad y posicionamiento.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "🏆",
              title: "Autoridad de Dominio",
              description: "Los enlaces de calidad aumentan tu DA/DR y credibilidad ante Google.",
              impact: "Mejora del 40-60% en rankings"
            },
            {
              icon: "🚀",
              title: "Tráfico de Referencia",
              description: "Los enlaces generan tráfico directo desde sitios relevantes en tu sector.",
              impact: "15-25% más tráfico orgánico"
            },
            {
              icon: "🎯",
              title: "Relevancia Temática",
              description: "Enlaces contextuales mejoran la relevancia de tu sitio para keywords específicas.",
              impact: "Rankings más estables"
            },
            {
              icon: "⚡",
              title: "Velocidad de Indexación",
              description: "Google indexa más rápido sitios con enlaces de autoridad.",
              impact: "Indexación 3x más rápida"
            },
            {
              icon: "🛡️",
              title: "Resistencia a Algoritmos",
              description: "Una estrategia de enlaces sólida protege contra penalizaciones.",
              impact: "Mayor estabilidad SEO"
            },
            {
              icon: "💰",
              title: "ROI a Largo Plazo",
              description: "Los enlaces de calidad generan resultados duraderos sin coste recurrente.",
              impact: "ROI del 300-500% anual"
            }
          ].map((benefit) => (
            <SolucionCard key={benefit.title}>
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {benefit.description}
              </p>
              <div className="text-sm font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {benefit.impact}
              </div>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* Link Building Strategies */}
      <section className="bg-gradient-to-br from-secondary/5 to-primary/5 dark:from-secondary/10 dark:to-primary/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Estrategias de{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Link Building
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                strategy: "Guest Posting Estratégico",
                description: "Artículos de valor en blogs relevantes de tu sector.",
                process: [
                  "Identificación de blogs de autoridad",
                  "Creación de contenido de alta calidad",
                  "Negociación de enlaces contextuales",
                  "Seguimiento y medición de resultados"
                ],
                results: "5-15 enlaces de calidad/mes"
              },
              {
                strategy: "Link Building de Recursos",
                description: "Inclusión en directorios y listas de recursos del sector.",
                process: [
                  "Auditoría de directorios relevantes",
                  "Optimización de perfiles empresariales",
                  "Solicitud en listas de recursos",
                  "Mantenimiento de presencia activa"
                ],
                results: "20-40 enlaces dofollow/mes"
              },
              {
                strategy: "Digital PR & Menciones",
                description: "Estrategia de relaciones públicas digitales para menciones naturales.",
                process: [
                  "Identificación de oportunidades de noticias",
                  "Creación de contenido newsworthy",
                  "Outreach a periodistas y bloggers",
                  "Conversión de menciones en enlaces"
                ],
                results: "2-5 enlaces de alta autoridad/mes"
              },
              {
                strategy: "Broken Link Building",
                description: "Identificación y reemplazo de enlaces rotos con tu contenido.",
                process: [
                  "Auditoría de sitios relevantes",
                  "Identificación de enlaces rotos",
                  "Creación de contenido de reemplazo",
                  "Outreach personalizado a webmasters"
                ],
                results: "10-25 enlaces recuperados/mes"
              },
              {
                strategy: "Skyscraper Technique",
                description: "Creación de contenido superior para reemplazar contenido ranking.",
                process: [
                  "Análisis de contenido top ranking",
                  "Creación de contenido mejorado",
                  "Identificación de sitios que enlazan al original",
                  "Outreach con el nuevo contenido"
                ],
                results: "3-8 enlaces de alta calidad/mes"
              },
              {
                strategy: "Partnerships & Colaboraciones",
                description: "Colaboraciones estratégicas para enlaces mutuos de calidad.",
                process: [
                  "Identificación de partners complementarios",
                  "Propuesta de colaboraciones de valor",
                  "Creación de contenido conjunto",
                  "Estrategia de enlaces recíprocos"
                ],
                results: "Enlaces sostenibles a largo plazo"
              }
            ].map((strategy) => (
              <SolucionCard key={strategy.strategy}>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  {strategy.strategy}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {strategy.description}
                </p>
                <div className="mb-4">
                  <h4 className="font-bold text-sm mb-2">Proceso:</h4>
                  <ul className="space-y-1 text-xs">
                    {strategy.process.map((step) => (
                      <li key={step} className="flex items-start gap-2">
                        <span className="text-accent font-bold">→</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-sm font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Resultado: {strategy.results}
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
              tool: "Ahrefs",
              purpose: "Análisis de backlinks y competencia",
              features: ["Site Explorer", "Content Explorer", "Keyword Gap", "Link Intersect"]
            },
            {
              tool: "SEMrush",
              purpose: "Investigación de enlaces y oportunidades",
              features: ["Backlink Analytics", "Link Building Tool", "Brand Monitoring", "PR Monitoring"]
            },
            {
              tool: "Majestic",
              purpose: "Métricas de autoridad y calidad",
              features: ["Trust Flow", "Citation Flow", "Topical Trust", "Link Context"]
            },
            {
              tool: "Pitchbox",
              purpose: "Automatización de outreach",
              features: ["Prospect Discovery", "Email Templates", "Follow-up Sequences", "Campaign Tracking"]
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
                metric: "+340%",
                description: "Aumento promedio en Domain Authority en 12 meses",
                timeframe: "12 meses"
              },
              {
                metric: "+180%",
                description: "Incremento en tráfico de referencia",
                timeframe: "6 meses"
              },
              {
                metric: "Top 5",
                description: "Posiciones en keywords competitivas",
                timeframe: "8 meses"
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
            <h3 className="text-2xl font-bold mb-4">Caso de Éxito: E-commerce de Moda</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2">Situación Inicial:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• DA: 15, tráfico orgánico: 2.000 visitas/mes</li>
                  <li>• Competidores con DA 40+ dominando rankings</li>
                  <li>• Presupuesto limitado para publicidad</li>
                  <li>• Necesidad de aumentar autoridad rápidamente</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Estrategia Implementada:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Guest posting en 15 blogs de moda</li>
                  <li>• Broken link building en directorios</li>
                  <li>• Digital PR con influencers del sector</li>
                  <li>• Partnerships con marcas complementarias</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg">
              <h4 className="font-bold mb-2">Resultados en 8 meses:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-bold text-accent">DA: 45</div>
                  <div className="text-muted-foreground">+200%</div>
                </div>
                <div>
                  <div className="font-bold text-accent">8.500 visitas</div>
                  <div className="text-muted-foreground">+325%</div>
                </div>
                <div>
                  <div className="font-bold text-accent">Top 3</div>
                  <div className="text-muted-foreground">15 keywords</div>
                </div>
                <div>
                  <div className="font-bold text-accent">+€45K</div>
                  <div className="text-muted-foreground">Ingresos mensuales</div>
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
            Link Building
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              num: "01",
              title: "Auditoría de Enlaces",
              desc: "Análisis completo de tu perfil de enlaces actual, competencia y oportunidades.",
              duration: "1-2 semanas"
            },
            {
              num: "02",
              title: "Estrategia Personalizada",
              desc: "Plan de link building adaptado a tu sector, objetivos y presupuesto.",
              duration: "1 semana"
            },
            {
              num: "03",
              title: "Prospección & Outreach",
              desc: "Identificación de oportunidades y campañas de outreach personalizadas.",
              duration: "Ongoing"
            },
            {
              num: "04",
              title: "Medición & Optimización",
              desc: "Seguimiento de resultados, ajustes estratégicos y reportes mensuales.",
              duration: "Mensual"
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
              Link Building
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Link Building Básico",
                price: "€800/mes",
                description: "Perfecto para sitios pequeños y startups",
                features: [
                  "5-10 enlaces de calidad/mes",
                  "Guest posting básico",
                  "Inclusión en directorios",
                  "Informe mensual",
                  "Soporte email"
                ],
                popular: false
              },
              {
                title: "Link Building Profesional",
                price: "€1.500/mes",
                description: "Para empresas en crecimiento",
                features: [
                  "15-25 enlaces de calidad/mes",
                  "Guest posting premium",
                  "Digital PR básico",
                  "Broken link building",
                  "Keyword research incluido",
                  "Soporte prioritario",
                  "Call mensual"
                ],
                popular: true
              },
              {
                title: "Link Building Enterprise",
                price: "€2.800/mes",
                description: "Para sitios competitivos y grandes",
                features: [
                  "30-50 enlaces de calidad/mes",
                  "Estrategia completa multi-canal",
                  "Digital PR avanzado",
                  "Partnerships estratégicos",
                  "Skyscraper technique",
                  "Account manager dedicado",
                  "Reporting semanal",
                  "Consultoría estratégica"
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
              También ofrecemos proyectos puntuales de link building y auditorías de enlaces. 
              Contratos flexibles sin permanencia.
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
            ¿Listo para Construir Autoridad?
          </h2>
          <p className="mb-8 text-lg font-sans md:text-xl lg:text-2xl text-slate-600 dark:text-white/95">
            Auditoría gratuita de tu perfil de enlaces y propuesta personalizada 
            de link building sin compromiso.
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
            <Link href="/contacto">Solicitar Auditoría de Enlaces</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

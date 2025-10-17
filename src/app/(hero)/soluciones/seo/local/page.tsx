import type { Metadata } from "next";
import Link from "next/link";
import { SolucionCard } from "@/components/soluciones";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "SEO Local - Google Business Profile | WEBCODE",
  description:
    "Optimización de Google Business Profile y SEO Local. Aparece en Google Maps y búsquedas locales para conseguir más clientes cerca de ti.",
  openGraph: {
    title: "SEO Local - Google Business Profile | WEBCODE",
    description:
      "Optimización de Google Business Profile y SEO Local para aparecer en búsquedas locales y conseguir más clientes."
  }
};

export default function SeoLocalPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[image:linear-gradient(to_right,rgb(var(--secondary-rgb)_/_0.03),rgb(var(--primary-rgb)_/_0.03),rgb(var(--accent-rgb)_/_0.03)),linear-gradient(to_bottom_right,rgb(var(--secondary-rgb)_/_0.05),rgb(var(--primary-rgb)_/_0.05),rgb(var(--accent-rgb)_/_0.05))] dark:bg-[image:linear-gradient(to_right,rgb(var(--secondary-rgb)_/_0.05),rgb(var(--primary-rgb)_/_0.05),rgb(var(--accent-rgb)_/_0.05)),linear-gradient(to_bottom_right,rgb(var(--secondary-rgb)_/_0.10),rgb(var(--primary-rgb)_/_0.10),rgb(var(--accent-rgb)_/_0.10))] pt-24 pb-20 md:pb-32">
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-secondary/20 to-primary/20 dark:from-secondary/30 dark:to-primary/30 text-secondary dark:text-secondary font-bold uppercase text-sm tracking-wider rounded-full border border-secondary/30">
              SEO Local
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
              Aparece en Google Maps y{" "}
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Atrae Clientes Locales
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Optimización completa de Google Business Profile y estrategias de SEO Local 
              para que te encuentren cuando buscan tu servicio cerca de casa.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="font-bold text-lg px-8 py-6 bg-gradient-to-r from-secondary to-primary hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Link href="/contacto">Optimizar Google Business</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-bold text-lg px-8 py-6 hover:bg-gradient-to-r hover:from-secondary/10 hover:to-primary/10 transition-all duration-300"
              >
                <Link href="/faqs#seo-local">Ver Preguntas Frecuentes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why SEO Local Matters */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          ¿Por Qué es Importante el{" "}
          <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            SEO Local?
          </span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg max-w-3xl mx-auto">
          El 46% de las búsquedas en Google tienen intención local. Si tu negocio no aparece 
          cuando buscan cerca de ti, estás perdiendo clientes potenciales.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "📱",
              title: "Búsquedas Móviles",
              description: "El 78% de búsquedas locales en móvil resultan en compra",
              stat: "78%"
            },
            {
              icon: "📍",
              title: "Google Maps",
              description: "Más de 1 billón de personas usan Google Maps mensualmente",
              stat: "1B+"
            },
            {
              icon: "🎯",
              title: "Conversión Local",
              description: "Los clientes locales tienen 5x más probabilidad de comprar",
              stat: "5x"
            }
          ].map((item) => (
            <SolucionCard key={item.title}>
              <div className="text-5xl mb-4">{item.icon}</div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                {item.stat}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
            Problemas que Resolvemos
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
            ¿Tu negocio local no aparece cuando debería? Te ayudamos a solucionarlo.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                problem: "❌ No apareces en Google Maps",
                solution: "✅ Optimización completa de Google Business Profile"
              },
              {
                problem: "❌ Tus competidores aparecen primero",
                solution: "✅ Estrategia de SEO Local para superarlos"
              },
              {
                problem: "❌ Pocas reseñas o reseñas negativas",
                solution: "✅ Sistema de gestión de reseñas y reputación"
              },
              {
                problem: "❌ Información inconsistente online",
                solution: "✅ Optimización de directorios y citas NAP"
              },
              {
                problem: "❌ No sabes qué buscan tus clientes",
                solution: "✅ Investigación de keywords locales"
              },
              {
                problem: "❌ No apareces en búsquedas de voz",
                solution: "✅ Optimización para búsquedas por voz y \"near me\""
              }
            ].map((item) => (
              <SolucionCard key={item.problem} hover={false}>
                <div className="text-lg font-bold mb-2 text-muted-foreground">
                  {item.problem}
                </div>
                <div className="text-lg font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  {item.solution}
                </div>
              </SolucionCard>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Nuestros Servicios de SEO Local
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "🏪",
              title: "Google Business Profile",
              description: "Optimización completa de tu perfil de Google Business.",
              features: [
                "Configuración y verificación",
                "Información completa y actualizada",
                "Fotos y videos optimizados",
                "Horarios y contacto correctos",
                "Posts regulares y promociones"
              ],
              price: "Desde €200/mes"
            },
            {
              icon: "⭐",
              title: "Gestión de Reseñas",
              description: "Sistema completo para generar y gestionar reseñas positivas.",
              features: [
                "Estrategia de solicitud de reseñas",
                "Respuestas profesionales",
                "Monitoreo de reputación",
                "Análisis de sentimientos",
                "Plan de mejora continua"
              ],
              price: "Desde €150/mes"
            },
            {
              icon: "🔍",
              title: "Keywords Locales",
              description: "Investigación y optimización para términos de búsqueda local.",
              features: [
                "Análisis de competencia local",
                "Keywords \"near me\" y de voz",
                "Long-tail keywords locales",
                "Optimización de contenido",
                "Tracking de posiciones"
              ],
              price: "Desde €300/mes"
            },
            {
              icon: "📋",
              title: "Optimización NAP",
              description: "Consistencia de Name, Address, Phone en toda la web.",
              features: [
                "Auditoría de directorios",
                "Corrección de citas inconsistentes",
                "Listados en directorios locales",
                "Schema markup local",
                "Verificación de datos"
              ],
              price: "Desde €250/mes"
            },
            {
              icon: "🗺️",
              title: "SEO de Direcciones",
              description: "Optimización para búsquedas específicas de ubicación.",
              features: [
                "Landing pages por ubicación",
                "Contenido geo-localizado",
                "Backlinks locales",
                "Menciones en medios locales",
                "Eventos y actividades locales"
              ],
              price: "Desde €400/mes"
            },
            {
              icon: "📊",
              title: "Analytics Locales",
              description: "Seguimiento y análisis de métricas específicas locales.",
              features: [
                "Google My Business Insights",
                "Tráfico desde Maps",
                "Llamadas y direcciones",
                "Conversiones locales",
                "Reportes personalizados"
              ],
              price: "Desde €200/mes"
            }
          ].map((service) => (
            <SolucionCard key={service.title}>
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>
              <div className="text-lg font-bold mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                {service.price}
              </div>
              <ul className="space-y-2 text-sm">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="text-secondary font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* Case Study */}
      <section className="bg-gradient-to-br from-secondary/5 to-primary/5 dark:from-secondary/10 dark:to-primary/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Caso de Éxito: SEO Local
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Case Study Details */}
            <SolucionCard className="bg-gradient-to-br from-secondary/10 to-primary/10 border-2 border-secondary/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center text-2xl font-bold text-white">
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
                    <div className="text-2xl font-bold text-secondary">+320%</div>
                    <div className="text-xs text-muted-foreground">Vistas en Google Maps</div>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">+150%</div>
                    <div className="text-xs text-muted-foreground">Llamadas directas</div>
                  </div>
                </div>
                
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Google Business Profile optimizado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span>
                    <span>+25 reseñas positivas en 3 meses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Top 3 en "mudanzas Barcelona"</span>
                  </li>
                </ul>
              </div>
              
              <Button asChild variant="outline" className="w-full">
                <a href="https://mudanzasandy.es" target="_blank" rel="noopener noreferrer">
                  Ver Proyecto →
                </a>
              </Button>
            </SolucionCard>

            {/* SEO Local Process */}
            <SolucionCard>
              <h3 className="text-2xl font-bold mb-6">Nuestro Proceso SEO Local</h3>
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Auditoría Local",
                    desc: "Análisis de tu presencia actual en Google Maps y directorios."
                  },
                  {
                    step: "02",
                    title: "Optimización GBP",
                    desc: "Configuración completa de Google Business Profile."
                  },
                  {
                    step: "03",
                    title: "Gestión de Reseñas",
                    desc: "Estrategia para generar y gestionar reseñas positivas."
                  },
                  {
                    step: "04",
                    title: "Contenido Local",
                    desc: "Creación de contenido optimizado para tu zona."
                  },
                  {
                    step: "05",
                    title: "Link Building Local",
                    desc: "Construcción de autoridad local y menciones."
                  },
                  {
                    step: "06",
                    title: "Monitoreo",
                    desc: "Seguimiento continuo y optimización de resultados."
                  }
                ].map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="text-2xl font-bold text-secondary/60 dark:text-secondary/40">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SolucionCard>
          </div>
        </div>
      </section>

      {/* Local SEO Checklist */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          Checklist SEO Local
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
          ¿Tu negocio cumple con todos los requisitos para aparecer en búsquedas locales?
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <SolucionCard>
            <h3 className="text-2xl font-bold mb-6 text-secondary">Google Business Profile</h3>
            <ul className="space-y-3">
              {[
                "Perfil verificado y completo",
                "Información NAP consistente",
                "Fotos y videos de calidad",
                "Horarios actualizados",
                "Categorías correctas",
                "Posts regulares",
                "Respuestas a preguntas",
                "Atributos de negocio"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SolucionCard>

          <SolucionCard>
            <h3 className="text-2xl font-bold mb-6 text-primary">SEO Técnico Local</h3>
            <ul className="space-y-3">
              {[
                "Schema markup local",
                "Páginas de ubicación",
                "Optimización móvil",
                "Velocidad de carga",
                "Backlinks locales",
                "Menciones en directorios",
                "Contenido geo-localizado",
                "Keywords \"near me\""
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SolucionCard>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gradient-to-br from-accent/5 to-secondary/5 dark:from-accent/10 dark:to-secondary/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Planes SEO Local
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "SEO Local Básico",
                price: "€400/mes",
                features: [
                  "Optimización Google Business Profile",
                  "Gestión básica de reseñas",
                  "Optimización NAP básica",
                  "5 posts/mes en Google Business Profile",
                  "Informe mensual",
                  "Soporte email"
                ],
                popular: false
              },
              {
                title: "SEO Local Profesional",
                price: "€800/mes",
                features: [
                  "Todo lo de Básico",
                  "Link building local",
                  "Contenido geo-localizado",
                  "Keywords locales research",
                  "Gestión avanzada de reseñas",
                  "Soporte prioritario",
                  "Call mensual"
                ],
                popular: true
              },
              {
                title: "SEO Local Enterprise",
                price: "Personalizado",
                features: [
                  "Todo lo de Profesional",
                  "Múltiples ubicaciones",
                  "Landing pages por zona",
                  "Estrategia personalizada",
                  "Account manager dedicado",
                  "Reporting semanal",
                  "Soporte 24/7"
                ],
                popular: false
              }
            ].map((plan) => (
              <SolucionCard key={plan.title} className={plan.popular ? "border-2 border-secondary/50 bg-gradient-to-br from-secondary/5 to-primary/5" : ""}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-secondary to-primary text-white text-sm font-bold rounded-full">
                      Más Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <div className="text-3xl font-bold mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  {plan.price}
                </div>
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="text-secondary font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </SolucionCard>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-12 max-w-2xl mx-auto">
            Todos los planes incluyen auditoría inicial gratuita. Sin permanencia.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Preguntas Frecuentes sobre SEO Local
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              question: "¿Cuánto tiempo tarda en verse resultados?",
              answer: "Los primeros resultados se ven en 2-4 semanas, pero los resultados significativos requieren 3-6 meses de trabajo constante."
            },
            {
              question: "¿Es necesario tener una tienda física?",
              answer: "No necesariamente. Los negocios de servicios pueden beneficiarse del SEO Local si atienden clientes en una zona específica."
            },
            {
              question: "¿Qué es más importante: Google Business o SEO técnico?",
              answer: "Ambos son importantes. Google Business es fundamental para búsquedas locales, pero el SEO técnico refuerza la autoridad."
            },
            {
              question: "¿Cómo se miden los resultados del SEO Local?",
              answer: "Medimos vistas en Google Maps, llamadas directas, direcciones solicitadas, reseñas generadas y posiciones en búsquedas locales."
            },
            {
              question: "¿Puedo hacer SEO Local para múltiples ubicaciones?",
              answer: "Sí, tenemos planes específicos para empresas con múltiples sucursales o áreas de servicio."
            },
            {
              question: "¿Qué pasa con las reseñas negativas?",
              answer: "Te ayudamos a responder profesionalmente a las reseñas negativas y desarrollamos estrategias para generar más reseñas positivas."
            }
          ].map((faq) => (
            <SolucionCard key={faq.question} hover={false}>
              <h3 className="text-lg font-bold mb-3 text-secondary">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-webcode py-20 md:py-28">
        {/* Decoración de fondo con patrón */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(188,227,229,0.12),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(188,227,229,0.08),transparent_50%)]" />

        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="neon-cyan-title mb-6 text-3xl font-display font-bold md:text-5xl lg:text-6xl">
            ¿Listo para Aparecer en Google Maps?
          </h2>
          <p className="mb-8 text-lg font-sans md:text-xl lg:text-2xl text-slate-600 dark:text-white/95">
            Optimiza tu presencia local y consigue más clientes cerca de ti.
            Auditoría SEO Local gratuita.
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
            <Link href="/contacto">Solicitar Auditoría SEO Local</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

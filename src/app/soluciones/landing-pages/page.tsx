import type { Metadata } from "next";
import Link from "next/link";
import { SolucionCard } from "@/components/soluciones";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Landing Pages de Alta Conversión | WEBCODE",
  description:
    "Creamos landing pages optimizadas para generar leads y ventas. Diseño enfocado en conversión, A/B testing y analytics integrados.",
  openGraph: {
    title: "Landing Pages de Alta Conversión | WEBCODE",
    description:
      "Landing pages que convierten visitantes en clientes. Optimizadas para captación y ventas."
  }
};

export default function LandingPagesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 dark:from-primary/10 dark:via-accent/10 dark:to-secondary/10 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-accent/3 to-secondary/3 dark:from-primary/5 dark:via-accent/5 dark:to-secondary/5" />
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 text-primary dark:text-primary font-bold uppercase text-sm tracking-wider rounded-full border border-primary/30">
              Landing Pages
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
              Landing Pages que{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Convierten Visitantes en Clientes
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Páginas diseñadas para un solo objetivo: generar leads, ventas o
              suscripciones. Sin distracciones. Solo conversiones.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="font-bold text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Link href="/contacto">Crear Mi Landing</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-bold text-lg px-8 py-6 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300"
              >
                <Link href="/portfolio">Ver Ejemplos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Ingredientes de una{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Landing Perfecta
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: "🎯",
              title: "Diseño Enfocado en Conversión",
              description:
                "Cada elemento está optimizado para guiar al visitante hacia la acción deseada.",
              features: [
                "Llamadas a la acción claras (CTA)",
                "Jerarquía visual optimizada",
                "Copywriting persuasivo",
                "Diseño sin distracciones"
              ]
            },
            {
              icon: "🚀",
              title: "Velocidad Extrema",
              description:
                "Carga en menos de 2 segundos. Cada milisegundo cuenta para la conversión.",
              features: [
                "Optimización de imágenes",
                "Código minificado",
                "CDN global",
                "Core Web Vitals perfectos"
              ]
            },
            {
              icon: "📱",
              title: "Mobile-First Design",
              description:
                "Más del 70% del tráfico es móvil. Tu landing se ve perfecta en cualquier pantalla.",
              features: [
                "Diseño responsive avanzado",
                "Touch-friendly",
                "Formularios optimizados móvil",
                "Testing en dispositivos reales"
              ]
            },
            {
              icon: "🧲",
              title: "Lead Magnets Integrados",
              description:
                "Ofrece valor a cambio del email. PDFs, checklists, mini-cursos o descuentos.",
              features: [
                "Descargables automáticos",
                "Email marketing integrado",
                "Segmentación de leads",
                "Secuencias de nurturing"
              ]
            },
            {
              icon: "📊",
              title: "Analytics & Tracking",
              description:
                "Mide todo. Conversiones, origen del tráfico, comportamiento de usuarios.",
              features: [
                "Google Analytics 4",
                "Pixel de Facebook/LinkedIn",
                "Heatmaps y grabaciones",
                "Dashboard de métricas"
              ]
            },
            {
              icon: "🧪",
              title: "A/B Testing",
              description:
                "Prueba diferentes versiones y quédate con la que mejor convierte.",
              features: [
                "Tests de headlines",
                "Variantes de CTA",
                "Diferentes diseños",
                "Análisis estadístico"
              ]
            }
          ].map((feature) => (
            <SolucionCard key={feature.title}>
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2 text-sm">
                {feature.features.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-gradient-to-br from-accent/5 to-primary/5 dark:from-accent/10 dark:to-primary/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
            Casos de Uso{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Principales
            </span>
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Una landing page para cada objetivo de negocio.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                type: "Generación de Leads",
                icon: "📧",
                description:
                  "Captura emails para construir tu lista y nutrir leads hasta la venta.",
                examples: [
                  "Descarga de ebook/guía",
                  "Webinar gratuito",
                  "Consultoría gratuita",
                  "Newsletter especializada"
                ]
              },
              {
                type: "Venta Directa",
                icon: "💰",
                description:
                  "Convierte visitantes en compradores con páginas de producto optimizadas.",
                examples: [
                  "Cursos online",
                  "Productos digitales",
                  "SaaS/Subscripciones",
                  "Servicios premium"
                ]
              },
              {
                type: "Lanzamientos",
                icon: "🎉",
                description:
                  "Genera hype y expectativa para lanzamientos de productos o servicios.",
                examples: [
                  "Coming soon pages",
                  "Early access",
                  "Preventa con descuento",
                  "Evento/Webinar"
                ]
              }
            ].map((useCase) => (
              <SolucionCard key={useCase.type}>
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {useCase.type}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {useCase.description}
                </p>
                <ul className="space-y-2 text-sm">
                  {useCase.examples.map((example) => (
                    <li key={example} className="flex items-start gap-2">
                      <span className="text-primary font-bold">→</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </SolucionCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          De la Idea a las Conversiones
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              num: "01",
              title: "Estrategia",
              desc: "Definimos objetivo, público target, propuesta de valor y KPIs a medir."
            },
            {
              num: "02",
              title: "Diseño & Copy",
              desc: "Creamos diseño persuasivo y copywriting que conecta con tu audiencia."
            },
            {
              num: "03",
              title: "Desarrollo",
              desc: "Programamos, integramos herramientas y optimizamos para máxima velocidad."
            },
            {
              num: "04",
              title: "Testing & Optimización",
              desc: "Lanzamos, analizamos datos, testeamos variantes y mejoramos conversión."
            }
          ].map((step) => (
            <SolucionCard key={step.num}>
              <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-gradient-to-br from-secondary/5 to-primary/5 dark:from-secondary/10 dark:to-primary/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
            Todo lo que{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Incluye
            </span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <SolucionCard>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">
                    ✓ Diseño & Desarrollo
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Diseño personalizado (no plantillas)",
                      "Responsive en todos los dispositivos",
                      "Animaciones y microinteracciones",
                      "SEO on-page completo"
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-accent">
                    ✓ Integraciones
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Email marketing (Mailchimp, etc)",
                      "CRM (HubSpot, Pipedrive, etc)",
                      "Analytics y pixels",
                      "Formularios avanzados"
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-secondary">
                    ✓ Optimización
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Core Web Vitals optimizados",
                      "Compresión de imágenes",
                      "Lazy loading",
                      "CDN global incluido"
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">
                    ✓ Soporte & Mantenimiento
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "3 meses de soporte incluido",
                      "Modificaciones de contenido",
                      "Backups automáticos",
                      "Actualizaciones de seguridad"
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SolucionCard>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Inversión
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Landing Simple",
              price: "Desde €1.200",
              features: [
                "Diseño personalizado",
                "1 página optimizada",
                "Formulario de contacto",
                "Analytics básico",
                "3 revisiones incluidas",
                "Entrega en 7-10 días"
              ]
            },
            {
              title: "Landing Avanzada",
              price: "Desde €2.500",
              features: [
                "Todo de Landing Simple +",
                "Lead magnet integrado",
                "Email automation",
                "A/B testing setup",
                "5 revisiones",
                "CRM integrado",
                "Copywriting profesional",
                "Entrega en 14 días"
              ]
            },
            {
              title: "Funnel Completo",
              price: "Desde €5.000",
              features: [
                "Todo de Landing Avanzada +",
                "Múltiples páginas (funnel)",
                "Secuencias de email",
                "Chatbot integrado",
                "Analytics avanzado",
                "Optimización continua 3 meses",
                "Gestor de proyecto dedicado"
              ]
            }
          ].map((tier) => (
            <SolucionCard key={tier.title}>
              <h3 className="text-2xl font-bold mb-2">{tier.title}</h3>
              <div className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {tier.price}
              </div>
              <ul className="space-y-2 text-sm">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </SolucionCard>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12 max-w-2xl mx-auto">
          Pago único. Sin mensualidades. Hosting primer año incluido.
        </p>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-webcode py-20 md:py-28">
        {/* Decoración de fondo con patrón */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(188,227,229,0.12),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(188,227,229,0.08),transparent_50%)]" />

        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="neon-cyan-title mb-6 text-3xl font-display font-bold md:text-5xl lg:text-6xl">
            ¿Listo para Generar Más Leads?
          </h2>
          <p className="mb-8 text-lg font-sans md:text-xl lg:text-2xl text-slate-600 dark:text-white/95">
            Solicita una consultoría gratuita y te mostramos cómo podemos
            ayudarte a aumentar tus conversiones.
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
            <Link href="/contacto">Consultoría Gratis</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SolucionCard } from "@/components/soluciones";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "E-commerce & Tiendas Online | WEBCODE",
  description:
    "Creamos tiendas online profesionales con Shopify, WooCommerce y soluciones personalizadas. Optimizadas para vender desde el día uno.",
  openGraph: {
    title: "E-commerce & Tiendas Online | WEBCODE",
    description:
      "Creamos tiendas online profesionales optimizadas para vender desde el día uno."
  }
};

export default function EcommercePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[image:linear-gradient(to_right,rgb(var(--secondary-rgb)_/_0.03),rgb(var(--primary-rgb)_/_0.03),rgb(var(--accent-rgb)_/_0.03)),linear-gradient(to_bottom_right,rgb(var(--secondary-rgb)_/_0.05),rgb(var(--primary-rgb)_/_0.05),rgb(var(--accent-rgb)_/_0.05))] dark:bg-[image:linear-gradient(to_right,rgb(var(--secondary-rgb)_/_0.05),rgb(var(--primary-rgb)_/_0.05),rgb(var(--accent-rgb)_/_0.05)),linear-gradient(to_bottom_right,rgb(var(--secondary-rgb)_/_0.10),rgb(var(--primary-rgb)_/_0.10),rgb(var(--accent-rgb)_/_0.10))] py-20 md:py-32">
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-secondary/20 to-primary/20 dark:from-secondary/30 dark:to-primary/30 text-secondary dark:text-secondary font-bold uppercase text-sm tracking-wider rounded-full border border-secondary/30">
              E-commerce
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
              Tiendas Online que{" "}
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Venden 24/7
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Desarrollo de tiendas online completas. Desde catálogos básicos
              hasta marketplaces complejos.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="font-bold text-lg px-8 py-6 bg-gradient-to-r from-secondary to-primary hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Link href="/contacto">Empezar mi Tienda</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-bold text-lg px-8 py-6 hover:bg-gradient-to-r hover:from-secondary/10 hover:to-primary/10 transition-all duration-300"
              >
                <Link href="/portfolio">Ver Tiendas Creadas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Todo lo que{" "}
          <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Necesitas
          </span>{" "}
          para Vender Online
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: "💳",
              title: "Pagos Integrados",
              description:
                "Acepta tarjetas, Bizum, PayPal, transferencias y más. PCI-compliant y seguro.",
              features: [
                "Stripe, PayPal, Redsys",
                "Bizum integrado",
                "Pago contra reembolso",
                "Subscripciones recurrentes"
              ]
            },
            {
              icon: "📦",
              title: "Gestión de Inventario",
              description:
                "Control total de stock, variantes, precios y descuentos. Todo automatizado.",
              features: [
                "Stock en tiempo real",
                "Variantes de producto",
                "Importación masiva",
                "Alertas de stock bajo"
              ]
            },
            {
              icon: "🚚",
              title: "Envíos Automatizados",
              description:
                "Integración con transportistas españoles. Tarifas automáticas y tracking.",
              features: [
                "Correos, SEUR, MRW, GLS",
                "Cálculo automático de tarifas",
                "Tracking de pedidos",
                "Etiquetas automáticas"
              ]
            },
            {
              icon: "📊",
              title: "Panel de Administración",
              description:
                "Dashboard completo para gestionar pedidos, clientes y productos.",
              features: [
                "Gestión de pedidos",
                "CRM de clientes",
                "Informes de ventas",
                "Métricas en tiempo real"
              ]
            },
            {
              icon: "🎨",
              title: "Diseño Personalizado",
              description:
                "Diseño 100% a medida de tu marca. Sin plantillas genéricas.",
              features: [
                "Diseño único",
                "UX optimizada para conversión",
                "Mobile-first",
                "A/B Testing disponible"
              ]
            },
            {
              icon: "🔐",
              title: "Seguridad & Performance",
              description:
                "SSL, backups diarios, CDN global y monitorización 24/7.",
              features: [
                "Certificado SSL incluido",
                "Backups automáticos",
                "CDN global (Cloudflare)",
                "Uptime 99.9%"
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
                    <span className="text-secondary font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* Platforms */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
            Trabajamos con las{" "}
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Mejores Plataformas
            </span>
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Elegimos la tecnología perfecta para tu proyecto según tus
            necesidades y presupuesto.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Shopify",
                description:
                  "Perfecta para empezar rápido. Setup en días, no en meses.",
                best: "Tiendas pequeñas-medianas"
              },
              {
                name: "WooCommerce",
                description:
                  "Máxima flexibilidad con WordPress. Open source y escalable.",
                best: "Webs con blog integrado"
              },
              {
                name: "Custom (Next.js)",
                description:
                  "Desarrollo a medida. Control total, performance máximo.",
                best: "Proyectos únicos y complejos"
              }
            ].map((platform) => (
              <SolucionCard key={platform.name}>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  {platform.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {platform.description}
                </p>
                <div className="text-sm">
                  <span className="font-semibold text-secondary">
                    Ideal para:
                  </span>{" "}
                  {platform.best}
                </div>
              </SolucionCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          De la Idea a las Ventas
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              num: "01",
              title: "Consultoría",
              desc: "Analizamos tu producto, competencia y definimos estrategia de ventas."
            },
            {
              num: "02",
              title: "Setup & Diseño",
              desc: "Configuramos plataforma, diseñamos tu tienda y subimos productos."
            },
            {
              num: "03",
              title: "Integraciones",
              desc: "Conectamos pagos, envíos, email marketing y herramientas necesarias."
            },
            {
              num: "04",
              title: "Lanzamiento",
              desc: "Testing final, training completo y ¡a vender! Soporte incluido."
            }
          ].map((step) => (
            <SolucionCard key={step.num}>
              <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* Pricing Hint */}
      <section className="bg-gradient-to-br from-accent/5 to-secondary/5 dark:from-accent/10 dark:to-secondary/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Inversión Aproximada
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Tienda Básica",
                price: "Desde €2.500",
                features: [
                  "Hasta 50 productos",
                  "Shopify/WooCommerce",
                  "Diseño semi-personalizado",
                  "Pagos y envíos integrados",
                  "Training básico"
                ]
              },
              {
                title: "Tienda Profesional",
                price: "Desde €5.000",
                features: [
                  "Hasta 500 productos",
                  "Diseño 100% personalizado",
                  "Integraciones avanzadas",
                  "Email marketing",
                  "SEO optimizado",
                  "Soporte 3 meses"
                ]
              },
              {
                title: "E-commerce Enterprise",
                price: "Desde €15.000",
                features: [
                  "Productos ilimitados",
                  "Desarrollo custom",
                  "Multi-idioma y multi-moneda",
                  "CRM integrado",
                  "API personalizada",
                  "Soporte prioritario 12 meses"
                ]
              }
            ].map((tier) => (
              <SolucionCard key={tier.title}>
                <h3 className="text-2xl font-bold mb-2">{tier.title}</h3>
                <div className="text-3xl font-bold mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  {tier.price}
                </div>
                <ul className="space-y-2 text-sm">
                  {tier.features.map((feature) => (
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
            Precios orientativos. Cada proyecto es único. Solicita presupuesto
            personalizado sin compromiso.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-secondary/90 via-secondary to-primary/90 text-white py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Listo para Empezar a Vender Online?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Te ayudamos a montar tu tienda y empezar a vender en semanas, no en
            meses.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="font-bold text-lg px-8 py-6 hover:scale-105 transition-transform duration-300"
          >
            <Link href="/contacto">Solicitar Presupuesto Gratis</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

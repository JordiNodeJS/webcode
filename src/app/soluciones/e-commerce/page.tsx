import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "E-commerce & Tiendas Online | WEBCODE",
  description:
    "Creamos tiendas online profesionales con Shopify, WooCommerce y soluciones personalizadas. Optimizadas para vender desde el día uno.",
  openGraph: {
    title: "E-commerce & Tiendas Online | WEBCODE",
    description:
      "Creamos tiendas online profesionales optimizadas para vender desde el día uno.",
  },
};

export default function EcommercePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/10 via-primary/10 to-accent/10 border-b-4 border-secondary">
        <div className="container mx-auto max-w-6xl px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-4 py-2 bg-secondary text-white font-bold uppercase text-sm tracking-wider border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              E-commerce
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-foreground">
              Tiendas Online que{" "}
              <span className="text-secondary">Venden 24/7</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
              Desarrollo de tiendas online completas. Desde catálogos básicos
              hasta marketplaces complejos.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-secondary hover:bg-secondary/90 font-bold text-lg px-8 py-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <Link href="/contacto">Empezar mi Tienda</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-bold text-lg px-8 py-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <Link href="/portfolio">Ver Tiendas Creadas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">
          Todo lo que <span className="text-secondary">Necesitas</span> para
          Vender Online
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
                "Subscripciones recurrentes",
              ],
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
                "Alertas de stock bajo",
              ],
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
                "Etiquetas automáticas",
              ],
            },
            {
              icon: "📊",
              title: "Analytics Avanzado",
              description:
                "Métricas de ventas, conversión y comportamiento de clientes.",
              features: [
                "Dashboard de ventas",
                "Análisis de conversión",
                "Productos más vendidos",
                "Informes automáticos",
              ],
            },
            {
              icon: "🎯",
              title: "Marketing Integrado",
              description:
                "Herramientas para email marketing, cupones y recuperar carritos.",
              features: [
                "Email marketing",
                "Cupones y descuentos",
                "Carritos abandonados",
                "Programa de fidelización",
              ],
            },
            {
              icon: "📱",
              title: "Mobile First",
              description:
                "Diseños optimizados para móvil. La mayoría de ventas vienen del móvil.",
              features: [
                "Responsive perfecto",
                "PWA disponible",
                "Touch optimizado",
                "Carga ultra rápida",
              ],
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-black mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.features.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-secondary font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Platforms */}
      <section className="bg-gradient-to-br from-accent/10 to-primary/10 border-y-4 border-black py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-center">
            <span className="text-accent">Plataformas</span> que Dominamos
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
            Trabajamos con las mejores plataformas de e-commerce del mercado.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Shopify",
                icon: "🛍️",
                description:
                  "Plataforma todo-en-uno, perfecta para empezar rápido",
                ideal: "Ideal para: Pequeñas y medianas tiendas",
              },
              {
                name: "WooCommerce",
                icon: "🔌",
                description: "Máxima personalización sobre WordPress",
                ideal: "Ideal para: Tiendas con muchos productos",
              },
              {
                name: "Custom",
                icon: "⚙️",
                description: "Desarrollo a medida con Next.js y APIs",
                ideal: "Ideal para: Marketplaces y necesidades únicas",
              },
            ].map((platform) => (
              <div
                key={platform.name}
                className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="text-6xl mb-4 text-center">{platform.icon}</div>
                <h3 className="text-2xl font-black mb-3 text-center">
                  {platform.name}
                </h3>
                <p className="text-muted-foreground mb-4 text-center">
                  {platform.description}
                </p>
                <p className="text-sm font-bold text-center text-secondary">
                  {platform.ideal}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">
          Paquetes <span className="text-primary">E-commerce</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Tienda Básica */}
          <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Tienda Básica
            </div>
            <div className="text-4xl font-black mb-4">
              €1.490
              <span className="text-lg font-normal text-muted-foreground">
                {" "}
                / pago único
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              Perfecta para empezar a vender online rápidamente.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Hasta 50 productos",
                "Diseño responsive",
                "Pasarela de pago",
                "Envíos básicos",
                "Panel de gestión",
                "2 revisiones incluidas",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-secondary font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className="w-full font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              <Link href="/contacto?service=tienda-basica">
                Empezar Tienda Básica
              </Link>
            </Button>
          </div>

          {/* Tienda Pro */}
          <div className="bg-secondary text-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative -mt-4 md:scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 font-bold text-sm uppercase border-4 border-black">
              Más Popular
            </div>
            <div className="text-sm font-bold uppercase tracking-wider opacity-90 mb-2">
              Tienda Pro
            </div>
            <div className="text-4xl font-black mb-4">
              €3.990
              <span className="text-lg font-normal opacity-90">
                {" "}
                / pago único
              </span>
            </div>
            <p className="opacity-90 mb-6">
              Tienda completa lista para escalar tu negocio.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Productos ilimitados",
                "Diseño 100% personalizado",
                "Multi-pasarelas de pago",
                "Envíos avanzados",
                "Email marketing",
                "SEO avanzado",
                "Cupones y descuentos",
                "Revisiones ilimitadas",
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
              className="w-full font-bold border-4 border-black bg-white text-secondary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              <Link href="/contacto?service=tienda-pro">
                Empezar Tienda Pro
              </Link>
            </Button>
          </div>

          {/* Marketplace */}
          <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Marketplace
            </div>
            <div className="text-4xl font-black mb-4">
              Desde €8.900
              <span className="text-lg font-normal text-muted-foreground block mt-1">
                personalizado
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              Plataforma multi-vendor completa y escalable.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Multi-vendedores",
                "Comisiones automáticas",
                "Panel para vendedores",
                "Gestión de pagos split",
                "Moderación de contenido",
                "Analytics avanzado",
                "API completa",
                "Soporte prioritario",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-accent font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant="outline"
              className="w-full font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              <Link href="/contacto?service=marketplace">
                Solicitar Presupuesto
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Legal Compliance */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-y-4 border-black py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-center">
            100% <span className="text-primary">Legal</span> y Conforme
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
            Todas nuestras tiendas cumplen con la legislación española y
            europea.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "RGPD",
                description: "Cumplimiento completo de protección de datos",
              },
              {
                title: "LSSI-CE",
                description:
                  "Ley de Servicios de la Sociedad de la Información",
              },
              {
                title: "LOPD",
                description: "Protección de datos de clientes",
              },
              {
                title: "Cookies",
                description: "Banner de cookies conforme a la ley",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border-4 border-black p-6 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="text-3xl font-black text-primary mb-2">
                  {item.title}
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary text-white border-t-4 border-black py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            ¿Listo para Vender Online?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Solicita una consultoría gratuita de 30 minutos. Analizamos tu
            negocio y te recomendamos la mejor solución.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-white text-secondary font-bold text-lg px-8 py-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            <Link href="/contacto">Consultoría Gratuita</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

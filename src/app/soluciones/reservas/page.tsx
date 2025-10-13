import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SolucionCard } from "@/components/soluciones";

export const metadata: Metadata = {
  title: "Sistema de Reservas y Citas | WEBCODE",
  description:
    "Agenda digital automática 24/7 para tu negocio. Reservas online, recordatorios automáticos y gestión de citas sin complicaciones.",
  openGraph: {
    title: "Sistema de Reservas y Citas | WEBCODE",
    description:
      "Agenda digital automática para negocios por citas. Reservas 24/7, recordatorios y gestión simplificada.",
  },
};

export default function ReservasPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent/5 via-primary/5 to-secondary/5 dark:from-accent/10 dark:via-primary/10 dark:to-secondary/10 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/3 via-primary/3 to-secondary/3 dark:from-accent/5 dark:via-primary/5 dark:to-secondary/5" />
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-accent/20 to-primary/20 dark:from-accent/30 dark:to-primary/30 text-accent dark:text-accent font-bold uppercase text-sm tracking-wider rounded-full border border-accent/30">
              Reservas y Citas
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
              Tu Agenda Digital{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Automática 24/7
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Deja que tus clientes reserven cuando quieran. Tu agenda se
              actualiza sola y envía recordatorios automáticos.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="font-bold text-lg px-8 py-6 bg-gradient-to-r from-accent to-primary hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Link href="/contacto">Configurar Mi Agenda</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-bold text-lg px-8 py-6 hover:bg-gradient-to-r hover:from-accent/10 hover:to-primary/10 transition-all duration-300"
              >
                <Link href="/portfolio">Ver Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Todo lo que{" "}
          <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Necesitas
          </span>{" "}
          para Gestionar Citas
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: "📅",
              title: "Calendario Online 24/7",
              description:
                "Tus clientes reservan cuando quieren, desde cualquier dispositivo. Sin llamadas ni mensajes.",
              features: [
                "Disponibilidad en tiempo real",
                "Sincronización con Google Calendar",
                "Múltiples tipos de servicios",
                "Gestión de bloques horarios",
              ],
            },
            {
              icon: "🔔",
              title: "Recordatorios Automáticos",
              description:
                "SMS y emails se envían automáticamente. Reduce no-shows hasta un 80%.",
              features: [
                "Email de confirmación inmediato",
                "Recordatorio 24h antes",
                "Opción de cancelar/reprogramar",
                "Confirmación de asistencia",
              ],
            },
            {
              icon: "⚙️",
              title: "Gestión de Servicios",
              description:
                "Define cada servicio con su duración, precio y disponibilidad específica.",
              features: [
                "Múltiples servicios simultáneos",
                "Duración personalizable",
                "Precios diferenciados",
                "Recursos asignables (salas, profesionales)",
              ],
            },
            {
              icon: "💳",
              title: "Pagos y Depósitos",
              description:
                "Cobra anticipos o pagos completos al reservar. Reduce cancelaciones de última hora.",
              features: [
                "Pago online seguro",
                "Depósitos opcionales",
                "Reembolsos automatizados",
                "Facturación integrada",
              ],
            },
            {
              icon: "👥",
              title: "Gestión de Clientes",
              description:
                "Base de datos automática con historial completo de cada cliente.",
              features: [
                "Ficha de cliente automática",
                "Historial de citas",
                "Notas y observaciones",
                "Clientes VIP y listas de espera",
              ],
            },
            {
              icon: "📊",
              title: "Reportes y Estadísticas",
              description:
                "Analiza ocupación, ingresos y tendencias para optimizar tu negocio.",
              features: [
                "Dashboard en tiempo real",
                "Estadísticas de ocupación",
                "Análisis de ingresos",
                "Exportación de reportes",
              ],
            },
          ].map((feature) => (
            <SolucionCard key={feature.title}>
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <ul className="space-y-2 text-sm">
                {feature.features.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-accent font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* Perfect For */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
            Perfecto para{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Negocios por Citas
            </span>
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Si tu negocio funciona por citas, esta es tu solución definitiva.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                type: "Salud & Belleza",
                examples: [
                  "Peluquerías y barberías",
                  "Centros de estética",
                  "Clínicas dentales",
                  "Fisioterapia",
                  "Spa y masajes",
                ],
              },
              {
                type: "Consultas & Terapias",
                examples: [
                  "Psicólogos y coaches",
                  "Nutricionistas",
                  "Veterinarios",
                  "Abogados",
                  "Asesorías",
                ],
              },
              {
                type: "Servicios & Educación",
                examples: [
                  "Clases particulares",
                  "Instructores fitness",
                  "Talleres y cursos",
                  "Servicios técnicos",
                  "Consultoría",
                ],
              },
            ].map((category) => (
              <SolucionCard key={category.type}>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  {category.type}
                </h3>
                <ul className="space-y-2 text-sm">
                  {category.examples.map((example) => (
                    <li key={example} className="flex items-start gap-2">
                      <span className="text-accent font-bold">→</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </SolucionCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Cómo Funciona
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              num: "01",
              title: "Setup Inicial",
              desc: "Configuramos servicios, horarios, disponibilidad y precios según tu negocio.",
            },
            {
              num: "02",
              title: "Personalización",
              desc: "Adaptamos diseño, textos y flujo de reserva a tu marca y necesidades.",
            },
            {
              num: "03",
              title: "Integraciones",
              desc: "Conectamos con tu calendario, sistema de pagos y herramientas existentes.",
            },
            {
              num: "04",
              title: "¡A Reservar!",
              desc: "Publicas tu enlace de reservas y los clientes empiezan a agendar al instante.",
            },
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
      </section>

      {/* Pricing */}
      <section className="bg-gradient-to-br from-secondary/5 to-accent/5 dark:from-secondary/10 dark:to-accent/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Inversión Mensual
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Plan Básico",
                price: "€49/mes",
                features: [
                  "Hasta 100 reservas/mes",
                  "1 profesional/recurso",
                  "Recordatorios por email",
                  "Panel básico de gestión",
                  "Soporte por email",
                ],
              },
              {
                title: "Plan Profesional",
                price: "€99/mes",
                features: [
                  "Reservas ilimitadas",
                  "Hasta 5 profesionales",
                  "SMS + Email",
                  "Pagos integrados",
                  "Múltiples servicios",
                  "Reportes avanzados",
                  "Soporte prioritario",
                ],
              },
              {
                title: "Plan Enterprise",
                price: "A medida",
                features: [
                  "Todo del Plan Profesional",
                  "Profesionales ilimitados",
                  "Múltiples sucursales",
                  "API personalizada",
                  "Integraciones custom",
                  "Gestor de cuenta dedicado",
                ],
              },
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
            Sin permanencia. Cancela cuando quieras. Setup inicial incluido en
            el primer mes.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-accent/90 via-accent to-primary/90 text-white py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Listo para Automatizar tu Agenda?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Empieza gratis 14 días. Sin tarjeta. Sin compromiso. Solo
            resultados.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="font-bold text-lg px-8 py-6 hover:scale-105 transition-transform duration-300"
          >
            <Link href="/contacto">Probar Gratis 14 Días</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}


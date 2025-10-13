import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Consultoría Tecnológica | WEBCODE",
  description:
    "Consultoría tecnológica y estratégica para empresas. Optimización de procesos, arquitectura de software y transformación digital.",
  openGraph: {
    title: "Consultoría Tecnológica | WEBCODE",
    description:
      "Consultoría tecnológica y estratégica para empresas en transformación digital.",
  },
};

export default function ConsultingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-b-4 border-primary">
        <div className="container mx-auto max-w-6xl px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-4 py-2 bg-primary text-white font-bold uppercase text-sm tracking-wider border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              Consultoría Tech
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-foreground">
              Transformamos tu <span className="text-primary">Tecnología</span>{" "}
              en Ventaja Competitiva
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
              Consultoría tecnológica y estratégica para empresas que quieren
              liderar en la era digital.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="font-bold text-lg px-8 py-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <Link href="/contacto">Consulta Inicial Gratis</Link>
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

      {/* Services */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">
          Áreas de <span className="text-primary">Consultoría</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: "🏗️",
              title: "Arquitectura de Software",
              description:
                "Diseñamos la arquitectura técnica de tu producto digital.",
              features: [
                "Auditoría de arquitectura actual",
                "Diseño de sistemas escalables",
                "Microservicios vs Monolito",
                "Cloud architecture (AWS, GCP, Azure)",
                "APIs y integraciones",
                "Documentación técnica",
              ],
            },
            {
              icon: "🚀",
              title: "Transformación Digital",
              description: "Acompañamos tu empresa en el cambio digital.",
              features: [
                "Diagnóstico digital",
                "Roadmap de transformación",
                "Selección de tecnologías",
                "Gestión del cambio",
                "Training y capacitación",
                "Métricas y KPIs",
              ],
            },
            {
              icon: "⚡",
              title: "Optimización de Procesos",
              description:
                "Automatizamos y optimizamos tus procesos de negocio.",
              features: [
                "Análisis de procesos",
                "Identificación de cuellos de botella",
                "Automatización con IA",
                "Integración de herramientas",
                "DevOps y CI/CD",
                "Reducción de costes",
              ],
            },
            {
              icon: "🎯",
              title: "Estrategia de Producto",
              description: "Definimos la estrategia para tu producto digital.",
              features: [
                "Product-market fit",
                "Roadmap de producto",
                "Validación de ideas",
                "MVP y prototipado",
                "User research",
                "Go-to-market strategy",
              ],
            },
            {
              icon: "🔒",
              title: "Seguridad y Compliance",
              description: "Protegemos tu negocio y cumplimos normativas.",
              features: [
                "Auditorías de seguridad",
                "RGPD compliance",
                "Pentesting",
                "Formación en seguridad",
                "Planes de contingencia",
                "ISO 27001 preparation",
              ],
            },
            {
              icon: "👥",
              title: "Gestión de Equipos Tech",
              description: "Estructuramos y optimizamos equipos de desarrollo.",
              features: [
                "Estructura de equipos",
                "Metodologías ágiles",
                "Hiring tech",
                "Onboarding técnico",
                "Code review processes",
                "Performance management",
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
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <span className="text-primary font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Help */}
      <section className="bg-gradient-to-br from-secondary/10 to-accent/10 border-y-4 border-black py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-center">
            ¿A Quién <span className="text-secondary">Ayudamos?</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
            Trabajamos con diferentes tipos de organizaciones en distintas
            fases.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                type: "Startups",
                icon: "🚀",
                description:
                  "Ayudamos a validar tu idea, diseñar el MVP y escalar técnicamente.",
                challenges: [
                  "Validar idea de negocio",
                  "Diseñar arquitectura escalable",
                  "Encontrar product-market fit",
                  "Preparar para inversión",
                ],
              },
              {
                type: "PYMEs",
                icon: "🏢",
                description:
                  "Digitalizamos procesos y optimizamos tu infraestructura tecnológica.",
                challenges: [
                  "Transformación digital",
                  "Automatización de procesos",
                  "Integración de sistemas",
                  "Reducción de costes IT",
                ],
              },
              {
                type: "Empresas",
                icon: "🏛️",
                description:
                  "Modernizamos sistemas legacy y optimizamos equipos de desarrollo.",
                challenges: [
                  "Migración de legacy",
                  "Optimización de equipos",
                  "Cloud migration",
                  "Seguridad enterprise",
                ],
              },
            ].map((audience) => (
              <div
                key={audience.type}
                className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="text-6xl mb-4 text-center">{audience.icon}</div>
                <h3 className="text-2xl font-black mb-3 text-center">
                  {audience.type}
                </h3>
                <p className="text-muted-foreground mb-6 text-center">
                  {audience.description}
                </p>
                <ul className="space-y-2">
                  {audience.challenges.map((challenge) => (
                    <li
                      key={challenge}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="text-secondary font-bold">✓</span>
                      <span>{challenge}</span>
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
          Cómo <span className="text-accent">Trabajamos</span>
        </h2>

        <div className="space-y-6">
          {[
            {
              step: "01",
              title: "Diagnóstico Inicial",
              description:
                "Entendemos tu situación actual, retos y objetivos. Sesión inicial de 1-2 horas con stakeholders clave.",
              deliverable: "Informe de situación",
            },
            {
              step: "02",
              title: "Análisis Profundo",
              description:
                "Auditoría técnica completa, entrevistas con equipos y análisis de procesos. Identificamos problemas y oportunidades.",
              deliverable: "Diagnóstico detallado",
            },
            {
              step: "03",
              title: "Propuesta de Solución",
              description:
                "Presentamos roadmap detallado con acciones priorizadas, timeline y estimación de recursos necesarios.",
              deliverable: "Roadmap estratégico",
            },
            {
              step: "04",
              title: "Implementación",
              description:
                "Acompañamiento durante la ejecución con reuniones semanales, seguimiento de KPIs y ajustes continuos.",
              deliverable: "Reporting continuo",
            },
            {
              step: "05",
              title: "Optimización",
              description:
                "Monitorización de resultados, refinamiento de procesos y formación de equipos para autonomía.",
              deliverable: "Documentación final",
            },
          ].map((phase) => (
            <div
              key={phase.step}
              className="flex gap-6 items-start bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="text-5xl font-black text-primary/20 min-w-[80px]">
                {phase.step}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black mb-2">{phase.title}</h3>
                <p className="text-muted-foreground mb-3">
                  {phase.description}
                </p>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold text-sm border-2 border-primary">
                  📄 {phase.deliverable}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gradient-to-br from-accent/10 to-primary/10 border-y-4 border-black py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">
            Modalidades de <span className="text-primary">Consultoría</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Por Proyecto */}
            <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Por Proyecto
              </div>
              <div className="text-4xl font-black mb-4">
                Desde €4.900
                <span className="text-lg font-normal text-muted-foreground block mt-1">
                  según alcance
                </span>
              </div>
              <p className="text-muted-foreground mb-6">
                Proyectos puntuales con alcance y entregables definidos.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Alcance cerrado",
                  "Timeline definido",
                  "Entregables claros",
                  "Precio fijo",
                  "Soporte post-proyecto",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="w-full font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <Link href="/contacto?service=consultoria-proyecto">
                  Solicitar Presupuesto
                </Link>
              </Button>
            </div>

            {/* Retainer Mensual */}
            <div className="bg-primary text-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative -mt-4 md:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 font-bold text-sm uppercase border-4 border-black">
                Más Flexible
              </div>
              <div className="text-sm font-bold uppercase tracking-wider opacity-90 mb-2">
                Retainer Mensual
              </div>
              <div className="text-4xl font-black mb-4">
                €2.490
                <span className="text-lg font-normal opacity-90"> / mes</span>
              </div>
              <p className="opacity-90 mb-6">
                Consultoría continua con horas mensuales dedicadas.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "20h mensuales dedicadas",
                  "Flexibilidad total",
                  "Reuniones semanales",
                  "Acceso prioritario",
                  "Revisiones estratégicas",
                  "Sin permanencia",
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
                className="w-full font-bold border-4 border-black bg-white text-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <Link href="/contacto?service=consultoria-retainer">
                  Empezar Retainer
                </Link>
              </Button>
            </div>

            {/* CTO as a Service */}
            <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
                CTO as a Service
              </div>
              <div className="text-4xl font-black mb-4">
                €4.990
                <span className="text-lg font-normal text-muted-foreground">
                  {" "}
                  / mes
                </span>
              </div>
              <p className="text-muted-foreground mb-6">
                CTO dedicado part-time para tu empresa.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "40h mensuales",
                  "Liderazgo técnico",
                  "Gestión de equipos",
                  "Arquitectura y decisiones",
                  "Hiring técnico",
                  "Reportes ejecutivos",
                  "On-call disponibilidad",
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
                <Link href="/contacto?service=cto-service">
                  Hablemos de tu Caso
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">
          ¿Por Qué Elegirnos?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "🎓",
              title: "Experiencia Real",
              description:
                "15+ años construyendo y escalando productos digitales.",
            },
            {
              icon: "🔍",
              title: "Enfoque Práctico",
              description:
                "Soluciones accionables, no reportes que se quedan en un cajón.",
            },
            {
              icon: "🤝",
              title: "Partner, no Vendor",
              description: "Nos importa tu éxito, no solo facturar horas.",
            },
            {
              icon: "📊",
              title: "ROI Medible",
              description: "Cada recomendación con impacto medible en negocio.",
            },
          ].map((reason) => (
            <div
              key={reason.title}
              className="bg-white border-4 border-black p-6 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="text-5xl mb-3">{reason.icon}</div>
              <h3 className="text-xl font-black mb-2">{reason.title}</h3>
              <p className="text-sm text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white border-t-4 border-black py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Primera Consulta Gratis
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Agenda una videollamada de 30 minutos. Analizamos tu situación y te
            damos recomendaciones iniciales sin compromiso.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="font-bold text-lg px-8 py-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            <Link href="/contacto">Agendar Consulta Gratis</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

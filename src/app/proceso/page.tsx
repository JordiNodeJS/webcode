import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";

const WSFadeIn = dynamic(() =>
  import("@/components/animations/ws-fade-in").then((m) => m.WSFadeIn)
);

import { generateSEOMetadata } from "@/lib/seo-metadata";

// Lazy load componentes pesados
const PhaseTimeline = dynamic(
  () => import("@/components/proceso/PhaseTimeline"),
  {
    loading: () => <div className="h-96 animate-pulse bg-muted/50 rounded-lg" />
  }
);

const PhaseDetails = dynamic(
  () => import("@/components/proceso/PhaseDetails"),
  {
    loading: () => <div className="h-96 animate-pulse bg-muted/50 rounded-lg" />
  }
);

const QualityGuarantees = dynamic(
  () => import("@/components/proceso/QualityGuarantees"),
  {
    loading: () => <div className="h-96 animate-pulse bg-muted/50 rounded-lg" />
  }
);

const CommunicationChannels = dynamic(
  () => import("@/components/proceso/CommunicationChannels"),
  {
    loading: () => <div className="h-64 animate-pulse bg-muted/50 rounded-lg" />
  }
);

export const metadata: Metadata = generateSEOMetadata({
  title: "Proceso de Desarrollo Web | WEBCODE Barcelona",
  description:
    "Nuestro proceso de desarrollo web en 4 fases: Discovery, Diseño, Desarrollo y Launch. Transparencia total, actualizaciones semanales y garantías de calidad.",
  keywords: [
    "proceso desarrollo web",
    "metodología agile",
    "desarrollo web barcelona",
    "proceso web",
    "agencia web proceso",
    "desarrollo transparente"
  ],
  canonical: "https://webcode.es/proceso"
});

// Datos de las fases
const fases = [
  {
    numero: 1,
    titulo: "Discovery & Strategy",
    duracion: "Semana 1",
    descripcion: "Análisis profundo de tu proyecto y definición estratégica",
    actividades: [
      "Análisis de necesidades del negocio",
      "Research de competencia y mercado",
      "Definición de objetivos y KPIs",
      "Arquitectura de información"
    ],
    entregables: [
      "Estrategia digital completa",
      "Wireframes interactivos",
      "Cronograma detallado",
      "Brief técnico"
    ],
    participacion: "8-10 horas (discovery, content review)"
  },
  {
    numero: 2,
    titulo: "Diseño & Experiencia",
    duracion: "Semana 2-3",
    descripcion:
      "Creación de interfaces visuales y experiencia de usuario optimizada",
    actividades: [
      "Design system personalizado",
      "Wireframes y flujos básicos",
      "Mockups high-fidelity",
      "Testing de usabilidad + Microsoft Clarity"
    ],
    entregables: [
      "Diseños finales listos",
      "Guía de estilo completa",
      "Wireframes validados",
      "Report de testing UX"
    ],
    participacion: "2-3 horas/semana (design feedback)"
  },
  {
    numero: 3,
    titulo: "Desarrollo & Integración",
    duracion: "Semana 3-5",
    descripcion:
      "Implementación técnica con código limpio y tecnología moderna",
    actividades: [
      "Código limpio y escalable (Next.js 15 + React 19)",
      "Integración de herramientas (Analytics, pagos, APIs)",
      "Testing automatizado",
      "Optimización de performance"
    ],
    entregables: [
      "Sitio completamente funcional",
      "Panel de administración",
      "Suite de testing",
      "Documentación técnica"
    ],
    participacion: "1-2 horas/semana (testing, reviews)"
  },
  {
    numero: 4,
    titulo: "Launch & Optimización",
    duracion: "Semana 6",
    descripcion: "Despliegue en producción y formación completa del equipo",
    actividades: [
      "Deploy en producción (blue-green deployment)",
      "Configuración de analytics completa",
      "Interpretación de analytics y herramientas",
      "Training del cliente (presencial BCN o remoto)"
    ],
    entregables: [
      "Sitio live y optimizado",
      "Documentación gestión",
      "Credenciales herramientas",
      "30 días soporte premium"
    ],
    participacion: "4-6 horas (training, launch)"
  }
];

const garantias = [
  {
    icono: "✅",
    titulo: "Updates semanales",
    descripcion: "Demos funcionales cada semana"
  },
  {
    icono: "🔄",
    titulo: "2 rounds revisiones",
    descripcion: "Por cada fase del proyecto"
  },
  {
    icono: "📂",
    titulo: "Código fuente",
    descripcion: "Acceso completo al código"
  },
  {
    icono: "📚",
    titulo: "Documentación",
    descripcion: "Técnica y de usuario detallada"
  },
  {
    icono: "🛡️",
    titulo: "30 días soporte",
    descripcion: "Post-lanzamiento incluido"
  },
  {
    icono: "🔒",
    titulo: "Backup completo",
    descripcion: "Versionado del proyecto"
  }
];

const canales = [
  {
    icono: "📧",
    titulo: "Email prioritario",
    descripcion: "Respuesta <4h en horario laboral"
  },
  {
    icono: "💬",
    titulo: "WhatsApp Business",
    descripcion: "Para consultas rápidas"
  },
  {
    icono: "📹",
    titulo: "Videollamadas",
    descripcion: "Reuniones semanales de seguimiento"
  },
  {
    icono: "🔗",
    titulo: "Slack/Teams",
    descripcion: "Para proyectos enterprise"
  }
];

export default function ProcesoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Mejorado */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[image:radial-gradient(circle_384px_at_75%_0%,rgb(var(--primary-rgb)_/_0.04),transparent),radial-gradient(circle_384px_at_25%_100%,rgb(var(--secondary-rgb)_/_0.04),transparent),linear-gradient(to_bottom_right,rgb(var(--primary-rgb)_/_0.10),var(--background),rgb(var(--secondary-rgb)_/_0.10))]">
        {/* Grid pattern - kept separate as it uses complex SVG pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb),0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        <div className="container mx-auto px-4 relative z-10">
          <WSFadeIn delay={0.1}>
            <div className="text-center max-w-5xl mx-auto space-y-8">
              {/* Badge superior */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm">
                <span className="text-2xl">🚀</span>
                <span className="text-sm font-semibold text-primary">
                  Metodología Profesional
                </span>
              </div>

              {/* Título principal */}
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gradient-webcode leading-tight">
                Nuestro Proceso de Desarrollo
              </h1>

              {/* Subtítulo */}
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Metodología probada en 4 fases para garantizar el éxito de tu
                proyecto digital
              </p>

              {/* Trust Indicators Mejorados */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 pt-8">
                {[
                  { icon: "✓", text: "Transparencia total" },
                  { icon: "✓", text: "Updates semanales" },
                  { icon: "✓", text: "Garantías de calidad" }
                ].map((item) => (
                  <div
                    key={item.text}
                    className="group flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                  >
                    <span className="text-primary font-bold text-xl group-hover:scale-125 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <span className="text-sm md:text-base font-medium text-foreground">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA rápido */}
              <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                >
                  <span>Descubre cómo trabajamos</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Arrow right</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/briefing"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-card/80 backdrop-blur-sm border-2 border-primary/30 text-foreground font-semibold shadow-lg hover:shadow-xl hover:border-primary/60 transition-all duration-300 hover:scale-105"
                >
                  <span>📋</span>
                  <span>¿Qué es el Briefing?</span>
                </Link>
              </div>
            </div>
          </WSFadeIn>
        </div>
      </section>

      {/* Timeline de Fases - Componente optimizado con lazy loading */}
      <Suspense
        fallback={<div className="h-96 animate-pulse bg-muted/50 rounded-lg" />}
      >
        <PhaseTimeline fases={fases} />
      </Suspense>

      {/* Detalles de Cada Fase - Componente optimizado */}
      <Suspense
        fallback={<div className="h-96 animate-pulse bg-muted/50 rounded-lg" />}
      >
        <PhaseDetails fases={fases} />
      </Suspense>

      {/* Garantías de Calidad - Componente optimizado */}
      <Suspense
        fallback={<div className="h-96 animate-pulse bg-muted/50 rounded-lg" />}
      >
        <QualityGuarantees garantias={garantias} />
      </Suspense>

      {/* Canales de Comunicación - Componente optimizado */}
      <Suspense
        fallback={<div className="h-64 animate-pulse bg-muted/50 rounded-lg" />}
      >
        <CommunicationChannels canales={canales} />
      </Suspense>

      {/* CTA Final Mejorado */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Fondo estático (optimizado) */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/10 to-primary/15" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-2xl" />
        </div>

        {/* Pattern decorativo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(var(--primary-rgb),0.1)_2px,transparent_2px)] bg-[size:3rem_3rem]" />

        <div className="container mx-auto px-4 relative z-10">
          <WSFadeIn delay={0.2}>
            <div className="text-center max-w-4xl mx-auto space-y-8">
              {/* Icono decorativo estático (optimizado) */}
              <div className="inline-block text-6xl md:text-7xl">🚀</div>

              {/* Título */}
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gradient-webcode leading-tight">
                ¿Listo para empezar tu proyecto?
              </h2>

              {/* Subtítulo */}
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Agenda una consulta gratuita de 30 minutos y descubre cómo
                podemos ayudarte a alcanzar tus objetivos digitales
              </p>

              {/* Botones CTA con diseño mejorado */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <Link
                  href="/contacto"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-110 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">CONSULTA GRATUITA</span>
                  <svg
                    className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Arrow right</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>

                <Link
                  href="/faqs"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-card/80 backdrop-blur-sm border-2 border-primary/30 text-foreground font-semibold text-lg shadow-lg hover:shadow-xl hover:border-primary/60 transition-all duration-300 hover:scale-105"
                >
                  <span>Ver FAQ</span>
                  <svg
                    className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Question mark</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
              </div>

              {/* Badges de confianza */}
              <div className="pt-8">
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  {[
                    { icon: "⚡", text: "Respuesta en menos de 24h" },
                    { icon: "🤝", text: "Sin compromiso" },
                    { icon: "📍", text: "Barcelona local" }
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="group flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                    >
                      <span className="text-xl group-hover:scale-125 transition-transform duration-300">
                        {item.icon}
                      </span>
                      <span className="text-sm md:text-base font-medium text-foreground">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial o badge final */}
              <div className="pt-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 border border-primary/30 backdrop-blur-sm">
                  <span className="text-2xl">⭐</span>
                  <span className="text-sm md:text-base font-semibold text-foreground">
                    Más de 50 proyectos exitosos en Barcelona
                  </span>
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
            </div>
          </WSFadeIn>
        </div>
      </section>
    </div>
  );
}

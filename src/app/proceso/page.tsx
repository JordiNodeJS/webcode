import type { Metadata } from "next";
import Link from "next/link";
import { WSFadeIn } from "@/components/animations/ws-fade-in";
import { generateSEOMetadata } from "@/lib/seo-metadata";

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

// Componente para iconos SVG de las fases
const PhaseIcon = ({ phase }: { phase: number }) => {
  const icons = {
    1: (
      // Lupa - Discovery
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-12 h-12"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    ),
    2: (
      // Paleta - Diseño
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-12 h-12"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
        />
      </svg>
    ),
    3: (
      // Código - Desarrollo
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-12 h-12"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
        />
      </svg>
    ),
    4: (
      // Rayo - Launch
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-12 h-12"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
        />
      </svg>
    )
  };

  return icons[phase as keyof typeof icons] || null;
};

export default function ProcesoPage() {
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
      icono: "💼",
      titulo: "Slack/Teams",
      descripcion: "Para proyectos enterprise"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-webcode">
        <div className="container mx-auto px-4">
          <WSFadeIn delay={0.1}>
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-webcode">
                Nuestro Proceso de Desarrollo
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Metodología probada en 4 fases para garantizar el éxito de tu
                proyecto digital
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-6">
                <div className="flex items-center gap-2 text-sm md:text-base text-foreground">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <span>Transparencia total</span>
                </div>
                <div className="flex items-center gap-2 text-sm md:text-base text-foreground">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <span>Updates semanales</span>
                </div>
                <div className="flex items-center gap-2 text-sm md:text-base text-foreground">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <span>Garantías de calidad</span>
                </div>
              </div>
            </div>
          </WSFadeIn>
        </div>
      </section>

      {/* Timeline de Fases - Desktop */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <WSFadeIn delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Las 4 Fases del Proceso
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Un recorrido estructurado de 6 semanas con entregas claras en
                cada etapa
              </p>
            </div>
          </WSFadeIn>

          {/* Desktop: Timeline horizontal */}
          <div className="hidden lg:block">
            <WSFadeIn delay={0.3}>
              <div className="relative">
                {/* Línea conectora */}
                <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 mx-20" />

                <div className="grid grid-cols-4 gap-8">
                  {fases.map((fase, index) => (
                    <div key={fase.numero} className="relative">
                      {/* Card de fase */}
                      <div className="bg-card border border-border rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        {/* Badge numérico */}
                        <div className="flex justify-center mb-4">
                          <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl shadow-md relative z-10">
                            {fase.numero}
                          </div>
                        </div>

                        {/* Icono */}
                        <div className="flex justify-center mb-4 text-primary">
                          <PhaseIcon phase={fase.numero} />
                        </div>

                        {/* Contenido */}
                        <div className="space-y-3 text-center">
                          <h3 className="text-xl font-bold text-foreground">
                            {fase.titulo}
                          </h3>
                          <p className="text-sm font-medium text-primary">
                            {fase.duracion}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {fase.descripcion}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </WSFadeIn>
          </div>

          {/* Mobile: Timeline vertical */}
          <div className="lg:hidden space-y-8">
            {fases.map((fase, index) => (
              <WSFadeIn key={fase.numero} delay={0.1 * (index + 1)}>
                <div className="relative pl-16">
                  {/* Línea vertical conectora */}
                  {index < fases.length - 1 && (
                    <div className="absolute left-8 top-20 bottom-0 w-1 bg-primary/30" />
                  )}

                  {/* Badge numérico */}
                  <div className="absolute left-0 top-0">
                    <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl shadow-md">
                      {fase.numero}
                    </div>
                  </div>

                  {/* Card de fase */}
                  <div className="bg-card border border-border rounded-lg p-6 shadow-md">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-primary flex-shrink-0">
                        <PhaseIcon phase={fase.numero} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {fase.titulo}
                        </h3>
                        <p className="text-sm font-medium text-primary">
                          {fase.duracion}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {fase.descripcion}
                    </p>
                  </div>
                </div>
              </WSFadeIn>
            ))}
          </div>

          {/* Tiempo total */}
          <WSFadeIn delay={0.5}>
            <div className="mt-16 text-center">
              <div className="inline-block bg-primary/10 border-2 border-primary rounded-lg px-8 py-4">
                <p className="text-lg font-semibold text-foreground">
                  <span className="text-primary font-bold">Tiempo Total:</span>{" "}
                  6 semanas | Participación cliente: ~25-30 horas
                </p>
              </div>
            </div>
          </WSFadeIn>
        </div>
      </section>

      {/* Detalles de Cada Fase */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <WSFadeIn delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Detalles de Cada Fase
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Qué hacemos, qué entregas recibes y cuánto tiempo necesitas
                dedicar
              </p>
            </div>
          </WSFadeIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {fases.map((fase, index) => (
              <WSFadeIn key={fase.numero} delay={0.1 * (index + 1)}>
                <div className="bg-card border border-border rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-md flex-shrink-0">
                      {fase.numero}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        {fase.titulo}
                      </h3>
                      <p className="text-sm font-medium text-primary">
                        {fase.duracion}
                      </p>
                    </div>
                  </div>

                  {/* Actividades */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                      Actividades
                    </h4>
                    <ul className="space-y-2">
                      {fase.actividades.map((actividad, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-muted-foreground border-l-2 border-primary pl-4 py-1"
                        >
                          <span>{actividad}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Entregables */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                      Entregables
                    </h4>
                    <ul className="space-y-2">
                      {fase.entregables.map((entregable, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <span className="text-primary font-bold text-lg">
                            ✓
                          </span>
                          <span>{entregable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Participación del cliente */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        Tu participación:
                      </span>{" "}
                      {fase.participacion}
                    </p>
                  </div>
                </div>
              </WSFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Garantías de Calidad */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <WSFadeIn delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Garantías de Calidad
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Compromisos claros que garantizan la excelencia de tu proyecto
              </p>
            </div>
          </WSFadeIn>

          {/* Grid de garantías */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {garantias.map((garantia, index) => (
              <WSFadeIn key={index} delay={0.1 * (index + 1)}>
                <div className="bg-card border border-border rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl mb-3">{garantia.icono}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {garantia.titulo}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {garantia.descripcion}
                  </p>
                </div>
              </WSFadeIn>
            ))}
          </div>

          {/* Card destacada: Protección del Cliente */}
          <WSFadeIn delay={0.8}>
            <div className="max-w-4xl mx-auto">
              <div className="bg-primary/10 border-2 border-primary rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                  Protección del Cliente
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Seguridad contractual */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <span className="text-primary">🔐</span>
                      Seguridad contractual
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-primary font-bold">✓</span>
                        <span>Contrato con entregables</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-primary font-bold">✓</span>
                        <span>Pagos por milestones (40%, 35%, 25%)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-primary font-bold">✓</span>
                        <span>Garantía 15 días</span>
                      </li>
                    </ul>
                  </div>

                  {/* Soporte y backup */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <span className="text-primary">🛡️</span>
                      Soporte y backup
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-primary font-bold">✓</span>
                        <span>Escalación directa</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-primary font-bold">✓</span>
                        <span>Backup completo</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-primary font-bold">✓</span>
                        <span>30 días soporte</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </WSFadeIn>
        </div>
      </section>

      {/* Canales de Comunicación */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <WSFadeIn delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Canales de Comunicación
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Siempre disponibles para mantenerte informado y resolver dudas
              </p>
            </div>
          </WSFadeIn>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {canales.map((canal, index) => (
              <WSFadeIn key={index} delay={0.1 * (index + 1)}>
                <div className="bg-card border border-border rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{canal.icono}</div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {canal.titulo}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {canal.descripcion}
                      </p>
                    </div>
                  </div>
                </div>
              </WSFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-webcode">
        <div className="container mx-auto px-4">
          <WSFadeIn delay={0.2}>
            <div className="text-center max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-webcode">
                ¿Listo para empezar tu proyecto?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Agenda una consulta gratuita de 30 minutos y descubre cómo
                podemos ayudarte a alcanzar tus objetivos digitales
              </p>

              {/* Botones CTA */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
                <Link href="/contacto" className="neon-btn-3">
                  Consulta Gratuita
                </Link>
                <Link href="/faqs" className="neon-btn-7">
                  Ver FAQ
                </Link>
              </div>

              {/* Texto inferior */}
              <div className="pt-8 text-sm text-muted-foreground">
                <p className="flex flex-wrap justify-center gap-4">
                  <span className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span>
                    Respuesta en menos de 24h
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span>
                    Sin compromiso
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span>
                    Barcelona local
                  </span>
                </p>
              </div>
            </div>
          </WSFadeIn>
        </div>
      </section>
    </div>
  );
}


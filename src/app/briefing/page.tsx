import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { WSFadeIn } from "@/components/animations/ws-fade-in";
import { generateSEOMetadata } from "@/lib/seo-metadata";

// Lazy load componentes pesados
const BriefingPhases = dynamic(() => import("@/components/briefing/BriefingPhases"), {
  loading: () => <div className="h-96 animate-pulse bg-muted/50 rounded-lg" />
});

const BriefingCategories = dynamic(() => import("@/components/briefing/BriefingCategories"), {
  loading: () => <div className="h-96 animate-pulse bg-muted/50 rounded-lg" />
});

const BriefingBenefits = dynamic(() => import("@/components/briefing/BriefingBenefits"), {
  loading: () => <div className="h-64 animate-pulse bg-muted/50 rounded-lg" />
});

export const metadata: Metadata = generateSEOMetadata({
  title: "Briefing & Levantamiento de Requerimientos | WEBCODE Barcelona",
  description:
    "Proceso profesional de briefing y análisis de requisitos para proyectos web. Definimos objetivos, funcionalidades y estrategia digital antes de iniciar el desarrollo.",
  keywords: [
    "briefing desarrollo web",
    "levantamiento de requisitos",
    "análisis de requerimientos web",
    "especificaciones proyecto web",
    "briefing web Barcelona",
    "consultoría web",
    "análisis funcional web",
    "definición proyecto digital"
  ],
  canonical: "https://webcode.es/briefing"
});

// Datos de las fases del ciclo de vida
const cicloFases = [
  {
    numero: 1,
    titulo: "Levantamiento de Requerimientos",
    subtitulo: "Briefing Inicial",
    emoji: "📋",
    duracion: "1-2 días",
    descripcion: "Recopilación completa de información del cliente: objetivos, público, funcionalidades, estilo visual y restricciones técnicas.",
    actividades: [
      "Entrevistas y cuestionarios con stakeholders",
      "Análisis de competencia y mercado",
      "Identificación de objetivos y KPIs",
      "Definición de público objetivo",
      "Recopilación de contenidos y assets"
    ],
    entregables: [
      "Documento de briefing completo",
      "Análisis de competencia",
      "Definición de objetivos SMART",
      "Perfil de público objetivo"
    ]
  },
  {
    numero: 2,
    titulo: "Análisis Funcional y Técnico",
    subtitulo: "Especificaciones",
    emoji: "🔍",
    duracion: "2-3 días",
    descripcion: "Traducción de requisitos en especificaciones técnicas y funcionales concretas. Definición de arquitectura y stack tecnológico.",
    actividades: [
      "Arquitectura de información",
      "Especificación de funcionalidades",
      "Definición de stack tecnológico",
      "Identificación de integraciones necesarias",
      "Planificación de fases y entregables"
    ],
    entregables: [
      "Documento de especificaciones técnicas",
      "Arquitectura de información",
      "Mapa de sitio (sitemap)",
      "Cronograma detallado del proyecto"
    ]
  },
  {
    numero: 3,
    titulo: "Diseño UX/UI",
    subtitulo: "Prototipado Visual",
    emoji: "🎨",
    duracion: "1-2 semanas",
    descripcion: "Creación de wireframes, mockups y prototipos interactivos. Definición del sistema de diseño y experiencia de usuario.",
    actividades: [
      "Wireframes de baja fidelidad",
      "Mockups de alta fidelidad",
      "Sistema de diseño personalizado",
      "Prototipo interactivo",
      "Testing de usabilidad"
    ],
    entregables: [
      "Wireframes completos",
      "Mockups finales aprobados",
      "Guía de estilo visual",
      "Prototipo navegable"
    ]
  },
  {
    numero: 4,
    titulo: "Desarrollo",
    subtitulo: "Implementación",
    emoji: "⚡",
    duracion: "2-6 semanas",
    descripcion: "Implementación del diseño con código limpio y tecnologías modernas. Desarrollo de funcionalidades e integraciones.",
    actividades: [
      "Desarrollo front-end y back-end",
      "Integración de APIs y servicios",
      "Implementación de funcionalidades",
      "Optimización de rendimiento",
      "Testing automatizado"
    ],
    entregables: [
      "Sitio web funcional",
      "Panel de administración",
      "Documentación técnica",
      "Suite de tests"
    ]
  },
  {
    numero: 5,
    titulo: "Testing y Validación",
    subtitulo: "Control de Calidad",
    emoji: "✅",
    duracion: "3-5 días",
    descripcion: "Pruebas exhaustivas de funcionalidad, rendimiento, compatibilidad y accesibilidad. Validación con el cliente.",
    actividades: [
      "Testing funcional completo",
      "Pruebas de rendimiento (Core Web Vitals)",
      "Testing cross-browser y dispositivos",
      "Validación de accesibilidad",
      "Revisión y feedback del cliente"
    ],
    entregables: [
      "Reporte de testing completo",
      "Correcciones implementadas",
      "Validación de accesibilidad",
      "Aprobación del cliente"
    ]
  },
  {
    numero: 6,
    titulo: "Entrega y Mantenimiento",
    subtitulo: "Launch & Soporte",
    emoji: "🚀",
    duracion: "Continuo",
    descripcion: "Lanzamiento a producción, formación del equipo y soporte post-lanzamiento. Mantenimiento y mejoras continuas.",
    actividades: [
      "Deploy a producción",
      "Configuración de analytics",
      "Formación del cliente",
      "Documentación de usuario",
      "Soporte y mantenimiento"
    ],
    entregables: [
      "Sitio web en producción",
      "Documentación completa",
      "Sesión de formación",
      "Plan de mantenimiento"
    ]
  }
];

// Categorías de información a recopilar en el briefing
const categoriasInfo = [
  {
    icono: "🎯",
    titulo: "Objetivos del Proyecto",
    descripcion: "¿Qué quieres lograr con esta web?",
    items: [
      "Objetivos de negocio principales",
      "KPIs y métricas de éxito",
      "Problemas a resolver",
      "Expectativas y timeline",
      "Presupuesto disponible"
    ]
  },
  {
    icono: "👥",
    titulo: "Público Objetivo",
    descripcion: "¿A quién va dirigido tu proyecto?",
    items: [
      "Demografía (edad, ubicación, idioma)",
      "Comportamiento y necesidades",
      "Nivel tecnológico",
      "Dispositivos que utilizan",
      "Puntos de dolor actuales"
    ]
  },
  {
    icono: "⚙️",
    titulo: "Funcionalidades Requeridas",
    descripcion: "¿Qué debe hacer tu web?",
    items: [
      "Funcionalidades core (esenciales)",
      "Funcionalidades deseadas (nice-to-have)",
      "Integraciones necesarias (pagos, CRM, etc.)",
      "Requisitos de rendimiento",
      "Requisitos de seguridad"
    ]
  },
  {
    icono: "🎨",
    titulo: "Estilo Visual y Marca",
    descripcion: "¿Cómo debe verse y sentirse?",
    items: [
      "Identidad de marca existente",
      "Referencias visuales (inspiración)",
      "Colores, tipografías preferidas",
      "Tono de comunicación",
      "Assets disponibles (logos, imágenes)"
    ]
  },
  {
    icono: "📝",
    titulo: "Contenidos",
    descripcion: "¿Qué información mostrar?",
    items: [
      "Estructura de contenido",
      "Textos, imágenes y videos",
      "Idiomas necesarios",
      "Estrategia de contenidos",
      "Responsable de crear contenido"
    ]
  },
  {
    icono: "🔧",
    titulo: "Restricciones Técnicas",
    descripcion: "¿Hay limitaciones o requisitos técnicos?",
    items: [
      "Sistemas existentes (integración)",
      "Hosting actual o preferido",
      "Dominios y emails",
      "Requisitos de accesibilidad",
      "Cumplimiento legal (RGPD, cookies)"
    ]
  }
];

// Beneficios del briefing profesional
const beneficios = [
  {
    icono: "🎯",
    titulo: "Claridad total",
    descripcion: "Todos entienden qué se va a construir y por qué"
  },
  {
    icono: "💰",
    titulo: "Ahorro de costes",
    descripcion: "Evita cambios costosos durante el desarrollo"
  },
  {
    icono: "⏱️",
    titulo: "Entregas a tiempo",
    descripcion: "Planning realista basado en requisitos claros"
  },
  {
    icono: "✅",
    titulo: "Expectativas alineadas",
    descripcion: "Cliente y equipo en la misma página desde el día 1"
  },
  {
    icono: "📊",
    titulo: "Decisiones basadas en datos",
    descripcion: "Análisis de mercado y competencia informan el diseño"
  },
  {
    icono: "🔄",
    titulo: "Proceso optimizado",
    descripcion: "Flujo de trabajo eficiente y sin sorpresas"
  }
];

export default function BriefingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Mejorado */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Fondo con gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        
        {/* Patterns decorativos estáticos (optimizado) */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb),0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        <div className="container mx-auto px-4 relative z-10">
          <WSFadeIn delay={0.1}>
            <div className="text-center max-w-5xl mx-auto space-y-8">
              {/* Badge superior */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border-4 border-primary/30 backdrop-blur-sm shadow-brutal">
                <span className="text-2xl">📋</span>
                <span className="text-sm font-bold text-primary">Fase Fundamental</span>
              </div>

              {/* Título principal */}
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gradient-webcode leading-tight">
                Briefing & Levantamiento de Requerimientos
              </h1>
              
              {/* Subtítulo */}
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                La base de todo proyecto exitoso: entender qué construir, para quién y por qué, 
                antes de escribir la primera línea de código
              </p>

              {/* Trust Indicators Mejorados */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 pt-8">
                {[
                  { icon: "✓", text: "Sin sorpresas" },
                  { icon: "✓", text: "Expectativas claras" },
                  { icon: "✓", text: "Planning realista" }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-card/80 backdrop-blur-sm border-3 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 shadow-brutal-sm hover:shadow-brutal"
                  >
                    <span className="text-primary font-bold text-xl group-hover:scale-125 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <span className="text-sm md:text-base font-bold text-foreground">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Estadística destacada */}
              <div className="pt-6">
                <div className="inline-block p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-primary/30 backdrop-blur-sm shadow-brutal">
                  <p className="text-3xl md:text-4xl font-black text-primary mb-2">
                    70% de los proyectos fallidos
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground">
                    Se deben a requisitos mal definidos o incompletos
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-2">
                    Fuente: Project Management Institute (PMI)
                  </p>
                </div>
              </div>
            </div>
          </WSFadeIn>
        </div>
      </section>

      {/* Sección: ¿Por qué es importante? */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <WSFadeIn delay={0.2}>
            <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
                ¿Por qué es tan importante el Briefing?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Un briefing sólido marca la diferencia entre un proyecto exitoso y uno problemático
              </p>
            </div>
          </WSFadeIn>

          <Suspense fallback={<div className="h-64 animate-pulse bg-muted/50 rounded-lg" />}>
            <BriefingBenefits beneficios={beneficios} />
          </Suspense>
        </div>
      </section>

      {/* Sección: Ciclo de vida del proyecto */}
      <section className="relative py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <WSFadeIn delay={0.2}>
            <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border-3 border-primary/30 backdrop-blur-sm shadow-brutal-sm mb-6">
                <span className="text-xl">🔄</span>
                <span className="text-sm font-bold text-primary">Proceso Completo</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
                Ciclo de Vida del Proyecto Web
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                El briefing es la primera fase de un proceso estructurado de 6 etapas
              </p>
            </div>
          </WSFadeIn>

          <Suspense fallback={<div className="h-96 animate-pulse bg-muted/50 rounded-lg" />}>
            <BriefingPhases fases={cicloFases} />
          </Suspense>
        </div>
      </section>

      {/* Sección: Categorías de información */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <WSFadeIn delay={0.2}>
            <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
                ¿Qué información recopilamos?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Un briefing completo cubre 6 categorías fundamentales de información
              </p>
            </div>
          </WSFadeIn>

          <Suspense fallback={<div className="h-96 animate-pulse bg-muted/50 rounded-lg" />}>
            <BriefingCategories categorias={categoriasInfo} />
          </Suspense>
        </div>
      </section>

      {/* CTA Final Mejorado */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Fondo estático (optimizado) */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/15" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        {/* Pattern decorativo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(var(--primary-rgb),0.1)_2px,transparent_2px)] bg-[size:3rem_3rem]" />

        <div className="container mx-auto px-4 relative z-10">
          <WSFadeIn delay={0.2}>
            <div className="text-center max-w-4xl mx-auto space-y-8">
              {/* Icono decorativo estático (optimizado) */}
              <div className="inline-block text-6xl md:text-7xl">
                🚀
              </div>

              {/* Título */}
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-gradient-webcode leading-tight">
                ¿Listo para empezar tu proyecto con buen pie?
              </h2>
              
              {/* Subtítulo */}
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Agenda una consulta gratuita de 30 minutos y comenzaremos a definir juntos 
                los requisitos de tu proyecto digital
              </p>

              {/* Botones CTA con diseño mejorado */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <Link
                  href="/briefing/formulario"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-black text-lg shadow-brutal hover:shadow-brutal-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-4 border-primary/30"
                >
                  <span className="relative z-10">COMPLETAR FORMULARIO</span>
                  <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                
                <Link
                  href="/proceso"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-card/80 backdrop-blur-sm border-4 border-primary/30 text-foreground font-bold text-lg shadow-brutal-sm hover:shadow-brutal transition-all duration-300 hover:scale-105"
                >
                  <span>Ver Proceso Completo</span>
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>

              {/* Badges de confianza */}
              <div className="pt-8">
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  {[
                    { icon: "⚡", text: "Consulta gratuita 30 min" },
                    { icon: "🤝", text: "Sin compromiso" },
                    { icon: "📍", text: "Barcelona & Online" }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-card/80 backdrop-blur-sm border-3 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 shadow-brutal-sm"
                    >
                      <span className="text-xl group-hover:scale-125 transition-transform duration-300">
                        {item.icon}
                      </span>
                      <span className="text-sm md:text-base font-bold text-foreground">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial o badge final */}
              <div className="pt-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-4 border-primary/30 backdrop-blur-sm shadow-brutal">
                  <span className="text-2xl">⭐</span>
                  <span className="text-sm md:text-base font-black text-foreground">
                    +50 proyectos exitosos gracias a un briefing sólido
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


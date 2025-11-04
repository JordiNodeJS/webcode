import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { EyeFollowButton, SolucionCard, ImageCarousel } from "@/components/soluciones";
import { AnimatedRocketIcon } from "@/components/soluciones/AnimatedRocketIcon";
import { Button } from "@/components/ui/button";
import { SplineBackgroundThemed } from "@/components/custom/SplineBackgroundThemed";
import { SPLINE_SCENES } from "@/lib/spline-paths";

export const metadata: Metadata = {
  title: "Soluciones Digitales | WEBCODE",
  description:
    "Desarrollo web, e-commerce, SEO y consultoría tecnológica. Soluciones digitales completas para empresas que quieren crecer online.",
  openGraph: {
    title: "Soluciones Digitales | WEBCODE",
    description:
      "Desarrollo web, e-commerce, SEO y consultoría tecnológica para empresas."
  }
};

export default function ServicesIndexPage() {
  const solutions = [
    {
      slug: "web-development",
      icon: "🚀",
      title: "Desarrollo Web",
      subtitle: "Sitios web profesionales",
      description:
        "Desarrollo web moderno con Next.js 15 y React 19. Páginas web corporativas, landing pages de alta conversión y aplicaciones web escalables.",
      highlights: [
        "Páginas web corporativas",
        "Landing pages de alta conversión",
        "Portfolios profesionales",
        "Aplicaciones web a medida"
      ],
      subservices: [
        "Páginas web corporativas",
        "Landing pages de conversión",
        "Portfolios profesionales",
        "Aplicaciones web escalables",
        "Webs institucionales",
        "Microsites y campañas"
      ],
      technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"],
      color: "primary"
    },
    {
      slug: "e-commerce",
      icon: "🛒",
      title: "E-commerce",
      subtitle: "Tiendas online que venden",
      description:
        "Tiendas online completas con Wix Studio, o desarrollo personalizado. Optimizadas para conversión y listas para vender desde el día uno.",
      highlights: [
        "Tiendas profesionales",
        "E-commerce WixStudio",
        "Desarrollo personalizado",
        "Integración de pagos completa"
      ],
      subservices: [
        "Tiendas WixStudio",
        "E-commerce Webflow",
        "Desarrollo personalizado",
        "Integración de pagos (Stripe, PayPal)",
        "Gestión de inventario",
        "Panel de administración"
      ],
      technologies: ["Webflow", "WixStudio", "Next.js", "Stripe"],
      color: "secondary"
    },
    {
      slug: "seo",
      icon: "🔍",
      title: "SEO & Marketing",
      subtitle: "Más visibilidad, más clientes",
      description:
        "Posicionamiento SEO técnico, marketing de contenidos y estrategias digitales para aparecer en Google y generar tráfico cualificado.",
      highlights: [
        "SEO técnico avanzado",
        "SEO Local (Google Business)",
        "Google Ads y Meta Ads",
        "Marketing de contenidos"
      ],
      subservices: [
        "SEO On-Page y Off-Page",
        "SEO Local (Google Business)",
        "Google Ads y Meta Ads",
        "Marketing de contenidos",
        "Analytics y reportes",
        "Optimización de conversiones"
      ],
      technologies: [
        "Google Analytics",
        "Search Console",
        "Google Ads",
        "Meta Ads"
      ],
      color: "accent"
    },
    {
      slug: "consulting",
      icon: "💡",
      title: "Consultoría Tech",
      subtitle: "Estrategia y transformación",
      description:
        "Consultoría tecnológica especializada. Arquitectura de software, optimización de procesos y transformación digital para empresas.",
      highlights: [
        "Arquitectura de software",
        "Transformación digital",
        "Optimización de procesos",
        "CTO as a Service"
      ],
      subservices: [
        "Arquitectura de software",
        "Transformación digital",
        "Optimización de procesos",
        "CTO as a Service",
        "Auditorías técnicas",
        "Migración de sistemas"
      ],
      technologies: ["Next.js", "React", "Node.js", "Cloud Services"],
      color: "primary"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section con Spline Background */}
      <section className="relative overflow-hidden min-h-screen flex items-center pt-24 pb-20 md:pb-32">
        {/* Capa 1: Escena 3D (z-0, fondo interactivo) - Solo en Hero Section */}
        <SplineBackgroundThemed
          darkScene={SPLINE_SCENES.MAIN}
          lightScene={SPLINE_SCENES.LIGHT_MODE}
          preset="BACKGROUND_RESPONSIVE"
          container="ABSOLUTE_FULLSCREEN"
          className="absolute inset-0 z-0"
          ariaLabel="Escena 3D interactiva de fondo mostrando soluciones digitales"
        />

        {/* Capa 2: Contenido (z-10, elementos interactivos individuales) */}
        <div className="container mx-auto max-w-6xl px-4 relative z-10 pointer-events-none">
          <div className="max-w-4xl pointer-events-auto">
            {/* Badge - Adaptativo a tema */}
            <div className="inline-block mb-6 px-6 py-2 bg-linear-to-r from-primary/50 to-secondary/50 text-white font-bold uppercase text-sm tracking-wider rounded-full border-2 border-primary/60 shadow-lg dark:from-primary/30 dark:to-secondary/30 dark:border-primary/40 dark:shadow-primary/20">
              Soluciones Digitales
            </div>

            {/* Título - Sin caja en light mode, igual que dark mode */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground dark:text-white drop-shadow-lg">
              Impulsamos tu Negocio con{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Tecnología
              </span>
            </h1>

            {/* Subtítulo - Sin caja en light mode, igual que dark mode */}
            <p className="text-xl md:text-2xl text-foreground/90 dark:text-white/90 mb-8 max-w-3xl drop-shadow-md">
              Desde webs profesionales hasta transformación digital completa.
              Soluciones a medida para cada etapa de tu negocio.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="relative z-10 container mx-auto max-w-6xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution) => (
            <SolucionCard key={solution.slug} className="h-full">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <AnimatedRocketIcon icon={solution.icon} slug={solution.slug} />
                <div className="flex-1">
                  <h2 className="text-3xl font-black mb-1">{solution.title}</h2>
                  <p
                    className={`text-sm font-bold uppercase tracking-wider text-${solution.color}`}
                  >
                    {solution.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 text-lg">
                {solution.description}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  Tecnologías
                </h4>
                <div className="flex flex-wrap gap-2">
                  {solution.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-muted/50 text-muted-foreground rounded-full border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Subservices */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  Servicios Incluidos
                </h4>
                <ul className="space-y-2">
                  {solution.subservices.slice(0, 4).map((service) => (
                    <li key={service} className="flex items-start gap-2">
                      <span
                        className={`text-${solution.color} font-bold text-sm mt-0.5`}
                      >
                        ✓
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {service}
                      </span>
                    </li>
                  ))}
                  {solution.subservices.length > 4 && (
                    <li className="text-xs text-muted-foreground ml-4">
                      +{solution.subservices.length - 4} servicios más
                    </li>
                  )}
                </ul>
              </div>

              {/* CTA */}
              <Button
                asChild
                className={`w-full font-semibold text-lg bg-linear-to-r ${
                  solution.color === "secondary"
                    ? "from-secondary/70 via-secondary/60 to-secondary/50"
                    : solution.color === "accent"
                      ? "from-accent/70 via-accent/60 to-accent/50"
                      : "from-primary/70 via-primary/60 to-primary/50"
                } text-white hover:shadow-lg hover:shadow-${solution.color}/25 transition-all duration-300`}
              >
                <Link href={`/soluciones/${solution.slug}`}>
                  Ver {solution.title} →
                </Link>
              </Button>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* Credentials & Case Study */}
      <section className="relative z-10 bg-linear-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 py-20 border-y border-border/30">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Casos de{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Éxito
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Proyectos reales con resultados medibles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* MudanzasAndy Case Study - Consolidated */}
            <SolucionCard className="bg-linear-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 border-2 border-primary/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-md">
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
                {/* Image Preview */}
                <div className="relative w-full h-[250px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/mudanzasandy-preview.webp"
                    alt="MudanzasAndy.es - Captura de pantalla del proyecto"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-xs font-medium text-muted-foreground mb-1">VISTA PREVIA</p>
                    <h4 className="text-sm font-bold text-foreground">Diseño Profesional & Optimizado</h4>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">+180%</div>
                    <div className="text-xs text-muted-foreground">
                      Tráfico orgánico
                    </div>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-secondary">
                      95/100
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Core Web Vitals
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    Stack Tecnológico
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Next.js 15",
                      "React 19",
                      "TypeScript",
                      "Tailwind CSS"
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>SEO Local optimizado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Formulario de contacto inteligente</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Diseño responsive perfecto</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Core Web Vitals & Accesibilidad WCAG</span>
                  </li>
                </ul>
              </div>

              <Button asChild variant="outline" className="w-full">
                <a
                  href="https://mudanzasandy.es"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Proyecto →
                </a>
              </Button>
            </SolucionCard>

            {/* Interior Design Project - Consolidated */}
            <SolucionCard className="bg-linear-to-br from-secondary/20 to-accent/20 dark:from-secondary/10 dark:to-accent/10 border-2 border-secondary/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-linear-to-br from-secondary to-accent rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-md">
                  ID
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">WebCode — Interior Design Landing</h3>
                  <p className="text-sm text-muted-foreground">
                    Plantilla landing corporativa para estudio de interiorismo
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {/* Image Preview */}
                <div className="relative w-full h-[250px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/interior-design.jpg"
                    alt="WebCode Interior Design Landing - Captura de pantalla del proyecto"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-xs font-medium text-muted-foreground mb-1">VISTA PREVIA</p>
                    <h4 className="text-sm font-bold text-foreground">Diseño Moderno & Responsive</h4>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Plantilla de landing corporativa para un estudio de interiorismo construida con Next.js y TypeScript. 
                  Muestra portafolio, blog y contacto; diseño responsive y componentes reutilizables para escalabilidad.
                </p>

                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    Stack Tecnológico
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js 16", "TypeScript", "Bootstrap", "SCSS"].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-secondary/10 text-secondary rounded-full border border-secondary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Portafolio de proyectos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Blog integrado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Formulario de contacto</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Diseño Responsive & Componentes Reutilizables</span>
                  </li>
                </ul>
              </div>

              <Button asChild variant="outline" className="w-full">
                <a
                  href="https://interior-design.webcode.es/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Demo →
                </a>
              </Button>
            </SolucionCard>

            {/* Luxury Hotel Project - Consolidated */}
            <SolucionCard className="bg-linear-to-br from-accent/20 to-primary/20 dark:from-accent/10 dark:to-primary/10 border-2 border-accent/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-linear-to-br from-accent to-primary rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-md">
                  LH
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">Luxury Hotel — Landing Hotel de Lujo</h3>
                  <p className="text-sm text-muted-foreground">
                    Landing corporativa para hotel de lujo
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {/* Image Carousel */}
                <ImageCarousel
                  images={[
                    "/images/01-lux.webp",
                    "/images/02-lux.webp",
                    "/images/03-lux.webp",
                    "/images/04-lux.webp"
                  ]}
                  alt="Luxury Hotel - Landing Hotel de Lujo"
                />

                <p className="text-sm text-muted-foreground">
                  Landing corporativa para un hotel de lujo: diseño responsive, formulario de reservas con validación, carruseles interactivos y efectos glassmorphism listos para producción.
                </p>

                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    Stack Tecnológico
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Next.js 16",
                      "React 19",
                      "TypeScript",
                      "Tailwind CSS",
                      "Embla Carousel",
                      "Lucide",
                      "pnpm"
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full border border-accent/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>Diseño responsive</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>Formulario de reservas con validación</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>Carruseles interactivos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>Efectos glassmorphism</span>
                  </li>
                </ul>
              </div>

              <Button asChild variant="outline" className="w-full">
                <a
                  href="https://template-luxury-hotel.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Demo →
                </a>
              </Button>
            </SolucionCard>

            {/* Decord Gallery Project - Consolidated */}
            <SolucionCard className="bg-linear-to-br from-primary/20 via-secondary/20 to-accent/20 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10 border-2 border-primary/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-linear-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-md">
                  DG
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">Decord Gallery — Art Gallery Template</h3>
                  <p className="text-sm text-muted-foreground">
                    Plantilla para galería de arte moderna
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {/* Image Carousel */}
                <ImageCarousel
                  images={[
                    "/images/decord/decord-home.webp",
                    "/images/decord/decord-gallery.webp",
                    "/images/decord/decord-events.webp",
                    "/images/decord/decord-about.webp"
                  ]}
                  alt="Decord Gallery - Art Gallery Template"
                />

                <p className="text-sm text-muted-foreground">
                  Plantilla completa para galería de arte moderna con múltiples layouts de galería, gestión de eventos, blog integrado y secciones de testimonios. Diseño responsive y optimizado para mostrar obras de arte.
                </p>

                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    Stack Tecnológico
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "HTML5",
                      "CSS3",
                      "JavaScript",
                      "Bootstrap",
                      "jQuery"
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Múltiples layouts de galería</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Gestión de eventos y exposiciones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Blog integrado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Diseño responsive y optimizado</span>
                  </li>
                </ul>
              </div>

              <Button asChild variant="outline" className="w-full">
                <a
                  href="https://ld-wt73.template-help.com/tf/decord_v1/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Demo →
                </a>
              </Button>
            </SolucionCard>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative z-10 bg-linear-to-br from-accent/20 to-primary/20 dark:from-accent/10 dark:to-primary/10 py-20 border-y border-border/30">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            ¿Por Qué{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              WEBCODE?
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "⚡",
                title: "Tecnología Moderna",
                description:
                  "Next.js 15 + React 19. Lo último en desarrollo web."
              },
              {
                icon: "🎯",
                title: "Resultados Medibles",
                description:
                  "Core Web Vitals en verde, SEO optimizado desde día 1."
              },
              {
                icon: "💰",
                title: "Precio Transparente",
                description: "Sin sorpresas. Presupuestos claros y detallados."
              },
              {
                icon: "🤝",
                title: "Soporte Continuo",
                description:
                  "30 días de soporte premium incluido post-lanzamiento."
              }
            ].map((benefit) => (
              <SolucionCard key={benefit.title} className="text-center">
                <div className="text-5xl mb-3">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </SolucionCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="relative z-10 container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          Cómo{" "}
          <span className="bg-linear-to-r from-secondary to-accent bg-clip-text text-transparent">
            Trabajamos
          </span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
          Un proceso claro y transparente de principio a fin.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Consulta",
              description: "Hablamos de tu proyecto y necesidades"
            },
            {
              step: "02",
              title: "Propuesta",
              description: "Presupuesto detallado en 24-48h"
            },
            {
              step: "03",
              title: "Desarrollo",
              description: "Construimos tu solución con updates regulares"
            },
            {
              step: "04",
              title: "Lanzamiento",
              description: "Deploy, training y soporte continuo"
            }
          ].map((phase) => (
            <SolucionCard key={phase.step}>
              <div className="text-4xl font-bold text-secondary/30 dark:text-secondary/40 mb-3">
                {phase.step}
              </div>
              <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
              <p className="text-sm text-muted-foreground">
                {phase.description}
              </p>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto max-w-6xl px-4 py-20">
        <div className="group relative">
          {/* Efecto de brillo de fondo en hover */}
          <div className="absolute -inset-1 bg-linear-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-2xl" />

          {/* Card principal con glassmorphism */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-card/90 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-primary/40 transition-all duration-500">
            {/* Animated gradient overlay - Must stay separate for animate-gradient-x (requires background-size: 200% 200%) */}
            <div className="absolute inset-0 bg-linear-to-r from-primary/15 via-secondary/15 to-accent/15 dark:from-primary/15 dark:via-secondary/15 dark:to-accent/15 animate-gradient-x opacity-50 rounded-2xl" />

            <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 mb-6 bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary-foreground rounded-full text-sm font-semibold shadow-3d-sm ring-1 ring-primary/30">
                💬 Hablemos
              </div>

              {/* Title with gradient */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-gradient-webcode">
                  ¿Hablamos de tu Proyecto?
                </span>
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl text-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Cuéntanos qué necesitas y te enviaremos un presupuesto
                personalizado en{" "}
                <span className="text-primary font-semibold">24h</span>. Sin
                compromiso.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  size="lg"
                  className="group relative bg-linear-to-r from-primary/70 via-secondary/60 to-primary/50 text-white font-semibold text-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1"
                >
                  <Link href="/contacto">
                    ✉️ Solicitar Presupuesto
                    <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </Button>

                <EyeFollowButton />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { useAnimationContext } from "@/contexts/AnimationContext";
import { cn } from "@/lib/utils";

export function EnhancedServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { disableAnimationsForSection } = useAnimationContext();

  const services = [
    {
      id: 1,
      icon: "📱",
      title: "Landing Pages",
      subtitle: "CONVERSIÓN MAXIMIZADA",
      description: "Páginas de aterrizaje diseñadas para un objetivo específico: convertir visitantes en clientes. Optimizadas para cada campaña.",
      features: [
        "Diseño enfocado en conversión",
        "A/B testing integrado",
        "Formularios optimizados",
        "Analytics y tracking completo"
      ],
      technologies: ["Next.js", "Framer Motion", "Google Analytics", "Hotjar"],
      color: "accent",
      href: "/soluciones/landing-pages"
    },
    {
      id: 2,
      icon: "🏛️",
      title: "Webs Institucionales",
      subtitle: "PRESENCIA CORPORATIVA",
      description: "Páginas web para instituciones, organizaciones y empresas que necesitan transmitir profesionalidad y confianza.",
      features: [
        "Diseño institucional profesional",
        "Gestión de contenidos avanzada",
        "Integración con sistemas existentes",
        "Mantenimiento y soporte incluido"
      ],
      technologies: ["Next.js", "Strapi", "Appwrite", "Cloudflare"],
      color: "primary",
      href: "/soluciones/institucionales"
    },
    {
      id: 3,
      icon: "📊",
      title: "Rediseño de Páginas Web",
      subtitle: "MODERNIZA TU PRESENCIA",
      description: "Actualizamos tu página web existente con las últimas tecnologías y tendencias de diseño. Sin perder el posicionamiento SEO.",
      features: [
        "Migración sin pérdida de SEO",
        "Diseño moderno y responsive",
        "Optimización de rendimiento",
        "Nuevas funcionalidades"
      ],
      technologies: ["Next.js", "SEO Migration", "Performance Optimization", "Modern CSS"],
      color: "secondary",
      href: "/soluciones/rediseno"
    },
    {
      id: 4,
      icon: "🔧",
      title: "Mantenimiento Web",
      subtitle: "SOPORTE ESPECIALIZADO",
      description: "Mantenimiento continuo, actualizaciones de seguridad y soporte técnico para que tu página web siempre funcione perfectamente.",
      features: [
        "Actualizaciones de seguridad",
        "Backups automáticos",
        "Soporte técnico 24/7",
        "Optimización continua"
      ],
      technologies: ["Monitoring", "Strapi", "Security Updates", "Performance Tuning"],
      color: "accent",
      href: "/soluciones/mantenimiento"
    },
    {
      id: 5,
      icon: "🏢",
      title: "Páginas Web Corporativas",
      subtitle: "DISEÑO WEB A MEDIDA",
      description: "Creamos páginas web profesionales completamente personalizadas que transmiten credibilidad, generan confianza y convierten visitantes en clientes. Diseño único adaptado a tu marca, valores y objetivos de negocio con las últimas tecnologías web.",
      features: [
        "Diseño web a medida y único - Cada página es exclusiva para tu marca",
        "Optimización SEO desde el primer día - Posicionamiento orgánico garantizado",
        "Sistema de gestión de contenidos propio - Fácil actualización sin conocimientos técnicos"
      ],
      technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Strapi CMS", "Framer Motion", "Google Analytics 4", "Cloudflare", "Vercel", "Stripe", "EmailJS"],
      color: "primary",
      href: "/soluciones/web-development"
    },
    {
      id: 6,
      icon: "🛒",
      title: "Tiendas Online",
      subtitle: "E-COMMERCE QUE VENDE",
      description: "Tiendas online completas optimizadas para conversión. Desde catálogos simples hasta e-commerce complejos con múltiples funcionalidades.",
      features: [
        "Tiendas WordPress y Webflow",
        "Integración de pagos segura",
        "Gestión de inventario automatizada",
        "Panel de administración intuitivo"
      ],
      technologies: ["Wix Studio", "Webflow", "Stripe", "PayPal"],
      color: "secondary",
      href: "/soluciones/e-commerce"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          bg: "bg-gradient-to-br from-primary/10 to-primary/5",
          border: "border-primary/20",
          icon: "bg-gradient-to-br from-primary to-primary/80",
          accent: "text-primary"
        };
      case "secondary":
        return {
          bg: "bg-gradient-to-br from-secondary/10 to-secondary/5",
          border: "border-secondary/20",
          icon: "bg-gradient-to-br from-secondary to-secondary/80",
          accent: "text-secondary"
        };
      case "accent":
        return {
          bg: "bg-gradient-to-br from-accent/10 to-accent/5",
          border: "border-accent/20",
          icon: "bg-gradient-to-br from-accent to-accent/80",
          accent: "text-accent"
        };
      default:
        return {
          bg: "bg-gradient-to-br from-primary/10 to-primary/5",
          border: "border-primary/20",
          icon: "bg-gradient-to-br from-primary to-primary/80",
          accent: "text-primary"
        };
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
      data-animation-section="enhanced-services"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Servicios de Diseño Web
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nuestros{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              servicios destacados
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Al contar con una larga experiencia y un equipo de desarrolladores y diseñadores web 
            con diferentes especializaciones, somos capaces de ofrecer una gran variedad de servicios 
            en la realización de páginas web a medida.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const colors = getColorClasses(service.color);
            return (
              <div
                key={service.id}
                className={cn(
                  "group relative bg-card/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:shadow-3d-lg hover:-translate-y-2",
                  colors.bg,
                  colors.border
                )}
              >
                {/* Icon */}
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-3d-md",
                  colors.icon
                )}>
                  {service.icon}
                </div>

                {/* Content */}
                <div className="mb-6">
                  <div className={cn("text-sm font-semibold uppercase tracking-wide mb-2", colors.accent)}>
                    {service.subtitle}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className={cn("w-2 h-2 rounded-full flex-shrink-0", colors.accent)}></div>
                      <span className="text-sm text-foreground/90">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-background/50 text-xs font-medium rounded-full border border-border/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA - Solo mostrar si la página existe */}
                {(service.href === "/soluciones/landing-pages" || 
                  service.href === "/soluciones/web-development" || 
                  service.href === "/soluciones/e-commerce" ||
                  service.href === "/soluciones/rediseno" ||
                  service.href === "/soluciones/mantenimiento") && (
                  <a
                    href={service.href}
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-3d-sm hover:shadow-3d-md",
                      colors.icon,
                      "text-white"
                    )}
                  >
                    <span>Ver Detalles</span>
                    <span className="text-lg">→</span>
                  </a>
                )}

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12 border border-primary/20 shadow-3d-lg">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              ¿Necesitas alguno de nuestros servicios?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sea cual sea tu proyecto, lo podemos afrontar. 
              <strong className="text-foreground"> Páginas web únicas</strong> con diseños originales y 
              <strong className="text-foreground"> 100% orientados a los resultados</strong>.
            </p>
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-3d-md hover:shadow-3d-lg transition-all duration-300 hover:scale-105"
            >
              <span>¿Hablamos?</span>
              <span className="text-lg">💬</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

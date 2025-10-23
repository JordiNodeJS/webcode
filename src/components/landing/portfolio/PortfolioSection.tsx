"use client";

import { useRef } from "react";
import Image from "next/image";
import { useAnimationContext } from "@/contexts/AnimationContext";
import { cn } from "@/lib/utils";

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { disableAnimationsForSection: _disableAnimationsForSection } = useAnimationContext();

  const portfolioItems = [
    {
      id: 1,
      title: "Floristería Moderna",
      category: "E-commerce",
      description: "Tienda online completa para una floristería local con catálogo de productos, sistema de pedidos y pagos integrados.",
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop",
      technologies: ["Next.js", "Stripe", "Tailwind CSS"],
      results: [
        "300% aumento en ventas online",
        "95% satisfacción del cliente",
        "Tiempo de carga < 2 segundos"
      ],
      color: "primary"
    },
    {
      id: 2,
      title: "Clínica Dental Premium",
      category: "Web Corporativa",
      description: "Página web profesional para una clínica dental con sistema de citas online y galería de tratamientos.",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop",
      technologies: ["React", "Google Calendar API", "Framer Motion"],
      results: [
        "200% más citas online",
        "SEO #1 en búsquedas locales",
        "40% reducción en llamadas"
      ],
      color: "secondary"
    },
    {
      id: 3,
      title: "Restaurante Gourmet",
      category: "Landing Page",
      description: "Landing page de alta conversión para un restaurante con reservas online y menú interactivo.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      technologies: ["Next.js", "OpenTable API", "Optimized Images"],
      results: [
        "500% más reservas online",
        "Conversión del 8.5%",
        "Mobile-first design"
      ],
      color: "accent"
    },
    {
      id: 4,
      title: "Gimnasio CrossFit",
      category: "Web Institucional",
      description: "Página web para gimnasio con clases online, horarios y sistema de membresías digital.",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop",
      technologies: ["Vue.js", "Stripe Subscriptions", "Video Streaming"],
      results: [
        "150 nuevas membresías",
        "60% de clases online",
        "Retención del 85%"
      ],
      color: "primary"
    },
    {
      id: 5,
      title: "Consultora Legal",
      category: "Rediseño Web",
      description: "Rediseño completo de página web corporativa con nuevo sistema de gestión de contenidos.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
      technologies: ["WordPress", "Custom CMS", "SEO Optimization"],
      results: [
        "SEO mejorado en 300%",
        "Tiempo en página +250%",
        "Generación de leads +180%"
      ],
      color: "secondary"
    },
    {
      id: 6,
      title: "Tienda de Ropa Online",
      category: "E-commerce Avanzado",
      description: "Tienda online completa con filtros avanzados, wishlist y programa de fidelización.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      technologies: ["Wix Studio", "Custom Apps", "Analytics"],
      results: [
        "ROI del 400%",
        "Carrito promedio +35%",
        "Tasa de abandono -45%"
      ],
      color: "accent"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          bg: "bg-gradient-to-br from-primary/10 to-primary/5",
          border: "border-primary/20",
          accent: "text-primary",
          badge: "bg-primary/10 text-primary border-primary/20"
        };
      case "secondary":
        return {
          bg: "bg-gradient-to-br from-secondary/10 to-secondary/5",
          border: "border-secondary/20",
          accent: "text-secondary",
          badge: "bg-secondary/10 text-secondary border-secondary/20"
        };
      case "accent":
        return {
          bg: "bg-gradient-to-br from-accent/10 to-accent/5",
          border: "border-accent/20",
          accent: "text-accent",
          badge: "bg-accent/10 text-accent border-accent/20"
        };
      default:
        return {
          bg: "bg-gradient-to-br from-primary/10 to-primary/5",
          border: "border-primary/20",
          accent: "text-primary",
          badge: "bg-primary/10 text-primary border-primary/20"
        };
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background/95 to-secondary/5"
      data-animation-section="portfolio"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Nuestro Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ejemplos de{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              negocios
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Cada proyecto es único. Descubre cómo se podrían desarrollar estos proyectos con sus tecnologías respectivas.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {portfolioItems.map((item) => {
            const colors = getColorClasses(item.color);
            return (
              <div
                key={item.id}
                className={cn(
                  "group relative bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-3d-lg hover:-translate-y-2",
                  colors.bg,
                  colors.border
                )}
              >
                {/* Image */}
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={item.id <= 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className={cn(
                    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border mb-4",
                    colors.badge
                  )}>
                    {item.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-background/50 text-xs font-medium rounded border border-border/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="space-y-2">
                    {item.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="flex items-center gap-2">
                        <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", colors.accent)}></div>
                        <span className="text-sm text-foreground/90 font-medium">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12 border border-primary/20 shadow-3d-lg">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              ¿Quieres ser nuestro próximo caso de éxito?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Cada proyecto es una oportunidad de crear algo único. 
              <strong className="text-foreground"> Diseño web a medida</strong> que realmente funciona para tu negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-3d-md hover:shadow-3d-lg transition-all duration-300 hover:scale-105"
              >
                <span>Empezar Proyecto</span>
                <span className="text-lg">🚀</span>
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-background/80 backdrop-blur-sm border border-border text-foreground font-semibold rounded-xl shadow-3d-sm hover:shadow-3d-md transition-all duration-300 hover:scale-105"
              >
                <span>Ver Más Casos</span>
                <span className="text-lg">📊</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

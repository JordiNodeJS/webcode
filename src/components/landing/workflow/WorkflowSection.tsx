"use client";

import { useRef } from "react";
import { useAnimationContext } from "@/contexts/AnimationContext";
import { cn } from "@/lib/utils";

export function WorkflowSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { disableAnimationsForSection } = useAnimationContext();

  const workflowSteps = [
    {
      number: "01",
      title: "Estudio y Análisis",
      description: "Analizamos tu negocio, objetivos y competencia para definir la estrategia digital que tu proyecto necesita.",
      icon: "🔍",
      details: [
        "Análisis de mercado y competencia",
        "Definición de objetivos digitales",
        "Identificación del público objetivo",
        "Estrategia de posicionamiento"
      ]
    },
    {
      number: "02", 
      title: "Definición del Mensaje",
      description: "Definimos el mensaje que deseas comunicar para implementar los elementos comunicativos necesarios en el diseño.",
      icon: "💬",
      details: [
        "Arquitectura de la información",
        "Propuesta de valor única",
        "Estrategia de contenidos",
        "Tonality y comunicación"
      ]
    },
    {
      number: "03",
      title: "Diseño y Desarrollo",
      description: "Realizamos el diseño web y la programación de la página web con las últimas tecnologías.",
      icon: "⚡",
      details: [
        "Diseño UX/UI personalizado",
        "Desarrollo con Next.js 15",
        "Optimización para móviles",
        "Integración de funcionalidades"
      ]
    },
    {
      number: "04",
      title: "Marketing Digital",
      description: "Desplegamos acciones de marketing digital para atraer tráfico de calidad y maximizar las conversiones.",
      icon: "📈",
      details: [
        "SEO técnico y de contenidos",
        "Google Ads y Meta Ads",
        "Analytics y tracking",
        "Optimización de conversiones"
      ]
    },
    {
      number: "05",
      title: "Monitoreo y Resultados",
      description: "Monitorizamos todo el proceso, asesorándote y acompañándote para obtener los mejores resultados.",
      icon: "🎯",
      details: [
        "Reportes mensuales de resultados",
        "Optimización continua",
        "Mantenimiento y actualizaciones",
        "Soporte técnico especializado"
      ]
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background/95 to-primary/5"
      data-animation-section="workflow"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Nuestro Proceso
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ¿Cómo trabajamos el{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              diseño web?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            En WebSnack entendemos el proceso de creación de páginas web como un proceso integral, 
            que incluye desde el servicio de diseño web hasta su completa implementación y marketing digital.
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30 hidden lg:block"></div>
          
          <div className="space-y-16">
            {workflowSteps.map((step, index) => (
              <div
                key={step.number}
                className={cn(
                  "relative flex flex-col lg:flex-row items-start gap-8",
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                {/* Step Number & Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-3d-md">
                    {step.number}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-lg shadow-3d-sm">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-3d-sm hover:shadow-3d-md transition-all duration-300">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {step.details.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                        <span className="text-sm text-foreground/90">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12 border border-primary/20 shadow-3d-lg">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              ¿Listo para empezar tu proyecto?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Cada empresa es única. Te creamos un servicio de diseño web a medida: 
              <strong className="text-foreground"> webs únicas</strong> con diseños originales y 
              <strong className="text-foreground"> 100% orientados a los resultados</strong> que buscas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-3d-md hover:shadow-3d-lg transition-all duration-300 hover:scale-105"
              >
                <span>¿Hablamos?</span>
                <span className="text-lg">💬</span>
              </a>
              <a
                href="/soluciones"
                className="inline-flex items-center gap-2 px-8 py-4 bg-background/80 backdrop-blur-sm border border-border text-foreground font-semibold rounded-xl shadow-3d-sm hover:shadow-3d-md transition-all duration-300 hover:scale-105"
              >
                <span>Ver Servicios</span>
                <span className="text-lg">🚀</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

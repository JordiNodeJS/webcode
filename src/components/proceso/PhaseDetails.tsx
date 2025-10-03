"use client";

import { WSFadeIn } from "@/components/animations/ws-fade-in";

interface Fase {
  numero: number;
  titulo: string;
  duracion: string;
  actividades: string[];
  entregables: string[];
  participacion: string;
}

interface PhaseDetailsProps {
  fases: Fase[];
}

export default function PhaseDetails({ fases }: PhaseDetailsProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Fondo con gradiente estático (optimizado) */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/50" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-accent/10 rounded-full blur-2xl" />
      </div>

      {/* Grid pattern sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="container mx-auto px-4 relative z-10">
        <WSFadeIn delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-webcode mb-4">
              Detalles de Cada Fase
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Qué hacemos, qué entregas recibes y cuánto tiempo necesitas dedicar
            </p>
          </div>
        </WSFadeIn>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {fases.map((fase, index) => (
            <WSFadeIn key={fase.numero} delay={0.1 * (index + 1)}>
              <div className="group relative">
                {/* Efecto de brillo de fondo en hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-2xl" />
                
                {/* Card principal con glassmorphism */}
                <div className="relative bg-card/90 backdrop-blur-xl border-2 border-primary/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
                  {/* Label de duración alineado con el número */}
                  <div className="absolute top-8 right-4 flex items-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 shadow-lg">
                      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-semibold text-primary whitespace-nowrap">
                        {fase.duracion}
                      </span>
                    </div>
                  </div>

                  {/* Header con número y título mejorado */}
                  <div className="flex items-center gap-4 mb-6 pr-32">
                    {/* Badge numérico con efecto neon */}
                    <div className="relative flex-shrink-0">
                      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl w-16 h-16 flex items-center justify-center font-bold text-2xl shadow-lg group-hover:shadow-primary/50 group-hover:scale-110 transition-all duration-300">
                        {fase.numero}
                      </div>
                      <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-md group-hover:blur-lg transition-all duration-300" />
                    </div>

                    {/* Título con mejor espaciado */}
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                        {fase.titulo}
                      </h3>
                    </div>
                  </div>

                  {/* Actividades */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
                        Actividades
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      {fase.actividades.map((actividad, idx) => (
                        <li
                          key={idx}
                          className="group/item flex items-start gap-3 text-sm text-muted-foreground border-l-3 border-primary/50 pl-4 py-2 rounded-r-lg hover:bg-primary/5 hover:border-primary transition-all duration-300"
                        >
                          <span className="text-primary mt-0.5">▸</span>
                          <span className="group-hover/item:text-foreground transition-colors duration-300">
                            {actividad}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Entregables */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
                        Entregables
                      </h4>
                    </div>
                    <ul className="grid grid-cols-1 gap-2">
                      {fase.entregables.map((entregable, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 text-sm text-muted-foreground bg-gradient-to-r from-secondary/5 to-transparent p-3 rounded-lg hover:from-secondary/10 transition-all duration-300"
                        >
                          <span className="text-secondary font-bold text-lg flex-shrink-0 flex items-center justify-center w-5 h-5">
                            ✓
                          </span>
                          <span className="hover:text-foreground transition-colors duration-300 leading-relaxed">
                            {entregable}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Participación del cliente */}
                  <div className="pt-4 border-t-2 border-dashed border-primary/20">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                          Tu participación
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {fase.participacion}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </WSFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}


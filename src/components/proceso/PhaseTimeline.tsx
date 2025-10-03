"use client";

import { useState, useEffect, useRef } from "react";
import { WSFadeIn } from "@/components/animations/ws-fade-in";

// Componente para iconos SVG de las fases
const PhaseIcon = ({ phase }: { phase: number }) => {
  const icons = {
    1: (
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

interface Fase {
  numero: number;
  titulo: string;
  duracion: string;
  descripcion: string;
}

interface PhaseTimelineProps {
  fases: Fase[];
}

export default function PhaseTimeline({ fases }: PhaseTimelineProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [pulseBadges, setPulseBadges] = useState<Set<number>>(new Set());
  const [pulseCount, setPulseCount] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const pulseTimeouts = useRef<NodeJS.Timeout[]>([]);
  const animationTimeouts = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      // Limpiar timeouts al desmontar
      pulseTimeouts.current.forEach(timeout => clearTimeout(timeout));
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
    };
  }, [isVisible]);

  // Efecto separado para iniciar animaciones cuando isVisible cambia
  useEffect(() => {
    if (isVisible) {
      startTimelineAnimation();
      startRandomPulses();
    }
  }, [isVisible]);

  const startTimelineAnimation = () => {
    // Resetear estados
    setTimelineProgress(0);
    setVisibleCards(new Set());
    
    // Animar la barra de tiempo
    const timelineDuration = 2000; // 2 segundos para la barra
    const cardDelay = 300; // 300ms entre cada tarjeta
    
    // Animar progreso de la barra
    const timelineInterval = setInterval(() => {
      setTimelineProgress(prev => {
        const newProgress = prev + (100 / (timelineDuration / 16)); // 60fps
        if (newProgress >= 100) {
          clearInterval(timelineInterval);
          return 100;
        }
        return newProgress;
      });
    }, 16);

    // Mostrar tarjetas progresivamente - empiezan cuando la barra llega a su posición
    fases.forEach((fase, index) => {
      const cardAppearTime = (timelineDuration * (index + 1) / fases.length) - 200; // 200ms antes de que la barra llegue
      const timeout = setTimeout(() => {
        setVisibleCards(prev => new Set(prev).add(fase.numero));
      }, Math.max(0, cardAppearTime));
      
      animationTimeouts.current.push(timeout);
    });
  };

  const startRandomPulses = () => {
    const maxPulses = 5;
    let currentPulse = 0;

    const schedulePulse = () => {
      if (currentPulse >= maxPulses) return;

      const randomBadge = Math.floor(Math.random() * fases.length) + 1;
      const randomDelay = Math.random() * 2000 + 500; // 500-2500ms

      const timeout = setTimeout(() => {
        setPulseBadges(prev => new Set(prev).add(randomBadge));
        setPulseCount(prev => prev + 1);

        // Remover el pulse después de la animación (1s)
        const removeTimeout = setTimeout(() => {
          setPulseBadges(prev => {
            const newSet = new Set(prev);
            newSet.delete(randomBadge);
            return newSet;
          });
        }, 1000);

        pulseTimeouts.current.push(removeTimeout);
        currentPulse++;
        schedulePulse();
      }, randomDelay);

      pulseTimeouts.current.push(timeout);
    };

    schedulePulse();
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden"
    >
      {/* Pattern de fondo estático (optimizado para rendimiento) */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <WSFadeIn delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-webcode mb-4">
              Las 4 Fases del Proceso
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Un recorrido estructurado de 6 semanas con entregas claras en cada
              etapa
            </p>
          </div>
        </WSFadeIn>

        {/* Desktop: Timeline horizontal */}
        <div className="hidden lg:block">
          <WSFadeIn delay={0.3}>
            <div className="relative">
              {/* Línea conectora DEBAJO de las tarjetas con animación progresiva */}
              <div className="absolute top-32 left-0 right-0 h-2 mx-20 overflow-hidden rounded-full z-0">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transition-all duration-300 ease-out"
                  style={{
                    transform: `scaleX(${timelineProgress / 100})`,
                    transformOrigin: 'left'
                  }}
                />
              </div>

              <div className="grid grid-cols-4 gap-8 relative z-20">
                {fases.map((fase, index) => (
                  <div 
                    key={fase.numero} 
                    className={`relative group transition-all duration-500 ease-out ${
                      visibleCards.has(fase.numero) 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-95'
                    }`}
                  >
                    {/* Card de fase con glassmorphism */}
                    <div className="relative bg-card/80 backdrop-blur-md border-2 border-primary/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:scale-105">
                      {/* Efecto de brillo en hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Contenido */}
                      <div className="relative z-10">
                        {/* Badge numérico con pulse controlado */}
                        <div className="flex justify-center mb-4">
                          <div className={`relative bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl shadow-lg group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-110 ${
                            pulseBadges.has(fase.numero) ? 'animate-pulse' : ''
                          }`}>
                            <span className="relative z-10">{fase.numero}</span>
                            {/* Pulse ring en hover */}
                            <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-20 group-hover:animate-ping" />
                          </div>
                        </div>

                        {/* Icono con animación */}
                        <div className="flex justify-center mb-4 text-primary transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                          <PhaseIcon phase={fase.numero} />
                        </div>

                        {/* Contenido textual */}
                        <div className="space-y-3 text-center">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {fase.titulo}
                          </h3>
                          <p className="text-sm font-semibold text-primary/80 px-3 py-1 rounded-full bg-primary/10 inline-block">
                            {fase.duracion}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {fase.descripcion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </WSFadeIn>
        </div>

        {/* Mobile: Timeline vertical con diseño mejorado */}
        <div className="lg:hidden space-y-8">
          {fases.map((fase, index) => (
            <WSFadeIn key={fase.numero} delay={0.1 * (index + 1)}>
              <div className="relative pl-20">
                {/* Línea vertical conectora con gradiente */}
                {index < fases.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
                )}

                {/* Badge numérico con efecto y pulse controlado */}
                <div className="absolute left-0 top-0">
                  <div className={`relative bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl shadow-lg ${
                    pulseBadges.has(fase.numero) ? 'animate-pulse' : ''
                  }`}>
                    <span className="relative z-10">{fase.numero}</span>
                    <div className="absolute inset-0 rounded-full bg-primary/30 blur-md" />
                  </div>
                </div>

                {/* Card de fase con glassmorphism */}
                <div className="bg-card/80 backdrop-blur-md border-2 border-primary/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-primary flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
                      <PhaseIcon phase={fase.numero} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {fase.titulo}
                      </h3>
                      <p className="text-sm font-semibold text-primary/80 px-3 py-1 rounded-full bg-primary/10 inline-block">
                        {fase.duracion}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {fase.descripcion}
                  </p>
                </div>
              </div>
            </WSFadeIn>
          ))}
        </div>

        {/* Tiempo total con diseño mejorado */}
        <WSFadeIn delay={0.5}>
          <div className="mt-16 text-center">
            <div className="inline-block relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border-2 border-primary/30 rounded-2xl px-8 py-6 backdrop-blur-sm">
                <p className="text-lg md:text-xl font-semibold text-foreground">
                  <span className="text-primary font-bold text-2xl">⏱️ Tiempo Total:</span>{" "}
                  <span className="text-gradient-webcode">6 semanas</span> | Participación cliente:{" "}
                  <span className="text-primary">~25-30 horas</span>
                </p>
              </div>
            </div>
          </div>
        </WSFadeIn>
      </div>
    </section>
  );
}


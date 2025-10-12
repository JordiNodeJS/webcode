"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { WSFadeIn } from "@/components/animations/ws-fade-in";

interface Fase {
  numero: number;
  titulo: string;
  subtitulo: string;
  emoji: string;
  duracion: string;
  descripcion: string;
  actividades: string[];
  entregables: string[];
}

interface BriefingPhasesProps {
  fases: Fase[];
}

export default function BriefingPhases({ fases }: BriefingPhasesProps) {
  const [faseActiva, setFaseActiva] = useState<number | null>(1);

  return (
    <div className="space-y-8">
      {/* Timeline visual */}
      <div className="hidden md:block relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent -translate-y-1/2" />

        <div className="relative flex justify-between items-center">
          {fases.map((fase) => (
            <motion.button
              key={fase.numero}
              onClick={() =>
                setFaseActiva(faseActiva === fase.numero ? null : fase.numero)
              }
              className={`relative z-10 flex flex-col items-center gap-2 transition-all duration-300 ${
                faseActiva === fase.numero ? "scale-110" : "hover:scale-105"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl border-4 transition-all duration-300 shadow-brutal ${
                  faseActiva === fase.numero
                    ? "bg-primary border-primary/50 shadow-brutal-lg"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                {fase.emoji}
              </div>
              <div className="text-center">
                <p
                  className={`text-sm font-bold ${faseActiva === fase.numero ? "text-primary" : "text-muted-foreground"}`}
                >
                  Fase {fase.numero}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cards de fases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {fases.map((fase, index) => (
          <WSFadeIn key={fase.numero} delay={index * 0.1}>
            <motion.div
              className={`relative p-6 rounded-2xl border-4 transition-all duration-300 cursor-pointer group ${
                faseActiva === fase.numero
                  ? "bg-gradient-to-br from-primary/20 to-accent/10 border-primary/50 shadow-brutal-lg"
                  : "bg-card/80 backdrop-blur-sm border-border hover:border-primary/30 shadow-brutal-sm hover:shadow-brutal"
              }`}
              onClick={() =>
                setFaseActiva(faseActiva === fase.numero ? null : fase.numero)
              }
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {/* Número de fase */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-black text-xl border-4 border-background shadow-brutal">
                {fase.numero}
              </div>

              {/* Header */}
              <div className="space-y-2 mb-4">
                <div className="text-4xl">{fase.emoji}</div>
                <h3 className="text-xl font-black text-foreground">
                  {fase.titulo}
                </h3>
                <p className="text-sm font-bold text-primary">
                  {fase.subtitulo}
                </p>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border-2 border-primary/30">
                  <p className="text-xs font-bold text-primary">
                    ⏱️ {fase.duracion}
                  </p>
                </div>
              </div>

              {/* Descripción */}
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {fase.descripcion}
              </p>

              {/* Contenido expandible */}
              <motion.div
                initial={false}
                animate={{
                  height: faseActiva === fase.numero ? "auto" : 0,
                  opacity: faseActiva === fase.numero ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-4 pt-4 border-t-2 border-border/50">
                  {/* Actividades */}
                  <div>
                    <h4 className="text-sm font-black text-foreground mb-2">
                      ✅ Actividades
                    </h4>
                    <ul className="space-y-1">
                      {fase.actividades.map((actividad) => (
                        <li
                          key={actividad}
                          className="text-xs text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-0.5">•</span>
                          <span>{actividad}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Entregables */}
                  <div>
                    <h4 className="text-sm font-black text-foreground mb-2">
                      📦 Entregables
                    </h4>
                    <ul className="space-y-1">
                      {fase.entregables.map((entregable) => (
                        <li
                          key={entregable}
                          className="text-xs text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-accent mt-0.5">▸</span>
                          <span>{entregable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Indicador de expansión */}
              <div className="flex justify-center mt-4">
                <motion.div
                  animate={{ rotate: faseActiva === fase.numero ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Chevron down</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </WSFadeIn>
        ))}
      </div>

      {/* Nota informativa */}
      <WSFadeIn delay={0.6}>
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-4 border-primary/20 shadow-brutal">
          <div className="flex items-start gap-4">
            <div className="text-3xl">💡</div>
            <div className="flex-1">
              <h4 className="text-lg font-black text-foreground mb-2">
                El briefing marca la diferencia
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                La <strong>Fase 1 (Briefing)</strong> es la base de todo el
                proceso. Una recopilación exhaustiva de requisitos en esta etapa
                previene malentendidos, ahorra tiempo y dinero, y garantiza que
                el resultado final cumpla tus expectativas. Dedicar tiempo al
                briefing es invertir en el éxito del proyecto.
              </p>
            </div>
          </div>
        </div>
      </WSFadeIn>
    </div>
  );
}

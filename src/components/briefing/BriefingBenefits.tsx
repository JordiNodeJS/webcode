"use client";

import { motion } from "framer-motion";
import { WSFadeIn } from "@/components/animations/ws-fade-in";

interface Beneficio {
  icono: string;
  titulo: string;
  descripcion: string;
}

interface BriefingBenefitsProps {
  beneficios: Beneficio[];
}

export default function BriefingBenefits({ beneficios }: BriefingBenefitsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {beneficios.map((beneficio, index) => (
        <WSFadeIn key={beneficio.titulo} delay={index * 0.1}>
          <motion.div
            className="group relative p-6 rounded-2xl bg-card/80 backdrop-blur-sm border-4 border-border hover:border-primary/50 shadow-brutal-sm hover:shadow-brutal transition-all duration-300"
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Número de beneficio (decorativo) */}
            <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-black text-sm border-4 border-background shadow-brutal-sm group-hover:scale-110 transition-transform duration-300">
              {index + 1}
            </div>

            {/* Icono */}
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {beneficio.icono}
            </div>

            {/* Título */}
            <h3 className="text-xl font-black text-foreground mb-2">
              {beneficio.titulo}
            </h3>

            {/* Descripción */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {beneficio.descripcion}
            </p>

            {/* Barra decorativa animada */}
            <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-500" />

            {/* Glow effect en hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </motion.div>
        </WSFadeIn>
      ))}
    </div>
  );
}


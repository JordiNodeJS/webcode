"use client";

import { motion } from "framer-motion";
import { WSFadeIn } from "@/components/animations/ws-fade-in";

interface Categoria {
  icono: string;
  titulo: string;
  descripcion: string;
  items: string[];
}

interface BriefingCategoriesProps {
  categorias: Categoria[];
}

export default function BriefingCategories({ categorias }: BriefingCategoriesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categorias.map((categoria, index) => (
        <WSFadeIn key={categoria.titulo} delay={index * 0.1}>
          <motion.div
            className="group relative h-full p-6 rounded-2xl bg-card/80 backdrop-blur-sm border-4 border-border hover:border-primary/50 shadow-brutal-sm hover:shadow-brutal transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Icono y título */}
            <div className="space-y-3 mb-4">
              <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                {categoria.icono}
              </div>
              <h3 className="text-xl font-black text-foreground">
                {categoria.titulo}
              </h3>
              <p className="text-sm font-bold text-primary">
                {categoria.descripcion}
              </p>
            </div>

            {/* Divider decorativo */}
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full mb-4 group-hover:w-full transition-all duration-300" />

            {/* Lista de items */}
            <ul className="space-y-2">
              {categoria.items.map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <span className="text-primary font-black mt-0.5 flex-shrink-0">•</span>
                  <span className="leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>

            {/* Decoración de esquina */}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </motion.div>
        </WSFadeIn>
      ))}
    </div>
  );
}


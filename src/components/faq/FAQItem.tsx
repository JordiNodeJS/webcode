"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { ChevronDown } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface FAQItemProps {
  question: string;
  answer: ReactNode;
  index: number;
  id?: string;
}

/**
 * Componente individual de pregunta frecuente
 *
 * Incluye animaciones WAS (WEBCODE Animation System) para expandir/contraer
 * con efectos suaves y accesibles.
 */
export function FAQItem({ question, answer, index, id }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Generar ID único basado en la pregunta si no se proporciona
  const faqId =
    id ||
    `faq-${question
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")}`;

  // Función para abrir FAQ desde hash de URL
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === `#${faqId}`) {
        setIsOpen(true);
        // Scroll suave al elemento después de un breve delay
        setTimeout(() => {
          document.getElementById(faqId)?.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }, 100);
      }
    };

    // Verificar hash inicial
    handleHashChange();

    // Escuchar cambios en el hash
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [faqId]);

  return (
    <motion.div
      id={faqId}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-b border-border/50 last:border-b-0"
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full py-6 px-4 flex items-start justify-between gap-4",
          "text-left transition-colors duration-200",
          "hover:bg-accent/30 rounded-lg",
          "focus:outline-none",
          "group"
        )}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-foreground pr-4 flex-1">
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0 mt-1"
        >
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-colors",
              isOpen ? "text-primary" : "text-muted-foreground",
              "group-hover:text-primary"
            )}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-6 text-muted-foreground leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

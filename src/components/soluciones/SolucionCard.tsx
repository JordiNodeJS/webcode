// ✅ Server Component - Solo usa CSS hover effects, no necesita JavaScript en cliente
import type { ReactNode } from "react";

interface SolucionCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function SolucionCard({
  children,
  className = "",
  hover = true
}: SolucionCardProps) {
  return (
    <div className="group relative">
      {/* Efecto de brillo de fondo en hover */}
      <div className="absolute -inset-1 bg-linear-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-2xl" />

      {/* Card principal con glassmorphism */}
      <div
        className={`relative bg-card/90 backdrop-blur-xl border-2 border-primary/20 rounded-2xl p-8 shadow-xl ${
          hover
            ? "hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
            : ""
        } ${className}`}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-linear-to-r from-primary/8 via-secondary/8 to-primary/8 dark:from-primary/8 dark:via-primary/12 dark:to-primary/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

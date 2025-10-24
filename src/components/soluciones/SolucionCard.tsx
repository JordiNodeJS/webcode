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
    <div
      className={`group relative overflow-hidden border border-border/30 dark:border-border/20 bg-gradient-to-br from-white/95 via-white/90 to-slate-50/95 dark:from-slate-800/95 dark:via-slate-700/90 dark:to-slate-800/85 rounded-xl p-8 ${
        hover
          ? "hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          : ""
      } ${className}`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/6 via-secondary/6 to-primary/6 dark:from-primary/8 dark:via-primary/12 dark:to-primary/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

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
      className={`group relative overflow-hidden border border-border/40 dark:border-border/20 bg-linear-to-br from-white/98 via-white/95 to-slate-50/98 dark:from-slate-800/95 dark:via-slate-700/90 dark:to-slate-800/85 rounded-xl p-8 shadow-sm ${
        hover
          ? "hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          : ""
      } ${className}`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/8 via-secondary/8 to-primary/8 dark:from-primary/8 dark:via-primary/12 dark:to-primary/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { neonTitleVariants } from "@/lib/variants";

export function ServiceHeader() {
  // Usar IDs estáticos para evitar problemas de hidratación
  const id = "services-header";
  const descId = "service-header-desc";

  return (
    <section
      className="text-center max-w-4xl mx-auto"
      aria-labelledby={`servicios-${id}`}
    >
      <h2
        id={`servicios-${id}`}
        className={cn(
          neonTitleVariants({ size: "default" }),
          "mb-6 scroll-mt-20"
        )}
      >
        Soluciones Simples
      </h2>
      <p
        id={`servicios-paragraph-${id}`}
        className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
        aria-describedby={descId}
      >
        Para negocios que necesitan presencia digital{" "}
        <span className="text-foreground font-semibold">rápida y efectiva</span>
      </p>

      <span id={descId} className="sr-only">
        Sección de servicios con soluciones rápidas y efectivas para negocios.
      </span>
    </section>
  );
}

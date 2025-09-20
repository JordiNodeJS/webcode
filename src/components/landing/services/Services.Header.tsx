"use client";

import { useId } from "react";

export function ServiceHeader() {
  const headingId = useId();

  return (
    <div className="text-center max-w-4xl mx-auto">
      <h2
        id={headingId}
        className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent mb-6 scroll-mt-20"
      >
        Soluciones Simples
      </h2>
      <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
        Para negocios que necesitan presencia digital{" "}
        <span className="text-foreground font-semibold">rápida y efectiva</span>
      </p>
    </div>
  );
}

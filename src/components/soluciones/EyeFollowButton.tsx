"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function EyeFollowButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;

      const button = buttonRef.current;
      const rect = button.getBoundingClientRect();

      // Calcular el centro del botón
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      // Calcular la posición del ratón relativa al centro del botón
      const deltaX = e.clientX - buttonCenterX;
      const deltaY = e.clientY - buttonCenterY;

      // Calcular el ángulo y la distancia
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(
        Math.sqrt(deltaX * deltaX + deltaY * deltaY),
        8 // Límite máximo de movimiento del ojo (8px)
      );

      // Convertir a coordenadas x, y
      const x = Math.cos(angle) * (distance / 8) * 6; // Movimiento máximo de 6px
      const y = Math.sin(angle) * (distance / 8) * 6;

      setEyePosition({ x, y });
    };

    const handleMouseLeave = () => {
      // Volver el ojo al centro cuando el ratón sale
      setEyePosition({ x: 0, y: 0 });
    };

    // Agregar listeners al documento
    document.addEventListener("mousemove", handleMouseMove);

    // Agregar listener específico al botón para resetear cuando sale
    const button = buttonRef.current;
    if (button) {
      button.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (button) {
        button.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <Button
      asChild
      variant="outline"
      size="lg"
      className="group relative font-semibold text-lg hover:bg-accent/30 transition-all duration-300 hover:-translate-y-1"
    >
      <Link href="/portfolio" ref={buttonRef}>
        <span
          className="inline-block transition-transform duration-150 ease-out"
          style={{
            transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`
          }}
        >
          👁️
        </span>
        <span className="ml-2">Ver Portfolio</span>
        <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
          →
        </span>
      </Link>
    </Button>
  );
}

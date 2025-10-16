"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function EyeFollowButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const lastMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePupilPosition = () => {
      if (!buttonRef.current) return;

      const button = buttonRef.current;
      const rect = button.getBoundingClientRect();

      // Calcular el centro del botón
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      // Calcular la posición del ratón relativa al centro del botón
      const deltaX = lastMousePosition.current.x - buttonCenterX;
      const deltaY = lastMousePosition.current.y - buttonCenterY;

      // Calcular el ángulo y la distancia
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(
        Math.sqrt(deltaX * deltaX + deltaY * deltaY),
        60 // Límite máximo de movimiento del ojo (60px)
      );

      // Convertir a coordenadas x, y para la pupila
      // La pupila se mueve dentro del ojo, limitada por el radio del ojo
      const maxPupilMovement = 8; // Máximo movimiento de la pupila en píxeles
      const x = Math.cos(angle) * (distance / 60) * maxPupilMovement;
      const y = Math.sin(angle) * (distance / 60) * maxPupilMovement;

      setPupilPosition({ x, y });
      animationFrameRef.current = undefined;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Actualizar la posición del ratón
      lastMousePosition.current = { x: e.clientX, y: e.clientY };

      // Solo programar una actualización si no hay una pendiente
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updatePupilPosition);
      }
    };

    const handleMouseLeave = () => {
      // Cancelar cualquier animación pendiente
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
      // Volver la pupila al centro cuando el ratón sale
      setPupilPosition({ x: 0, y: 0 });
    };

    // Agregar listeners al documento
    document.addEventListener("mousemove", handleMouseMove, { passive: true });

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
      // Limpiar cualquier animación pendiente
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
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
        {/* Ojo 3D personalizado */}
        <div className="relative inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2">
          {/* Ojo exterior con efecto 3D */}
          <div 
            className="absolute inset-0 rounded-full border-2 border-primary/30 dark:border-primary/50"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 20%, rgba(220,220,220,0.7) 40%, rgba(180,180,180,0.9) 100%),
                linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,245,245,0.8) 50%, rgba(225,225,225,0.95) 100%)
              `,
              boxShadow: `
                inset 0 2px 4px rgba(0,0,0,0.1),
                inset 0 -2px 4px rgba(255,255,255,0.4),
                0 2px 8px rgba(var(--primary-rgb), 0.2),
                0 4px 12px rgba(var(--primary-rgb), 0.1),
                var(--shadow-3d-sm)
              `,
              transform: 'perspective(100px) rotateX(5deg) rotateY(-2deg)'
            }}
          />
          
          {/* Pupila que sigue el ratón */}
          <div 
            className="absolute top-1/2 left-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-transform duration-150 ease-out"
            style={{
              transform: `translate(calc(-50% + ${pupilPosition.x}px), calc(-50% + ${pupilPosition.y}px))`,
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.9) 100%),
                linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(30,30,30,0.9) 100%)
              `,
              boxShadow: `
                inset 0 1px 2px rgba(255,255,255,0.4),
                inset 0 -1px 2px rgba(0,0,0,0.6),
                0 1px 3px rgba(0,0,0,0.4),
                0 0 4px rgba(var(--primary-rgb), 0.3)
              `
            }}
          />
          
          {/* Reflejo en la pupila */}
          <div 
            className="absolute top-1/2 left-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-transform duration-150 ease-out"
            style={{
              transform: `translate(calc(-50% + ${pupilPosition.x * 0.3}px), calc(-50% + ${pupilPosition.y * 0.3}px))`,
              background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 100%)',
              boxShadow: '0 0 2px rgba(255,255,255,0.9), 0 0 4px rgba(255,255,255,0.5)'
            }}
          />
        </div>
        
        <span className="ml-2">Ver Portfolio</span>
        <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
          →
        </span>
      </Link>
    </Button>
  );
}

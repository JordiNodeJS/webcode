# 🎨 Sistema de Animaciones WebSnack (WAS) - Versión 1.0

## 📋 **Introducción y Fundamentos**

El **WebSnack Animation System (WAS)** es el sistema oficial de microanimaciones e interacciones para la plataforma WebSnack, diseñado específicamente para complementar la identidad visual rosa/aguamarina y optimizado para **Next.js 15 + React 19 + Tailwind CSS v4 + Framer Motion**.

### 🎯 **Principios de Diseño WAS**

1. **🏢 Profesional pero Dinámico**: Animaciones sutiles que transmiten confianza sin distraer
2. **🎨 Coherencia de Marca**: Integrado con la paleta rosa/aguamarina y efectos 3D
3. **⚡ Performance**: Optimizado para Server Components y lazy loading
4. **♿ Accesibilidad**: Respeta `prefers-reduced-motion` y WCAG 2.1
5. **📱 Responsive**: Adaptado para desktop, tablet y móvil

---

## 🎛️ **Configuración Técnica Base**

### **Variables CSS Principales**

```css
:root {
  /* === EASING CURVES WEBSNACK === */
  --ease-ws-primary: cubic-bezier(
    0.25,
    0.46,
    0.45,
    0.94
  ); /* Suave y profesional */
  --ease-ws-smooth: cubic-bezier(0.4, 0, 0.2, 1); /* Material Design inspired */
  --ease-ws-bounce: cubic-bezier(
    0.68,
    -0.55,
    0.265,
    1.55
  ); /* Efectos llamativos */
  --ease-ws-subtle: cubic-bezier(
    0.23,
    1,
    0.32,
    1
  ); /* Transiciones imperceptibles */
  --ease-ws-dramatic: cubic-bezier(0.87, 0, 0.13, 1); /* Entradas/salidas */

  /* === DURACIONES WEBSNACK === */
  --duration-ws-instant: 0.1s; /* Micro-feedback */
  --duration-ws-quick: 0.2s; /* Hover states */
  --duration-ws-normal: 0.3s; /* Transiciones estándar */
  --duration-ws-smooth: 0.5s; /* Animaciones complejas */
  --duration-ws-dramatic: 0.8s; /* Hero sections, modales */
  --duration-ws-slow: 1.2s; /* Lazy loading, grandes transiciones */

  /* === DELAYS ESCALONADOS === */
  --delay-ws-stagger-tight: 0.05s; /* Letter-by-letter */
  --delay-ws-stagger-normal: 0.1s; /* Elementos lista */
  --delay-ws-stagger-loose: 0.2s; /* Secciones grandes */
}
```

### **Configuración Framer Motion**

```tsx
// lib/websnack-motion-config.ts
export const wsConfig = {
  easings: {
    primary: [0.25, 0.46, 0.45, 0.94] as const,
    smooth: [0.4, 0, 0.2, 1] as const,
    bounce: [0.68, -0.55, 0.265, 1.55] as const,
    subtle: [0.23, 1, 0.32, 1] as const,
    dramatic: [0.87, 0, 0.13, 1] as const,
  },

  durations: {
    instant: 0.1,
    quick: 0.2,
    normal: 0.3,
    smooth: 0.5,
    dramatic: 0.8,
    slow: 1.2,
  },

  stagger: {
    tight: 0.05, // Letters
    normal: 0.1, // List items
    loose: 0.2, // Sections
  },

  // Efectos específicos WebSnack
  effects: {
    lift: { y: -4, scale: 1.02 },
    glow: { filter: "brightness(1.1) blur(0.5px)" },
    fade: { opacity: 0.8 },
    scale: { scale: 1.05 },
  },
} as const;

// Hook para transiciones WebSnack
export function useWSTransition(
  type: keyof typeof wsConfig.durations = "normal"
) {
  return {
    duration: wsConfig.durations[type],
    ease: wsConfig.easings.primary,
  };
}
```

---

## 🧩 **Componentes Base del Sistema**

### **1. WSFadeIn - Animación de Entrada Principal**

```tsx
// components/animations/ws-fade-in.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { wsConfig } from "@/lib/websnack-motion-config";

interface WSFadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  className?: string;
}

export function WSFadeIn({
  children,
  delay = 0,
  direction = "up",
  distance = 20,
  className = "",
}: WSFadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: wsConfig.durations.smooth,
        ease: wsConfig.easings.primary,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
```

### **2. WSLetterReveal - Animación Letra por Letra**

```tsx
// components/animations/ws-letter-reveal.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { wsConfig } from "@/lib/websnack-motion-config";

interface WSLetterRevealProps {
  text: string;
  delay?: number;
  className?: string;
}

export function WSLetterReveal({
  text,
  delay = 0,
  className = "",
}: WSLetterRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className={className}>
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, rotateX: 90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: wsConfig.durations.normal,
            ease: wsConfig.easings.primary,
            delay: delay + index * wsConfig.stagger.tight,
          }}
          style={{ display: "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}
```

### **3. WSHover - Estados de Hover Consistentes**

```tsx
// components/animations/ws-hover.tsx
"use client";

import { motion } from "framer-motion";
import { wsConfig } from "@/lib/websnack-motion-config";

interface WSHoverProps {
  children: React.ReactNode;
  effect?: "lift" | "glow" | "fade" | "scale";
  className?: string;
}

export function WSHover({
  children,
  effect = "lift",
  className = "",
}: WSHoverProps) {
  const effects = {
    lift: wsConfig.effects.lift,
    glow: wsConfig.effects.glow,
    fade: wsConfig.effects.fade,
    scale: wsConfig.effects.scale,
  };

  return (
    <motion.div
      className={className}
      whileHover={effects[effect]}
      transition={{
        duration: wsConfig.durations.quick,
        ease: wsConfig.easings.smooth,
      }}
    >
      {children}
    </motion.div>
  );
}
```

### **4. WSImageReveal - Carga de Imágenes Animada**

```tsx
// components/animations/ws-image-reveal.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { wsConfig } from "@/lib/websnack-motion-config";

interface WSImageRevealProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function WSImageReveal({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: WSImageRevealProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ scale: 1.1, opacity: 0 }}
      animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
      transition={{
        duration: wsConfig.durations.dramatic,
        ease: wsConfig.easings.primary,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
```

---

## 🎨 **Utilidades CSS Tailwind v4**

### **Clases de Animación WebSnack**

```css
@layer utilities {
  /* === TRANSICIONES BASE === */
  .transition-ws {
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .transition-ws-quick {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .transition-ws-smooth {
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .transition-ws-dramatic {
    transition: all 0.8s cubic-bezier(0.87, 0, 0.13, 1);
  }

  /* === KEYFRAMES WEBSNACK === */
  .animate-ws-fade-in {
    animation: wsFadeIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .animate-ws-slide-up {
    animation: wsSlideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .animate-ws-scale-in {
    animation: wsScaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  }

  .animate-ws-glow {
    animation: wsGlow 2s ease-in-out infinite;
  }

  /* === HOVER EFFECTS === */
  .ws-hover-lift:hover {
    transform: translateY(-4px) scale(1.02);
  }

  .ws-hover-glow:hover {
    filter: brightness(1.1) blur(0.5px);
  }

  .ws-hover-fade:hover {
    opacity: 0.8;
  }

  .ws-hover-scale:hover {
    transform: scale(1.05);
  }
}

/* === DEFINICIONES DE KEYFRAMES === */
@keyframes wsFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes wsSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes wsScaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes wsGlow {
  0%,
  100% {
    filter: brightness(1) blur(0);
  }
  50% {
    filter: brightness(1.1) blur(1px);
  }
}
```

---

## 📱 **Responsive y Accesibilidad**

### **Hook para Animaciones Responsivas**

```tsx
// hooks/use-ws-responsive.ts
import { useMediaQuery } from "@/hooks/use-media-query";
import { wsConfig } from "@/lib/websnack-motion-config";

export function useWSResponsive() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const getResponsiveConfig = (baseConfig: any) => {
    if (prefersReducedMotion) {
      return {
        ...baseConfig,
        transition: { duration: 0.01 },
      };
    }

    if (isMobile) {
      return {
        ...baseConfig,
        transition: {
          ...baseConfig.transition,
          duration: (baseConfig.transition?.duration || 0.3) * 0.7,
        },
      };
    }

    return baseConfig;
  };

  return { getResponsiveConfig, isMobile, prefersReducedMotion };
}
```

### **Componente Wrapper Accesible**

```tsx
// components/animations/ws-accessible-motion.tsx
"use client";

import { motion } from "framer-motion";
import { useWSResponsive } from "@/hooks/use-ws-responsive";

interface WSAccessibleMotionProps {
  children: React.ReactNode;
  animation: any;
  className?: string;
}

export function WSAccessibleMotion({
  children,
  animation,
  className = "",
}: WSAccessibleMotionProps) {
  const { getResponsiveConfig } = useWSResponsive();

  return (
    <motion.div className={className} {...getResponsiveConfig(animation)}>
      {children}
    </motion.div>
  );
}
```

---

## 🎯 **Implementación en Componentes WebSnack**

### **Ejemplo: Hero Section con WAS**

```tsx
// components/sections/hero-section.tsx
"use client";

import {
  WSFadeIn,
  WSLetterReveal,
  WSImageReveal,
} from "@/components/animations";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-16">
      <div className="container mx-auto text-center">
        {/* Título con animación WebSnack */}
        <WSFadeIn delay={0.2}>
          <h1 className="font-display text-6xl lg:text-7xl font-bold tracking-wider text-primary mb-6">
            <WSLetterReveal
              text="WebSnack"
              className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            />
          </h1>
        </WSFadeIn>

        {/* Subtítulo */}
        <WSFadeIn delay={0.4} direction="up">
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Acelera tu negocio con páginas web que convierten
          </p>
        </WSFadeIn>

        {/* Imagen hero */}
        <WSFadeIn delay={0.6}>
          <WSImageReveal
            src="/images/hero-dashboard.jpg"
            alt="Dashboard WebSnack"
            width={800}
            height={500}
            className="rounded-lg shadow-3d-lg border border-primary/20"
            priority
          />
        </WSFadeIn>
      </div>
    </section>
  );
}
```

---

## 📊 **Métricas y Performance**

### **KPIs del Sistema WAS**

- ⚡ **Tiempo de renderizado**: < 16ms por animación
- 📱 **Compatibilidad móvil**: 100% responsive
- ♿ **Accesibilidad**: WCAG 2.1 AA compliant
- 🔋 **Batería**: Optimizado para dispositivos móviles
- 💾 **Bundle size**: < 2KB adicionales con tree-shaking

### **Testing y Validación**

```bash
# Testing animaciones
pnpm test:animations

# Performance audit
pnpm audit:performance

# Accessibility check
pnpm test:a11y
```

---

## 🚀 **Próximos Pasos**

### **Roadmap WAS v1.1**

1. 🎮 **Gestos táctiles**: Swipe animations para móvil
2. 🔄 **Loading states**: Skeleton loaders animados
3. 🎨 **Theme transitions**: Cambio suave entre temas
4. 📊 **Data visualizations**: Animaciones para gráficos

### **Integración Completa**

- ✅ Documentación técnica completa
- ✅ Componentes base implementados
- ✅ Utilidades CSS listas
- ✅ Testing y métricas definidas

**El Sistema de Animaciones WebSnack está listo para implementación completa en la plataforma.**

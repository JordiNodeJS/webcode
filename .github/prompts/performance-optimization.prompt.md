# Prompt: Optimización de Performance - WebSnack

## **Contexto y Objetivo**

Desarrollar y mantener una landing page de servicios de desarrollo web con **UNA SOLA PÁGINA** optimizada para máxima performance, conversión y experiencia de usuario. Este prompt establece las técnicas obligatorias para garantizar que todos los componentes cumplan con los estándares de performance modernos.

## **Alcance**

- **Code splitting** y lazy loading inteligente
- **Optimización de imágenes** con Next.js Image
- **CSS crítico** vs no crítico
- **Web Vitals** y métricas de performance
- **Mobile-first** y conexiones lentas
- **Bundle analysis** y monitoreo continuo

---

## **Requisitos Técnicos Obligatorios**

### **Code Splitting y Lazy Loading**

```typescript
// ✅ OBLIGATORIO: Dynamic imports para componentes no críticos
import dynamic from 'next/dynamic';

const CaseStudiesSection = dynamic(() => import('./CaseStudiesSection'), {
  loading: () => <Skeleton />,
  ssr: false // Solo si no es crítico para SEO
});

// ✅ OBLIGATORIO: Intersection Observer
import { useInView } from 'react-intersection-observer';

function ExpensiveSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '100px' // Cargar 100px antes de ser visible
  });

  return (
    <section ref={ref}>
      {inView ? <HeavyComponent /> : <LoadingSkeleton />}
    </section>
  );
}
```

### **Estructura de Carga por Fases**

#### **Fase 1: Above the Fold (Crítico)**
```typescript
// Máximo 85KB de JS inicial - Carga en <1s
const CriticalComponents = [
  'HeroSection',      // 45KB
  'Navigation',       // 8KB
  'QuickStartSection' // 32KB
];
```

#### **Fase 2: Below the Fold (Diferido)**
```typescript
// Carga progresiva según scroll
const DeferredComponents = [
  'CaseStudiesSection', // 67KB
  'TechStackSection',   // 45KB
  'PricingSection',     // 38KB
  'ContactSection'      // 25KB
];

// ✅ OBLIGATORIO: Suspense boundaries
<Suspense fallback={<SectionSkeleton />}>
  <CaseStudiesSection />
</Suspense>
```

### **Optimización de Imágenes**

```typescript
// ✅ OBLIGATORIO: Next.js Image con lazy loading
import Image from 'next/image';

// Above the fold - Carga prioritaria
<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Solo para above the fold
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// Below the fold - Lazy loading automático
<Image
  src="/case-study.jpg"
  alt="Case Study"
  width={800}
  height={400}
  loading="lazy" // Automático
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### **CSS Crítico vs No Crítico**

```css
/* ✅ OBLIGATORIO: CSS crítico inline en <head> */
.hero, .navigation, .quick-start {
  /* Solo estilos esenciales para above the fold */
}

/* ✅ OBLIGATORIO: CSS no crítico con carga diferida */
@import url('./non-critical.css') media="print" onload="this.media='all'";
```

---

## **Performance Targets Obligatorios**

### **Web Vitals**
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1
- **TTFB (Time to First Byte)**: <600ms

### **Bundle Size**
- **First Load**: <150KB JS inicial
- **Total Bundle**: <500KB (con lazy loading)
- **Images**: WebP/AVIF con fallbacks

### **Mobile Performance**
- **3G Connection**: Funcional en conexiones lentas
- **Touch Response**: <100ms
- **Scroll Performance**: 60fps

---

## **Implementación por Componente**

### **Template para Componentes Nuevos**

```typescript
// ✅ OBLIGATORIO: Estructura base para cada componente
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';

interface ComponentProps {
  // Props específicas
}

export function ComponentName({ ...props }: ComponentProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '100px'
  });

  return (
    <section ref={ref} className="py-16">
      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Contenido del componente */}
        </motion.div>
      ) : (
        <div className="h-96 bg-muted animate-pulse rounded-lg" />
      )}
    </section>
  );
}
```

### **Detección de Conexión Lenta**

```typescript
// ✅ OBLIGATORIO: Optimización para conexiones lentas
const [isSlowConnection, setIsSlowConnection] = useState(false);

useEffect(() => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    setIsSlowConnection(
      connection.effectiveType === 'slow-2g' || 
      connection.effectiveType === '2g'
    );
  }
}, []);

// Renderizar menos contenido en conexiones lentas
{!isSlowConnection && <HeavyAnimationComponent />}
```

---

## **Monitoreo y Verificación**

### **Bundle Analysis**

```bash
# ✅ OBLIGATORIO: Análisis después de cada cambio
pnpm dlx @next/bundle-analyzer

# Verificar:
# - Tamaño inicial < 150KB
# - Code splitting funcionando
# - No duplicación de dependencias
```

### **Web Vitals Monitoring**

```typescript
// ✅ OBLIGATORIO: Monitoreo de métricas
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// En _app.tsx o layout.tsx
useEffect(() => {
  getCLS(console.log);
  getFID(console.log);
  getFCP(console.log);
  getLCP(console.log);
  getTTFB(console.log);
}, []);
```

### **Lighthouse Testing**

```bash
# ✅ OBLIGATORIO: Score >90 en todas las métricas
npx lighthouse http://localhost:3000 --view

# Verificar:
# - Performance: >90
# - Accessibility: >90
# - Best Practices: >90
# - SEO: >90
```

---

## **Flujo de Trabajo / Implementación**

### **Pasos Estándar**

1. **Desarrollo**: Implementar componente con lazy loading
2. **Testing**: Verificar bundle size y Web Vitals
3. **Optimización**: Ajustar según métricas
4. **Deploy**: Monitorear performance en producción

### **Criterios de Aceptación**

- ✅ **Code splitting** implementado en componentes >30KB
- ✅ **Lazy loading** con Intersection Observer
- ✅ **Images optimizadas** con Next.js Image
- ✅ **CSS crítico** inline, no crítico diferido
- ✅ **Web Vitals** < targets establecidos
- ✅ **Bundle size** < 150KB inicial
- ✅ **Mobile performance** verificada
- ✅ **Fallbacks** para todos los lazy components
- ✅ **Conexión lenta** detection implementada

---

## **Estructura de Archivos Requerida**

```
src/
├── components/
│   ├── landing/
│   │   ├── hero/ (crítico - 45KB)
│   │   ├── services/ (crítico - 32KB)
│   │   ├── process/ (diferido - 28KB)
│   │   ├── cases/ (diferido - 67KB)
│   │   └── contact/ (diferido - 25KB)
│   └── ui/ (crítico - 15KB)
├── hooks/
│   ├── use-in-view.ts
│   ├── use-performance.ts
│   └── use-slow-connection.ts
└── lib/
    ├── performance.ts
    ├── web-vitals.ts
    └── bundle-analysis.ts
```

---

**Nota**: Este prompt es **obligatorio** para todos los desarrollos de la landing page WebSnack. La performance es crítica para la conversión y experiencia de usuario. Siempre verificar métricas antes de hacer deploy a producción.






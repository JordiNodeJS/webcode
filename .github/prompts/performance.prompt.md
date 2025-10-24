# Prompt: Performance y Optimización - WebCode

## **Contexto y Objetivo**

Prompt consolidado para optimización de rendimiento, Core Web Vitals, animaciones performantes y mejores prácticas de performance en Next.js 15 + React 19.

---

## **1. CORE WEB VITALS**

### **Métricas Objetivo WebCode**

| Métrica                            | Objetivo | Bueno   | Aceptable     | Pobre   |
| ---------------------------------- | -------- | ------- | ------------- | ------- |
| **LCP** (Largest Contentful Paint) | < 2.5s   | < 2.5s  | 2.5s - 4.0s   | > 4.0s  |
| **FID** (First Input Delay)        | < 100ms  | < 100ms | 100ms - 300ms | > 300ms |
| **CLS** (Cumulative Layout Shift)  | < 0.1    | < 0.1   | 0.1 - 0.25    | > 0.25  |
| **FCP** (First Contentful Paint)   | < 1.8s   | < 1.8s  | 1.8s - 3.0s   | > 3.0s  |
| **TTFB** (Time to First Byte)      | < 600ms  | < 600ms | 600ms - 1.5s  | > 1.5s  |

### **Estrategias de Optimización**

#### **A) Optimizar LCP (Largest Contentful Paint)**

```tsx
import Image from 'next/image';

// ✅ Priorizar imagen hero above-the-fold
<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority // ← Carga con alta prioridad
  placeholder="blur"
  blurDataURL="data:image/..."
/>

// ✅ Precargar recursos críticos
<link rel="preload" href="/fonts/poppins.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
```

#### **B) Optimizar FID (First Input Delay)**

```tsx
"use client";

import { useEffect, useState } from "react";

// ✅ Diferir JavaScript no crítico
export function HeavyComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Cargar lógica pesada después del render inicial
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton />;

  return <ComplexInteractiveComponent />;
}
```

#### **C) Optimizar CLS (Cumulative Layout Shift)**

```tsx
// ✅ Reservar espacio para imágenes
<div className="relative aspect-video w-full">
  <Image
    src="/image.jpg"
    alt="Content"
    fill
    className="object-cover"
  />
</div>

// ✅ Reservar espacio para contenido dinámico
<div className="min-h-[200px]">
  {isLoading ? <Skeleton height={200} /> : <DynamicContent />}
</div>

// ✅ Evitar insertar contenido sobre existing content
// ❌ Banners que empujan contenido hacia abajo
// ✅ Banners con posición fixed/absolute
```

---

## **2. OPTIMIZACIÓN DE IMÁGENES**

### **Next.js Image Component**

```tsx
import Image from "next/image";

// Imagen optimizada con tamaños responsivos
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={85}
  priority={isAboveFold}
  placeholder="blur"
/>;
```

### **Formatos Modernos**

```typescript
// next.config.ts
const config: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"], // Formatos modernos
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  }
};
```

### **Lazy Loading Inteligente**

```tsx
// ✅ Lazy load para imágenes below-the-fold
<Image
  src="/below-fold.jpg"
  alt="Content"
  width={800}
  height={600}
  loading="lazy" // Por defecto en next/image
/>

// ✅ Eager para above-the-fold
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  loading="eager"
  priority
/>
```

---

## **3. OPTIMIZACIÓN DE JAVASCRIPT**

### **Code Splitting**

```tsx
import dynamic from "next/dynamic";

// ✅ Lazy load de componentes pesados
const HeavyChart = dynamic(() => import("@/components/HeavyChart"), {
  loading: () => <ChartSkeleton />,
  ssr: false // No renderizar en servidor si no es necesario
});

// ✅ Lazy load con named export
const SpecificComponent = dynamic(() =>
  import("@/components/Module").then((mod) => mod.SpecificComponent)
);
```

### **Tree Shaking**

```tsx
// ❌ Importación completa de librería
import _ from "lodash";

// ✅ Importación específica
import debounce from "lodash/debounce";

// ❌ Importación de todo el icono pack
import * as Icons from "lucide-react";

// ✅ Importación específica
import { Search, Menu, X } from "lucide-react";
```

### **Bundle Analysis**

```bash
# Analizar bundle size
ANALYZE=true pnpm build

# Ver reporte en navegador
# Abre: .next/analyze/client.html
```

---

## **4. OPTIMIZACIÓN DE FUENTES**

### **Google Fonts con next/font**

```tsx
// app/layout.tsx
import { Poppins, Space_Grotesk } from "next/font/google";

// ✅ Optimización automática de fuentes
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap" // FOUT (Flash of Unstyled Text) pero mejor performance
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true // Precargar fuente crítica
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${poppins.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

### **Font Subsetting**

```tsx
// Cargar solo los caracteres necesarios para español
const font = Poppins({
  subsets: ["latin", "latin-ext"]
  // Excluir caracteres no usados reduce tamaño
});
```

---

## **5. OPTIMIZACIÓN DE CSS**

### **Tailwind CSS Purging**

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}" // Purge CSS no usado
  ]
  // ...resto config
};
```

### **Critical CSS**

```tsx
// app/layout.tsx
import "../styles/critical.css"; // CSS crítico inline

// CSS no crítico con lazy load
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>{/* Critical CSS ya está inline */}</head>
      <body>{children}</body>
    </html>
  );
}
```

---

## **6. ANIMACIONES PERFORMANTES**

### **Principios de Animaciones de 60fps**

**✅ Propiedades GPU-accelerated (baratas):**

- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (blur, brightness, etc.)

**❌ Propiedades que fuerzan reflow/repaint (caras):**

- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `border`

### **Ejemplos con Framer Motion**

```tsx
import { motion } from 'framer-motion';

// ✅ Animación performante (solo transform y opacity)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
>
  Contenido
</motion.div>

// ❌ Evitar animar width/height
<motion.div
  initial={{ width: 0 }}      // ❌ Causa reflow
  animate={{ width: '100%' }}  // ❌ Causa reflow
>

// ✅ Usar scale en su lugar
<motion.div
  initial={{ scaleX: 0 }}      // ✅ GPU-accelerated
  animate={{ scaleX: 1 }}      // ✅ GPU-accelerated
  style={{ transformOrigin: 'left' }}
>
```

### **will-change para Optimización**

```tsx
// ✅ Avisar al navegador de animaciones futuras
<motion.div className="will-change-transform" animate={{ x: 100 }}>
  Elemento animado
</motion.div>

// ⚠️ No abusar de will-change (consume memoria)
// Solo usar en elementos que se animan frecuentemente
```

### **Reducción de Movimiento (A11y)**

```tsx
"use client";

import { useReducedMotion } from "framer-motion";

export function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { x: 100, opacity: 1 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
    >
      Contenido
    </motion.div>
  );
}
```

---

## **7. OPTIMIZACIÓN DE DATA FETCHING**

### **Server Components (Fetch en Servidor)**

```tsx
// ✅ Fetch en Server Component (no impacta bundle JS del cliente)
export default async function BlogPage() {
  const posts = await fetch("https://api.example.com/posts", {
    cache: "force-cache", // ISR: cache estático
    next: { revalidate: 3600 } // Revalidar cada hora
  }).then((res) => res.json());

  return <PostsList posts={posts} />;
}
```

### **Parallel Data Fetching**

```tsx
// ✅ Fetch paralelo para mejorar tiempo de carga
export default async function DashboardPage() {
  const [users, orders, stats] = await Promise.all([
    fetch("/api/users").then((res) => res.json()),
    fetch("/api/orders").then((res) => res.json()),
    fetch("/api/stats").then((res) => res.json())
  ]);

  return <Dashboard users={users} orders={orders} stats={stats} />;
}
```

### **Streaming con Suspense**

```tsx
import { Suspense } from "react";

// ✅ Streaming de contenido lento
export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<PostsSkeleton />}>
        <SlowPostsList />
      </Suspense>
      <Footer />
    </>
  );
}

async function SlowPostsList() {
  const posts = await fetchSlowData();
  return <PostsList posts={posts} />;
}
```

---

## **8. CACHING STRATEGIES**

### **Next.js 15 Cache Options**

```tsx
// Static (ISG - Incremental Static Generation)
fetch("/api/data", {
  cache: "force-cache",
  next: { revalidate: 3600 } // Revalidar cada hora
});

// Dynamic (SSR - Server Side Rendering)
fetch("/api/data", {
  cache: "no-store" // Sin caché, siempre fresco
});

// Revalidate on-demand
// En route handler:
import { revalidatePath } from "next/cache";
revalidatePath("/blog");
```

### **Client-Side Caching**

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";

// ✅ React Query para caching inteligente en cliente
export function UserProfile() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetch("/api/user").then((res) => res.json()),
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 10 * 60 * 1000 // 10 minutos
  });

  if (isLoading) return <Skeleton />;
  return <Profile data={data} />;
}
```

---

## **9. MONITORING Y DEBUGGING**

### **Lighthouse CI**

```bash
# Correr Lighthouse audit
pnpm dlx lighthouse http://localhost:3000 --view

# Lighthouse CI en GitHub Actions
# Ver: .github/workflows/lighthouse.yml
```

### **Web Vitals Tracking**

```tsx
// app/layout.tsx
"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitalsTracker() {
  useReportWebVitals((metric) => {
    // Enviar a analytics
    console.log(metric);

    // Ejemplo: enviar a Google Analytics
    window.gtag?.("event", metric.name, {
      value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value
      ),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta
    });
  });

  return null;
}
```

### **Chrome DevTools MCP**

```typescript
// Usar MCP para análisis automatizado
const insights =
  (await mcp_chrome) -
  devtool_performance_start_trace({
    reload: true,
    autoStop: true
  });

// Analizar insights específicos
const lcpBreakdown =
  (await mcp_chrome) -
  devtool_performance_analyze_insight({
    insightName: "LCPBreakdown"
  });
```

---

## **10. CHECKLIST DE PERFORMANCE**

### **Pre-deployment**

- [ ] Lighthouse score > 90 (Desktop) y > 85 (Mobile)
- [ ] LCP < 2.5s en 75th percentile
- [ ] CLS < 0.1
- [ ] FID < 100ms
- [ ] Bundle size JavaScript < 200KB (gzipped)
- [ ] Todas las imágenes optimizadas (WebP/AVIF)
- [ ] Fuentes precargadas y optimizadas
- [ ] Critical CSS inline
- [ ] Code splitting aplicado
- [ ] Tree shaking verificado

### **Post-deployment**

- [ ] Monitoreo de Web Vitals en producción
- [ ] Error tracking configurado (Sentry/similar)
- [ ] Performance budget establecido
- [ ] Alertas de regresión configuradas

---

## **11. TROUBLESHOOTING**

### **LCP Alto**

```bash
# Identificar elemento LCP
# Chrome DevTools > Performance > Experience > LCP

# Soluciones:
# 1. Priorizar recurso LCP (priority, preload)
# 2. Optimizar imagen (formato, tamaño)
# 3. Reducir TTFB (CDN, caching)
# 4. Eliminar render-blocking resources
```

### **CLS Alto**

```bash
# Identificar shifts
# Chrome DevTools > Performance > Experience > Layout Shifts

# Soluciones:
# 1. Reservar espacio para imágenes/videos (aspect-ratio)
# 2. Especificar dimensiones en elementos dinámicos
# 3. Evitar insertar contenido sobre existing content
# 4. Usar transform en lugar de top/left
```

### **JavaScript Bundle Grande**

```bash
# Analizar bundle
ANALYZE=true pnpm build

# Soluciones:
# 1. Dynamic imports para rutas/componentes
# 2. Tree shaking (importaciones específicas)
# 3. Remover dependencias no usadas
# 4. Usar alternativas más ligeras
```

---

## **REFERENCIAS**

- Web Vitals: https://web.dev/vitals/
- Next.js Performance: https://nextjs.org/docs/app/building-your-application/optimizing
- Framer Motion Performance: https://www.framer.com/motion/guide-reduce-bundle-size/
- Chrome DevTools Protocol: https://chromedevtools.github.io/devtools-protocol/

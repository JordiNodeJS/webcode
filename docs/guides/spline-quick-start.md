# 🎬 Integración Spline - Guía Rápida

> Escenas 3D interactivas en Next.js 16 con Spline

## 🚀 Uso Rápido

```tsx
import dynamic from "next/dynamic";
import { SPLINE_SCENES } from "@/lib/spline-paths";

// ⚠️ IMPORTANTE: Usar dynamic import para Client Components
const SplineBackground = dynamic(
  () => import("@/components/custom/SplineBackground").then((mod) => mod.SplineBackground),
  { ssr: false }
);

// Fondo responsive (más común)
<SplineBackground 
  scene={SPLINE_SCENES.MAIN} 
  preset="BACKGROUND_RESPONSIVE" 
/>

// Hero section
<SplineBackground 
  scene={SPLINE_SCENES.KEYBOARD} 
  preset="HERO" 
/>
```

## 📦 Presets Disponibles

- `BACKGROUND` - Fondo fullscreen centrado (NO interactivo)
- `BACKGROUND_RESPONSIVE` - Fondo con desplazamiento responsive (NO interactivo)
- `HERO` - Hero section centrado
- `SIDEBAR` - Sidebar pequeño
- `MODAL` - Modal centrado

## 🎯 Arquitectura de Capas Correcta

```tsx
import dynamic from "next/dynamic";
import { SPLINE_SCENES } from "@/lib/spline-paths";

const SplineBackground = dynamic(
  () => import("@/components/custom/SplineBackground").then((mod) => mod.SplineBackground),
  { ssr: false }
);

export default function Page() {
  return (
    <div className="relative min-h-screen">
      {/* z-0: Escena 3D */}
      <SplineBackground 
        scene={SPLINE_SCENES.MAIN}
        preset="BACKGROUND_RESPONSIVE"
        className="fixed inset-0 z-0"
      />

      {/* z-1: Overlay (pointer-events-none) */}
      <div className="fixed left-0 top-0 bottom-0 w-1/2 bg-linear-to-r from-black/60 to-transparent z-1 pointer-events-none" />

      {/* z-10: Contenido */}
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <h1>Título</h1>
          <button>Click</button>
        </div>
      </div>
    </div>
  );
}
```
```

## ⚠️ Importante: pointer-events

```tsx
// ✅ Correcto
<div className="pointer-events-none">        {/* Container */}
  <button className="pointer-events-auto">  {/* Elemento interactivo */}
    Click
  </button>
</div>

// ❌ Incorrecto - Bloqueará la escena
<div>
  <button>Click</button>
</div>
```

## 📚 Documentación Completa

Ver: `docs/guides/spline-integration.md`

## 🔗 Referencias

- Tutorial: https://spline.webcode.es/guia-spline
- Implementación: `src/app/(hero)/soluciones/page.tsx`
- Componente: `src/components/custom/SplineBackground.tsx`

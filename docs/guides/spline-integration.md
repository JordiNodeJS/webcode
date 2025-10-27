# 🎬 Guía de Integración Spline en WEBCODE

> **Documentación completa de integración de escenas 3D con Spline en Next.js 16**  
> **Tutorial oficial**: https://spline.webcode.es/guia-spline  
> **Última actualización**: 2025-10-26

---

## 📋 Tabla de Contenidos

- [Introducción](#-introducción)
- [Instalación](#-instalación)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Componente SplineBackground](#-componente-splinebackground)
- [Casos de Uso](#-casos-de-uso)
- [Mejores Prácticas](#-mejores-prácticas)
- [Solución de Problemas](#-solución-de-problemas)

---

## 🎯 Introducción

Spline es una herramienta de diseño 3D que permite crear experiencias interactivas directamente en el navegador. Este proyecto implementa un sistema completo para integrar escenas de Spline en Next.js 16 siguiendo las mejores prácticas del tutorial oficial.

### Características Principales

✅ **Sistema de presets reutilizables** - 5 configuraciones predefinidas  
✅ **Gestión automática de estados** - Loading, error handling y reintentos  
✅ **Arquitectura de capas correcta** - Z-index y pointer-events optimizados  
✅ **TypeScript completo** - Tipado fuerte para todas las configuraciones  
✅ **Accesibilidad incluida** - ARIA labels, reduced motion, screen readers  
✅ **Performance optimizado** - Lazy loading y manejo eficiente de recursos

---

## 📦 Instalación

### Dependencias

```bash
# Instalar Spline React
pnpm add @splinetool/react-spline
```

### Archivos Creados

```
src/
├── lib/
│   ├── spline-paths.ts        # ✅ Rutas centralizadas de escenas
│   └── spline-styles.ts       # ✅ Sistema de estilos y presets
└── components/
    └── custom/
        └── SplineBackground.tsx # ✅ Componente reutilizable
```

---

## 🏗️ Arquitectura del Sistema

### Estructura de Archivos

#### 1. **spline-paths.ts** - Registro de Escenas

```typescript
export const SPLINE_SCENES = {
  KEYBOARD: "/scenes/keyboard-scene.splinecode",
  MAIN: "/scenes/scene.splinecode",
  SCENE_1: "/scenes/scene-1.splinecode",
  SCENE_3: "/scenes/scene-3.splinecode",
} as const;
```

#### 2. **spline-styles.ts** - Sistema de Estilos

Define:
- **Container Presets**: 5 tipos de contenedores (fixed, absolute, relative)
- **Position Presets**: 6 posiciones predefinidas (center, corners, responsive)
- **Size Presets**: 5 tamaños (small → extra large)
- **Scale Presets**: 5 escalas (0.8x → 1.5x + responsive)
- **Presets Completos**: 5 configuraciones listas para usar

#### 3. **SplineBackground.tsx** - Componente Principal

Componente React "use client" con:
- ✅ Gestión de estados (loading, error, retry)
- ✅ Sistema de presets flexible
- ✅ Configuración personalizable
- ✅ Accesibilidad completa
- ✅ TypeScript estricto

---

## 🎨 Componente SplineBackground

### Props Principales

| Prop | Tipo | Descripción |
|------|------|-------------|
| `scene` | `string` | **Requerido**. URL del archivo .splinecode |
| `preset` | `SplinePreset` | Preset predefinido (default: "BACKGROUND") |
| `container` | `SplineContainerPreset` | Override de container |
| `position` | `SplinePositionPreset` | Override de posición |
| `size` | `SplineSizePreset` | Override de tamaño |
| `scale` | `SplineScalePreset` | Override de escala |
| `customPosition` | `CSSProperties` | Posición completamente personalizada |
| `customStyles` | `CSSProperties` | Estilos CSS adicionales |
| `className` | `string` | Clases CSS adicionales |
| `layer` | `"background" \| "overlay" \| "content"` | Layer z-index |
| `onLoad` | `() => void` | Callback al cargar |
| `onError` | `(error: Error) => void` | Callback de error |
| `showLoading` | `boolean` | Mostrar loading state (default: true) |
| `loadingMessage` | `string` | Mensaje de carga personalizado |
| `showError` | `boolean` | Mostrar error state (default: true) |
| `maxRetries` | `number` | Reintentos automáticos (default: 3) |
| `ariaLabel` | `string` | ARIA label para accesibilidad |

### Presets Disponibles

#### 1. **BACKGROUND** (No interactivo)
```tsx
<SplineBackground 
  scene={SPLINE_SCENES.MAIN} 
  preset="BACKGROUND" 
/>
```
- ✅ Fixed fullscreen
- ✅ Centrado
- ✅ Extra large (150%)
- ✅ Escala large (1.2x)
- ✅ pointer-events: none

#### 2. **BACKGROUND_RESPONSIVE** (No interactivo)
```tsx
<SplineBackground 
  scene={SPLINE_SCENES.KEYBOARD} 
  preset="BACKGROUND_RESPONSIVE" 
/>
```
- ✅ Fixed fullscreen
- ✅ Desplazamiento responsive hacia derecha
- ✅ Extra large (150%)
- ✅ Escala large (1.2x)
- ✅ pointer-events: none

#### 3. **HERO** (Relative)
```tsx
<SplineBackground 
  scene={SPLINE_SCENES.SCENE_1} 
  preset="HERO" 
/>
```
- ✅ Relative fullscreen
- ✅ Centrado
- ✅ Large (900px)
- ✅ Escala medium (1x)

#### 4. **SIDEBAR** (Pequeño)
```tsx
<SplineBackground 
  scene={SPLINE_SCENES.SCENE_3} 
  preset="SIDEBAR" 
/>
```
- ✅ Relative bounded
- ✅ Top right
- ✅ Small (300px)
- ✅ Escala small (0.8x)

#### 5. **MODAL** (Centrado)
```tsx
<SplineBackground 
  scene={SPLINE_SCENES.MAIN} 
  preset="MODAL" 
/>
```
- ✅ Absolute fullscreen
- ✅ Centrado
- ✅ Medium (600px)
- ✅ Escala medium (1x)

---

## 💡 Casos de Uso

### ⚠️ IMPORTANTE: Importación en Server Components

**SplineBackground es un Client Component** (`'use client'`), por lo que **DEBE** ser importado dinámicamente cuando se usa en Server Components (páginas Next.js por defecto):

```tsx
// ❌ INCORRECTO - Causará error en Next.js 16
import { SplineBackground } from "@/components/custom/SplineBackground";

// ✅ CORRECTO - Usar dynamic import
import dynamic from "next/dynamic";

const SplineBackground = dynamic(
  () => import("@/components/custom/SplineBackground").then((mod) => mod.SplineBackground),
  { 
    ssr: false,  // No renderizar en servidor
    loading: () => <div>Loading 3D...</div>  // Opcional: loading state
  }
);
```

**Razón**: Next.js 16 no permite Client Components async dentro de Server Components sin importación dinámica.

---

### 1. Fondo de Pantalla Completa (Landing Page)

```tsx
import dynamic from "next/dynamic";
import { SPLINE_SCENES } from "@/lib/spline-paths";

// ⚠️ IMPORTANTE: Usar importación dinámica para Client Components en Server Components
const SplineBackground = dynamic(
  () => import("@/components/custom/SplineBackground").then((mod) => mod.SplineBackground),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-linear-to-br from-primary/5 to-secondary/5">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }
);

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      {/* Capa 1: Escena 3D (z-0, interactiva) */}
      <SplineBackground
        scene={SPLINE_SCENES.KEYBOARD}
        preset="BACKGROUND_RESPONSIVE"
        className="fixed inset-0 z-0"
      />

      {/* Capa 2: Overlay de gradiente (z-1, no interactivo) */}
      <div className="fixed left-0 top-0 bottom-0 w-full md:w-1/2 bg-linear-to-r from-black/60 to-transparent z-1 pointer-events-none" />

      {/* Capa 3: Contenido (z-10) */}
      <div className="relative z-10 min-h-screen flex items-center pointer-events-none">
        <div className="max-w-4xl pointer-events-auto">
          <h1 className="text-6xl font-bold text-white">Mi Contenido</h1>
          <button className="px-6 py-3 bg-primary text-white">Click</button>
        </div>
      </div>
    </div>
  );
}
```

**⚠️ IMPORTANTE - Gestión de pointer-events**:
- Container de contenido: `pointer-events-none`
- Elementos interactivos (botones, links): `pointer-events-auto`
- Overlay: `pointer-events-none`

### 2. Hero Section con Escena 3D

```tsx
import dynamic from "next/dynamic";
import { SPLINE_SCENES } from "@/lib/spline-paths";

const SplineBackground = dynamic(
  () => import("@/components/custom/SplineBackground").then((mod) => mod.SplineBackground),
  { ssr: false }
);

export default function HeroPage() {
  return (
    <section className="relative h-screen">
      <SplineBackground
        scene={SPLINE_SCENES.MAIN}
        preset="HERO"
        layer="background"
      />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1>Hero Title</h1>
      </div>
    </section>
  );
}
```

### 3. Sidebar con Escena Pequeña

```tsx
<aside className="fixed right-0 top-0 w-80 h-screen">
  <SplineBackground
    scene={SPLINE_SCENES.SCENE_3}
    preset="SIDEBAR"
  />
</aside>
```

### 4. Personalización Avanzada

```tsx
<SplineBackground
  scene={SPLINE_SCENES.MAIN}
  preset="BACKGROUND"
  container="FIXED_FULLSCREEN_INTERACTIVE"
  position="RESPONSIVE_RIGHT"
  customPosition={{ 
    top: '-20%', 
    right: 'clamp(-35%, -8vw, -38%)' 
  }}
  customStyles={{
    filter: 'brightness(1.2)',
    mixBlendMode: 'screen'
  }}
  onLoad={() => console.log('Escena cargada!')}
  onError={(error) => console.error('Error:', error)}
  maxRetries={5}
/>
```

---

## ✅ Mejores Prácticas

### 1. Arquitectura de Capas

**Orden correcto de z-index:**

```tsx
z-0   → Escena 3D (SplineBackground)
z-1   → Overlay de gradiente (pointer-events-none)
z-10  → Contenido principal (pointer-events-none en container)
       └─ Elementos interactivos (pointer-events-auto individual)
```

### 2. Performance

```tsx
// ✅ Usar presets para consistencia
<SplineBackground preset="BACKGROUND_RESPONSIVE" />

// ✅ Lazy loading automático (incluido en el componente)

// ✅ Estados de carga informativos
<SplineBackground 
  showLoading={true}
  loadingMessage="Cargando experiencia 3D..."
/>

// ✅ Manejo de errores robusto
<SplineBackground 
  maxRetries={3}
  onError={(error) => logError(error)}
/>
```

### 3. Accesibilidad

```tsx
// ✅ ARIA labels descriptivos
<SplineBackground 
  ariaLabel="Escena 3D interactiva mostrando nuestro producto"
/>

// ✅ Reduced motion (automático en el componente)
// El componente incluye soporte para prefers-reduced-motion

// ✅ Screen reader support
// El componente incluye contenido sr-only para lectores de pantalla
```

### 4. Responsive Design

```tsx
// ✅ Usar preset responsive
<SplineBackground preset="BACKGROUND_RESPONSIVE" />

// ✅ Ocultar en móviles si es muy pesado
<div className="hidden lg:block">
  <SplineBackground scene={SPLINE_SCENES.MAIN} />
</div>

// ✅ Diferentes escenas por dispositivo
<SplineBackground 
  scene={isMobile ? SPLINE_SCENES.SCENE_1 : SPLINE_SCENES.KEYBOARD}
  preset="BACKGROUND_RESPONSIVE"
/>
```

---

## 🔧 Solución de Problemas

### Problema 0: Error "is an async Client Component"

**Síntoma**: Error de consola diciendo que SplineBackground es un Client Component async

**Error completo**:
```
<u> is an async Client Component. Only Server Components can be async
```

**Causa**: Importación directa de Client Component en Server Component

**Solución**:
```tsx
// ❌ Incorrecto
import { SplineBackground } from "@/components/custom/SplineBackground";

// ✅ Correcto - Usar dynamic import
import dynamic from "next/dynamic";

const SplineBackground = dynamic(
  () => import("@/components/custom/SplineBackground").then((mod) => mod.SplineBackground),
  { ssr: false }
);
```

### Problema 1: La escena no es interactiva

**Síntoma**: No puedo interactuar con la escena 3D

**Solución**:
```tsx
// ❌ Incorrecto
<SplineBackground preset="BACKGROUND" /> // pointer-events: none

// ✅ Correcto
<SplineBackground 
  preset="BACKGROUND"
  container="FIXED_FULLSCREEN_INTERACTIVE" // pointer-events: auto
/>
```

### Problema 2: Contenido no clickeable

**Síntoma**: Los botones/links no responden

**Solución**:
```tsx
// ❌ Incorrecto
<div className="relative z-10">
  <button>Click</button> {/* No funciona */}
</div>

// ✅ Correcto
<div className="relative z-10 pointer-events-none">
  <button className="pointer-events-auto">Click</button> {/* Funciona */}
</div>
```

### Problema 3: Escena no se ve

**Síntoma**: La escena no aparece en pantalla

**Checklist**:
1. ✅ Verificar que el archivo .splinecode existe en `/public/scenes/`
2. ✅ Verificar z-index (debe estar debajo del contenido)
3. ✅ Revisar console para errores de carga
4. ✅ Verificar que SplineBackground no está oculto por otros elementos

### Problema 4: Performance lento

**Síntoma**: La página carga muy lento

**Soluciones**:
```tsx
// 1. Optimizar el archivo .splinecode en Spline Editor
// 2. Usar lazy loading
const SplineBackground = lazy(() => import('@/components/custom/SplineBackground'));

// 3. Ocultar en dispositivos móviles
<div className="hidden lg:block">
  <SplineBackground />
</div>

// 4. Reducir el número de reintentos
<SplineBackground maxRetries={1} />
```

---

## 📚 Referencias

- **Tutorial Oficial**: https://spline.webcode.es/guia-spline
- **Instalación**: https://spline.webcode.es/guia-spline/instalacion
- **Implementación**: https://spline.webcode.es/guia-spline/implementacion
- **Personalización**: https://spline.webcode.es/guia-spline/personalizacion
- **Mejores Prácticas**: https://spline.webcode.es/guia-spline/mejores-practicas
- **Documentación Spline**: https://spline.design/docs

---

## 🎓 Ejemplo Completo - Página Soluciones

Ver implementación completa en:
- **Página**: `src/app/(hero)/soluciones/page.tsx`
- **Componente**: `src/components/custom/SplineBackground.tsx`
- **Estilos**: `src/lib/spline-styles.ts`
- **Rutas**: `src/lib/spline-paths.ts`

---

## 🤝 Contribución

Si encuentras bugs o quieres mejorar la integración:

1. Reportar issue en el proyecto
2. Seguir las convenciones de código establecidas
3. Documentar cambios en este archivo
4. Testear en diferentes navegadores y dispositivos

---

## 📝 Changelog

### 2025-10-26
- ✅ Instalación inicial de @splinetool/react-spline
- ✅ Creación del sistema de estilos y presets
- ✅ Implementación del componente SplineBackground
- ✅ Integración en página de soluciones
- ✅ Documentación completa

---

**Creado por**: WEBCODE Development Team  
**Tutorial base**: https://spline.webcode.es/  
**Versión**: 1.0.0

# Checklist de Desarrollo - Web Designer

## Para Cada Nuevo Componente

### **[Completado]** Diseño y Estructura

- [ ] Revisar `docs/STYLE_GUIDE.md` antes de empezar
- [ ] Definir la jerarquía de elementos
- [ ] Planificar estados (default, hover, focus, disabled)
- [ ] Considerar variantes responsive

### **[Completado]** Implementación Base

- [ ] Usar TypeScript con tipos apropiados
- [ ] Implementar con Tailwind CSS + design tokens
- [ ] Incluir `data-slot` para identificación
- [ ] Usar `cn()` para className merging

### **[Completado]** Estilos y Design Tokens

- [ ] **Espaciado**: Solo clases semánticas (`px-element`, `gap-component`, etc.)
- [ ] **Tipografía**: `font-display` para títulos, `letter-spacing-wide` siempre
- [ ] **Transiciones**: Solo `elva-transition` y variantes
- [ ] **Sombras**: Sistema 3D (`shadow-3d-sm`, `shadow-3d-md`, etc.)
- [ ] **Border Radius**: Semántico (`rounded-button`, `rounded-card`, etc.)
- [ ] **Colores**: Variables CSS del design system

### **[Completado]** Interactividad

- [ ] Hover effects con `elva-transition`
- [ ] Focus states accesibles
- [ ] Estados disabled apropiados
- [ ] Animaciones sutiles usando keyframes Elva

### **[Completado]** Accesibilidad

- [ ] Elementos semánticos correctos
- [ ] ARIA labels donde sea necesario
- [ ] Contraste adecuado (mínimo 4.5:1)
- [ ] Navegación por teclado funcional
- [ ] Soporte para lectores de pantalla

### **[Completado]** Responsive Design

- [ ] Mobile-first approach
- [ ] Breakpoints del design system (`sm:`, `md:`, `lg:`, etc.)
- [ ] Textos escalables
- [ ] Espaciado adaptativo

### **[Completado]** Testing y Verificación

- [ ] Probar en light y dark mode
- [ ] Verificar en diferentes tamaños de pantalla
- [ ] Testear interacciones táctiles
- [ ] Comprobar performance de animaciones

## Para Modificaciones de Componentes Existentes

### **[Completado]** Antes de Modificar

- [ ] Entender el uso actual del componente
- [ ] Revisar breaking changes potenciales
- [ ] Identificar todos los lugares donde se usa

### **[Completado]** Durante la Modificación

- [ ] Mantener la API existente cuando sea posible
- [ ] Usar design tokens en lugar de valores hardcodeados
- [ ] Preservar la funcionalidad existente
- [ ] Mejorar la consistencia visual

### **[Completado]** Después de Modificar

- [ ] Verificar que no se rompió ningún uso existente
- [ ] Probar en todas las páginas que lo usan
- [ ] Actualizar documentación si es necesario

## Para Nuevas Páginas

### **[Completado]** Estructura de Layout

- [ ] Usar componentes de layout existentes
- [ ] Implementar `<Navigation />` consistente
- [ ] Incluir `<Footer />` apropiado
- [ ] Gestionar espaciado de sección

### **[Completado]** Contenido y Componentes

- [ ] Reutilizar componentes existentes
- [ ] Crear nuevos componentes siguiendo el checklist
- [ ] Mantener jerarquía tipográfica
- [ ] Usar grid y flexbox semánticos

### **[Completado]** SEO y Performance

- [ ] Meta tags apropiados
- [ ] Estructura de headings correcta
- [ ] Optimización de imágenes
- [ ] Lazy loading donde sea apropiado

## Para Revisiones de Código

### **[Completado]** Design System Compliance

- [ ] Se usan design tokens en lugar de valores hardcodeados
- [ ] Clases CSS siguen las convenciones establecidas
- [ ] No hay CSS inline no justificado
- [ ] Transiciones y animaciones son consistentes

### **[Completado]** Código TypeScript

- [ ] Tipos apropiados definidos
- [ ] Props bien tipadas
- [ ] Manejo de errores apropiado
- [ ] Imports organizados

### **[Completado]** Performance

- [ ] Componentes optimizados para re-renders
- [ ] Animaciones performantes
- [ ] Bundle size considerado
- [ ] Lazy loading implementado donde sea apropiado

### **[Completado]** Accesibilidad

- [ ] Elementos semánticos usados
- [ ] Estados focus visibles
- [ ] Texto alternativo en imágenes
- [ ] Estructura de headings lógica

## Herramientas de Desarrollo

### **[Completado]** VS Code Extensions Recomendadas

- [ ] Tailwind CSS IntelliSense
- [ ] TypeScript Importer
- [ ] ESLint
- [ ] Prettier
- [ ] Auto Rename Tag

### **[Completado]** Scripts de Desarrollo

```bash
# Desarrollo local
npm run dev

# Verificar tipos
npm run type-check

# Linting
npm run lint

# Formatting
npm run format

# Build de producción
npm run build
```

### **[Completado]** Debugging

- [ ] React DevTools instalado
- [ ] Usar `console.log` con moderación
- [ ] Verificar Network tab para performance
- [ ] Lighthouse para auditorías

## Patrones a Seguir

### **[Completado]** Nomenclatura

- [ ] Componentes en PascalCase
- [ ] Archivos de componentes en kebab-case
- [ ] Variables en camelCase
- [ ] CSS variables en kebab-case

### **[Completado]** Estructura de Archivos

```
src/
  components/
    ui/           # Componentes base
    layout/       # Componentes de layout
    forms/        # Componentes de formulario
  styles/
    design-tokens.css
  types/
    index.ts
```

### **[Completado]** Importación

```tsx
// Imports externos primero
import React from "react";
import Link from "next/link";

// Imports internos después
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

### **[Completado]** Exportación

```tsx
// Exportación nombrada por defecto
export { ComponentName };

// Exportación default solo para páginas
export default function PageName() {}
```

## Mantenimiento Continuo

### **[Completado]** Auditorías Regulares

- [ ] Revisar design tokens mensualmente
- [ ] Verificar consistencia visual
- [ ] Optimizar CSS no utilizado
- [ ] Actualizar documentación

### **[Completado]** Performance Monitoring

- [ ] Lighthouse scores regulares
- [ ] Bundle analyzer ejecutado
- [ ] Core Web Vitals monitoreados
- [ ] Tiempo de carga optimizado

Este checklist debe usarse para cada desarrollo para mantener la consistencia y calidad del design system implementado.

# Guía rápida de estilos para autores de UI

Contexto: Next.js 15 + React 19 + Tailwind CSS v4 + shadcn/ui. Estilos globales en `src/app/globals.css`. Este documento resume cómo estilizar componentes de forma consistente y eficiente.

## Regla de oro

- Por defecto, usa utilidades Tailwind locales en el JSX del componente.
- Crea/usa utilidades globales (clases en `globals.css`) solo cuando:
  - Son patrones de marca transversales (gradientes, sombras 3D, neón, animaciones clave), o
  - Se usan en ≥ 3 lugares, o
  - Aportan accesibilidad/rendimiento global (reduced motion, suspender animaciones, etc.).
- Considera CSS Modules solo si necesitas selectores complejos, overrides de librerías externas, o animaciones muy específicas difíciles como utilities.

## Dónde está todo

- Hoja global: `src/app/globals.css` (tokens, base, utilidades, animaciones, a11y)
- Import global: `src/app/layout.tsx` → `import "./globals.css";`
- Helper de clases: `src/lib/utils.ts` → `cn()` para componer clases
- Atomics shadcn/ui con variantes: `src/components/ui/*` (button, badge, card, input, etc.) usan `class-variance-authority (cva)`

## Tokens y tema (Tailwind v4)

- Usa las utilidades mapeadas a tokens del tema:
  - Colores: `bg-background`, `text-foreground`, `bg-primary`, `text-accent-foreground`, `border-border`, `ring-ring`, etc.
  - Radius: `rounded-sm|md|lg|xl` (ya derivados de `--radius`), o los definidos por cva en cada átomo.
- No hardcodees colores en componentes. Si falta una utilidad, revisa `globals.css` antes de crear otra.

## Utilidades globales que debes reutilizar

- Tipografía/gradientes: `text-gradient-webcode`, `neon-cyan-title`, `neon-cyan-card-title`
- Sombras 3D: `shadow-3d-sm`, `shadow-3d-md`, `shadow-3d-lg`, `shadow-3d-xl`
- Fondos de marca: `bg-gradient-webcode`
- Animaciones hero: `animate-wave-slow|medium|fast`, contenedor `.waves-background`
- Rendimiento/acc: `.animation-suspended`, `.reduce-motion`, reglas `prefers-reduced-motion`
- Efecto neón: `neon-theme`, `neon-theme-soft`

## Patrones por tipo de componente

- Botones (shadcn/ui): usa el átomo `Button` y sus variantes. Evita redefinir colores/hover; extiende con `className` cuando sea necesario.
- Cards: `Card` + `shadow-3d-sm` por defecto; eleva a `shadow-3d-md|lg` en hover.
- Badges/labels/inputs: respeta las variantes existentes; usa `ring-*`, `border-border`, `bg-background` en lugar de valores ad hoc.
- Hero/branding: para titulares usa `text-gradient-webcode` o `neon-*`; para fondos secciones `bg-gradient-webcode`.

## Ejemplos rápidos

```tsx
// ✅ Correcto: tokens + utilidades globales
<Card className="bg-background/80 border-border/30 shadow-3d-sm hover:shadow-3d-md transition-shadow">
  <h3 className="text-gradient-webcode text-2xl font-bold">Título</h3>
</Card>

// ❌ Incorrecto: colores hardcodeados y sombras arbitrarias
<Card className="bg-white shadow-lg hover:shadow-2xl">
  <h3 className="text-pink-500">Título</h3>
</Card>
```

```tsx
// ✅ Botón shadcn con cva + extensión vía className
import { Button } from "@/components/ui/button";

<Button variant="default" size="lg" className="shadow-3d-sm hover:shadow-3d-md">
  Llamada a la acción
</Button>;
```

```tsx
// ✅ Título hero con gradiente de marca
<h1 className="text-gradient-webcode text-5xl md:text-6xl font-bold tracking-tight">
  WEBCODE, desarrollo web en Barcelona
</h1>
```

## Dark mode, accesibilidad y rendimiento

- Modo oscuro: ya gestionado por `ThemeProvider` y variables en `.dark`. Evita duplicar colores por tema.
- A11y: verifica contraste cuando uses gradientes/neón; usa las variantes `*-foreground` y utilidades de texto adecuadas.
- Rendimiento: suspende animaciones pesadas fuera de viewport o en secciones internas (`.animation-suspended`), respeta `prefers-reduced-motion`.

## Checklist antes de abrir PR

- [ ] ¿Uso utilidades Tailwind locales por defecto?
- [ ] ¿Reutilizo utilidades globales existentes antes de crear nuevas?
- [ ] ¿No hay colores hardcodeados? ¿Todo viene de tokens/tema?
- [ ] ¿Funciona en light/dark sin hacks locales?
- [ ] ¿A11y ok? (contraste, reduced motion)
- [ ] ¿He usado o extendido átomos shadcn/ui con `cva` en lugar de duplicarlos?

## Proponer nuevas utilidades globales

- Sólo si es patrón de marca transversal o se usa en ≥ 3 componentes.
- Nombra con prefijo de marca cuando aplique: `bg-gradient-webcode`, `shadow-3d-*`, `neon-*`.
- Incluye breve justificación y ejemplos de uso en la PR.

## Referencias

- Guía base (arquitectura y tokens): `../03-DISENO-guia-estilos-base.md`
- Guía extendida (sistema completo): `../04-DISENO-guia-estilos-extendida.md`
- Sistema de animaciones WAS: `../05-DISENO-sistema-animaciones-websnack.md`
- Plan de consistencia y checklist: `../09-DESARROLLO-plan-consistencia.md`

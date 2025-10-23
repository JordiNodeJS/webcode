# Plan de Consistencia de Componentes - WebCode Theme

## Tema WebCode 2025

### Paleta de Colores Oficial

- **Primary:** `#dc7cb3` (Rosa principal)
- **Secondary:** `#bce3e5` (Aguamarina)
- **Background:** `#ffffff` (Blanco limpio)
- **Accent:** `#fffcf7` (Crema suave)
- **Border:** `#dc7cb3` (Rosa para bordes)

### Sistema de Sombras 3D

- **Sombra base:** `3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353%)`
- **Elevación progresiva:** `-sm`, `-md`, `-lg`, `-xl`, `-2xl`
- **Efecto 3D característico:** Offset consistente de 3px en X e Y

## Componentes a Actualizar

### 1. Navigation (navigation.tsx)

- **[Completado]** Usar design tokens para espaciado (`px-element`, `py-text`)
- **[Completado]** Aplicar `text-primary` para enlaces activos
- **[Completado]** Sombra 3D en estado hover: `shadow-3d-sm`
- **[Completado]** Transiciones con `ws-transition`
- **[Completado]** Background rosa suave en mobile menu

### 2. Hero Section (hero-section.tsx)

- **[Completado]** Tipografía Poppins con peso 700 para headlines
- **[Completado]** Gradiente sutil rosa-aguamarina en backgrounds
- **[Completado]** Botones principales con `shadow-3d-md`
- **[Completado]** Animaciones con Magic UI (TextReveal, AnimatedCounter)
- **[Completado]** Letter-spacing consistente: `tracking-wider`

### 3. Buttons (button.tsx)

- **[Completado]** Primary: `bg-primary` con `shadow-3d-sm`
- **[Completado]** Secondary: `bg-secondary` con efecto hover 3D
- **[Completado]** Radius: `rounded-button` (0.4rem)
- **[Completado]** Hover: Elevación de sombra a `shadow-3d-md`
- **[Completado]** Estados disabled con opacidad y sombra reducida

### 4. Cards (card.tsx)

- **[Completado]** Background blanco con `shadow-3d-md`
- **[Completado]** Hover: `shadow-3d-lg` con transform subtle
- **[Completado]** Border sutil con `border-primary/20`
- **[Completado]** Radius: `rounded-card` (0.4rem)
- **[Completado]** Padding interno: `p-element` (1.5rem)

### 5. Footer (footer.tsx)

- **[Completado]** Background: `bg-accent` (crema suave)
- **[Completado]** Enlaces con `text-primary` y hover `text-primary/80`
- **[Completado]** Separadores con `border-primary/30`
- **[Completado]** Logo con efecto 3D sutil
- **[Completado]** Social icons con hover rosa

### 6. Services Grid (services-grid.tsx)

- **[Completado]** Cards con gradiente rosa-aguamarina en hover
- **[Completado]** Icons con `text-primary` y efectos 3D
- **[Completado]** Grid responsive con `gap-component`
- **[Completado]** Animaciones escalonadas con Framer Motion

## Patrones de Inconsistencia Detectados

1. **Espaciado hardcodeado**: Reemplazar valores como `px-4`, `py-2` por tokens semánticos
2. **Colores no branded**: Eliminar grises genéricos y usar paleta rosa/aguamarina
3. **Sombras inconsistentes**: Unificar todas las sombras al sistema 3D característico
4. **Typography mixing**: Asegurar Poppins como primary, Lora para serif, Fira Code para mono
5. **Efectos hover desiguales**: Estandarizar elevación 3D en todas las interacciones
6. **Border radius variado**: Usar solo los tokens definidos (button, card, input, modal)
7. **Transiciones mezcladas**: Consolidar en sistema WebCode con duraciones consistentes

## Design System WebCode - Tokens Específicos

### Spacing Tokens

```css
--spacing-text: 0.5rem; /* py-text */
--spacing-element: 1rem; /* px-element, p-element */
--spacing-component: 1.5rem; /* gap-component */
--spacing-section: 3rem; /* py-section */
```

### Typography Tokens

```css
--font-sans: Poppins, sans-serif;
--font-serif: Lora, serif;
--font-mono: Fira Code, monospace;
--tracking-normal: 0em;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
```

### Shadow Tokens 3D

```css
--shadow-3d-sm: 3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1);
--shadow-3d-md:
  3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1),
  3px 2px 4px -1px hsl(325.5319 58.0247% 68.2353% / 1);
--shadow-3d-lg:
  3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1),
  3px 4px 6px -1px hsl(325.5319 58.0247% 68.2353% / 1);
--shadow-3d-xl:
  3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1),
  3px 8px 10px -1px hsl(325.5319 58.0247% 68.2353% / 1);
```

### Border Radius Tokens

```css
--radius-button: 0.4rem;
--radius-card: 0.4rem;
--radius-input: 0.4rem;
--radius-modal: 0.5rem;
```

### Transition Tokens

```css
--ws-transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ws-transition-quick: all 0.2s ease-out;
--ws-transition-slow: all 0.5s ease-in-out;
```

## Acciones de Corrección

### A. Implementar Paleta de Colores WebCode

- Reemplazar todos los colores genéricos por la paleta oficial
- Primary (`#dc7cb3`) para CTAs, enlaces activos, iconos principales
- Secondary (`#bce3e5`) para elementos secundarios, backgrounds sutiles
- Accent (`#fffcf7`) para fondos alternativos y highlights
- Eliminar grises que no estén en el sistema de colores

### B. Estandarizar Sistema de Sombras 3D

- Todas las sombras deben usar el sistema 3D característico
- Buttons: `shadow-3d-sm` normal, `shadow-3d-md` hover
- Cards: `shadow-3d-md` normal, `shadow-3d-lg` hover
- Modals/Overlays: `shadow-3d-xl`
- Eliminar cualquier `drop-shadow` o sombras custom

### C. Unificar Tipografía

- Headlines principales: Poppins 700 con `tracking-wider`
- Texto de interfaz: Poppins 400-600 con `tracking-normal`
- Texto largo/blog: Lora para mejor legibilidad
- Código/monospace: Fira Code exclusivamente
- Eliminar cualquier referencia a otras fuentes

### D. Consolidar Espaciado Semántico

- `px-element` y `py-text` para espaciado de componentes
- `gap-component` para grids y layouts flex
- `p-element` para padding interno de cards/containers
- `py-section` para separación entre secciones principales
- Eliminar valores hardcodeados como `px-4`, `py-8`, etc.

### E. Transiciones WebCode Consistentes

- Usar exclusivamente `ws-transition` para la mayoría de casos
- `ws-transition-quick` para hover effects sutiles
- `ws-transition-slow` para animaciones de entrada/salida
- Eliminar `duration-300`, `ease-in-out` y similares inline

### F. Border Radius Semántico Estricto

- Buttons y inputs: `rounded-button` (0.4rem)
- Cards y containers: `rounded-card` (0.4rem)
- Modals y overlays: `rounded-modal` (0.5rem)
- Eliminar `rounded-lg`, `rounded-xl` y valores custom

### G. Estados Hover Uniformes

- Todos los elementos interactivos deben elevar su sombra 3D
- Cambio de color sutil: opacidad 80% del color original
- Transform scale mínimo: `scale-[1.02]` para sutileza
- Combinación: sombra + color + transform en una sola transición

### H. Dark Mode Consistente

- Mantener el sistema de colores pero con valores dark apropiados
- Sombras 3D adaptadas al tema oscuro
- Contraste WCAG 2.1 AA garantizado en ambos temas
- Testing automático de ratios de contraste

## Checklist de Implementación

### Fase 1: Configuración Base

- [ ] Implementar tokens CSS custom en `globals.css`
- [ ] Configurar Tailwind v4 con `@theme` directive
- [ ] Validar paleta de colores en ambos temas (light/dark)
- [ ] Setup de fuentes Poppins, Lora, Fira Code

### Fase 2: Componentes Primitivos

- [ ] Actualizar `button.tsx` con nuevo sistema 3D
- [ ] Refactorizar `card.tsx` con sombras y colores correctos
- [ ] Revisar `input.tsx` para consistencia de borders y radius
- [ ] Aplicar tokens a todos los componentes shadcn/ui

### Fase 3: Componentes de Layout

- [ ] Navigation con colores primarios y efectos 3D
- [ ] Footer con background accent y enlaces primary
- [ ] Container components con espaciado semántico
- [ ] Grid systems con `gap-component` consistente

### Fase 4: Secciones de Landing

- [ ] Hero section con gradientes rosa-aguamarina
- [ ] Services grid con animaciones escalonadas
- [ ] Testimonials con cards 3D uniformes
- [ ] Contact form con validación visual consistente

### Fase 5: Testing y Validación

- [ ] Accessibility testing (color contrast, keyboard nav)
- [ ] Visual regression testing para consistency
- [ ] Performance testing con nuevo sistema de sombras
- [ ] Cross-browser compatibility validation

## Métricas de Éxito

### Consistencia Visual

- 100% de componentes usando la paleta oficial
- 0 sombras custom fuera del sistema 3D
- 0 espaciado hardcodeado en componentes
- 0 transiciones con valores inline

### Performance Impact

- Bundle CSS size mantener <30KB
- Render time de sombras 3D <16ms
- No layout shift durante transiciones
- Core Web Vitals mantener targets

### Accessibility Compliance

- Contrast ratio ≥4.5:1 para texto normal
- Contrast ratio ≥3:1 para elementos grandes
- Focus indicators visibles en todos los estados
- Screen reader compatibility 100%

### Developer Experience

- IntelliSense completo para todos los tokens
- Type safety en props de componentes
- Error catching para valores deprecated
- Documentation automática de design system

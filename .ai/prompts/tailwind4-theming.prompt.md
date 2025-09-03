# Reglas de Theming para Tailwind CSS 4 - UNIFICADAS

> **✅ ACTUALIZADO**: Este prompt ahora está sincronizado con los archivos maestros:
> - **[MASTER-TAILWIND-CONFIG.md](../MASTER-TAILWIND-CONFIG.md)** - Configuración completa TailwindCSS v4
> - **[MASTER-COLOR-SYSTEM.md](../MASTER-COLOR-SYSTEM.md)** - Sistema de colores brutalistas

## ✅ Regla Principal: Evitar @apply con Clases Personalizadas

### Problema Identificado

Durante la implementación del sistema de theming en Mudanzas Andy, se identificó un **patrón crítico de incompatibilidad** entre Tailwind CSS 4 y el uso de `@apply` con clases personalizadas.

### Errores Comunes y Soluciones

#### ❌ **ANTIPATRÓN: @apply con clases personalizadas**

```css
/* INCORRECTO - Tailwind CSS 4 no reconoce clases personalizadas con @apply */
.btn-outline {
  @apply bg-transparent border-2 border-current;
}

.btn-outline-primary {
  @apply btn-outline text-primary border-primary; /* ERROR */
}

.form-input {
  @apply focus:ring-primary/50; /* ERROR: sintaxis opacidad no reconocida */
}
```

#### ✅ **PATRÓN CORRECTO: CSS directo con variables**

```css
/* CORRECTO - CSS directo usando variables CSS */
.btn-outline-primary {
  @apply bg-transparent border-2 hover:text-white;
  color: var(--color-primary);
  border-color: var(--color-primary);
  &:hover {
    background-color: rgb(var(--color-primary));
  }
}

.form-input {
  @apply focus:outline-none focus:ring-2;
  &:focus {
    --tw-ring-color: rgb(var(--color-primary) / 0.5);
    border-color: rgb(var(--color-primary));
  }
}
```

## Reglas Específicas para Tailwind CSS 4

### 1. **Variables de Color en Formato RGB**

```css
/* CORRECTO: Variables en formato RGB para opacidades */
:root {
  --color-primary: 38 78 112; /* NO incluir rgb() */
  --color-secondary: 72 119 142;
}

/* Uso con opacidades */
.element {
  background-color: rgb(var(--color-primary) / 0.5);
  color: rgb(var(--color-primary));
}
```

### 2. **Configuración de Tailwind con Helper withOpacity**

```javascript
// tailwind.config.js
function withOpacity(variable) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variable}), ${opacityValue})`;
    }
    return `rgb(var(${variable}))`;
  };
}

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: withOpacity("--color-primary"),
        // NO crear alias que conflicten: 'text-primary', 'bg-primary'
      },
    },
  },
});
```

### 3. **Estructura de Componentes CSS**

```css
/* PATRÓN RECOMENDADO: Combinación de @apply + CSS directo */
.btn {
  /* Utilidades base de Tailwind */
  @apply inline-flex items-center justify-center px-4 py-2 rounded-lg;
  @apply font-medium transition-colors duration-200;

  /* Propiedades personalizadas con variables */
  min-height: 2.75rem; /* 44px mínimo táctil */
}

.btn-primary {
  /* Utilidades de Tailwind que funcionan */
  @apply text-white shadow-md hover:shadow-lg;

  /* Variables CSS para theming */
  background-color: rgb(var(--color-primary));
  &:hover {
    background-color: rgb(var(--color-primary-dark, var(--color-primary)));
  }
  &:focus {
    --tw-ring-color: rgb(var(--color-primary) / 0.5);
  }
}
```

### 4. **Estados y Pseudo-clases**

```css
/* CORRECTO: Estados con variables CSS */
.form-input {
  @apply w-full px-4 py-3 rounded-lg border border-gray-300;
  @apply transition-colors duration-200;

  &:focus {
    outline: none;
    border-color: rgb(var(--color-primary));
    box-shadow: 0 0 0 2px rgb(var(--color-primary) / 0.1);
  }

  &:invalid {
    border-color: rgb(var(--color-error));
    &:focus {
      --tw-ring-color: rgb(var(--color-error) / 0.5);
    }
  }
}
```

### 5. **Animaciones Personalizadas**

```css
/* DEFINIR animaciones directamente, no usar @apply animate-custom */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  @apply bg-white rounded-xl shadow-2xl;
  /* Animación directa en lugar de @apply animate-fadeIn */
  animation: fadeIn var(--transition-base, 0.3s) var(--ease-out, ease-out);
}
```

## Checklist de Implementación

### ✅ Antes de Implementar Theming

- [ ] **Auditar clases personalizadas existentes** que usen `@apply`
- [ ] **Verificar versión de Tailwind CSS** (las reglas aplican para v4+)
- [ ] **Planificar estructura de variables** en formato RGB
- [ ] **Definir helper withOpacity** en configuración de Tailwind

### ✅ Durante la Implementación

- [ ] **NO usar @apply con clases personalizadas** definidas en el mismo proyecto
- [ ] **Preferir CSS directo + variables** para theming dinámico
- [ ] **Testear compilación** en cada cambio mayor de CSS
- [ ] **Usar utilidades de Tailwind** para propiedades estándar (spacing, typography)

### ✅ Testing y Validación

- [ ] **Compilación sin errores** en desarrollo (`pnpm dev`)
- [ ] **Build exitoso** para producción (`pnpm build`)
- [ ] **Verificar variables CSS** funcionan en runtime
- [ ] **Contrastar accesibilidad** (ratios de contraste, focus visible)

## Arquitectura Recomendada

```
src/styles/
├── theme.css          # Variables CSS centralizadas (fuente de verdad)
├── components.css     # Componentes usando patrón híbrido
└── global.css         # Imports y utilities globales

tailwind.config.js     # Configuración con withOpacity helper
```

## Ejemplo de Migración

### ❌ Antes (Problemático)

```css
.btn-primary {
  @apply bg-primary text-white hover:bg-primary-dark;
  @apply focus:ring-primary/50 focus:ring-2;
}
```

### ✅ Después (Correcto)

```css
.btn-primary {
  @apply text-white shadow-md hover:shadow-lg;
  @apply focus:outline-none focus:ring-2;

  background-color: rgb(var(--color-primary));
  &:hover {
    background-color: rgb(var(--color-primary-dark, var(--color-primary)));
  }
  &:focus {
    --tw-ring-color: rgb(var(--color-primary) / 0.5);
  }
}
```

## Notas de Compatibilidad

- **Astro**: ✅ Compatible con 5.13.3+
- **Tailwind CSS**: ✅ Aplicable a v4.x (breaking changes desde v3)
- **SSG**: ✅ No requiere runtime de servidor
- **TypeScript**: ✅ Compatible, recomendado para type safety

## Referencias

- [Tailwind CSS 4 Migration Guide](https://tailwindcss.com/docs/v4-migration)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Astro Styling Guide](https://docs.astro.build/en/guides/styling/)

---

**Fecha de creación**: 2025-08-24  
**Contexto**: Implementación theming Mudanzas Andy (Astro 5 + Tailwind CSS 4)  
**Última validación**: Astro 5.13.3, Tailwind CSS 4.1.12

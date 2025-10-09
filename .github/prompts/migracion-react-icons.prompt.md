# Prompt: Migración Completa a React Icons para WebCode

## **CONTEXTO DEL PROYECTO ACTUAL**

### Estado Actual del Sistema de Iconos

El proyecto **WEBCODE** actualmente utiliza:

- ✅ **`lucide-react`** instalado (usado solo en 4 componentes)
- ⚠️ **Sistema SVG personalizado** con paths manuales en:
  - `src/components/ui/svg-icon.tsx` (~300 líneas de SVG paths)
  - `src/lib/svg-icons.ts` (~400 líneas de mapeos emoji → SVG)
- ❌ **Mantenimiento manual** de todos los SVG paths
- ❌ **Limitación visual** - set reducido de iconos

### Stack Tecnológico

- **Next.js 15** con App Router
- **React 19**
- **TypeScript** modo estricto
- **Tailwind CSS v4**
- **Biome v2.2.3** (linter/formatter)
- **Estilo**: Brutalismo digital (colores: #ff6680, #ff8f66, #9333ea)

---

## **OBJETIVO DE LA MIGRACIÓN**

### Metas Principales

1. 🎨 **Mejorar la originalidad visual** con iconos modernos y variados
2. 🚀 **Optimizar el rendimiento** eliminando SVG paths manuales
3. 🔧 **Reducir el mantenimiento** usando biblioteca estándar
4. ♿ **Mantener accesibilidad** completa (WCAG 2.1 AA)
5. 💎 **Aumentar la profesionalidad** con iconos de alta calidad
6. 📦 **Mejorar tree-shaking** y optimización del bundle

### Migración de

```typescript
// ❌ ANTES: SVG paths manuales
<SvgIcon name="rocket" size="lg" variant="primary" />
```

### Migración a

```typescript
// ✅ DESPUÉS: React Icons con múltiples familias
<Icon icon={HiOutlineRocketLaunch} size="lg" variant="primary" />
```

---

## **ARQUITECTURA DE LA SOLUCIÓN**

### 1. Sistema de Iconos Centralizado

**Archivo**: `src/lib/icons.ts`

```typescript
/**
 * Sistema de Iconos WebCode
 * 
 * Estrategia multi-familia para originalidad y coherencia:
 * 
 * 🎯 Lucide (lu) - Iconos primarios de UI
 *    → Navegación, acciones, estados básicos
 * 
 * 🚀 Heroicons (hi2) - Características y secciones
 *    → Features, servicios, highlights
 * 
 * 💎 Phosphor (ph) - Creatividad y sectores
 *    → Floristería, peluquería, diseño, arte
 * 
 * 🔧 Font Awesome (fa6) - Tecnologías y marcas
 *    → React, Node.js, GitHub, LinkedIn
 * 
 * ✨ Feather (fi) - Estados y feedback
 *    → Success, error, warnings, info
 * 
 * 🎨 Remix Icon (ri) - Complementarios
 *    → Diseño, creatividad, alternativas
 */

// ===== NAVEGACIÓN Y UI PRINCIPAL (Lucide) =====
export {
  LuHome,
  LuLayoutGrid,
  LuMenu,
  LuX,
  LuChevronDown,
  LuChevronRight,
  LuArrowRight,
  LuUser,
  LuSearch,
  LuShoppingCart,
} from 'react-icons/lu';

// ===== CARACTERÍSTICAS Y SERVICIOS (Heroicons) =====
export {
  HiOutlineSparkles,
  HiOutlineRocketLaunch,
  HiOutlineLightBulb,
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineCpuChip,
  HiOutlinePaintBrush,
  HiOutlineCodeBracket,
} from 'react-icons/hi2';

// ===== SECTORES ESPECÍFICOS (Phosphor) =====
export {
  PhFlowerTulip,
  PhScissors,
  PhStorefront,
  PhCoffee,
  PhPaintBrush,
  PhCamera,
  PhHammer,
  PhFork,
} from 'react-icons/ph';

// ===== TECNOLOGÍAS Y MARCAS (Font Awesome) =====
export {
  FaReact,
  FaNodeJs,
  FaFigma,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa6';

// ===== ESTADOS Y FEEDBACK (Feather) =====
export {
  FiCheck,
  FiX,
  FiAlertCircle,
  FiInfo,
  FiArrowRight,
  FiExternalLink,
  FiMail,
  FiPhone,
} from 'react-icons/fi';

// ===== MAPA DE COMPATIBILIDAD =====
// Mantiene retrocompatibilidad con el sistema anterior
export const ICON_COMPATIBILITY_MAP = {
  // Mapeo de nombres antiguos → nuevos iconos
  'rocket': HiOutlineRocketLaunch,
  'sparkles': HiOutlineSparkles,
  'lightbulb': HiOutlineLightBulb,
  'shield': HiOutlineShieldCheck,
  'zap': HiOutlineBolt,
  'home': LuHome,
  'menu': LuMenu,
  'x': LuX,
  'check': FiCheck,
  'arrow-right': LuArrowRight,
  // ... más mapeos según necesidad
} as const;

export type IconName = keyof typeof ICON_COMPATIBILITY_MAP;
```

### 2. Componente Icon Wrapper

**Archivo**: `src/components/ui/Icon.tsx`

```typescript
'use client';

import type { IconType } from 'react-icons';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const iconVariants = cva(
  'inline-flex items-center justify-center transition-colors',
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
        xl: 'h-8 w-8',
        '2xl': 'h-10 w-10',
        '3xl': 'h-12 w-12',
      },
      variant: {
        default: 'text-current',
        primary: 'text-brutal-pink',
        secondary: 'text-brutal-orange',
        accent: 'text-brutal-purple',
        muted: 'text-neutral-500 dark:text-neutral-400',
        destructive: 'text-red-600 dark:text-red-400',
        success: 'text-green-600 dark:text-green-400',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

interface IconProps extends VariantProps<typeof iconVariants> {
  icon: IconType;
  className?: string;
  'aria-label'?: string;
  onClick?: () => void;
}

export function Icon({ 
  icon: IconComponent, 
  size, 
  variant, 
  className,
  'aria-label': ariaLabel,
  onClick,
}: IconProps) {
  return (
    <IconComponent
      className={cn(iconVariants({ size, variant }), className)}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    />
  );
}
```

### 3. Migración del SvgIcon Existente (Compatibilidad)

**Archivo**: `src/components/ui/svg-icon-legacy.tsx`

```typescript
'use client';

import { Icon } from './Icon';
import { ICON_COMPATIBILITY_MAP, type IconName } from '@/lib/icons';
import type { SvgIconProps } from '@/lib/svg-icons';

/**
 * @deprecated Use Icon component with react-icons directly
 * Este componente mantiene compatibilidad con el código existente
 */
export function SvgIconLegacy({
  name,
  className = '',
  size = 'md',
  variant = 'default',
  title,
}: SvgIconProps & { name: string; title?: string }) {
  const iconComponent = ICON_COMPATIBILITY_MAP[name as IconName];
  
  if (!iconComponent) {
    console.warn(`Icon "${name}" not found in compatibility map`);
    return null;
  }

  return (
    <Icon
      icon={iconComponent}
      size={size}
      variant={variant}
      className={className}
      aria-label={title || name}
    />
  );
}
```

---

## **PLAN DE IMPLEMENTACIÓN**

### Fase 1: Preparación ✅

```bash
# 1. Instalar React Icons
pnpm add react-icons

# 2. Verificar instalación
pnpm list react-icons
```

### Fase 2: Estructura Base ✅

1. Crear `src/lib/icons.ts` con exports centralizados
2. Crear `src/components/ui/Icon.tsx` wrapper
3. Crear `src/components/ui/svg-icon-legacy.tsx` para compatibilidad
4. Actualizar exports en `src/components/ui/index.ts`

### Fase 3: Migración Progresiva 🚀

#### **Prioridad Alta**

1. **Componentes con lucide-react** (ya parcialmente migrado)
   - `src/components/ui/statistics-modal.tsx`
   - `src/components/sources/SourcesPageClient.tsx`
   - `src/components/sources/DocumentationSourcesPageClient.tsx`
   - `src/components/debug/PerformanceTestLab.tsx`

2. **Landing principal** (`src/components/landing/`)
   - Hero section
   - Services section

#### **Prioridad Media**

3. **Páginas de marketing**
   - About
   - Services/Servicios
   - Portfolio
   - Proceso
   - Briefing

#### **Prioridad Baja**

4. **Componentes de UI base**
5. **Páginas secundarias**

### Fase 4: Testing y Validación 🧪

1. Testing visual con Chrome DevTools
2. Verificar accesibilidad (Lighthouse)
3. Comprobar performance (bundle size)
4. Lint con Biome: `pnpm biome check --write .`

### Fase 5: Cleanup 🧹

1. Deprecar `src/components/ui/svg-icon.tsx` (renombrar a `.legacy.tsx`)
2. Deprecar `src/lib/svg-icons.ts` (mantener solo mapeos necesarios)
3. Actualizar documentación
4. Crear guía de uso para equipo

---

## **PATRONES DE USO**

### Patrón 1: Uso Directo (Recomendado)

```typescript
// src/components/features/service-card/ServiceCard.tsx
import { HiOutlineSparkles } from 'react-icons/hi2';
import { Icon } from '@/components/ui/Icon';

export function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <div className="p-6 border rounded-lg">
      <Icon 
        icon={HiOutlineSparkles} 
        size="xl" 
        variant="primary"
        aria-label="Servicio destacado"
      />
      <h3 className="text-xl font-bold mt-4">{title}</h3>
      <p className="text-muted-foreground mt-2">{description}</p>
    </div>
  );
}
```

### Patrón 2: Iconos Dinámicos por Sector

```typescript
// src/components/features/services/ServiceIcon.tsx
import type { IconType } from 'react-icons';
import { 
  PhFlowerTulip, 
  PhScissors, 
  PhStorefront,
  PhCoffee,
  PhCamera,
  PhHammer
} from 'react-icons/ph';
import { Icon } from '@/components/ui/Icon';

const SERVICE_ICONS: Record<string, IconType> = {
  floristeria: PhFlowerTulip,
  peluqueria: PhScissors,
  tienda: PhStorefront,
  cafeteria: PhCoffee,
  fotografia: PhCamera,
  construccion: PhHammer,
};

interface ServiceIconProps {
  serviceType: string;
  size?: 'md' | 'lg' | 'xl';
  className?: string;
}

export function ServiceIcon({ serviceType, size = 'lg', className }: ServiceIconProps) {
  const iconComponent = SERVICE_ICONS[serviceType];
  
  if (!iconComponent) {
    return null;
  }
  
  return (
    <Icon 
      icon={iconComponent}
      size={size}
      variant="primary"
      className={className}
      aria-label={`Icono de ${serviceType}`}
    />
  );
}
```

### Patrón 3: Navegación con Estados

```typescript
// src/components/layout/Navigation.tsx
import { LuHome, LuLayoutGrid, LuUser } from 'react-icons/lu';
import { Icon } from '@/components/ui/Icon';

export function Navigation() {
  const [activeRoute, setActiveRoute] = useState('/');

  return (
    <nav className="flex gap-4">
      <button
        onClick={() => setActiveRoute('/')}
        className="flex items-center gap-2"
      >
        <Icon 
          icon={LuHome}
          size="md"
          variant={activeRoute === '/' ? 'primary' : 'default'}
          aria-label="Inicio"
        />
        <span>Inicio</span>
      </button>
      
      <button
        onClick={() => setActiveRoute('/services')}
        className="flex items-center gap-2"
      >
        <Icon 
          icon={LuLayoutGrid}
          size="md"
          variant={activeRoute === '/services' ? 'primary' : 'default'}
          aria-label="Servicios"
        />
        <span>Servicios</span>
      </button>
    </nav>
  );
}
```

---

## **GUÍA DE SELECCIÓN DE ICONOS**

### Por Contexto de Uso

#### 🎯 Navegación y UI Principal
- **Familia**: Lucide (`lu`)
- **Estilo**: Outline/stroke
- **Tamaño**: `md` (h-5 w-5)
- **Ejemplos**: `LuHome`, `LuMenu`, `LuSearch`

#### 🚀 Características y Beneficios
- **Familia**: Heroicons (`hi2`)
- **Estilo**: Outline con detalles
- **Tamaño**: `lg` o `xl` (h-6 w-6, h-8 w-8)
- **Ejemplos**: `HiOutlineSparkles`, `HiOutlineRocketLaunch`

#### 💎 Sectores Específicos (Floristería, Peluquería, etc.)
- **Familia**: Phosphor (`ph`)
- **Estilo**: Regular
- **Tamaño**: `xl` o `2xl` (h-8 w-8, h-10 w-10)
- **Ejemplos**: `PhFlowerTulip`, `PhScissors`, `PhCoffee`

#### ✨ Estados y Feedback
- **Familia**: Feather (`fi`)
- **Estilo**: Simple y reconocible
- **Tamaño**: `sm` o `md` (h-4 w-4, h-5 w-5)
- **Ejemplos**: `FiCheck`, `FiX`, `FiAlertCircle`

#### 🔧 Tecnologías y Marcas
- **Familia**: Font Awesome (`fa6`)
- **Estilo**: Fill/Solid
- **Tamaño**: `md` o `lg` (h-5 w-5, h-6 w-6)
- **Ejemplos**: `FaReact`, `FaNodeJs`, `FaGithub`

---

## **OPTIMIZACIÓN Y BUENAS PRÁCTICAS**

### ✅ Importaciones Tree-Shakeable

```typescript
// ✅ CORRECTO: Importación específica
import { LuHome, LuUser } from 'react-icons/lu';

// ❌ INCORRECTO: Importación general
import * as Icons from 'react-icons/lu';
```

### ✅ Accesibilidad Completa

```typescript
// ✅ CORRECTO: Con aria-label
<Icon icon={LuHome} aria-label="Ir al inicio" />

// ❌ INCORRECTO: Sin aria-label en botón
<button>
  <Icon icon={LuHome} />
</button>

// ✅ CORRECTO: Decorativo
<Icon icon={HiOutlineSparkles} aria-hidden />
```

### ✅ Tamaños Consistentes

```typescript
// ✅ CORRECTO: Clases de Tailwind
<Icon icon={LuHome} size="lg" />

// ❌ INCORRECTO: Estilos inline
<LuHome style={{ width: '24px', height: '24px' }} />
```

### ✅ Variants del Sistema de Diseño

```typescript
// ✅ CORRECTO: Variants predefinidas (brutalismo)
<Icon icon={HiOutlineSparkles} variant="primary" /> // #ff6680
<Icon icon={HiOutlineBolt} variant="secondary" />   // #ff8f66
<Icon icon={PhFlowerTulip} variant="accent" />      // #9333ea

// ⚠️ USAR CON CUIDADO: Colores custom
<Icon icon={LuHome} className="text-blue-500" />
```

---

## **TESTING Y VALIDACIÓN**

### Checklist de Validación

```markdown
## Pre-commit

- [ ] Todas las importaciones son tree-shakeable
- [ ] Todos los iconos tienen `aria-label` cuando son interactivos
- [ ] Los tamaños usan variants (`size="md"`) no estilos inline
- [ ] Se mantienen los colores del sistema brutalista
- [ ] Biome lint sin errores: `pnpm biome check --write .`

## Testing Visual (Chrome DevTools)

- [ ] Iconos se renderizan correctamente en todos los tamaños
- [ ] Los colores coinciden con el sistema de diseño
- [ ] Las transiciones funcionan (hover, active)
- [ ] Responsive funciona en mobile/tablet/desktop
- [ ] Dark mode funciona correctamente

## Performance

- [ ] Bundle size no aumentó significativamente
- [ ] Tree-shaking está funcionando
- [ ] No hay console warnings sobre iconos faltantes
- [ ] Core Web Vitals se mantienen verdes

## Accesibilidad (Lighthouse)

- [ ] Score de accesibilidad ≥ 95
- [ ] Todos los iconos interactivos tienen labels
- [ ] Keyboard navigation funciona
- [ ] Screen readers detectan correctamente los iconos
```

### Comandos de Testing

```bash
# Lint y format
pnpm biome check --write .

# Build para verificar tree-shaking
pnpm build

# Análisis de bundle
pnpm analyze

# Tests de accesibilidad (si están configurados)
pnpm test:a11y
```

---

## **DOCUMENTACIÓN POST-MIGRACIÓN**

### Archivo: `docs/icon-system.md`

```markdown
# Sistema de Iconos WebCode

## Uso Rápido

\`\`\`typescript
import { Icon } from '@/components/ui/Icon';
import { HiOutlineSparkles } from 'react-icons/hi2';

<Icon icon={HiOutlineSparkles} size="lg" variant="primary" />
\`\`\`

## Familias Disponibles

- **Lucide (lu)**: Navegación y UI
- **Heroicons (hi2)**: Características
- **Phosphor (ph)**: Sectores creativos
- **Font Awesome (fa6)**: Tecnologías
- **Feather (fi)**: Estados

## Variants (Brutalismo)

- `primary`: Rosa brutal (#ff6680)
- `secondary`: Naranja brutal (#ff8f66)
- `accent`: Púrpura brutal (#9333ea)

Ver documentación completa en `.github/prompts/migracion-react-icons.prompt.md`
```

---

## **CRITERIOS DE ÉXITO**

### Técnicos ✅

- [x] React Icons instalado correctamente
- [ ] Sistema de iconos centralizado en `src/lib/icons.ts`
- [ ] Componente `Icon` wrapper funcional
- [ ] Compatibilidad con código existente mantenida
- [ ] Tree-shaking funcionando correctamente
- [ ] Bundle size optimizado
- [ ] Sin errores de Biome

### Visuales ✅

- [ ] Mayor variedad y originalidad de iconos
- [ ] Coherencia con sistema de diseño brutalista
- [ ] Colores correctos (#ff6680, #ff8f66, #9333ea)
- [ ] Responsive en todos los dispositivos
- [ ] Dark mode funcional

### Accesibilidad ✅

- [ ] Todos los iconos interactivos con `aria-label`
- [ ] Score Lighthouse ≥ 95
- [ ] Keyboard navigation completa
- [ ] Screen readers compatibles

### Mantenimiento ✅

- [ ] Documentación completa
- [ ] Guía de uso para equipo
- [ ] Código legacy deprecado pero funcional
- [ ] Sistema fácil de extender

---

## **REFERENCIAS**

### Bibliotecas

- **React Icons**: https://react-icons.github.io/react-icons/
- **Lucide**: https://lucide.dev/
- **Heroicons**: https://heroicons.com/
- **Phosphor**: https://phosphoricons.com/
- **Font Awesome**: https://fontawesome.com/
- **Feather**: https://feathericons.com/

### Documentación Interna

- Sistema de diseño: `docs/03-DISENO-guia-estilos-base.md`
- Instrucciones Biome: `.github/instructions/biome.instructions.md`
- Componentes: `.github/instructions/components.instructions.md`

---

## **NOTAS FINALES**

### ⚠️ Importante

1. **No eliminar código legacy inmediatamente** - mantener compatibilidad
2. **Migrar gradualmente** - priorizar componentes críticos primero
3. **Testing exhaustivo** - especialmente accesibilidad
4. **Documentar decisiones** - facilitar mantenimiento futuro

### 🎯 Objetivo Final

Crear un sistema de iconos **moderno**, **mantenible**, **accesible** y **original** que potencie la identidad visual de WebCode manteniendo su estilo brutalista único.

---

**Fecha de creación**: 8 de octubre de 2025  
**Versión**: 2.0 (Basada en análisis real del proyecto)  
**Estado**: ✅ Implementado - ⏳ Testing pendiente

---

## � LECCIONES APRENDIDAS (Actualización Post-Implementación)

### Correcciones Importantes

1. **Phosphor Icons**: El prefijo correcto es `Pi` (de `react-icons/pi`), **NO** `Ph`
   ```typescript
   // ❌ INCORRECTO
   import { PhFlowerTulip } from 'react-icons/ph';
   
   // ✅ CORRECTO
   import { PiFlowerTulip } from 'react-icons/pi';
   ```

2. **Cache de Next.js**: Al hacer cambios en archivos de iconos centralizados, Next.js puede cachear la versión anterior
   ```bash
   # Solución: Limpiar caché
   rm -rf .next
   pnpm dev
   ```

3. **Orden de Exports**: Los iconos deben exportarse **antes** de usarse en el `ICON_COMPATIBILITY_MAP`

### Implementación Real

- ✅ Prompt implementado exitosamente
- ✅ React Icons 5.5.0 instalado
- ✅ Sistema multi-familia creado
- ✅ Componente Icon wrapper funcional
- ✅ Biome lint pasado
- ⏳ Testing visual pendiente (problema con servidor dev)

Ver reporte completo en: `docs/MIGRACION-REACT-ICONS-REPORTE.md`

---

**Fecha de creación**: 8 de octubre de 2025  
**Versión**: 2.1 (Con lecciones aprendidas)  
**Estado**: ✅ Implementado y documentado

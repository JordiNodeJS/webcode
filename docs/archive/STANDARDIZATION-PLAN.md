# Plan de Estandarización de Layouts

## Objetivo

Estandarizar TODAS las páginas de la aplicación para que usen la misma estructura HTML y componentes PageWrapper, garantizando:

- ✅ Consistencia visual y estructural
- ✅ HTML semántico correcto
- ✅ Spacing uniforme (pt-24 para navbar)
- ✅ Código DRY (sin duplicación)
- ✅ Mantenibilidad mejorada

## Estructura HTML Estandarizada

### Layout Raíz (NO MODIFICAR)

```tsx
// src/app/layout.tsx
<body>
  <div className="min-h-screen flex flex-col">
    <HeaderNavigation />
    <main className="flex-1">{children}</main>
    <FooterSection />
  </div>
</body>
```

### Páginas (USAR PageWrapper)

Todas las páginas deben seguir uno de estos 3 patrones:

#### 1. ContentPage - Contenido Simple

```tsx
import { ContentPage } from "@/components/layout";

export default function MyPage() {
  return (
    <ContentPage>
      <h1>Título</h1>
      <p>Contenido...</p>
    </ContentPage>
  );
}
```

**HTML generado**:

```html
<div class="min-h-screen">
  <article class="pt-24 pb-20 px-4">
    <div class="container mx-auto max-w-4xl">
      <!-- contenido -->
    </div>
  </article>
</div>
```

#### 2. HeroSection - Marketing/Hero

```tsx
import { HeroSection } from "@/components/layout";

export default function MyPage() {
  const gradient = `...`;

  return (
    <>
      <HeroSection gradient={gradient}>
        <div className="max-w-3xl">
          <h1>Hero Title</h1>
          <p>Description</p>
        </div>
      </HeroSection>

      {/* Secciones adicionales fuera del hero */}
      <section className="py-20">{/* ... */}</section>
    </>
  );
}
```

**HTML generado**:

```html
<div class="min-h-screen">
  <section class="pt-24 pb-20 md:pb-32" style="background: ...">
    <div class="container mx-auto max-w-6xl">
      <!-- contenido hero -->
    </div>
  </section>
</div>
<section class="py-20">
  <!-- secciones adicionales -->
</section>
```

#### 3. GridPage - Listados/Blog

```tsx
import { GridPage } from "@/components/layout";

export default function MyPage() {
  return (
    <GridPage>
      <div className="text-center mb-16">
        <h1>Título</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item) => (
          <Card key={item.id} />
        ))}
      </div>
    </GridPage>
  );
}
```

## Inventario de Páginas

### ✅ Ya Migradas (2)

- [x] `/contacto` - ContentPage
- [x] `/about` - ContentPage

### 🔄 Pendientes de Migrar (23)

#### Páginas de Contenido Simple → ContentPage

- [ ] `/servicios`
- [ ] `/sources`
- [ ] `/documentation/sources`
- [ ] `/test-icons`
- [ ] `/dev-performance-test`

#### Páginas Hero → HeroSection

- [ ] `/soluciones` (página índice)
- [ ] `/soluciones/web-development`
- [ ] `/soluciones/seo`
- [ ] `/soluciones/landing-pages`
- [ ] `/soluciones/e-commerce`
- [ ] `/soluciones/consulting`
- [ ] `/soluciones/reservas`
- [ ] `/proceso`
- [ ] `/briefing`
- [ ] `/briefing/formulario`

#### Páginas Grid/Listado → GridPage

- [ ] `/faqs`
- [ ] `/blog`
- [ ] `/portfolio`

#### Páginas Especiales (evaluar)

- [ ] `/` (homepage con HeroSection especial)
- [ ] `/blog/[slug]` (post individual)
- [ ] `/blog/tag/[tag]`
- [ ] `/(cookies)/terms`
- [ ] `/(cookies)/privacy`
- [ ] `/(cookies)/politica-privacidad`
- [ ] `/(cookies)/cookies`

## Patrón de Migración

### Antes (Código Duplicado)

```tsx
export default function MyPage() {
  return (
    <div className="min-h-screen">
      <section className="relative pt-24 pb-20 md:pb-32 overflow-hidden bg-[...]">
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-3xl">
            <h1>Título</h1>
          </div>
        </div>
      </section>
    </div>
  );
}
```

### Después (Con PageWrapper)

```tsx
import { HeroSection } from "@/components/layout";

export default function MyPage() {
  const gradient = `linear-gradient(...)`;

  return (
    <HeroSection gradient={gradient}>
      <div className="max-w-3xl">
        <h1>Título</h1>
      </div>
    </HeroSection>
  );
}
```

## Guía de Decisión

### ¿Qué componente usar?

```
┌─ ¿La página tiene hero visual prominente?
│  ├─ SÍ → HeroSection
│  │   - Usa gradient background
│  │   - max-width: max-w-6xl
│  │   - Padding responsive: pb-20 md:pb-32
│  │
│  └─ NO → ¿Es un listado/grid?
│      ├─ SÍ → GridPage
│      │   - Para blog, FAQs, portfolio
│      │   - max-width: configurable
│      │   - <section> semántico
│      │
│      └─ NO → ContentPage
│          - Contenido simple
│          - max-width: max-w-4xl
│          - <article> semántico
```

## Checklist por Página

Para cada página a migrar:

1. **Identificar el tipo**:
   - [ ] ¿Hero? → HeroSection
   - [ ] ¿Grid? → GridPage
   - [ ] ¿Contenido? → ContentPage

2. **Extraer gradientes** (si aplica):
   - [ ] Copiar background gradient a variable
   - [ ] Pasarlo como prop `gradient={}`

3. **Limpiar clases**:
   - [ ] Eliminar `pt-24`, `pb-20`, `md:pb-32`
   - [ ] Eliminar `px-4`
   - [ ] Eliminar `container mx-auto`
   - [ ] Eliminar `min-h-screen`
   - [ ] Mantener solo clases específicas de contenido

4. **Ajustar estructura**:
   - [ ] Importar componente PageWrapper
   - [ ] Envolver contenido
   - [ ] Mover clases personalizadas a `containerClassName`

5. **Verificar**:
   - [ ] Compilar sin errores
   - [ ] Verificar en DevTools (spacing correcto)
   - [ ] Probar responsive (mobile, tablet, desktop)
   - [ ] Validar HTML semántico

## Ejemplos Completos

### Ejemplo 1: Migrar /servicios

**Antes**:

```tsx
export default function ServiciosPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-12">
          <h1>Servicios</h1>
        </header>
        {/* contenido */}
      </div>
    </main>
  );
}
```

**Después**:

```tsx
import { ContentPage } from "@/components/layout";

export default function ServiciosPage() {
  return (
    <ContentPage>
      <header className="text-center mb-12">
        <h1>Servicios</h1>
      </header>
      {/* contenido */}
    </ContentPage>
  );
}
```

### Ejemplo 2: Migrar /soluciones/seo

**Antes**:

```tsx
export default function SeoPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-[image:linear-gradient(...)] pt-24 pb-20 md:pb-32">
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-3xl">
            <h1>SEO & Marketing</h1>
          </div>
        </div>
      </section>

      <section className="py-20">{/* más contenido */}</section>
    </div>
  );
}
```

**Después**:

```tsx
import { HeroSection } from "@/components/layout";

export default function SeoPage() {
  const gradient = `linear-gradient(
    to_right,
    rgb(var(--accent-rgb)_/_0.03),
    rgb(var(--primary-rgb)_/_0.03)
  )`;

  return (
    <>
      <HeroSection gradient={gradient}>
        <div className="max-w-3xl">
          <h1>SEO & Marketing</h1>
        </div>
      </HeroSection>

      <section className="py-20">{/* más contenido */}</section>
    </>
  );
}
```

### Ejemplo 3: Migrar /faqs

**Antes**:

```tsx
export default function FAQsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h1>Preguntas Frecuentes</h1>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Después**:

```tsx
import { GridPage } from "@/components/layout";

export default function FAQsPage() {
  return (
    <GridPage>
      <div className="text-center mb-16">
        <h1>Preguntas Frecuentes</h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <FAQItem key={faq.id} />
        ))}
      </div>
    </GridPage>
  );
}
```

## Beneficios Esperados

### Antes de la Estandarización

- ❌ 25+ archivos con código duplicado
- ❌ Inconsistencias en spacing
- ❌ HTML semántico variable
- ❌ Difícil de mantener
- ❌ ~500 líneas de código repetido

### Después de la Estandarización

- ✅ Todos usan PageWrapper
- ✅ Spacing consistente (pt-24)
- ✅ HTML semántico correcto
- ✅ Fácil de mantener
- ✅ ~200 líneas menos de código
- ✅ Cambios centralizados

## Prioridad de Migración

### Fase 1: Crítico (primeras 5 páginas)

1. `/servicios` - ContentPage (página importante)
2. `/faqs` - GridPage (SEO importante)
3. `/soluciones` - HeroSection (página hub)
4. `/proceso` - HeroSection (conversión)
5. `/briefing` - HeroSection (conversión)

### Fase 2: Importante (siguientes 8 páginas)

6. `/soluciones/web-development` - HeroSection
7. `/soluciones/seo` - HeroSection
8. `/soluciones/e-commerce` - HeroSection
9. `/soluciones/landing-pages` - HeroSection
10. `/soluciones/consulting` - HeroSection
11. `/soluciones/reservas` - HeroSection
12. `/blog` - GridPage
13. `/portfolio` - GridPage

### Fase 3: Menor prioridad (resto)

14-23. Páginas restantes y especiales

## Testing

Después de cada migración:

```bash
# 1. Verificar compilación
pnpm run build

# 2. Verificar en browser
pnpm run dev
# Navegar a la página migrada
# Verificar:
# - No overlap con navbar
# - Spacing correcto (pt-24)
# - Responsive funciona
# - Sin errores de console

# 3. Validar HTML
# Usar DevTools → Elements
# Verificar estructura semántica correcta
```

## Notas Importantes

1. **NO modificar el layout raíz** (`src/app/layout.tsx`)
2. **NO duplicar** `<main>` (ya existe en layout raíz)
3. **SIEMPRE usar** componentes PageWrapper
4. **PROBAR** cada página después de migrar
5. **MANTENER** las clases específicas de contenido
6. **DOCUMENTAR** cualquier caso especial

## Próximos Pasos

1. Revisar y aprobar este plan
2. Migrar Fase 1 (5 páginas críticas)
3. Verificar con DevTools
4. Migrar Fase 2 (8 páginas importantes)
5. Migrar Fase 3 (resto)
6. Actualizar documentación final
7. Commit y deploy

---

**Versión**: 1.0.0  
**Fecha**: 2025-10-16  
**Autor**: Sistema de estandarización WEBCODE

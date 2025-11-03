# Prompt: Verificación de Migración Next.js 15 → 16 - WebCode

## **Contexto y Objetivo**

Este prompt proporciona una guía completa para **verificar que la migración de Next.js 15 a Next.js 16** se ha realizado correctamente en el proyecto WebCode. Incluye checklist de verificación, pruebas funcionales, análisis de breaking changes y validación de rendimiento.

**Objetivo**: Garantizar que todos los cambios introducidos en Next.js 16 están correctamente implementados, sin errores en tiempo de ejecución ni regresiones en funcionalidad.

## **Alcance**

- ✅ Verificación de configuración `next.config.ts`
- ✅ Validación de APIs asíncronas (params, searchParams, cookies, headers)
- ✅ Comprobación de Turbopack como bundler predeterminado
- ✅ Verificación de migraciones de archivos (middleware → proxy)
- ✅ Análisis de breaking changes en imágenes, caché y routing
- ✅ Pruebas de compilación y desarrollo
- ✅ Validación de rendimiento y Core Web Vitals

---

## **CHECKLIST DE VERIFICACIÓN COMPLETA**

### **1. Versiones de Paquetes**

Verificar que todas las dependencias estén actualizadas a versiones compatibles:

```bash
# Verificar versiones instaladas
pnpm list next react react-dom

# Versiones mínimas requeridas:
# - next: >=16.0.0
# - react: >=19.0.0
# - react-dom: >=19.0.0
# - Node.js: >=20.9.0
# - TypeScript: >=5.1.0
```

**Criterios de Aceptación**:
- ✅ Next.js 16.0.0 o superior
- ✅ React 19.x y React DOM 19.x
- ✅ Node.js 20.9+ (verificar con `node --version`)
- ✅ TypeScript 5.1+ (verificar en `package.json`)

---

### **2. Configuración `next.config.ts`**

Verificar que la configuración está actualizada con los cambios de Next.js 16:

#### **2.1. Turbopack (Cambio de Ubicación)**

```typescript
// ❌ ANTES (Next.js 15)
const nextConfig: NextConfig = {
  experimental: {
    turbopack: {
      // opciones
    },
  },
}

// ✅ DESPUÉS (Next.js 16)
const nextConfig: NextConfig = {
  turbopack: {
    // opciones - ahora está en el nivel superior
  },
}
```

#### **2.2. Cache Components (Reemplaza PPR)**

```typescript
// ❌ ELIMINADO (Next.js 15 canary)
const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    dynamicIO: true,
  },
}

// ✅ NUEVO (Next.js 16)
const nextConfig: NextConfig = {
  cacheComponents: true, // Opcional, solo si se usa PPR/Cache Components
}
```

#### **2.3. Otras Configuraciones Actualizadas**

```typescript
const nextConfig: NextConfig = {
  // ✅ React Compiler ahora es estable (no experimental)
  reactCompiler: true, // Antes: experimental.reactCompiler

  // ✅ skipProxyUrlNormalize reemplaza skipMiddlewareUrlNormalize
  skipProxyUrlNormalize: true,

  // ✅ Configuraciones de imagen actualizadas
  images: {
    minimumCacheTTL: 14400, // Nuevo default: 4 horas (antes 60s)
    imageSizes: [32, 48, 64, 96, 128, 256, 384], // Eliminado: 16
    localPatterns: [
      // NUEVO: Requerido para imágenes locales con query strings
      {
        pathname: '/assets/**',
        search: '?v=*',
      },
    ],
  },
}

export default nextConfig
```

**Criterios de Aceptación**:
- ✅ No hay opciones `experimental.turbopack`
- ✅ No hay referencias a `experimental.ppr` o `experimental.dynamicIO`
- ✅ Si se usa React Compiler, está en nivel raíz (no `experimental`)
- ✅ `images.localPatterns` configurado si se usan query strings en imágenes

---

### **3. APIs Asíncronas (Breaking Change Crítico)**

**CRÍTICO**: En Next.js 16, `params`, `searchParams`, `cookies()`, `headers()` y `draftMode()` son **asíncronos** y retornan Promises.

#### **3.1. Verificar `params` y `searchParams` en Pages**

```typescript
// ❌ ANTES (Next.js 15)
type Params = { slug: string }
type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { slug } = params // ❌ Acceso síncrono
  return <div>{slug}</div>
}

// ✅ DESPUÉS (Next.js 16) - Server Component
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = await params // ✅ Await requerido
  const query = await searchParams
  return <div>{slug}</div>
}

// ✅ DESPUÉS (Next.js 16) - Client Component
'use client'
import { use } from 'react'

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = use(params) // ✅ use() hook de React
  const query = use(searchParams)
  return <div>{slug}</div>
}
```

#### **3.2. Verificar `params` en Layouts**

```typescript
// ❌ ANTES (Next.js 15)
export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const { slug } = params
  return <div>{children}</div>
}

// ✅ DESPUÉS (Next.js 16)
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <div>{children}</div>
}
```

#### **3.3. Verificar `cookies()`, `headers()`, `draftMode()`**

```typescript
// ❌ ANTES (Next.js 15)
import { cookies, headers, draftMode } from 'next/headers'

export default function Page() {
  const cookieStore = cookies() // ❌ Síncrono
  const headersList = headers() // ❌ Síncrono
  const { isEnabled } = draftMode() // ❌ Síncrono
  
  return <div>...</div>
}

// ✅ DESPUÉS (Next.js 16)
import { cookies, headers, draftMode } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies() // ✅ Async
  const headersList = await headers() // ✅ Async
  const { isEnabled } = await draftMode() // ✅ Async
  
  const token = cookieStore.get('token')
  const userAgent = headersList.get('user-agent')
  
  return <div>...</div>
}
```

#### **3.4. Verificar Route Handlers**

```typescript
// ❌ ANTES (Next.js 15)
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug
  return Response.json({ slug })
}

// ✅ DESPUÉS (Next.js 16)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params // ✅ Await requerido
  return Response.json({ slug })
}
```

#### **3.5. Verificar `generateMetadata` y `generateStaticParams`**

```typescript
// ❌ ANTES (Next.js 15)
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params
  return { title: slug }
}

export async function generateStaticParams() {
  return [{ slug: 'post-1' }]
}

// ✅ DESPUÉS (Next.js 16)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params // ✅ Await requerido
  return { title: slug }
}

// generateStaticParams no cambia (ya era async)
export async function generateStaticParams() {
  return [{ slug: 'post-1' }]
}
```

#### **3.6. Verificar `opengraph-image.tsx` / `icon.tsx`**

```typescript
// ❌ ANTES (Next.js 15)
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params
  return [{ id: '1' }]
}

export default function Image({ params, id }: { params: { slug: string }; id: string }) {
  const slug = params.slug
  return new ImageResponse(...)
}

// ✅ DESPUÉS (Next.js 16)
export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return [{ id: '1' }]
}

export default async function Image({
  params,
  id,
}: {
  params: Promise<{ slug: string }>
  id: Promise<string> // ⚠️ id ahora también es Promise cuando se usa generateImageMetadata
}) {
  const { slug } = await params
  const imageId = await id // ⚠️ Await también en id
  return new ImageResponse(...)
}
```

**Criterios de Aceptación**:
- ✅ Todos los `params` tienen tipo `Promise<...>` y usan `await`
- ✅ Todos los `searchParams` tienen tipo `Promise<...>` y usan `await`
- ✅ `cookies()`, `headers()`, `draftMode()` se llaman con `await`
- ✅ Client Components usan `use()` hook de React para unwrap Promises
- ✅ No hay errores de tipo TypeScript relacionados con async/await

---

### **4. Migración de Archivos**

#### **4.1. Middleware → Proxy**

```bash
# Verificar si existe middleware.ts (DEPRECADO)
ls src/middleware.ts app/middleware.ts

# ⚠️ Si existe, renombrar a proxy.ts
mv src/middleware.ts src/proxy.ts
# o
mv app/middleware.ts app/proxy.ts
```

**Cambios en el código**:

```typescript
// ❌ middleware.ts (DEPRECADO)
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}

// ✅ proxy.ts (NUEVO)
export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}

// ⚠️ Nota: La función también debe renombrarse de "middleware" a "proxy"
```

**Criterios de Aceptación**:
- ✅ No existe archivo `middleware.ts`
- ✅ Si se usa edge routing, existe `proxy.ts` con función `proxy()`
- ✅ Configuración `skipProxyUrlNormalize` actualizada si se usaba `skipMiddlewareUrlNormalize`

---

### **5. Verificación de Imágenes**

#### **5.1. Verificar Configuración de Imágenes**

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    // ✅ minimumCacheTTL ahora es 14400s (4h) por defecto
    minimumCacheTTL: 14400, // Antes: 60s

    // ✅ imageSizes eliminó 16px
    imageSizes: [32, 48, 64, 96, 128, 256, 384], // Antes: [16, 32, ...]

    // ✅ NUEVO: localPatterns requerido para query strings
    localPatterns: [
      {
        pathname: '/assets/**',
        search: '?v=*',
      },
    ],

    // ⚠️ DEPRECADO: usar remotePatterns en lugar de domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
    // domains: ['example.com'], // ❌ DEPRECADO
  },
}
```

#### **5.2. Verificar Uso de Imágenes Locales con Query Strings**

```tsx
// ❌ Esto requiere configuración localPatterns en Next.js 16
<Image src="/assets/photo.jpg?v=1" alt="Photo" width={100} height={100} />

// ✅ Configurar localPatterns o remover query string
```

**Criterios de Aceptación**:
- ✅ `images.localPatterns` configurado si se usan query strings
- ✅ `images.domains` migrado a `images.remotePatterns`
- ✅ No se usa `next/legacy/image` (deprecado)

---

### **6. Verificación de Parallel Routes**

**Cambio Crítico**: En Next.js 16, **todos los slots de Parallel Routes requieren un archivo `default.js` explícito**.

```tsx
// Estructura de carpetas
app/
├── @modal/
│   ├── page.tsx
│   └── default.tsx // ⚠️ OBLIGATORIO en Next.js 16
├── @sidebar/
│   ├── page.tsx
│   └── default.tsx // ⚠️ OBLIGATORIO en Next.js 16
└── page.tsx

// app/@modal/default.tsx
import { notFound } from 'next/navigation'

export default function Default() {
  notFound() // O return null para mantener comportamiento anterior
}
```

**Criterios de Aceptación**:
- ✅ Todos los parallel routes (`@nombre`) tienen archivo `default.tsx`
- ✅ El build no falla con error de parallel routes

---

### **7. Verificación de Caché y Revalidación**

#### **7.1. `revalidateTag()` con `cacheLife`**

```typescript
// ❌ ANTES (Next.js 15)
import { revalidateTag } from 'next/cache'

export async function POST() {
  revalidateTag('blog-posts') // ⚠️ Deprecado (un solo argumento)
}

// ✅ DESPUÉS (Next.js 16) - Con perfil de cacheLife
import { revalidateTag } from 'next/cache'

export async function POST() {
  revalidateTag('blog-posts', 'max') // ✅ Segundo argumento requerido
  
  // Otras opciones:
  // revalidateTag('news', 'hours')
  // revalidateTag('analytics', 'days')
  // revalidateTag('products', { revalidate: 3600 })
}
```

#### **7.2. Nuevas APIs: `updateTag()` y `refresh()`**

```typescript
// ✅ updateTag() - Para read-your-writes en Server Actions
'use server'
import { updateTag } from 'next/cache'

export async function updateProfile(userId: string, profile: Profile) {
  await db.users.update(userId, profile)
  updateTag(`user-${userId}`) // Expira e inmediatamente lee datos frescos
}

// ✅ refresh() - Para refrescar solo datos no cacheados
'use server'
import { refresh } from 'next/cache'

export async function markAsRead(notificationId: string) {
  await db.notifications.markAsRead(notificationId)
  refresh() // Refresca datos dinámicos sin tocar caché
}
```

**Criterios de Aceptación**:
- ✅ Todos los `revalidateTag()` tienen segundo argumento (perfil de cacheLife)
- ✅ Se usa `updateTag()` en Server Actions para read-your-writes
- ✅ Se usa `refresh()` para refrescar datos no cacheados

---

### **8. Verificación de Eliminaciones**

Comprobar que no se usan APIs/configuraciones eliminadas:

```typescript
// ❌ ELIMINADO - AMP Support
export const config = { amp: true }

// ❌ ELIMINADO - next lint command
// En package.json:
{
  "scripts": {
    "lint": "eslint .", // ✅ Usar ESLint directamente
    // "lint": "next lint" // ❌ Eliminado
  }
}

// ❌ ELIMINADO - Runtime Config
module.exports = {
  serverRuntimeConfig: { ... }, // ❌ Usar variables de entorno
  publicRuntimeConfig: { ... }, // ❌ Usar NEXT_PUBLIC_*
}

// ❌ ELIMINADO - devIndicators específicos
module.exports = {
  devIndicators: {
    // appIsrStatus: false, // ❌ Eliminado
    // buildActivity: false, // ❌ Eliminado
    // buildActivityPosition: 'bottom-right', // ❌ Eliminado
  },
}

// ❌ ELIMINADO - unstable_rootParams()
import { unstable_rootParams } from 'next/headers'
const params = unstable_rootParams() // ❌ API eliminada

// ❌ ELIMINADO - export const experimental_ppr
export const experimental_ppr = true // ❌ Usar cacheComponents en next.config

// ❌ ELIMINADO - smooth scroll automático
// Ahora requiere opt-in manual:
<html data-scroll-behavior="smooth">
```

**Criterios de Aceptación**:
- ✅ No hay referencias a `useAmp` o `config.amp`
- ✅ `package.json` no usa `next lint` (migrado a `eslint .`)
- ✅ No hay `serverRuntimeConfig` ni `publicRuntimeConfig`
- ✅ No hay uso de APIs `unstable_*` eliminadas

---

### **9. Verificación de Turbopack**

#### **9.1. Turbopack es Ahora Default**

```json
// package.json
{
  "scripts": {
    // ✅ Ya no necesita --turbopack (es default)
    "dev": "next dev",
    "build": "next build",
    
    // ⚠️ Para usar Webpack (opt-out):
    "dev:webpack": "next dev --webpack",
    "build:webpack": "next build --webpack"
  }
}
```

#### **9.2. File System Caching (Beta)**

```typescript
// next.config.ts - Opcional para mayor velocidad
const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true, // ✅ Cache en disco para dev
  },
}
```

**Criterios de Aceptación**:
- ✅ Scripts de dev/build funcionan sin `--turbopack` flag
- ✅ Fast Refresh funciona correctamente (2-5x más rápido)
- ✅ Builds son 2-5x más rápidos que con Webpack

---

### **10. Verificación de ESLint Flat Config**

```javascript
// ❌ eslint.config.js (formato legacy)
module.exports = {
  extends: ['next/core-web-vitals'],
}

// ✅ eslint.config.mjs (Flat Config - nuevo default)
import nextPlugin from '@next/eslint-plugin-next'

export default [
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },
]
```

**Criterios de Aceptación**:
- ✅ ESLint usa Flat Config (ESLint v9+)
- ✅ `@next/eslint-plugin-next` actualizado a última versión

---

## **COMANDOS DE VERIFICACIÓN**

### **Paso 1: Ejecutar Codemod Oficial**

```bash
# Ejecutar codemod automático de Next.js
npx @next/codemod@canary upgrade latest

# El codemod actualiza:
# - Versiones de paquetes (next, react, react-dom)
# - APIs asíncronas (params, searchParams, cookies, headers)
# - Configuración next.config.ts
# - ESLint a flat config
```

### **Paso 2: Verificar Instalación**

```bash
# Verificar versiones
pnpm list next react react-dom

# Verificar que no hay errores de TypeScript
pnpm tsc --noEmit

# Verificar que no hay errores de linting
pnpm eslint . --max-warnings 0
```

### **Paso 3: Compilación y Desarrollo**

```bash
# Limpiar caché
rm -rf .next

# Compilar en desarrollo
pnpm dev

# Verificar que inicia sin errores y muestra:
# ✓ Compiled successfully in XXXms
# ✓ Turbopack (default)

# Compilar para producción
pnpm build

# Verificar logs de build:
# ✓ Compiled successfully
# ✓ TypeScript check passed
# ✓ Collecting page data
# ✓ Generating static pages
# ✓ Finalizing page optimization
```

### **Paso 4: Pruebas de Runtime**

```bash
# Iniciar servidor de producción
pnpm start

# Probar rutas dinámicas
curl http://localhost:3000/posts/test-slug
curl http://localhost:3000/api/hello

# Verificar que no hay errores en la consola del navegador
```

### **Paso 5: Verificación con Next.js MCP (Opcional)**

Si tienes Next.js 16 con MCP habilitado:

```bash
# Verificar endpoint MCP
curl http://localhost:3000/_next/mcp

# O usar herramientas MCP para inspeccionar:
# - Rutas disponibles
# - Errores de compilación
# - Logs de runtime
```

---

## **PRUEBAS FUNCIONALES**

### **Test 1: Rutas Dinámicas con `params`**

```bash
# Navegar a página con parámetros dinámicos
# Ejemplo: /posts/[slug]

# ✅ Debe renderizar correctamente
# ✅ No debe mostrar errores en consola
# ✅ params debe ser Promise y resolverse correctamente
```

### **Test 2: Búsqueda con `searchParams`**

```bash
# Navegar a página con query strings
# Ejemplo: /search?q=nextjs&filter=recent

# ✅ searchParams debe ser Promise y resolverse correctamente
# ✅ Los valores de query deben mostrarse en UI
```

### **Test 3: Cookies y Headers**

```bash
# Verificar que cookies() y headers() funcionan
# En una ruta que use estas APIs:

# ✅ Debe obtener cookies correctamente con await
# ✅ Debe obtener headers correctamente con await
# ✅ No debe lanzar errores de sincronización
```

### **Test 4: Server Actions con Caché**

```bash
# Probar Server Action que use revalidateTag o updateTag

# ✅ revalidateTag debe aceptar dos argumentos
# ✅ updateTag debe refrescar datos inmediatamente
# ✅ UI debe reflejar cambios después de acción
```

### **Test 5: Optimización de Imágenes**

```bash
# Verificar que next/image funciona correctamente

# ✅ Imágenes locales se cargan sin errores
# ✅ Si se usan query strings, localPatterns está configurado
# ✅ Imágenes remotas usan remotePatterns (no domains)
```

### **Test 6: Parallel Routes (Si Aplica)**

```bash
# Si el proyecto usa parallel routes:

# ✅ Todos los slots tienen default.tsx
# ✅ Build no falla con error de parallel routes
# ✅ Navegación entre rutas paralelas funciona
```

---

## **ANÁLISIS DE RENDIMIENTO**

### **Comparación con Next.js 15**

```bash
# Medir tiempos de build
time pnpm build

# Medir Fast Refresh (HMR)
# - Hacer un cambio en un componente
# - Observar tiempo de recompilación en terminal
# - Debería ser 2-10x más rápido con Turbopack

# Core Web Vitals
# - LCP (Largest Contentful Paint): <2.5s
# - FID (First Input Delay): <100ms
# - CLS (Cumulative Layout Shift): <0.1
```

### **Lighthouse/PageSpeed Insights**

```bash
# Ejecutar auditoría de performance
npm install -g lighthouse

lighthouse http://localhost:3000 --view

# Verificar métricas:
# ✅ Performance: >90
# ✅ Accessibility: >90
# ✅ Best Practices: >90
# ✅ SEO: >90
```

---

## **CHECKLIST FINAL DE VERIFICACIÓN**

### **Configuración**

- [ ] **Versiones**: Next.js 16.x, React 19.x, Node.js 20.9+
- [ ] **next.config.ts**: Turbopack en nivel raíz (no experimental)
- [ ] **next.config.ts**: No hay `experimental.ppr` ni `experimental.dynamicIO`
- [ ] **next.config.ts**: `cacheComponents` configurado si se usa
- [ ] **next.config.ts**: `images.localPatterns` configurado si aplica
- [ ] **ESLint**: Migrado a Flat Config
- [ ] **package.json**: Scripts actualizados (no `next lint`)

### **Código**

- [ ] **params**: Todos tienen tipo `Promise<...>` y usan `await`
- [ ] **searchParams**: Todos tienen tipo `Promise<...>` y usan `await`
- [ ] **cookies()**: Se llama con `await` en Server Components
- [ ] **headers()**: Se llama con `await` en Server Components
- [ ] **draftMode()**: Se llama con `await` en Server Components
- [ ] **Client Components**: Usan `use()` hook para unwrap Promises
- [ ] **generateMetadata**: Usa `await` para params/searchParams
- [ ] **Route Handlers**: Usan `await` para params
- [ ] **opengraph-image/icon**: Usan `await` para params e id

### **Archivos**

- [ ] **middleware.ts**: Renombrado a `proxy.ts` (si existe)
- [ ] **Función middleware**: Renombrada a `proxy` (si existe)
- [ ] **Parallel Routes**: Todos los slots tienen `default.tsx`

### **Caché**

- [ ] **revalidateTag()**: Usa segundo argumento (cacheLife profile)
- [ ] **updateTag()**: Usado en Server Actions para read-your-writes
- [ ] **refresh()**: Usado para refrescar datos no cacheados

### **Eliminaciones**

- [ ] **AMP**: No se usa `useAmp` ni `config.amp`
- [ ] **Runtime Config**: No se usa `serverRuntimeConfig` ni `publicRuntimeConfig`
- [ ] **APIs unstable**: No se usa `unstable_rootParams()` u otras eliminadas
- [ ] **next lint**: No se usa en scripts (migrado a `eslint .`)

### **Pruebas**

- [ ] **Build**: Compila sin errores con `pnpm build`
- [ ] **Dev**: Inicia sin errores con `pnpm dev`
- [ ] **TypeScript**: No hay errores con `pnpm tsc --noEmit`
- [ ] **ESLint**: Pasa con `pnpm eslint .`
- [ ] **Runtime**: Todas las rutas funcionan correctamente
- [ ] **Rutas dinámicas**: params/searchParams funcionan
- [ ] **Server Actions**: Caché y revalidación funcionan
- [ ] **Imágenes**: next/image funciona sin errores

### **Rendimiento**

- [ ] **Fast Refresh**: 2-10x más rápido que antes
- [ ] **Build Time**: 2-5x más rápido que con Webpack
- [ ] **Lighthouse**: Performance >90
- [ ] **Core Web Vitals**: En verde (LCP <2.5s, FID <100ms, CLS <0.1)

---

## **SOLUCIÓN DE PROBLEMAS COMUNES**

### **Error: "Cannot read properties of undefined (reading 'slug')"**

**Causa**: No se está usando `await` para acceder a `params` o `searchParams`.

**Solución**:
```typescript
// ❌ Incorrecto
const { slug } = params

// ✅ Correcto
const { slug } = await params
```

### **Error: "cookies() is not a function"**

**Causa**: Falta `await` al llamar `cookies()`.

**Solución**:
```typescript
// ❌ Incorrecto
const cookieStore = cookies()

// ✅ Correcto
const cookieStore = await cookies()
```

### **Error de TypeScript: "Type 'Promise<...>' is not assignable to type '...'"**

**Causa**: Los tipos de `params`/`searchParams` no están actualizados.

**Solución**:
```typescript
// ❌ Incorrecto
params: { slug: string }

// ✅ Correcto
params: Promise<{ slug: string }>
```

### **Error de Build: "Parallel route @modal requires a default.js file"**

**Causa**: Falta archivo `default.tsx` en slot de parallel route.

**Solución**:
```tsx
// Crear app/@modal/default.tsx
import { notFound } from 'next/navigation'

export default function Default() {
  notFound()
}
```

### **Warning: "revalidateTag() with single argument is deprecated"**

**Causa**: Falta segundo argumento en `revalidateTag()`.

**Solución**:
```typescript
// ❌ Incorrecto
revalidateTag('blog-posts')

// ✅ Correcto
revalidateTag('blog-posts', 'max')
```

### **Error: "Module not found: fs"**

**Causa**: Importación de módulo Node.js en código del cliente (Turbopack más estricto).

**Solución**:
```typescript
// next.config.ts
export default {
  turbopack: {
    resolveAlias: {
      fs: {
        browser: './empty.ts', // Archivo vacío
      },
    },
  },
}

// Mejor: Mover importación a Server Component o API Route
```

---

## **RECURSOS ADICIONALES**

### **Documentación Oficial**

- [Next.js 16 Announcement](https://nextjs.org/blog/next-16)
- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Next.js Codemod](https://nextjs.org/docs/app/guides/upgrading/codemods)
- [Async Request APIs](https://nextjs.org/docs/app/api-reference/functions/cookies)
- [Turbopack Documentation](https://nextjs.org/docs/app/api-reference/turbopack)

### **Referencias del Proyecto WebCode**

- `.github/support/nextjs16-react19-patterns.md` - Patrones modernos de Next.js 16
- `.github/prompts/desarrollo.prompt.md` - Herramientas de desarrollo
- `.github/prompts/arquitectura-estructura.prompt.md` - Arquitectura Next.js

---

## **NOTAS IMPORTANTES**

⚠️ **BREAKING CHANGES CRÍTICOS**:
1. **APIs asíncronas**: params, searchParams, cookies(), headers(), draftMode() son ahora Promises
2. **Turbopack default**: Webpack es opt-out, Turbopack es default
3. **middleware → proxy**: Renombrar archivo y función
4. **revalidateTag**: Requiere segundo argumento (cacheLife profile)
5. **Parallel routes**: Todos los slots requieren default.tsx

✅ **VENTAJAS DE NEXT.JS 16**:
- 2-5x builds más rápidos (Turbopack)
- 2-10x Fast Refresh más rápido
- Mejor arquitectura de caché con Cache Components
- React 19.2 con View Transitions y useEffectEvent
- Logging mejorado en dev y build

📝 **RECOMENDACIONES**:
1. Ejecutar codemod oficial primero (`npx @next/codemod@canary upgrade latest`)
2. Revisar manualmente archivos con `@next-codemod-error`
3. Probar todas las rutas dinámicas después de migración
4. Verificar Server Actions que usen caché
5. Actualizar tests si es necesario

---

**Proyecto**: WebCode - Plataforma de Desarrollo Web  
**Fecha**: Noviembre 2025  
**Next.js**: 16.0.0+  
**React**: 19.x

# Patrones Modernos: Next.js 16 y React 19

**Última actualización**: Octubre 2025  
**Proyecto**: WEBCODE  
**Stack**: Next.js 16.0.0, React 19.2.0, TypeScript 5.x

---

## 📋 Tabla de Contenidos

1. [Async Request APIs (Next.js 16)](#async-request-apis)
2. [React 19 use() Hook](#react-19-use-hook)
3. [React Compiler Optimizations](#react-compiler-optimizations)
4. [Server vs Client Components](#server-vs-client-components)
5. [Best Practices Checklist](#best-practices-checklist)

---

## 🔄 Async Request APIs (Next.js 16) {#async-request-apis}

### Cambios Importantes en Next.js 16

En Next.js 16, las siguientes APIs ahora son **asíncronas** y devuelven Promises:

- `params` (en páginas dinámicas)
- `searchParams` (query strings)
- `cookies()` (de `next/headers`)
- `headers()` (de `next/headers`)
- `draftMode()` (de `next/headers`)

### Patrón: Params y SearchParams en Pages

#### ✅ Correcto - Server Component (Preferido)

```typescript
// src/app/blog/[slug]/page.tsx
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// generateMetadata también debe ser async
export async function generateMetadata({
  params
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: `${slug} | Blog WebCode`,
    // ...resto de metadata
  };
}

// Página principal
export default async function BlogPostPage({ 
  params, 
  searchParams 
}: BlogPostPageProps) {
  // ✅ await params y searchParams
  const { slug } = await params;
  const { filter } = await searchParams;
  
  const post = await getBlogPostBySlug(slug);
  
  return (
    <div>
      <h1>{post.title}</h1>
      {filter && <p>Filtro: {filter}</p>}
    </div>
  );
}
```

#### ❌ Incorrecto - Patrón Antiguo (No funciona en Next.js 16)

```typescript
// ❌ Esto causará error en Next.js 16
export default function BlogPostPage({ 
  params, 
  searchParams 
}: {
  params: { slug: string }; // ❌ No es Promise
  searchParams: { filter?: string }; // ❌ No es Promise
}) {
  const { slug } = params; // ❌ params es Promise, no puede destructurar directamente
  return <div>{slug}</div>;
}
```

### Patrón: cookies() y headers()

#### ✅ Correcto - Await las funciones

```typescript
// src/app/api/route.ts o cualquier Server Component
import { cookies, headers } from "next/headers";

export async function GET() {
  // ✅ await cookies() y headers()
  const cookieStore = await cookies();
  const headersList = await headers();
  
  const token = cookieStore.get("token");
  const userAgent = headersList.get("user-agent");
  
  return Response.json({ token, userAgent });
}
```

#### ❌ Incorrecto - Llamada sincrónica (No funciona en Next.js 16)

```typescript
// ❌ Esto causará error
import { cookies } from "next/headers";

export function GET() {
  const cookieStore = cookies(); // ❌ Falta await
  const token = cookieStore.get("token");
  return Response.json({ token });
}
```

### Helper Functions con Async APIs

Si creas funciones helper que usan estas APIs, deben ser `async`:

```typescript
// ✅ Correcto - Helper function async
async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

// Uso en página
export default async function ProtectedPage() {
  const token = await getAuthToken();
  
  if (!token) {
    redirect("/login");
  }
  
  return <div>Contenido protegido</div>;
}
```

### generateStaticParams también puede ser async

```typescript
// ✅ generateStaticParams puede usar await
export async function generateStaticParams() {
  const posts = await getAllPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug
  }));
}
```

---

## ⚛️ React 19 use() Hook {#react-19-use-hook}

### ¿Qué es el use() hook?

El hook `use()` de React 19 permite **unwrap** (desenvolver) Promises y Context directamente en componentes. Es especialmente útil en **Client Components** que necesitan acceder a datos asíncronos.

### Cuándo usar use()

| Usar `use()` | Usar `async/await` (Server Component) |
|--------------|--------------------------------------|
| Client Component necesita params/searchParams | Server Component (Preferido) |
| Promise ya está iniciada | Fetch de datos en server |
| Integración con Suspense | Mejor performance |
| Componente requiere interactividad | No necesita JavaScript en cliente |

### Patrón: use() con params en Client Component

```typescript
"use client";

import { use } from "react";

interface ClientPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ filter?: string }>;
}

export function ClientPage({ params, searchParams }: ClientPageProps) {
  // ✅ use() unwrap las Promises en Client Component
  const { id } = use(params);
  const { filter } = use(searchParams);
  
  // Ahora puedes usar hooks de cliente
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>ID: {id}</h1>
      {filter && <p>Filter: {filter}</p>}
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}
```

### Patrón: use() con Suspense

```typescript
"use client";

import { use, Suspense } from "react";

function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  // ✅ use() suspende el componente hasta que se resuelve
  const user = use(userPromise);
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

export function UserProfilePage({ userId }: { userId: string }) {
  // Iniciar el fetch antes de renderizar
  const userPromise = fetchUser(userId);
  
  return (
    <Suspense fallback={<div>Cargando usuario...</div>}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
```

### ⚠️ Limitaciones del use() hook

```typescript
// ❌ NO puedes usar use() condicionalmente
function MyComponent({ shouldFetch, dataPromise }) {
  if (shouldFetch) {
    const data = use(dataPromise); // ❌ Error: hooks condicionales
  }
}

// ✅ Correcto: use() siempre en el top level
function MyComponent({ shouldFetch, dataPromise }) {
  const data = use(dataPromise); // ✅ OK
  
  if (!shouldFetch) {
    return null;
  }
  
  return <div>{data}</div>;
}
```

### Ejemplo Completo: Componente de Referencia

Ver archivo completo: `src/components/examples/React19UseHookExample.tsx`

---

## ⚡ React Compiler Optimizations {#react-compiler-optimizations}

### Estado Actual en WEBCODE

React Compiler está **habilitado** en el proyecto:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  reactCompiler: true, // ✅ Habilitado (movido de experimental en Next.js 16)
  // ...
};
```

### ¿Qué hace React Compiler?

React Compiler **optimiza automáticamente** tus componentes:

- ✅ Memoización automática (sin `useMemo`, `useCallback`)
- ✅ Optimización de re-renders
- ✅ Mejor performance sin cambios de código
- ✅ Compatible con todos los componentes existentes

### Patrones que Benefician del Compiler

#### 1. Props Destructuring Constante

```typescript
// ✅ React Compiler optimiza esto automáticamente
export function BlogPostCard({ post, priority = false }: BlogPostCardProps) {
  // No necesitas useMemo para funciones puras
  const generateIcon = (title: string) => {
    const words = title.split(" ");
    return words.length >= 2 
      ? `${words[0][0]}${words[1][0]}`.toUpperCase()
      : title.slice(0, 2).toUpperCase();
  };
  
  const icon = generateIcon(post.title);
  
  return (
    <Card>
      <div className="icon">{icon}</div>
      <h2>{post.title}</h2>
    </Card>
  );
}

// ❌ Ya NO necesitas hacer esto (React Compiler lo hace automáticamente)
export function BlogPostCard({ post, priority = false }: BlogPostCardProps) {
  const generateIcon = useCallback((title: string) => {
    // ... lógica
  }, []);
  
  const icon = useMemo(() => generateIcon(post.title), [post.title]);
  
  return <Card>...</Card>;
}
```

#### 2. Server Components Son Ideales

```typescript
// ✅ Server Component - Mejor performance
export async function BlogPage() {
  const posts = await getBlogPosts();
  
  // React Compiler + Server Component = Óptimo
  return (
    <div>
      {posts.map(post => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

#### 3. Evitar Patrones que Rompen Optimización

```typescript
// ❌ Evitar: Mutación directa de objetos
function MyComponent({ data }) {
  data.count++; // ❌ Mutación directa
  return <div>{data.count}</div>;
}

// ✅ Correcto: Inmutabilidad
function MyComponent({ data }) {
  const updatedData = { ...data, count: data.count + 1 };
  return <div>{updatedData.count}</div>;
}

// ❌ Evitar: Ref mutation en render
function MyComponent() {
  const ref = useRef({ count: 0 });
  ref.current.count++; // ❌ Mutación durante render
  return <div>{ref.current.count}</div>;
}

// ✅ Correcto: useState para valores que cambian
function MyComponent() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(prev => prev + 1);
  }, []);
  return <div>{count}</div>;
}
```

### Verificar Optimizaciones del Compiler

```bash
# Ver qué componentes están optimizados (en dev mode)
pnpm dev

# React Compiler mostrará warnings si algo bloquea la optimización
# Ejemplo de warning:
# "Component MyComponent cannot be optimized because it uses..."
```

### Componentes Ya Optimizados en WEBCODE

Los siguientes componentes ya están optimizados para React Compiler:

- ✅ `BlogPostCard` - Server Component puro
- ✅ `BlogCategoriesCard` - Server Component puro
- ✅ `TagList` - Componente funcional simple
- ✅ Todos los componentes en `src/components/blog/`

---

## 🔀 Server vs Client Components {#server-vs-client-components}

### Regla de Oro

**Por defecto, usa Server Components. Solo usa Client Components cuando necesites:**

- Interactividad (onClick, onChange, etc.)
- React Hooks (useState, useEffect, etc.)
- Browser APIs (window, localStorage, etc.)
- Event listeners

### Tabla de Decisión Rápida

| Necesitas... | Usar |
|--------------|------|
| Fetch de datos | Server Component + `async/await` |
| Formulario sin JS | Server Component + Server Actions |
| Formulario con validación client-side | Client Component + `useForm` |
| Animaciones CSS | Server Component + clases CSS |
| Animaciones JS | Client Component + Framer Motion |
| Metadata dinámica | Server Component + `generateMetadata` |
| Params/SearchParams | Server Component + `await params` |
| Params en componente interactivo | Client Component + `use(params)` |

### Patrón: Composition (Server + Client)

```typescript
// ✅ Server Component (page.tsx)
export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  return (
    <div>
      <h1>Blog</h1>
      {/* Server Component para datos estáticos */}
      <BlogPostList posts={posts} />
      
      {/* Client Component solo donde se necesita interactividad */}
      <SearchBar />
    </div>
  );
}

// ✅ Server Component para renderizado de lista
export function BlogPostList({ posts }: { posts: BlogPost[] }) {
  return (
    <div>
      {posts.map(post => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

// ✅ Client Component solo para interactividad
"use client";

export function SearchBar() {
  const [query, setQuery] = useState("");
  
  return (
    <input 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Buscar..."
    />
  );
}
```

### Evitar "use client" Innecesario

```typescript
// ❌ Incorrecto: Client Component innecesario
"use client";

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
    </Card>
  );
}

// ✅ Correcto: Server Component (sin "use client")
export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
    </Card>
  );
}
```

---

## ✅ Best Practices Checklist {#best-practices-checklist}

### Para Páginas Next.js 16

- [ ] ¿Usa `params: Promise<...>` y `searchParams: Promise<...>`?
- [ ] ¿`generateMetadata` es `async` y hace `await params`?
- [ ] ¿La función de página es `async` si accede a datos?
- [ ] ¿Se usa `await` antes de destructurar params/searchParams?

### Para APIs Asíncronas

- [ ] ¿Se hace `await cookies()` en lugar de `cookies()`?
- [ ] ¿Se hace `await headers()` en lugar de `headers()`?
- [ ] ¿Las funciones helper que usan estas APIs son `async`?

### Para Client Components

- [ ] ¿Realmente necesita ser Client Component?
- [ ] ¿Se puede dividir en Server Component + Client Component pequeño?
- [ ] ¿Si usa params/searchParams, se usa `use()` hook correctamente?
- [ ] ¿Está envuelto en Suspense si usa `use()` con Promises?

### Para React Compiler

- [ ] ¿Se evitan mutaciones directas de objetos/arrays?
- [ ] ¿Se evitan mutaciones de refs durante render?
- [ ] ¿Se prefieren funciones puras sin side effects?
- [ ] ¿Ya no se usa `useMemo`/`useCallback` innecesariamente?

### Para TypeScript

- [ ] ¿Los tipos de props incluyen `Promise<>` donde corresponde?
- [ ] ¿Se usan interfaces en lugar de tipos inline?
- [ ] ¿Se evita `any` (prohibido por ESLint)?

---

## 📚 Referencias

### Documentación Oficial

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-15)
- [React 19 use() Hook](https://react.dev/reference/react/use)
- [React Compiler](https://react.dev/learn/react-compiler)
- [Next.js App Router](https://nextjs.org/docs/app)

### Archivos de Ejemplo en WEBCODE

- `src/app/(grid)/blog/[slug]/page.tsx` - Ejemplo completo de params async
- `src/app/(grid)/blog/tag/[tag]/page.tsx` - Ejemplo con generateMetadata
- `src/components/examples/React19UseHookExample.tsx` - Ejemplos de use() hook
- `src/components/blog/BlogPostCard.tsx` - Server Component optimizado

### Documentación Interna

- `.github/support/nextjs-best-practices.md` - Mejores prácticas generales
- `.github/support/typescript-best-practices.md` - Patrones TypeScript
- `.github/prompts/desarrollo.prompt.md` - Herramientas de desarrollo
- `.github/prompts/arquitectura-estructura.prompt.md` - Arquitectura del proyecto

---

**Última revisión**: Octubre 2025  
**Mantenedor**: WEBCODE Team  
**Contacto**: GitHub Copilot Assistant

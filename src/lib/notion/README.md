# 📚 Módulo de Integración con Notion

Este módulo proporciona una capa de abstracción completa para interactuar con la API de Notion como CMS del blog.

## 🏗️ Arquitectura

```
src/lib/notion/
├── index.ts              # Exportaciones públicas del módulo
├── client.ts             # Cliente Notion singleton + configuración
├── blog-service.ts       # Lógica de negocio y queries
├── transformers.ts       # Transformadores de datos Notion → BlogPost
├── types.ts              # Tipos TypeScript
├── api-types.ts          # Tipos extendidos de la API
└── README.md            # Esta documentación
```

## � Componentes Principales

### 1. `client.ts` - Cliente y Configuración

**Responsabilidad**: Inicialización del cliente Notion y configuración base.

```typescript
import { notion, DATABASE_ID, queryDatabase } from "./client";

// Cliente singleton ya configurado
const posts = await queryDatabase({
  database_id: DATABASE_ID,
  filter: {
    /* ... */
  }
});
```

**Variables de entorno requeridas**:

- `NOTION_API_KEY` - Token de integración
- `NOTION_DATABASE_ID` - ID de la base de datos

### 2. `blog-service.ts` - Lógica de Negocio

**Características implementadas**:

- ✅ **Caching con `unstable_cache`**: Reduce llamadas a la API (1 hora)
- ✅ **Paginación completa**: Helper `getAllPagesFromDatabase()` itera automáticamente
- ✅ **Manejo de errores**: Errores específicos de Notion mapeados a mensajes útiles
- ✅ **Conversión a Markdown**: Integración con `notion-to-md`

**Funciones principales**:

```typescript
// Obtener posts publicados (con paginación)
const { posts, meta } = await getBlogPosts(pageSize?, startCursor?);

// Obtener post individual por slug
const post = await getBlogPostBySlug('mi-primer-post');

// Filtrar por tag (usa paginación completa automática)
const posts = await getBlogPostsByTag('Next.js', 10);

// Obtener todos los tags únicos
const tags = await getAllTags();

// Obtener todos los slugs (para generateStaticParams)
const slugs = await getAllPublishedSlugs();

// Buscar posts (cache 5 min)
const results = await searchBlogPosts('notion');
```

**Cache y revalidación**:

- Posts/Tags/Slugs: 1 hora (`revalidate: 3600`)
- Búsquedas: 5 minutos (`revalidate: 300`)
- Tag común: `['notion-blog']` para invalidación masiva

### 3. `transformers.ts` - Transformaciones y Validaciones

**Características**:

- ✅ **Validaciones estrictas**: Función `validateProperty()` verifica tipos
- ✅ **Fallbacks seguros**: Valores por defecto si faltan propiedades
- ✅ **Logging detallado**: Warnings/errors en consola para debugging
- ✅ **Manejo de errores**: Try-catch global con fallback completo

**Ejemplo de validación robusta**:

```typescript
const titleProp = validateProperty<NotionPageProperties["Title"]>(
  properties,
  "Title",
  "title"
);

const title = titleProp ? extractTitle(titleProp.title) : "Sin título";
```

Si una página tiene propiedades faltantes o mal formadas, el transformer **no crashea** y devuelve un `BlogPost` con valores seguros.

### 4. `types.ts` - Tipos TypeScript

**Tipos principales**:

- `NotionPageProperties` - Mapea propiedades de Notion
- `BlogPost` - Estructura de post procesado
- `BlogPostsResponse` - Respuesta con metadatos de paginación
- `PaginationMeta` - Cursor y hasMore

### 5. `api-types.ts` - Tipos de API

**Tipos de filtros disponibles**:

- `SelectFilter` - Para campos Select
- `CheckboxFilter` - Para campos Checkbox
- `RichTextFilter` - Para campos Text/Rich Text
- `TitleFilter` - Para campos Title
- `MultiSelectFilter` - Para campos Multi-select
- `AndFilter` / `OrFilter` - Filtros compuestos

## � Flujo de Datos

```
┌─────────────────┐
│  Notion API     │
│  (PageObject)   │
└────────┬────────┘
         │
         │ queryDatabase()
         ▼
┌─────────────────┐
│  client.ts      │
│  Raw response   │
└────────┬────────┘
         │
         │ transformNotionPageToBlogPost()
         ▼
┌─────────────────┐
│ transformers.ts │
│  Validaciones   │
└────────┬────────┘
         │
         │ BlogPost[]
         ▼
┌─────────────────┐
│ blog-service.ts │
│  Cache (1h)     │
└────────┬────────┘
         │
         │ Funciones públicas
         ▼
┌─────────────────┐
│  App Router     │
│  (page.tsx)     │
└─────────────────┘
```

## ⚠️ Manejo de Errores

El módulo maneja explícitamente estos errores de Notion:

| Código             | Descripción                 | Solución                     |
| ------------------ | --------------------------- | ---------------------------- |
| `object_not_found` | Base de datos no compartida | Compartir DB con integración |
| `unauthorized`     | API Key inválida            | Verificar `NOTION_API_KEY`   |
| `validation_error` | Filtro o query mal formado  | Revisar tipos y estructura   |
| `rate_limited`     | Demasiadas peticiones       | Cache automático mitiga esto |

## 🚀 Optimizaciones Implementadas

### 1. Paginación Completa Automática

```typescript
// Obtiene TODOS los posts, iterando automáticamente
const allPages = await getAllPagesFromDatabase(filter, sorts);
// No se limita a 100 resultados (límite de Notion)
```

### 2. Cache Inteligente con Next.js

```typescript
export const getBlogPosts = unstable_cache(
  getBlogPostsUncached,
  ["blog-posts"],
  {
    revalidate: 3600,
    tags: ["notion-blog"]
  }
);
```

**Ventajas**:

- Reduce llamadas a Notion API (~100x menos en producción)
- Mejora tiempo de carga (cache en edge)
- Evita rate limits

### 3. Validaciones Robustas

```typescript
// Si toda la transformación falla, devuelve post de error
return {
  title: "Error al cargar contenido",
  slug: `error-${page.id}`,
  published: false
  // ...
};
```

## 📝 Ejemplos de Uso

### Listado de posts en App Router

```typescript
// app/blog/page.tsx
import { getBlogPosts } from '@/lib/notion';

export default async function BlogPage() {
  const { posts, meta } = await getBlogPosts(10);

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

export const revalidate = 3600; // ISR cada 1 hora
```

### Post individual con generateStaticParams

```typescript
// app/blog/[slug]/page.tsx
import { getBlogPostBySlug, getAllPublishedSlugs } from '@/lib/notion';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) return <div>Post no encontrado</div>;

  return (
    <article>
      <h1>{post.title}</h1>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}
```

## 🧪 Testing y Verificación

### Comandos disponibles

```bash
# Verificar conexión y estructura
pnpm notion:verify

# Listar bases de datos accesibles
pnpm notion:list

# Ver contenido de la base de datos
pnpm notion:content

# Ver contenido detallado de páginas
pnpm notion:pages

# Publicar una página específica
pnpm notion:publish <page_id>
```

### Tests manuales recomendados

1. **Validar propiedades faltantes**:
   - Crear post sin slug → Debe generar slug automático
   - Crear post sin título → Debe usar "Sin título"
   - Post sin Status → No debe publicarse

2. **Paginación completa**:
   - Base de datos con >100 posts → Debe obtener todos

3. **Cache**:
   - Hacer 2 requests seguidos → Segundo debe ser instantáneo
   - Esperar 1 hora → Debe revalidar automáticamente

## 🔒 Seguridad

- **API Key**: Nunca commitear `.env.local`
- **Server-side only**: Todas las llamadas son Server Components
- **Validación**: Siempre validar tipos antes de usar datos

## 📖 Referencias

- [Notion API Docs](https://developers.notion.com/)
- [Next.js unstable_cache](https://nextjs.org/docs/app/api-reference/functions/unstable_cache)
- [notion-to-md](https://github.com/souvikinator/notion-to-md)
- [Guía de Configuración Completa](../../../docs/NOTION-INTEGRATION-SETUP-GUIDE.md)
- [Auditoría Técnica](../../../docs/BLOG-NOTION-DEVTOOLS-AUDIT.md)

---

**Versión**: 2.0.0  
**Última actualización**: Octubre 2025  
**Cambios recientes**: Añadido caching, paginación completa, validaciones estrictas

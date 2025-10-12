# 📚 Librería Notion para WebCode

Módulo para integración con Notion API y gestión del blog.

## 📦 Instalación

```bash
pnpm add @notionhq/client notion-to-md
```

## 🚀 Uso Rápido

```typescript
import { getBlogPosts, getBlogPostBySlug } from '@/lib/notion';

// Obtener todos los posts
const { posts, meta } = await getBlogPosts();

// Obtener un post específico
const post = await getBlogPostBySlug('mi-articulo');
```

## 📁 Archivos

- **`client.ts`**: Cliente de Notion configurado con las credenciales
- **`types.ts`**: Tipos TypeScript para el blog
- **`api-types.ts`**: Tipos extendidos para la API de Notion
- **`transformers.ts`**: Funciones de transformación de datos
- **`blog-service.ts`**: Funciones principales del servicio
- **`index.ts`**: Exportaciones públicas del módulo

## 📖 Documentación Completa

Ver [docs/BLOG-NOTION-GUIDE.md](../../docs/BLOG-NOTION-GUIDE.md) para:
- Configuración de la base de datos
- Variables de entorno
- Ejemplos de uso avanzado
- Solución de problemas

## 🔑 Variables de Entorno Requeridas

```bash
NOTION_API_KEY=ntn_XXXX...
NOTION_DATABASE_ID=XXXX...
```

## 🎯 Características

- ✅ Server Components compatible (Next.js 15)
- ✅ TypeScript strict mode
- ✅ Paginación integrada
- ✅ Cache y revalidación optimizada
- ✅ Conversión de Notion a Markdown
- ✅ Búsqueda y filtros por tags
- ✅ Generación estática de rutas

## 🧪 Ejemplo Completo

```typescript
import {
  getBlogPosts,
  getBlogPostBySlug,
  getBlogPostsByTag,
  getAllTags,
  searchBlogPosts
} from '@/lib/notion';

// Listado con paginación
const { posts, meta } = await getBlogPosts(10);
if (meta.hasMore) {
  const { posts: nextPosts } = await getBlogPosts(10, meta.nextCursor);
}

// Post individual con contenido
const post = await getBlogPostBySlug('mi-slug');
console.log(post.title, post.content);

// Filtrar por tag
const reactPosts = await getBlogPostsByTag('React');

// Obtener todos los tags
const tags = await getAllTags();

// Buscar
const results = await searchBlogPosts('Next.js');
```

## 🔄 Actualización de Datos

Los datos se actualizan automáticamente según la configuración de `revalidate` en cada página:

```typescript
export const revalidate = 3600; // 1 hora
```

Para forzar actualización: `pnpm build`

## 🐛 Debugging

Si los datos no aparecen, verifica:

1. Variables de entorno configuradas
2. Integración conectada a la base de datos en Notion
3. Propiedad `published` marcada en los posts
4. Logs del servidor para errores de API

---

Desarrollado para WebCode - Soluciones Web Profesionales

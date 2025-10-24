# 📝 Plantilla de Artículo para Notion

## Información de la Página (Propiedades)

### Obligatorias

- **title**: Cómo Implementar un Blog con Notion y Next.js 15
- **slug**: blog-notion-nextjs-15
- **excerpt**: Aprende a crear un blog moderno conectando Notion como CMS con Next.js 15, incluyendo Server Components, TypeScript y optimización SEO.
- **published**: ☑ (marca cuando esté listo)
- **date**: 2025-01-12

### Opcionales

- **tags**: Next.js, React, Notion, CMS, TypeScript
- **author**: Tu Nombre
- **cover**: [Agrega una imagen de portada]
- **readTime**: 10

---

## Contenido del Artículo (Cuerpo de la Página)

# Introducción

En este artículo, te mostraré cómo crear un blog profesional utilizando Notion como sistema de gestión de contenido (CMS) y Next.js 15 como framework frontend. Esta combinación ofrece lo mejor de ambos mundos: la simplicidad de Notion para escribir y la potencia de Next.js para el rendimiento.

## ¿Por qué Notion + Next.js?

Notion se ha convertido en una herramienta popular para la gestión de contenido gracias a su interfaz intuitiva y sus capacidades de colaboración. Combinado con Next.js 15, obtienes:

- ✅ Editor visual fácil de usar
- ✅ Colaboración en tiempo real
- ✅ Sin necesidad de CMS complejo
- ✅ Rendimiento extremo con SSG/ISR
- ✅ SEO optimizado automáticamente

## Requisitos Previos

Antes de comenzar, asegúrate de tener:

1. Cuenta de Notion (gratuita)
2. Node.js 18+ instalado
3. Conocimientos básicos de React y TypeScript
4. pnpm o npm instalado

## Paso 1: Configurar la Base de Datos en Notion

### Crear la Estructura

1. Abre Notion y crea una nueva página
2. Agrega una base de datos (Database - Full Page)
3. Configura las siguientes propiedades:

| Propiedad | Tipo         | Obligatorio |
| --------- | ------------ | ----------- |
| title     | Title        | ✅          |
| slug      | Text         | ✅          |
| excerpt   | Text         | ✅          |
| published | Checkbox     | ✅          |
| date      | Date         | ✅          |
| tags      | Multi-select | ❌          |
| author    | Text         | ❌          |
| cover     | Files        | ❌          |

## Paso 2: Crear la Integración de Notion

### Obtener las Credenciales

```bash
# 1. Ve a https://www.notion.so/my-integrations
# 2. Click en "+ Nueva integración"
# 3. Nombra tu integración: "Mi Blog"
# 4. Copia el Internal Integration Token
```

### Variables de Entorno

Crea un archivo `.env.local` en la raíz de tu proyecto:

```bash
NOTION_API_KEY=ntn_XXXXXXXXXXXXXXXXXX
NOTION_DATABASE_ID=XXXXXXXXXXXXXXXXXX
```

## Paso 3: Instalar Dependencias

```bash
pnpm add @notionhq/client notion-to-md
pnpm add react-markdown rehype-raw rehype-sanitize rehype-highlight
```

## Paso 4: Configurar el Cliente de Notion

```typescript
// src/lib/notion/client.ts
import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY
});

export const DATABASE_ID = process.env.NOTION_DATABASE_ID!;
```

## Paso 5: Crear el Servicio del Blog

```typescript
// src/lib/notion/blog-service.ts
import { notion, DATABASE_ID } from "./client";

export async function getBlogPosts() {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: "published",
      checkbox: { equals: true }
    },
    sorts: [{ property: "date", direction: "descending" }]
  });

  return response.results;
}
```

## Paso 6: Crear la Página del Blog

```typescript
// src/app/blog/page.tsx
import { getBlogPosts } from '@/lib/notion';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <h1>Blog</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

## Optimizaciones de Rendimiento

### Cache y Revalidación

Next.js 15 permite configurar la revalidación de datos fácilmente:

```typescript
export const revalidate = 3600; // 1 hora
```

### Generación Estática

Usa `generateStaticParams` para pre-renderizar tus posts:

```typescript
export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}
```

## Mejores Prácticas

1. **Usa Server Components**: Aprovecha Next.js 15 para fetch en servidor
2. **Implementa ISR**: Revalida contenido periódicamente
3. **Optimiza imágenes**: Usa `next/image` para todas las imágenes
4. **Añade metadata SEO**: Genera metadata dinámica por artículo
5. **Implementa caching**: Reduce llamadas a la API de Notion

## Recursos Adicionales

- [Documentación de Notion API](https://developers.notion.com/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [notion-to-md en GitHub](https://github.com/souvikinator/notion-to-md)

## Conclusión

Implementar un blog con Notion y Next.js 15 te da lo mejor de ambos mundos: una experiencia de edición intuitiva y un sitio web de alto rendimiento. Con Server Components, ISR y TypeScript, obtienes una solución profesional y escalable.

¿Tienes preguntas? Déjame un comentario abajo o contáctame en [tu email].

---

## Imágenes Sugeridas

- Diagrama de arquitectura Notion → Next.js
- Screenshots de la configuración de Notion
- Capturas del resultado final
- Código con syntax highlighting

## Tags Sugeridos

- Next.js
- React
- Notion
- CMS Headless
- TypeScript
- Web Development
- Tutorial

---

Este es un ejemplo de cómo estructurar un artículo completo. Puedes adaptarlo a tu estilo y necesidades.

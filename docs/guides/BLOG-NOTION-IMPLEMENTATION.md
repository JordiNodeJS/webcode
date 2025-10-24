# Implementación del Blog con Notion

## Introducción

Este documento explica cómo está implementada la funcionalidad del blog en WebCode, que utiliza Notion como sistema de gestión de contenidos (CMS). La integración permite crear, editar y publicar artículos directamente desde Notion, que se sincronizan automáticamente con el sitio web.

## Arquitectura General

```
┌─────────────────┐
│   Notion API    │
│  (Base de datos)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Cliente Notion │
│   (client.ts)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Transformadores│
│(transformers.ts)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Servicio Blog  │
│(blog-service.ts)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Rutas Next.js  │
│   (app/blog/)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Componentes UI  │
│  (components/)  │
└─────────────────┘
```

## Componentes Clave

### 1. Cliente de Notion (`src/lib/notion/client.ts`)

El cliente de Notion es responsable de la configuración y conexión con la API de Notion.

**Características principales:**

- Cliente singleton para optimizar conexiones
- Validación de variables de entorno (`NOTION_API_KEY`, `NOTION_DATABASE_ID`)
- Función `queryDatabase` adaptada para la API v5.1.0 de Notion

### 2. Transformadores (`src/lib/notion/transformers.ts`)

Los transformadores convierten los datos obtenidos de la API de Notion en objetos utilizables por la aplicación.

**Funciones principales:**

- `transformNotionPageToBlogPost`: Convierte una página de Notion en un objeto BlogPost
- `generateSlug`: Genera slugs URL-amigables a partir de títulos
- `calculateReadTime`: Calcula el tiempo estimado de lectura
- Validaciones estrictas de propiedades con fallbacks seguros

### 3. Servicio de Blog (`src/lib/notion/blog-service.ts`)

El servicio de blog contiene toda la lógica de negocio para obtener y procesar los posts del blog.

**Funciones principales:**

- `getBlogPosts`: Obtiene posts publicados con paginación
- `getBlogPostBySlug`: Obtiene un post individual por su slug
- `getBlogPostsByTag`: Filtra posts por tag/categoría
- `getAllTags`: Obtiene todos los tags únicos
- `getAllPublishedSlugs`: Para generación estática de rutas
- `searchBlogPosts`: Búsqueda de posts por términos

**Características adicionales:**

- Paginación completa automática
- Caching con `unstable_cache` de Next.js (1 hora de revalidación)
- Manejo específico de errores de Notion API

### 4. Tipos (`src/lib/notion/types.ts`)

Define los tipos TypeScript utilizados en la integración:

- `NotionPageProperties`: Mapeo de propiedades de la base de datos Notion
- `BlogPost`: Estructura de post procesado
- `BlogPostsResponse`: Respuesta con metadatos de paginación

### 5. Rutas de la Aplicación

#### Página principal del blog (`src/app/blog/page.tsx`)

Muestra una lista de todos los posts publicados.

**Características:**

- Uso de `getBlogPosts` para obtener posts
- Sidebar con categorías usando `getAllTags`
- Componente `BlogPostCard` para mostrar cada post
- Metadata SEO completa

#### Página de post individual (`src/app/blog/[slug]/page.tsx`)

Muestra el contenido completo de un artículo específico.

**Características:**

- `generateStaticParams` para generación estática
- `getBlogPostBySlug` para obtener contenido
- `MarkdownRenderer` para mostrar contenido en Markdown
- Posts relacionados por tag
- Schema.org estructurado para SEO
- Breadcrumb navigation

#### Página por tag (`src/app/blog/tag/[tag]/page.tsx`)

Muestra posts filtrados por categoría.

**Características:**

- `getBlogPostsByTag` para filtrar posts
- Sidebar con otras categorías

### 6. Componentes UI

#### BlogPostCard (`src/components/blog/BlogPostCard.tsx`)

Tarjeta reutilizable para mostrar posts en listados.

**Características:**

- Animaciones y efectos visuales
- Imágenes con Next.js Image
- Enlaces a tags y página de detalle

#### MarkdownRenderer (`src/components/blog/MarkdownRenderer.tsx`)

Renderiza el contenido Markdown de los posts.

**Características:**

- Soporte para código con syntax highlighting
- Estilos tipo Notion
- Componentes personalizados para todos los elementos Markdown
- Botón de copiar para bloques de código

## Flujo de Obtención y Visualización de Posts

1. **Configuración**: El cliente Notion se inicializa con las credenciales del entorno
2. **Obtención de datos**:
   - La página del blog llama a `getBlogPosts` que consulta la base de datos
   - Se aplican filtros para mostrar solo posts con status "Published"
   - Los datos se transforman de objetos Notion a objetos BlogPost
3. **Caching**: Los resultados se cachean durante 1 hora para mejorar el rendimiento
4. **Visualización**:
   - Los posts se muestran usando componentes UI como `BlogPostCard`
   - Para posts individuales, el contenido Markdown se renderiza con `MarkdownRenderer`
5. **SEO**: Se generan metadatos dinámicos y schemas estructurados para cada página

## Requisitos de la Base de Datos Notion

La base de datos de Notion debe contener las siguientes propiedades:

| Propiedad       | Tipo         | Obligatorio | Descripción                        |
| --------------- | ------------ | ----------- | ---------------------------------- |
| `Title`         | Title        | ✅          | Título del artículo                |
| `Slug`          | Text         | ✅          | URL amigable                       |
| `Description`   | Text         | ✅          | Resumen/excerpt del artículo       |
| `Status`        | Select       | ✅          | Estado: `Published`, `Draft`, etc. |
| `PublishedDate` | Date         | ✅          | Fecha de publicación               |
| `Tags`          | Multi-select | ⚪          | Categorías del artículo            |
| `Author`        | Person       | ⚪          | Autor del artículo                 |
| `CoverImageURL` | URL          | ⚪          | URL de la imagen de portada        |
| `Featured`      | Checkbox     | ⚪          | Marcar como destacado              |

## Características Clave de la Implementación

1. **Robustez**: Manejo de errores en todas las capas con fallbacks seguros
2. **Performance**: Caching inteligente, paginación completa, optimización de imágenes
3. **SEO**: Metadatos completos, schemas estructurados, URLs amigables
4. **Accesibilidad**: Componentes con atributos ARIA apropiados
5. **Flexibilidad**: Sistema de tags, búsqueda, filtrado por categorías
6. **Mantenimiento**: Código bien estructurado en módulos con tipos TypeScript

## Comandos Disponibles

```bash
# Verificar conexión y estructura
pnpm notion:verify

# Listar bases de datos accesibles
pnpm notion:list

# Buscar base de datos por nombre
pnpm notion:search

# Ver contenido de la base de datos
pnpm notion:content

# Ver contenido detallado de páginas
pnpm notion:pages

# Publicar una página específica
pnpm notion:publish <page_id>
```

## Consideraciones Técnicas

1. **Variables de Entorno**: Asegúrate de tener configuradas `NOTION_API_KEY` y `NOTION_DATABASE_ID` en tu archivo `.env.local`.

2. **Compartir Base de Datos**: La base de datos de Notion debe estar compartida con la integración para que la aplicación pueda acceder a ella.

3. **Estructura de Propiedades**: Las propiedades de la base de datos deben coincidir exactamente con las definidas en `NotionPageProperties`.

4. **Caching**: La aplicación utiliza caching agresivo para mejorar el rendimiento. Los cambios en Notion pueden tardar hasta una hora en reflejarse en el sitio web debido a la revalidación.

5. **Manejo de Imágenes**: Las imágenes de portada pueden provenir del campo `CoverImageURL` o directamente de la propiedad `cover` de la página en Notion.

Esta implementación proporciona una integración completa entre Notion como CMS y Next.js como frontend, permitiendo gestionar contenido de blog directamente desde Notion con una excelente experiencia de usuario en el sitio web.

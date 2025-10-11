# 📝 Guía de Integración con Notion para el Blog

## 🎯 Resumen

Esta guía explica cómo está configurada la integración con Notion API para el blog de WebCode y cómo utilizarla correctamente.

## 📋 Estructura de la Base de Datos de Notion

Tu base de datos de Notion debe tener las siguientes propiedades:

### Propiedades Obligatorias

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| **title** | Title | Título del artículo |
| **slug** | Rich Text | URL amigable (ej: "mi-primer-articulo") |
| **excerpt** | Rich Text | Resumen breve del artículo (150-200 caracteres) |
| **published** | Checkbox | Si está marcado, el artículo aparece en el blog |
| **date** | Date | Fecha de publicación |

### Propiedades Opcionales

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| **tags** | Multi-select | Categorías del artículo |
| **author** | Rich Text | Nombre del autor (por defecto: "WebCode") |
| **cover** | Files | Imagen de portada |
| **readTime** | Number | Tiempo estimado de lectura en minutos |

## 🔧 Configuración de Variables de Entorno

En tu archivo `.env.local`:

```bash
# Notion API Configuration
NOTION_API_KEY=ntn_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NOTION_DATABASE_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Cómo Obtener las Credenciales

1. **NOTION_API_KEY**:
   - Ve a https://www.notion.so/my-integrations
   - Crea una nueva integración
   - Copia el "Internal Integration Token"

2. **NOTION_DATABASE_ID**:
   - Abre tu base de datos en Notion
   - Copia el ID de la URL:
     ```
     https://notion.so/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX?v=...
                     ↑ Este es tu DATABASE_ID
     ```

3. **Conectar la Integración**:
   - En tu base de datos de Notion
   - Click en "..." (más opciones) → "Add connections"
   - Selecciona tu integración

## 📁 Arquitectura de Archivos

```
src/
├── lib/
│   └── notion/
│       ├── client.ts           # Cliente de Notion configurado
│       ├── types.ts            # Tipos TypeScript para el blog
│       ├── api-types.ts        # Tipos extendidos de la API
│       ├── transformers.ts     # Transformación de datos
│       ├── blog-service.ts     # Funciones principales
│       └── index.ts            # Exportaciones públicas
├── app/
│   └── blog/
│       ├── page.tsx            # Listado de posts
│       ├── [slug]/
│       │   └── page.tsx        # Detalle del post
│       └── tag/
│           └── [tag]/
│               └── page.tsx    # Posts por categoría
└── components/
    └── blog/
        └── MarkdownRenderer.tsx # Renderizador de markdown
```

## 🚀 Funciones Disponibles

### `getBlogPosts(pageSize?, startCursor?)`
Obtiene todos los posts publicados con paginación.

```typescript
const { posts, meta } = await getBlogPosts(10);
```

### `getBlogPostBySlug(slug)`
Obtiene un post específico por su slug, incluyendo el contenido completo.

```typescript
const post = await getBlogPostBySlug("mi-primer-articulo");
```

### `getBlogPostsByTag(tag, pageSize?)`
Obtiene posts filtrados por una categoría específica.

```typescript
const posts = await getBlogPostsByTag("Next.js", 5);
```

### `getAllTags()`
Obtiene todas las categorías con el conteo de artículos.

```typescript
const tags = await getAllTags();
// [{ name: "Next.js", count: 5 }, { name: "React", count: 3 }]
```

### `getAllPublishedSlugs()`
Obtiene todos los slugs publicados (útil para `generateStaticParams`).

```typescript
const slugs = await getAllPublishedSlugs();
// ["primer-articulo", "segundo-articulo", ...]
```

### `searchBlogPosts(searchTerm)`
Busca posts por término en título o excerpt.

```typescript
const results = await searchBlogPosts("Next.js");
```

## ✍️ Escribir un Nuevo Artículo

1. **Crea una nueva página** en tu base de datos de Notion
2. **Rellena las propiedades**:
   - Title: "Mi Primer Artículo"
   - Slug: "mi-primer-articulo"
   - Excerpt: "Descripción breve del artículo"
   - Published: ☑ (marca cuando esté listo para publicar)
   - Date: Selecciona la fecha
   - Tags: Agrega categorías relevantes
3. **Escribe el contenido** usando el editor de Notion:
   - Headings (H1, H2, H3)
   - Párrafos
   - Listas
   - Código (inline y bloques)
   - Imágenes
   - Quotes
   - Tablas
4. **Publica**: El artículo aparecerá en tu blog automáticamente

## 🎨 Formato de Contenido Soportado

El contenido se convierte de Notion a Markdown y soporta:

- ✅ Headings (H1 - H6)
- ✅ Párrafos y texto enriquecido
- ✅ Listas ordenadas y desordenadas
- ✅ Bloques de código con syntax highlighting
- ✅ Inline code
- ✅ Imágenes
- ✅ Enlaces (internos y externos)
- ✅ Blockquotes
- ✅ Tablas
- ✅ Dividers (líneas horizontales)

## 🔄 Caché y Revalidación

- **Listado de posts**: Se revalida cada 1 hora (3600 segundos)
- **Detalle de post**: Se revalida cada 1 hora
- **Posts por tag**: Se revalida cada 1 hora
- **Build time**: Los posts se generan estáticamente en el build

Para forzar una actualización inmediata:
```bash
pnpm build
```

## 🐛 Solución de Problemas

### Error: "NOTION_API_KEY no está configurada"
- Verifica que `.env.local` existe en la raíz del proyecto
- Verifica que la variable tiene el formato correcto
- Reinicia el servidor de desarrollo

### Los posts no aparecen
- Verifica que la propiedad `published` está marcada (☑)
- Verifica que la integración tiene acceso a la base de datos
- Revisa la consola del servidor para errores

### Error de tipos TypeScript
- Verifica que todas las propiedades obligatorias existen en Notion
- Los nombres de las propiedades deben coincidir exactamente (case-sensitive)

### Imágenes no se muestran
- Verifica que las imágenes tienen permisos públicos
- Usa el campo `cover` para la imagen de portada
- Las imágenes dentro del contenido se extraen automáticamente

## 📚 Referencias

- [Notion API Documentation](https://developers.notion.com/)
- [notion-to-md GitHub](https://github.com/souvikinator/notion-to-md)
- [Next.js App Router](https://nextjs.org/docs/app)

## 🎯 Próximos Pasos

- [ ] Agregar búsqueda en tiempo real
- [ ] Implementar comentarios
- [ ] Agregar vista previa de drafts
- [ ] Implementar RSS feed
- [ ] Analytics de artículos

---

¿Necesitas ayuda? Abre un issue o contacta al equipo de desarrollo.

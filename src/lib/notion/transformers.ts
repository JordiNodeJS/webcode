/**
 * Transformadores de datos de Notion
 * Convierten las respuestas de Notion API a nuestros tipos TypeScript
 */

import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlogPost, NotionPageProperties } from "./types";

/**
 * Extrae texto plano de un campo rich_text de Notion
 */
function extractRichText(
  richText: Array<{ plain_text: string }> | undefined,
): string {
  if (!richText || richText.length === 0) return "";
  return richText.map((text) => text.plain_text).join("");
}

/**
 * Extrae texto plano de un campo title de Notion
 */
function extractTitle(
  title: Array<{ plain_text: string }> | undefined,
): string {
  if (!title || title.length === 0) return "";
  return title.map((text) => text.plain_text).join("");
}

/**
 * Valida que una propiedad existe y tiene el tipo esperado
 */
function validateProperty<T>(
  properties: unknown,
  propertyName: string,
  propertyType: string,
): T | null {
  try {
    if (
      !properties ||
      typeof properties !== "object" ||
      !(propertyName in properties)
    ) {
      console.warn(`Propiedad "${propertyName}" no encontrada en la página`);
      return null;
    }

    const prop = (properties as Record<string, { type?: string }>)[
      propertyName
    ];
    if (!prop || prop.type !== propertyType) {
      console.warn(
        `Propiedad "${propertyName}" tiene tipo incorrecto. Esperado: ${propertyType}, Recibido: ${prop?.type || "undefined"}`,
      );
      return null;
    }

    return prop as T;
  } catch (error) {
    console.error(
      `Error al validar propiedad "${propertyName}":`,
      error instanceof Error ? error.message : String(error),
    );
    return null;
  }
}

/**
 * Transforma una página de Notion en un objeto BlogPost con validaciones estrictas
 * Incluye manejo de errores y valores por defecto seguros
 */
export function transformNotionPageToBlogPost(
  page: PageObjectResponse,
): BlogPost {
  try {
    const properties = page.properties as unknown as NotionPageProperties;

    // Validar propiedades críticas
    if (!properties) {
      throw new Error(
        `Página ${page.id} no tiene propiedades válidas. Verifica la estructura de la base de datos.`,
      );
    }

    // Extraer título (obligatorio)
    const titleProp = validateProperty<NotionPageProperties["Title"]>(
      properties,
      "Title",
      "title",
    );
    const title = titleProp ? extractTitle(titleProp.title) : "";

    if (!title) {
      console.warn(
        `Página ${page.id} no tiene título. Se usará "Sin título" como fallback.`,
      );
    }

    // Extraer slug (obligatorio para URLs)
    const slugProp = validateProperty<NotionPageProperties["Slug"]>(
      properties,
      "Slug",
      "rich_text",
    );
    const slug = slugProp ? extractRichText(slugProp.rich_text) : "";

    if (!slug) {
      console.warn(
        `Página ${page.id} ("${title}") no tiene slug. Se generará automáticamente.`,
      );
    }

    // Extraer excerpt/descripción
    const descProp = validateProperty<NotionPageProperties["Description"]>(
      properties,
      "Description",
      "rich_text",
    );
    const excerpt = descProp ? extractRichText(descProp.rich_text) : "";

    // Extraer status (crítico para publicación)
    const statusProp = validateProperty<NotionPageProperties["Status"]>(
      properties,
      "Status",
      "select",
    );
    const published = statusProp?.select?.name === "Published";

    if (!statusProp) {
      console.warn(
        `Página ${page.id} ("${title}") no tiene propiedad Status. Se marcará como no publicada.`,
      );
    }

    // Extraer fecha de publicación
    const dateProp = validateProperty<NotionPageProperties["PublishedDate"]>(
      properties,
      "PublishedDate",
      "date",
    );
    const date = dateProp?.date?.start ?? page.created_time;

    // Extraer tags (array puede estar vacío)
    const tagsProp = validateProperty<NotionPageProperties["Tags"]>(
      properties,
      "Tags",
      "multi_select",
    );
    const tags = tagsProp?.multi_select ?? [];

    // Extraer autor
    const authorProp = validateProperty<NotionPageProperties["Author"]>(
      properties,
      "Author",
      "people",
    );
    const author = authorProp?.people?.[0]?.name || "WebCode";

    // Extraer imagen de portada
    let coverImage: string | undefined;

    // Prioridad 1: Cover de la página
    if (page.cover) {
      try {
        if (page.cover.type === "external") {
          coverImage = page.cover.external.url;
        } else if (page.cover.type === "file") {
          coverImage = page.cover.file.url;
        }
      } catch (error) {
        console.warn(
          `Error al extraer cover de página ${page.id}:`,
          error instanceof Error ? error.message : String(error),
        );
      }
    }

    // Prioridad 2: CoverImageURL de propiedades
    if (!coverImage) {
      const coverProp = validateProperty<NotionPageProperties["CoverImageURL"]>(
        properties,
        "CoverImageURL",
        "url",
      );
      coverImage = coverProp?.url || undefined;
    }

    return {
      id: page.id,
      title: title || "Sin título",
      slug: slug || generateSlug(title || page.id),
      excerpt,
      published,
      date,
      tags,
      author,
      coverImage,
      readTime: undefined, // Se calculará después si es necesario
      createdAt: page.created_time,
      updatedAt: page.last_edited_time,
    };
  } catch (error) {
    console.error(
      `Error crítico al transformar página ${page.id}:`,
      error instanceof Error ? error.message : String(error),
    );

    // Fallback seguro para evitar crashes
    return {
      id: page.id,
      title: "Error al cargar contenido",
      slug: `error-${page.id}`,
      excerpt:
        "Hubo un error al procesar este artículo. Contacta al administrador.",
      published: false,
      date: page.created_time,
      tags: [],
      author: "WebCode",
      coverImage: undefined,
      readTime: undefined,
      createdAt: page.created_time,
      updatedAt: page.last_edited_time,
    };
  }
}

/**
 * Genera un slug a partir de un título
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD") // Normaliza caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Elimina diacríticos
    .replace(/[^\w\s-]/g, "") // Elimina caracteres especiales
    .replace(/\s+/g, "-") // Reemplaza espacios por guiones
    .replace(/-+/g, "-") // Elimina guiones múltiples
    .trim();
}

/**
 * Calcula el tiempo de lectura estimado en minutos
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

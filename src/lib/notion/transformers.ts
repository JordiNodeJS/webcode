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
 * Transforma una página de Notion en un objeto BlogPost
 */
export function transformNotionPageToBlogPost(
  page: PageObjectResponse,
): BlogPost {
  const properties = page.properties as unknown as NotionPageProperties;

  // Extrae la URL de la imagen de portada
  let coverImage: string | undefined;
  if (page.cover) {
    if (page.cover.type === "external") {
      coverImage = page.cover.external.url;
    } else if (page.cover.type === "file") {
      coverImage = page.cover.file.url;
    }
  }

  // Si no hay cover en la página, intenta extraerlo de las propiedades
  if (!coverImage && properties.CoverImageURL?.url) {
    coverImage = properties.CoverImageURL.url;
  }

  return {
    id: page.id,
    title: extractTitle(properties.Title?.title),
    slug: extractRichText(properties.Slug?.rich_text),
    excerpt: extractRichText(properties.Description?.rich_text),
    published: properties.Status?.select?.name === "Published",
    date: properties.PublishedDate?.date?.start ?? page.created_time,
    tags: properties.Tags?.multi_select ?? [],
    author: properties.Author?.people?.[0]?.name || "WebCode",
    coverImage,
    readTime: undefined, // Se calculará después si es necesario
    createdAt: page.created_time,
    updatedAt: page.last_edited_time,
  };
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

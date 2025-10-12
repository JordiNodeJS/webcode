/**
 * Servicio de Blog con Notion API
 * Funciones para obtener y procesar artículos del blog desde Notion
 */

import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import type { ExtendedNotionClient } from "./api-types";
import { DATABASE_ID, notion, queryDatabase } from "./client";
import {
  calculateReadTime,
  transformNotionPageToBlogPost,
} from "./transformers";
import type { BlogPost, BlogPostsResponse } from "./types";

// Cliente para convertir bloques de Notion a Markdown
const n2m = new NotionToMarkdown({ notionClient: notion });

// Cliente extendido con tipos completos
const notionClient = notion as ExtendedNotionClient;

/**
 * Obtiene todos los posts publicados del blog
 * @param pageSize - Número de posts por página (default: 10)
 * @param startCursor - Cursor para paginación
 */
export async function getBlogPosts(
  pageSize = 10,
  startCursor?: string,
): Promise<BlogPostsResponse> {
  try {
    const response = await queryDatabase({
      database_id: DATABASE_ID,
      filter: {
        property: "Status",
        select: {
          equals: "Published",
        },
      } as any,
      sorts: [
        {
          property: "PublishedDate",
          direction: "descending",
        },
      ],
      page_size: pageSize,
      start_cursor: startCursor,
    });

    const posts = response.results
      .filter((page: unknown): page is PageObjectResponse => {
        return (
          typeof page === "object" && page !== null && "properties" in page
        );
      })
      .map(transformNotionPageToBlogPost);

    return {
      posts,
      meta: {
        hasMore: response.has_more,
        nextCursor: response.next_cursor ?? undefined,
      },
    };
  } catch (error: unknown) {
    console.error("Error al obtener posts del blog:", error);

    // Manejo específico de errores de Notion API
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "object_not_found"
    ) {
      throw new Error(
        "La base de datos de Notion no está compartida con la integración. " +
          "Por favor, comparte la base de datos con tu integración en Notion.",
      );
    }

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "unauthorized"
    ) {
      throw new Error(
        "API Key de Notion inválida. Verifica tu NOTION_API_KEY en .env.local",
      );
    }

    throw new Error("No se pudieron obtener los artículos del blog");
  }
}

/**
 * Obtiene un post individual por slug
 * @param slug - Slug del post
 */
export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  try {
    const response = await queryDatabase({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: "Status",
            select: {
              equals: "Published",
            },
          },
          {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
        ],
      } as any,
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0] as PageObjectResponse;
    const post = transformNotionPageToBlogPost(page);

    // Obtiene el contenido completo del post
    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);
    post.content = mdString.parent;

    // Calcula el tiempo de lectura si no está definido
    if (!post.readTime && post.content) {
      post.readTime = calculateReadTime(post.content);
    }

    return post;
  } catch (error) {
    console.error(`Error al obtener el post con slug "${slug}":`, error);
    return null;
  }
}

/**
 * Obtiene posts filtrados por tag
 * @param tag - Nombre del tag
 * @param pageSize - Número de posts por página
 */
export async function getBlogPostsByTag(
  tag: string,
  pageSize = 10,
): Promise<BlogPost[]> {
  try {
    const response = await queryDatabase({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: "Status",
            select: {
              equals: "Published",
            },
          },
          {
            property: "Tags",
            multi_select: {
              contains: tag,
            },
          },
        ],
      } as any,
      sorts: [
        {
          property: "PublishedDate",
          direction: "descending",
        },
      ],
      page_size: pageSize,
    });

    return response.results
      .filter((page: unknown): page is PageObjectResponse => {
        return (
          typeof page === "object" && page !== null && "properties" in page
        );
      })
      .map(transformNotionPageToBlogPost);
  } catch (error) {
    console.error(`Error al obtener posts con tag "${tag}":`, error);
    throw new Error(`No se pudieron obtener artículos con el tag "${tag}"`);
  }
}

/**
 * Obtiene todos los tags únicos del blog
 */
export async function getAllTags(): Promise<
  Array<{ name: string; count: number }>
> {
  try {
    const response = await queryDatabase({
      database_id: DATABASE_ID,
      filter: {
        property: "Status",
        select: {
          equals: "Published",
        },
      } as any,
    });

    const tagCounts = new Map<string, number>();

    for (const page of response.results) {
      if ("properties" in page) {
        const post = transformNotionPageToBlogPost(page);
        for (const tag of post.tags) {
          tagCounts.set(tag.name, (tagCounts.get(tag.name) ?? 0) + 1);
        }
      }
    }

    return Array.from(tagCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error("Error al obtener tags:", error);
    return [];
  }
}

/**
 * Obtiene todos los slugs publicados (útil para generateStaticParams)
 */
export async function getAllPublishedSlugs(): Promise<string[]> {
  try {
    const response = await queryDatabase({
      database_id: DATABASE_ID,
      filter: {
        property: "Status",
        select: {
          equals: "Published",
        },
      } as any,
    });

    return response.results
      .filter((page: unknown): page is PageObjectResponse => {
        return (
          typeof page === "object" && page !== null && "properties" in page
        );
      })
      .map(transformNotionPageToBlogPost)
      .map((post: BlogPost) => post.slug)
      .filter((slug: string) => slug.length > 0);
  } catch (error) {
    console.error("Error al obtener slugs:", error);
    return [];
  }
}

/**
 * Busca posts por término de búsqueda
 * @param searchTerm - Término de búsqueda
 */
export async function searchBlogPosts(searchTerm: string): Promise<BlogPost[]> {
  try {
    const response = await queryDatabase({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: "Status",
            select: {
              equals: "Published",
            },
          },
          {
            or: [
              {
                property: "Title",
                title: {
                  contains: searchTerm,
                },
              },
              {
                property: "Description",
                rich_text: {
                  contains: searchTerm,
                },
              },
            ],
          },
        ],
      } as any,
      sorts: [
        {
          property: "PublishedDate",
          direction: "descending",
        },
      ],
    });

    return response.results
      .filter((page: unknown): page is PageObjectResponse => {
        return (
          typeof page === "object" && page !== null && "properties" in page
        );
      })
      .map(transformNotionPageToBlogPost);
  } catch (error) {
    console.error(`Error al buscar posts con "${searchTerm}":`, error);
    return [];
  }
}

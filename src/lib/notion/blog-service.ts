/**
 * Servicio de Blog con Notion API
 * Funciones para obtener y procesar artículos del blog desde Notion
 */

import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { unstable_cache } from "next/cache";
import { NotionToMarkdown } from "notion-to-md";
import type { DatabaseFilter, DatabaseSort } from "./api-types";
import { DATABASE_ID, notion, queryDatabase } from "./client";
import {
  calculateReadTime,
  transformNotionPageToBlogPost,
} from "./transformers";
import type { BlogPost, BlogPostsResponse } from "./types";

// Cliente para convertir bloques de Notion a Markdown
const n2m = new NotionToMarkdown({ notionClient: notion });

/**
 * Helper para obtener todos los resultados de una query con paginación completa
 * Itera automáticamente por todos los next_cursor hasta obtener todos los datos
 */
async function getAllPagesFromDatabase(
  filter?: DatabaseFilter,
  sorts?: DatabaseSort[],
): Promise<PageObjectResponse[]> {
  const allPages: PageObjectResponse[] = [];
  let hasMore = true;
  let startCursor: string | undefined;

  while (hasMore) {
    const response = await queryDatabase({
      database_id: DATABASE_ID,
      filter,
      sorts,
      page_size: 100, // Máximo permitido por Notion API
      start_cursor: startCursor,
    });

    const validPages = response.results.filter(
      (page: unknown): page is PageObjectResponse => {
        return (
          typeof page === "object" && page !== null && "properties" in page
        );
      },
    );

    allPages.push(...validPages);
    hasMore = response.has_more;
    startCursor = response.next_cursor ?? undefined;
  }

  return allPages;
}

/**
 * Obtiene todos los posts publicados del blog (sin cache, para uso interno)
 */
async function getBlogPostsUncached(
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
      },
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
 * Obtiene todos los posts publicados del blog (con cache)
 * @param pageSize - Número de posts por página (default: 10)
 * @param startCursor - Cursor para paginación
 */
export const getBlogPosts = unstable_cache(
  getBlogPostsUncached,
  ["blog-posts"],
  {
    revalidate: 3600, // 1 hora
    tags: ["notion-blog"],
  },
);

/**
 * Obtiene un post individual por slug (sin cache, para uso interno)
 */
async function getBlogPostBySlugUncached(
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
      },
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
 * Obtiene un post individual por slug (con cache)
 * @param slug - Slug del post
 */
export const getBlogPostBySlug = unstable_cache(
  getBlogPostBySlugUncached,
  ["blog-post-by-slug"],
  {
    revalidate: 3600, // 1 hora
    tags: ["notion-blog"],
  },
);

/**
 * Obtiene posts filtrados por tag (sin cache, para uso interno)
 * Usa getAllPagesFromDatabase para manejar bases de datos grandes
 * @param tag - Nombre del tag (case-insensitive)
 * @param pageSize - Número de posts por página
 */
async function getBlogPostsByTagUncached(
  tag: string,
  pageSize = 10,
): Promise<BlogPost[]> {
  try {
    // Obtener TODOS los posts publicados usando paginación completa
    const allPages = await getAllPagesFromDatabase(
      {
        property: "Status",
        select: {
          equals: "Published",
        },
      },
      [
        {
          property: "PublishedDate",
          direction: "descending",
        },
      ],
    );

    const allPosts = allPages.map(transformNotionPageToBlogPost);

    // Filtramos por tag de manera case-insensitive
    const filteredPosts = allPosts.filter((post) =>
      post.tags.some(
        (postTag) => postTag.name.toLowerCase() === tag.toLowerCase(),
      ),
    );

    // Limitamos los resultados según pageSize
    return filteredPosts.slice(0, pageSize);
  } catch (error) {
    console.error(`Error al obtener posts con tag "${tag}":`, error);
    throw new Error(`No se pudieron obtener artículos con el tag "${tag}"`);
  }
}

/**
 * Obtiene posts filtrados por tag (con cache)
 * @param tag - Nombre del tag (case-insensitive)
 * @param pageSize - Número de posts por página
 */
export const getBlogPostsByTag = unstable_cache(
  getBlogPostsByTagUncached,
  ["blog-posts-by-tag"],
  {
    revalidate: 3600, // 1 hora
    tags: ["notion-blog"],
  },
);

/**
 * Obtiene todos los tags únicos del blog (sin cache, para uso interno)
 * Usa getAllPagesFromDatabase para manejar bases de datos grandes
 */
async function getAllTagsUncached(): Promise<
  Array<{ name: string; count: number }>
> {
  try {
    // Obtener TODOS los posts publicados usando paginación completa
    const allPages = await getAllPagesFromDatabase({
      property: "Status",
      select: {
        equals: "Published",
      },
    });

    const tagCounts = new Map<string, number>();

    for (const page of allPages) {
      const post = transformNotionPageToBlogPost(page);
      for (const tag of post.tags) {
        tagCounts.set(tag.name, (tagCounts.get(tag.name) ?? 0) + 1);
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
 * Obtiene todos los tags únicos del blog (con cache)
 */
export const getAllTags = unstable_cache(getAllTagsUncached, ["blog-tags"], {
  revalidate: 3600, // 1 hora
  tags: ["notion-blog"],
});

/**
 * Obtiene todos los slugs publicados (sin cache, para uso interno)
 * Usa getAllPagesFromDatabase para manejar bases de datos grandes
 * Útil para generateStaticParams
 */
async function getAllPublishedSlugsUncached(): Promise<string[]> {
  try {
    // Obtener TODOS los posts publicados usando paginación completa
    const allPages = await getAllPagesFromDatabase({
      property: "Status",
      select: {
        equals: "Published",
      },
    });

    return allPages
      .map(transformNotionPageToBlogPost)
      .map((post: BlogPost) => post.slug)
      .filter((slug: string) => slug.length > 0);
  } catch (error) {
    console.error("Error al obtener slugs:", error);
    return [];
  }
}

/**
 * Obtiene todos los slugs publicados (con cache)
 * Útil para generateStaticParams
 */
export const getAllPublishedSlugs = unstable_cache(
  getAllPublishedSlugsUncached,
  ["blog-slugs"],
  {
    revalidate: 3600, // 1 hora
    tags: ["notion-blog"],
  },
);

/**
 * Busca posts por término de búsqueda (sin cache, para uso interno)
 * @param searchTerm - Término de búsqueda
 */
async function searchBlogPostsUncached(
  searchTerm: string,
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
      },
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

/**
 * Busca posts por término de búsqueda (con cache corto, 5 min)
 * @param searchTerm - Término de búsqueda
 */
export const searchBlogPosts = unstable_cache(
  searchBlogPostsUncached,
  ["blog-search"],
  {
    revalidate: 300, // 5 minutos (búsquedas son más dinámicas)
    tags: ["notion-blog"],
  },
);

/**
 * API Route para revalidación manual del cache del blog
 * 
 * Permite invalidar selectivamente diferentes partes del blog usando revalidatePath:
 * - Posts individuales por slug
 * - Lista completa de posts
 * - Posts por tag
 * - Tags
 * - Slugs
 * 
 * Seguridad: Requiere token de revalidación en headers o query params
 * 
 * @example
 * ```bash
 * # Revalidar post específico
 * curl -X POST "https://webcode.es/api/revalidate" \
 *   -H "Authorization: Bearer SECRET_TOKEN" \
 *   -H "Content-Type: application/json" \
 *   -d '{"type": "post", "slug": "nextjs-16-features"}'
 * 
 * # Revalidar lista completa
 * curl -X POST "https://webcode.es/api/revalidate" \
 *   -H "Authorization: Bearer SECRET_TOKEN" \
 *   -H "Content-Type: application/json" \
 *   -d '{"type": "list"}'
 * 
 * # Revalidar por tag
 * curl -X POST "https://webcode.es/api/revalidate" \
 *   -H "Authorization: Bearer SECRET_TOKEN" \
 *   -H "Content-Type: application/json" \
 *   -d '{"type": "tag", "tag": "nextjs"}'
 * ```
 */

import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Tipos de revalidación soportados
 */
type RevalidationType = "post" | "list" | "tag" | "tags" | "slugs" | "all";

interface RevalidatePostRequest {
  type: "post";
  slug: string;
}

interface RevalidateTagRequest {
  type: "tag";
  tag: string;
}

interface RevalidateSimpleRequest {
  type: "list" | "tags" | "slugs" | "all";
}

type RevalidateRequest =
  | RevalidatePostRequest
  | RevalidateTagRequest
  | RevalidateSimpleRequest;

/**
 * Verifica el token de autorización
 */
function verifyAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  // También permitir token en query params para webhooks
  const queryToken = request.nextUrl.searchParams.get("token");

  const validToken = process.env.REVALIDATE_SECRET_TOKEN;

  if (!validToken) {
    console.error("REVALIDATE_SECRET_TOKEN no está configurado");
    return false;
  }

  return token === validToken || queryToken === validToken;
}

/**
 * Revalida según el tipo de solicitud usando revalidatePath
 */
async function revalidateByType(data: RevalidateRequest): Promise<string[]> {
  const revalidated: string[] = [];

  switch (data.type) {
    case "post":
      // Revalidar post específico
      revalidatePath(`/blog/${data.slug}`, "page");
      revalidated.push(`/blog/${data.slug}`);
      break;

    case "tag":
      // Revalidar posts de un tag específico
      revalidatePath(`/blog/tag/${data.tag.toLowerCase()}`, "page");
      revalidated.push(`/blog/tag/${data.tag.toLowerCase()}`);
      break;

    case "list":
      // Revalidar lista de posts
      revalidatePath("/blog", "page");
      revalidated.push("/blog");
      break;

    case "tags":
      // Revalidar lista de tags (afecta blog page con sidebar)
      revalidatePath("/blog", "page");
      revalidated.push("/blog (tags)");
      break;

    case "slugs":
      // Revalidar rutas dinámicas
      revalidatePath("/blog", "layout");
      revalidated.push("/blog (slugs)");
      break;

    case "all":
      // Revalidar todo el blog
      revalidatePath("/blog", "layout");
      revalidated.push("/blog (all routes)");
      break;

    default:
      throw new Error(`Tipo de revalidación no soportado: ${(data as { type: string }).type}`);
  }

  return revalidated;
}

/**
 * POST /api/revalidate
 * Revalida el cache del blog
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    if (!verifyAuth(request)) {
      return NextResponse.json(
        { error: "No autorizado", message: "Token de revalidación inválido" },
        { status: 401 }
      );
    }

    // Parsear body
    const data = (await request.json()) as RevalidateRequest;

    // Validar tipo
    const validTypes: RevalidationType[] = ["post", "list", "tag", "tags", "slugs", "all"];
    if (!validTypes.includes(data.type)) {
      return NextResponse.json(
        {
          error: "Tipo inválido",
          message: `Tipo debe ser uno de: ${validTypes.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validar datos específicos
    if (data.type === "post" && !data.slug) {
      return NextResponse.json(
        { error: "Slug requerido", message: "Para type='post', el campo 'slug' es requerido" },
        { status: 400 }
      );
    }

    if (data.type === "tag" && !data.tag) {
      return NextResponse.json(
        { error: "Tag requerido", message: "Para type='tag', el campo 'tag' es requerido" },
        { status: 400 }
      );
    }

    // Ejecutar revalidación
    const revalidated = await revalidateByType(data);

    return NextResponse.json({
      revalidated: true,
      type: data.type,
      paths: revalidated,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error en revalidación:", error);

    const errorMessage = error instanceof Error ? error.message : "Error desconocido";

    return NextResponse.json(
      {
        error: "Error en revalidación",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/revalidate?type=all&token=SECRET
 * Revalidación simple via GET (útil para webhooks)
 */
export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    if (!verifyAuth(request)) {
      return NextResponse.json(
        { error: "No autorizado", message: "Token de revalidación inválido" },
        { status: 401 }
      );
    }

    const type = request.nextUrl.searchParams.get("type") as RevalidationType | null;
    const slug = request.nextUrl.searchParams.get("slug");
    const tag = request.nextUrl.searchParams.get("tag");

    if (!type) {
      return NextResponse.json(
        { error: "Tipo requerido", message: "Parámetro 'type' es requerido" },
        { status: 400 }
      );
    }

    // Construir request
    let data: RevalidateRequest;

    if (type === "post") {
      if (!slug) {
        return NextResponse.json(
          { error: "Slug requerido", message: "Para type='post', el parámetro 'slug' es requerido" },
          { status: 400 }
        );
      }
      data = { type: "post", slug };
    } else if (type === "tag") {
      if (!tag) {
        return NextResponse.json(
          { error: "Tag requerido", message: "Para type='tag', el parámetro 'tag' es requerido" },
          { status: 400 }
        );
      }
      data = { type: "tag", tag };
    } else {
      data = { type };
    }

    // Ejecutar revalidación
    const revalidated = await revalidateByType(data);

    return NextResponse.json({
      revalidated: true,
      type: data.type,
      paths: revalidated,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error en revalidación:", error);

    const errorMessage = error instanceof Error ? error.message : "Error desconocido";

    return NextResponse.json(
      {
        error: "Error en revalidación",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

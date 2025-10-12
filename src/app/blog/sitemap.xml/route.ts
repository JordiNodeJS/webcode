import { getBlogPosts } from "@/lib/notion";

export async function GET() {
  try {
    const { posts } = await getBlogPosts(100); // Obtener todos los posts
    const baseUrl = "https://webcode.es";

    // Generar URLs de artículos
    const articleUrls = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.date,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    // URL de la página principal del blog
    const blogUrl = {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    };

    // Generar URLs de tags
    const tagUrls = Array.from(
      new Set(
        posts.flatMap((post) => post.tags.map((tag) => tag.name.toLowerCase())),
      ),
    ).map((tag) => ({
      url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    const allUrls = [blogUrl, ...articleUrls, ...tagUrls];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache por 1 hora
      },
    });
  } catch (error) {
    console.error("Error generating blog sitemap:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
}

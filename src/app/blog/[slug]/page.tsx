/**
 * Página de detalle de un artículo del blog
 * Muestra el contenido completo del post desde Notion
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { NotionImage } from "@/components/blog/NotionImage";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { PerformanceOptimizations } from "@/components/seo/PerformanceOptimizations";
import {
	getAllPublishedSlugs,
	getBlogPostBySlug,
	getBlogPostsByTag,
} from "@/lib/notion";

interface BlogPostPageProps {
	params: Promise<{ slug: string }>;
}

// Generar metadata dinámicamente
export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = await getBlogPostBySlug(slug);

	if (!post) {
		return {
			title: "Artículo no encontrado | WebCode",
		};
	}

	const canonicalUrl = `https://webcode.es/blog/${slug}`;
	const articleTags = post.tags.map((tag) => tag.name);

	return {
		title: `${post.title} | Blog WebCode`,
		description: post.excerpt,
		keywords: [
			...articleTags,
			"desarrollo web Barcelona",
			"blog desarrollo web",
			"tutoriales programación",
			"tecnología web",
		],
		authors: [{ name: post.author }],
		creator: "WEBCODE",
		publisher: "WEBCODE",
		category: "Technology",
		// Meta tags específicos para artículos
		other: {
			"article:published_time": post.date,
			"article:modified_time": post.updatedAt || post.date,
			"article:author": post.author,
			"article:section": articleTags[0] || "Technology",
			...articleTags.reduce(
				(acc, tag) => {
					acc[`article:tag`] = tag;
					return acc;
				},
				{} as Record<string, string>,
			),
		},
		// Canonical URL correcta
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: {
			title: post.title,
			description: post.excerpt,
			type: "article",
			publishedTime: post.date,
			modifiedTime: post.updatedAt || post.date,
			authors: [post.author],
			section: articleTags[0] || "Technology",
			tags: articleTags,
			images: post.coverImage
				? [
						{
							url: post.coverImage,
							width: 1200,
							height: 630,
							alt: post.title,
						},
					]
				: [],
			url: canonicalUrl,
			siteName: "WEBCODE",
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.excerpt,
			images: post.coverImage ? [post.coverImage] : [],
			creator: "@webcode_es",
			site: "@webcode_es",
		},
	};
}

// Generar rutas estáticas en build time
export async function generateStaticParams() {
	const slugs = await getAllPublishedSlugs();
	return slugs.map((slug) => ({ slug }));
}

// Revalidar cada 1 hora
export const revalidate = 3600;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	const post = await getBlogPostBySlug(slug);

	if (!post) {
		notFound();
	}

	// Obtener posts relacionados basados en el primer tag
	const relatedPosts =
		post.tags.length > 0 ? await getBlogPostsByTag(post.tags[0].name, 3) : [];
	const filteredRelatedPosts = relatedPosts.filter((p) => p.id !== post.id);

	// Datos para breadcrumb schema
	const breadcrumbItems = [
		{ name: "Inicio", url: "/" },
		{ name: "Blog", url: "/blog" },
		{ name: post.title, url: `/blog/${post.slug}` },
	];

	return (
		<>
			{/* Performance Optimizations */}
			<PerformanceOptimizations />

			{/* Structured Data */}
			<ArticleSchema post={post} />
			<BreadcrumbSchema items={breadcrumbItems} />

			<article
				className="container mx-auto px-4 py-16"
				itemScope
				itemType="https://schema.org/Article"
			>
				{/* Breadcrumb */}
				<nav
					className="mb-8 text-sm text-muted-foreground"
					aria-label="Breadcrumb"
				>
					<ol
						className="flex items-center space-x-2"
						itemScope
						itemType="https://schema.org/BreadcrumbList"
					>
						<li
							itemProp="itemListElement"
							itemScope
							itemType="https://schema.org/ListItem"
						>
							<Link href="/" className="hover:text-primary" itemProp="item">
								<span itemProp="name">Inicio</span>
							</Link>
							<meta itemProp="position" content="1" />
							<span className="mx-2" aria-hidden="true">
								/
							</span>
						</li>
						<li
							itemProp="itemListElement"
							itemScope
							itemType="https://schema.org/ListItem"
						>
							<Link href="/blog" className="hover:text-primary" itemProp="item">
								<span itemProp="name">Blog</span>
							</Link>
							<meta itemProp="position" content="2" />
							<span className="mx-2" aria-hidden="true">
								/
							</span>
						</li>
						<li
							itemProp="itemListElement"
							itemScope
							itemType="https://schema.org/ListItem"
						>
							<span className="text-foreground" itemProp="name">
								{post.title}
							</span>
							<meta itemProp="position" content="3" />
						</li>
					</ol>
				</nav>

				{/* Imagen de portada */}
				{post.coverImage && (
					<div className="mb-8 overflow-hidden rounded-lg">
						<NotionImage
							src={post.coverImage}
							alt={post.title}
							width={1200}
							height={400}
							className="w-full h-64 object-cover object-center"
							priority
							itemProp="image"
						/>
					</div>
				)}

				{/* Título y metadata */}
				<header className="mb-12">
					<div className="mb-4 flex flex-wrap gap-2">
						{post.tags.map((tag) => (
							<Link
								key={tag.id}
								href={`/blog/tag/${encodeURIComponent(tag.name.toLowerCase())}`}
								className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary hover:bg-primary/20"
								rel="tag"
							>
								{tag.name}
							</Link>
						))}
					</div>

					<h1
						className="mb-4 text-4xl font-bold md:text-5xl"
						itemProp="headline"
					>
						{post.title}
					</h1>

					<div className="flex flex-wrap items-center gap-4 text-muted-foreground">
						<div className="flex items-center gap-2">
							<span
								className="font-medium text-foreground"
								itemProp="author"
								itemScope
								itemType="https://schema.org/Person"
							>
								<span itemProp="name">{post.author}</span>
							</span>
						</div>
						<span aria-hidden="true">•</span>
						<time dateTime={post.date} itemProp="datePublished">
							{new Date(post.date).toLocaleDateString("es-ES", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</time>
						{post.updatedAt && post.updatedAt !== post.date && (
							<>
								<span aria-hidden="true">•</span>
								<time dateTime={post.updatedAt} itemProp="dateModified">
									Actualizado:{" "}
									{new Date(post.updatedAt).toLocaleDateString("es-ES", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</time>
							</>
						)}
						{post.readTime && (
							<>
								<span aria-hidden="true">•</span>
								<span itemProp="timeRequired" content={`PT${post.readTime}M`}>
									{post.readTime} min de lectura
								</span>
							</>
						)}
					</div>

					{post.excerpt && (
						<p
							className="mt-6 text-xl text-muted-foreground"
							itemProp="description"
						>
							{post.excerpt}
						</p>
					)}
				</header>

				{/* Contenido del artículo */}
				<MarkdownRenderer content={post.content ?? ""} />

				{/* Posts relacionados */}
				{filteredRelatedPosts.length > 0 && (
					<section className="mt-16 border-t pt-16">
						<h2 className="mb-8 text-3xl font-bold">Artículos relacionados</h2>
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{filteredRelatedPosts.map((relatedPost) => (
								<Link
									key={relatedPost.id}
									href={`/blog/${relatedPost.slug}`}
									className="group rounded-lg border bg-card p-6 transition-shadow hover:shadow-lg"
								>
									{relatedPost.coverImage && (
										<div className="mb-4 overflow-hidden rounded-lg">
											<NotionImage
												src={relatedPost.coverImage}
												alt={relatedPost.title}
												width={400}
												height={200}
												className="h-32 w-full object-cover object-center transition-transform group-hover:scale-105"
											/>
										</div>
									)}
									<h3 className="mb-2 text-lg font-semibold group-hover:underline">
										{relatedPost.title}
									</h3>
									<p className="text-sm text-muted-foreground">
										{relatedPost.excerpt}
									</p>
								</Link>
							))}
						</div>
					</section>
				)}

				{/* Navegación */}
				<div className="mt-16 flex justify-center">
					<Link
						href="/blog"
						className="inline-flex items-center text-primary hover:underline"
					>
						<svg
							className="mr-2 h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<title>Flecha hacia la izquierda</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						Volver al blog
					</Link>
				</div>
			</article>
		</>
	);
}

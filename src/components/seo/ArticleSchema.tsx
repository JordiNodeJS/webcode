import Script from "next/script";
import { useId } from "react";

interface BlogPost {
	id: string;
	title: string;
	slug: string;
	excerpt?: string;
	date: string;
	updatedAt?: string;
	author: string;
	coverImage?: string;
	tags: Array<{ id: string; name: string }>;
	readTime?: number;
}

interface ArticleSchemaProps {
	post: BlogPost;
	baseUrl?: string;
}

export function ArticleSchema({
	post,
	baseUrl = "https://webcode.es",
}: ArticleSchemaProps) {
	const id = useId();
	const articleUrl = `${baseUrl}/blog/${post.slug}`;

	const articleSchema = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: post.title,
		description: post.excerpt,
		image: post.coverImage ? [post.coverImage] : [],
		datePublished: post.date,
		dateModified: post.updatedAt || post.date,
		author: {
			"@type": "Person",
			name: post.author,
		},
		publisher: {
			"@type": "Organization",
			name: "WEBCODE",
			logo: {
				"@type": "ImageObject",
				url: "https://webcode.es/favicon-96x96.png",
			},
			url: baseUrl,
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": articleUrl,
		},
		url: articleUrl,
		articleSection: post.tags.map((tag) => tag.name),
		keywords: post.tags.map((tag) => tag.name).join(", "),
		wordCount: post.readTime ? post.readTime * 250 : undefined, // Estimación aproximada
		timeRequired: post.readTime ? `PT${post.readTime}M` : undefined,
		inLanguage: "es-ES",
		isAccessibleForFree: true,
		genre: "Technology",
		about: post.tags.map((tag) => ({
			"@type": "Thing",
			name: tag.name,
		})),
	};

	return (
		<Script
			id={`structured-data-article-${id}`}
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(articleSchema),
			}}
		/>
	);
}

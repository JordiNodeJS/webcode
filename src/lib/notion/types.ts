/**
 * Tipos TypeScript para la integración con Notion
 */

// Propiedades de una página de blog en Notion
// Nombres reales de propiedades en la base de datos Notion
export interface NotionPageProperties {
	Title: {
		id: string;
		type: "title";
		title: Array<{
			type: "text";
			text: { content: string };
			plain_text: string;
		}>;
	};
	Slug: {
		id: string;
		type: "rich_text";
		rich_text: Array<{
			type: "text";
			text: { content: string };
			plain_text: string;
		}>;
	};
	Description: {
		id: string;
		type: "rich_text";
		rich_text: Array<{
			type: "text";
			text: { content: string };
			plain_text: string;
		}>;
	};
	Status: {
		id: string;
		type: "select";
		select: {
			id: string;
			name: string;
			color: string;
		} | null;
	};
	PublishedDate: {
		id: string;
		type: "date";
		date: {
			start: string;
			end: string | null;
		} | null;
	};
	Tags: {
		id: string;
		type: "multi_select";
		multi_select: Array<{
			id: string;
			name: string;
			color: string;
		}>;
	};
	Author: {
		id: string;
		type: "people";
		people: Array<{
			id: string;
			name?: string;
			avatar_url?: string;
			type?: string;
			person?: {
				email: string;
			};
		}>;
	};
	CoverImageURL: {
		id: string;
		type: "url";
		url: string | null;
	};
	Featured: {
		id: string;
		type: "checkbox";
		checkbox: boolean;
	};
}

// Artículo de blog procesado
export interface BlogPost {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	content?: string;
	published: boolean;
	date: string;
	tags: Array<{
		id: string;
		name: string;
		color: string;
	}>;
	author: string;
	coverImage?: string;
	readTime?: number;
	createdAt: string;
	updatedAt: string;
}

// Metadatos de paginación
export interface PaginationMeta {
	hasMore: boolean;
	nextCursor?: string;
}

// Respuesta de listado de posts
export interface BlogPostsResponse {
	posts: BlogPost[];
	meta: PaginationMeta;
}

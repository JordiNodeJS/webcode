/**
 * Componente para renderizar contenido Markdown del blog
 * Incluye soporte para código con syntax highlighting
 * Estilos inspirados en Notion para una mejor experiencia de lectura
 *
 * NOTA: Este componente usa <img> en vez de Next.js Image para imágenes
 * dinámicas de markdown, lo cual es la práctica recomendada para contenido
 * externo no controlado.
 */

"use client";

import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import "highlight.js/styles/github-dark.css"; // Tema de highlight.js
import "../../styles/webcode-code-theme.css"; // Tema personalizado WebCode
import { CopyButton } from "../ui/CopyButton";

interface MarkdownRendererProps {
	content: string;
}

// Componentes personalizados para el Markdown con estilos tipo Notion
const components: Components = {
	// Encabezados con estilos Notion
	h1: ({ children, ...props }) => (
		<h1
			className="mb-4 mt-8 scroll-m-20 text-4xl font-bold tracking-tight first:mt-0"
			{...props}
		>
			{children}
		</h1>
	),
	h2: ({ children, ...props }) => (
		<h2
			className="mb-4 mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
			{...props}
		>
			{children}
		</h2>
	),
	h3: ({ children, ...props }) => (
		<h3
			className="mb-4 mt-8 scroll-m-20 text-2xl font-semibold tracking-tight"
			{...props}
		>
			{children}
		</h3>
	),
	h4: ({ children, ...props }) => (
		<h4
			className="mb-3 mt-6 scroll-m-20 text-xl font-semibold tracking-tight"
			{...props}
		>
			{children}
		</h4>
	),
	h5: ({ children, ...props }) => (
		<h5
			className="mb-2 mt-4 scroll-m-20 text-lg font-semibold tracking-tight"
			{...props}
		>
			{children}
		</h5>
	),
	h6: ({ children, ...props }) => (
		<h6
			className="mb-2 mt-4 scroll-m-20 text-base font-semibold tracking-tight"
			{...props}
		>
			{children}
		</h6>
	),
	// Párrafos con espaciado Notion
	p: ({ children, ...props }) => (
		<p className="mb-6 leading-7 [&:not(:first-child)]:mt-6" {...props}>
			{children}
		</p>
	),
	// Listas ordenadas
	ol: ({ children, ...props }) => (
		<ol className="my-6 ml-6 list-decimal space-y-2" {...props}>
			{children}
		</ol>
	),
	// Listas desordenadas
	ul: ({ children, ...props }) => (
		<ul className="my-6 ml-6 list-disc space-y-2" {...props}>
			{children}
		</ul>
	),
	// Items de lista
	li: ({ children, ...props }) => (
		<li className="leading-7" {...props}>
			{children}
		</li>
	),
	// Links con estilos Notion
	a: ({ href, children, ...props }) => {
		const isExternal = href?.startsWith("http");
		return (
			<a
				href={href}
				target={isExternal ? "_blank" : undefined}
				rel={isExternal ? "noopener noreferrer" : undefined}
				className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
				{...props}
			>
				{children}
			</a>
		);
	},
	// Bloques de código con estilo WebCode mejorado
	pre: ({ children, className, ...props }) => {
		// Extraer el lenguaje del className si está disponible
		const languageMatch = className?.match(/language-(\w+)/);
		const language = languageMatch ? languageMatch[1] : "código";

		// Extraer el texto del código para copiar
		const extractTextFromChildren = (element: React.ReactNode): string => {
			if (typeof element === "string") {
				return element;
			}
			if (Array.isArray(element)) {
				return element.map(extractTextFromChildren).join("");
			}
			if (element && typeof element === "object" && "props" in element) {
				return extractTextFromChildren(
					(element as { props: { children?: React.ReactNode } }).props.children,
				);
			}
			return "";
		};

		const codeText = extractTextFromChildren(children);

		return (
			<div className="webcode-code-block">
				<div className="webcode-code-header">
					<div className="webcode-code-header-left">
						<span>{language.charAt(0).toUpperCase() + language.slice(1)}</span>
					</div>
					<CopyButton text={codeText} />
				</div>
				<pre className={`webcode-code-content ${className || ""}`} {...props}>
					{children}
				</pre>
			</div>
		);
	},
	code: ({ children, className, ...props }) => {
		const isInline = !className;
		return (
			<code
				className={isInline ? "webcode-code-inline" : "font-mono text-sm"}
				{...props}
			>
				{children}
			</code>
		);
	},
	// Imágenes responsivas - usa img nativo para contenido dinámico
	img: ({ src, alt, ...props }) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={src}
			alt={alt || "Imagen del artículo"}
			className="my-8 rounded-lg shadow-md"
			loading="lazy"
			{...props}
		/>
	),
	// Tablas con estilo Notion
	table: ({ children, ...props }) => (
		<div className="my-8 w-full overflow-x-auto">
			<table className="w-full border-collapse" {...props}>
				{children}
			</table>
		</div>
	),
	thead: ({ children, ...props }) => (
		<thead className="border-b" {...props}>
			{children}
		</thead>
	),
	th: ({ children, ...props }) => (
		<th
			className="border-b px-4 py-2 text-left font-semibold [&[align=center]]:text-center [&[align=right]]:text-right"
			{...props}
		>
			{children}
		</th>
	),
	td: ({ children, ...props }) => (
		<td
			className="border-b px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
			{...props}
		>
			{children}
		</td>
	),
	// Blockquotes con estilo Notion
	blockquote: ({ children, ...props }) => (
		<blockquote
			className="my-6 border-l-4 border-primary/50 bg-muted/50 pl-6 pr-4 py-3 italic [&>*]:text-muted-foreground"
			{...props}
		>
			{children}
		</blockquote>
	),
	// Líneas horizontales
	hr: ({ ...props }) => <hr className="my-8 border-t" {...props} />,
	// Texto en negrita
	strong: ({ children, ...props }) => (
		<strong className="font-semibold" {...props}>
			{children}
		</strong>
	),
	// Texto en cursiva
	em: ({ children, ...props }) => (
		<em className="italic" {...props}>
			{children}
		</em>
	),
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
	return (
		<div className="markdown-content mx-auto max-w-none text-base leading-7 text-foreground">
			<ReactMarkdown
				rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
				components={components}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}

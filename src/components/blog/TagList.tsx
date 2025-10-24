/**
 * Componente para mostrar lista de tags del blog
 * Server Component - Links a páginas de tags
 *
 * Incluye estilos consistentes con el sistema de diseño WebCode
 */

import Link from "next/link";

interface Tag {
  id: string;
  name: string;
}

interface TagListProps {
  /** Array de tags */
  tags: Tag[];
  /** Clase CSS adicional */
  className?: string;
  /** Variante visual del tag */
  variant?: "default" | "outline";
  /** Tamaño del tag */
  size?: "sm" | "md" | "lg";
}

/**
 * Obtiene clases CSS según variante y tamaño
 */
function getTagClasses(
  variant: "default" | "outline" = "default",
  size: "sm" | "md" | "lg" = "md"
): string {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200";

  const variantClasses = {
    default:
      "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20",
    outline:
      "bg-transparent text-primary border border-primary hover:bg-primary/10"
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  };

  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
}

/**
 * Componente de tag individual
 */
function TagItem({
  tag,
  variant,
  size
}: {
  tag: Tag;
  variant: "default" | "outline";
  size: "sm" | "md" | "lg";
}) {
  const href = `/blog/tag/${encodeURIComponent(tag.name.toLowerCase())}`;

  return (
    <Link
      href={href}
      className={getTagClasses(variant, size)}
      rel="tag"
      aria-label={`Ver posts con el tag ${tag.name}`}
    >
      {tag.name}
    </Link>
  );
}

/**
 * Lista de tags con enlaces a páginas de filtrado
 *
 * @example
 * ```tsx
 * // Lista por defecto
 * <TagList tags={post.tags} />
 *
 * // Variante outline
 * <TagList tags={post.tags} variant="outline" />
 *
 * // Tags pequeños
 * <TagList tags={post.tags} size="sm" />
 * ```
 */
export function TagList({
  tags,
  className = "",
  variant = "default",
  size = "md"
}: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <div
      className={`flex flex-wrap gap-2 ${className}`}
      role="list"
      aria-label="Tags del artículo"
    >
      {tags.map((tag) => (
        <TagItem key={tag.id} tag={tag} variant={variant} size={size} />
      ))}
    </div>
  );
}

/**
 * Componente de tag único (sin lista)
 *
 * @example
 * ```tsx
 * <Tag tag={{ id: '1', name: 'Next.js' }} />
 * ```
 */
export function Tag({
  tag,
  variant = "default",
  size = "md",
  className = ""
}: {
  tag: Tag;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const href = `/blog/tag/${encodeURIComponent(tag.name.toLowerCase())}`;

  return (
    <Link
      href={href}
      className={`${getTagClasses(variant, size)} ${className}`}
      rel="tag"
      aria-label={`Ver posts con el tag ${tag.name}`}
    >
      {tag.name}
    </Link>
  );
}

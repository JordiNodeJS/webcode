/**
 * Componente para mostrar metadata de posts del blog
 * Server Component - Información de autor, fecha y tiempo de lectura
 * 
 * Incluye structured data para SEO
 */

import { DateFormatter } from "./DateFormatter";

interface PostMetadataProps {
  /** Nombre del autor */
  author: string;
  /** Fecha de publicación */
  publishedDate: string;
  /** Fecha de última actualización (opcional) */
  updatedDate?: string;
  /** Tiempo de lectura en minutos (opcional) */
  readTime?: number;
  /** Mostrar solo fecha (sin autor ni tiempo de lectura) */
  dateOnly?: boolean;
  /** Clase CSS adicional */
  className?: string;
}

/**
 * Separador visual entre metadata items
 */
function MetadataSeparator() {
  return (
    <span className="mx-2 text-muted-foreground" aria-hidden="true">
      •
    </span>
  );
}

/**
 * Información del autor con schema.org markup
 */
function AuthorInfo({ author }: { author: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="font-medium text-foreground"
        itemProp="author"
        itemScope
        itemType="https://schema.org/Person"
      >
        <span itemProp="name">{author}</span>
      </span>
    </div>
  );
}

/**
 * Información de tiempo de lectura
 */
function ReadTimeInfo({ readTime }: { readTime: number }) {
  return (
    <span itemProp="timeRequired" content={`PT${readTime}M`}>
      {readTime} min de lectura
    </span>
  );
}

/**
 * Información de fecha de actualización
 */
function UpdatedDateInfo({ updatedDate }: { updatedDate: string }) {
  return (
    <>
      <MetadataSeparator />
      <span>
        Actualizado:{" "}
        <DateFormatter
          date={updatedDate}
          format="long"
          asTimeElement
          className="inline"
        />
      </span>
    </>
  );
}

/**
 * Metadata completa del post (autor, fecha, tiempo de lectura)
 * 
 * @example
 * ```tsx
 * // Metadata completa
 * <PostMetadata 
 *   author="John Doe"
 *   publishedDate="2025-10-24"
 *   readTime={5}
 * />
 * 
 * // Con fecha de actualización
 * <PostMetadata 
 *   author="John Doe"
 *   publishedDate="2025-10-24"
 *   updatedDate="2025-10-25"
 *   readTime={5}
 * />
 * 
 * // Solo fecha
 * <PostMetadata 
 *   author="John Doe"
 *   publishedDate="2025-10-24"
 *   dateOnly
 * />
 * ```
 */
export function PostMetadata({
  author,
  publishedDate,
  updatedDate,
  readTime,
  dateOnly = false,
  className = ""
}: PostMetadataProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground ${className}`}
    >
      {!dateOnly && (
        <>
          <AuthorInfo author={author} />
          <MetadataSeparator />
        </>
      )}

      <DateFormatter
        date={publishedDate}
        format="long"
        asTimeElement
        className="inline"
      />

      {updatedDate && updatedDate !== publishedDate && (
        <UpdatedDateInfo updatedDate={updatedDate} />
      )}

      {!dateOnly && readTime && (
        <>
          <MetadataSeparator />
          <ReadTimeInfo readTime={readTime} />
        </>
      )}
    </div>
  );
}

/**
 * Metadata compacta (solo fecha y tiempo de lectura)
 * 
 * @example
 * ```tsx
 * <CompactPostMetadata 
 *   publishedDate="2025-10-24"
 *   readTime={5}
 * />
 * ```
 */
export function CompactPostMetadata({
  publishedDate,
  readTime,
  className = ""
}: {
  publishedDate: string;
  readTime?: number;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 text-sm text-muted-foreground ${className}`}
    >
      <DateFormatter
        date={publishedDate}
        format="long"
        asTimeElement
        className="inline"
      />

      {readTime && (
        <>
          <MetadataSeparator />
          <ReadTimeInfo readTime={readTime} />
        </>
      )}
    </div>
  );
}

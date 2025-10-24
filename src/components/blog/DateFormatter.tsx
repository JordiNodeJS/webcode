/**
 * Componente para formatear fechas de manera consistente
 * Server Component - Renderiza fechas en formato español
 *
 * Utiliza Intl.DateTimeFormat para mejor performance y i18n
 */

interface DateFormatterProps {
  /** Fecha en formato ISO string o Date object */
  date: string | Date;
  /** Formato de la fecha */
  format?: "long" | "short" | "numeric";
  /** Mostrar como elemento <time> con datetime attribute */
  asTimeElement?: boolean;
  /** Clase CSS adicional */
  className?: string;
}

/**
 * Formatea una fecha según el formato especificado
 */
function formatDate(
  date: string | Date,
  format: "long" | "short" | "numeric" = "long"
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const formats = {
    long: {
      year: "numeric" as const,
      month: "long" as const,
      day: "numeric" as const
    },
    short: {
      year: "numeric" as const,
      month: "short" as const,
      day: "numeric" as const
    },
    numeric: {
      year: "numeric" as const,
      month: "2-digit" as const,
      day: "2-digit" as const
    }
  };

  return dateObj.toLocaleDateString("es-ES", formats[format]);
}

/**
 * Convierte fecha a formato ISO para datetime attribute
 */
function toISODate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toISOString();
}

/**
 * Componente para mostrar fechas formateadas
 *
 * @example
 * ```tsx
 * // Formato largo (por defecto)
 * <DateFormatter date="2025-10-24" />
 * // "24 de octubre de 2025"
 *
 * // Formato corto
 * <DateFormatter date="2025-10-24" format="short" />
 * // "24 oct 2025"
 *
 * // Como elemento <time>
 * <DateFormatter date="2025-10-24" asTimeElement />
 * // <time datetime="2025-10-24T00:00:00.000Z">24 de octubre de 2025</time>
 * ```
 */
export function DateFormatter({
  date,
  format = "long",
  asTimeElement = true,
  className = ""
}: DateFormatterProps) {
  const formattedDate = formatDate(date, format);
  const isoDate = toISODate(date);

  if (asTimeElement) {
    return (
      <time dateTime={isoDate} className={className}>
        {formattedDate}
      </time>
    );
  }

  return <span className={className}>{formattedDate}</span>;
}

/**
 * Componente para mostrar rango de fechas
 *
 * @example
 * ```tsx
 * <DateRangeFormatter
 *   startDate="2025-10-24"
 *   endDate="2025-10-26"
 * />
 * // "24 - 26 de octubre de 2025"
 * ```
 */
export function DateRangeFormatter({
  startDate,
  endDate,
  format = "long",
  className = ""
}: {
  startDate: string | Date;
  endDate: string | Date;
  format?: "long" | "short" | "numeric";
  className?: string;
}) {
  const start = formatDate(startDate, format);
  const end = formatDate(endDate, format);

  return (
    <span className={className}>
      {start} - {end}
    </span>
  );
}

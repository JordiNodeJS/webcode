/**
 * Componente Breadcrumb para navegación del blog
 * Server Component - No requiere JavaScript en el cliente
 * Incluye schema.org markup para SEO
 * 
 * @see https://schema.org/BreadcrumbList
 */

import Link from "next/link";

export interface BreadcrumbItem {
  /** Nombre visible del item */
  name: string;
  /** URL del item (opcional para el último elemento) */
  href?: string;
}

interface BreadcrumbProps {
  /** Array de items del breadcrumb */
  items: BreadcrumbItem[];
  /** Clase CSS adicional */
  className?: string;
}

/**
 * Componente individual de breadcrumb
 */
function BreadcrumbListItem({
  item,
  position,
  isLast
}: {
  item: BreadcrumbItem;
  position: number;
  isLast: boolean;
}) {
  return (
    <li
      itemProp="itemListElement"
      itemScope
      itemType="https://schema.org/ListItem"
      className="flex items-center"
    >
      {item.href ? (
        <Link
          href={item.href}
          className="hover:text-primary transition-colors"
          itemProp="item"
        >
          <span itemProp="name">{item.name}</span>
        </Link>
      ) : (
        <span className="text-foreground" itemProp="name">
          {item.name}
        </span>
      )}
      <meta itemProp="position" content={position.toString()} />
      {!isLast && (
        <span className="mx-2 text-muted-foreground" aria-hidden="true">
          /
        </span>
      )}
    </li>
  );
}

/**
 * Breadcrumb navigation component
 * 
 * @example
 * ```tsx
 * <Breadcrumb items={[
 *   { name: 'Inicio', href: '/' },
 *   { name: 'Blog', href: '/blog' },
 *   { name: 'Título del Post' }
 * ]} />
 * ```
 */
export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav
      className={`mb-8 text-sm text-muted-foreground ${className}`}
      aria-label="Breadcrumb"
    >
      <ol
        className="flex flex-wrap items-center space-x-0"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => (
          <BreadcrumbListItem
            key={item.href || item.name}
            item={item}
            position={index + 1}
            isLast={index === items.length - 1}
          />
        ))}
      </ol>
    </nav>
  );
}

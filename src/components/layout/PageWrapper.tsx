import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PageVariant = "hero" | "content" | "full-width" | "grid";

export interface PageWrapperProps {
  /**
   * Contenido de la página
   */
  children: ReactNode;

  /**
   * Variante de la página que determina el layout y espaciado
   * - hero: Para páginas con hero section (bg gradients, spacing grande)
   * - content: Para páginas de contenido simple (max-w-4xl)
   * - full-width: Para páginas que necesitan todo el ancho
   * - grid: Para páginas con grid layout (blog, faqs)
   */
  variant?: PageVariant;

  /**
   * Clase CSS adicional para el contenedor principal
   */
  className?: string;

  /**
   * Clase CSS adicional para el contenedor interno
   */
  containerClassName?: string;

  /**
   * Ancho máximo del contenedor (solo para variant='content' o 'grid')
   * @default 'max-w-4xl' para content, 'max-w-6xl' para otros
   */
  maxWidth?: "max-w-4xl" | "max-w-6xl" | "max-w-7xl";

  /**
   * Si se debe aplicar overflow hidden (útil para hero sections)
   * @default false
   */
  overflow?: boolean;

  /**
   * Background gradient para hero sections
   */
  gradient?: string;

  /**
   * Si se debe aplicar position relative
   * @default true
   */
  relative?: boolean;

  /**
   * Elemento HTML semántico a usar para el wrapper exterior
   * @default 'main'
   */
  as?: ElementType;

  /**
   * Elemento HTML semántico a usar para la sección interna
   * @default 'section' para hero, 'div' para otros
   */
  sectionAs?: ElementType;
}

/**
 * PageWrapper - Componente wrapper reutilizable para páginas
 * 
 * Maneja automáticamente:
 * - Padding top consistente (pt-24) para evitar overlap con navbar
 * - Padding bottom responsivo según variante
 * - Contenedores con anchos apropiados
 * - Backgrounds y gradientes para hero sections
 * 
 * @example
 * // Hero page con gradient
 * <PageWrapper variant="hero" gradient="linear-gradient(...)">
 *   <h1>Title</h1>
 *   <p>Content</p>
 * </PageWrapper>
 * 
 * @example
 * // Simple content page
 * <PageWrapper variant="content">
 *   <h1>Title</h1>
 *   <p>Content</p>
 * </PageWrapper>
 * 
 * @example
 * // Grid layout page
 * <PageWrapper variant="grid" maxWidth="max-w-6xl">
 *   <div className="grid grid-cols-3 gap-6">...</div>
 * </PageWrapper>
 */
export function PageWrapper({
  children,
  variant = "content",
  className,
  containerClassName,
  maxWidth,
  overflow = false,
  gradient,
  relative = true,
  as: WrapperComponent = "main",
  sectionAs
}: PageWrapperProps) {
  // Determinar el ancho máximo según la variante
  const defaultMaxWidth = variant === "content" ? "max-w-4xl" : "max-w-6xl";
  const containerWidth = maxWidth || defaultMaxWidth;

  // Determinar el padding bottom según la variante
  const paddingBottom = variant === "hero" ? "pb-20 md:pb-32" : "pb-20";

  // Determinar el elemento semántico para la sección interna
  const defaultSectionElement = variant === "hero" ? "section" : "div";
  const SectionComponent = sectionAs || defaultSectionElement;

  // Clases base para el wrapper exterior
  const wrapperClasses = cn(
    "min-h-screen",
    relative && "relative",
    overflow && "overflow-hidden",
    className
  );

  // Clases para el contenedor interior
  const innerClasses = cn(
    // Padding top consistente SIEMPRE
    "pt-24",
    // Padding bottom responsivo
    paddingBottom,
    // Padding horizontal
    "px-4",
    // Z-index para hero sections con gradient
    variant === "hero" && "relative z-10",
    containerClassName
  );

  // Clases para el contenedor de contenido
  const contentClasses = cn(
    "container mx-auto",
    variant !== "full-width" && containerWidth
  );

  // Renderizar según variante
  if (variant === "hero" && gradient) {
    return (
      <WrapperComponent className={wrapperClasses}>
        <SectionComponent
          className={cn(
            "relative",
            overflow && "overflow-hidden",
            innerClasses
          )}
          style={{
            background: gradient
          }}
        >
          <div className={contentClasses}>{children}</div>
        </SectionComponent>
      </WrapperComponent>
    );
  }

  // Para otras variantes (content, grid, full-width)
  return (
    <WrapperComponent className={wrapperClasses}>
      <SectionComponent className={innerClasses}>
        <div className={contentClasses}>{children}</div>
      </SectionComponent>
    </WrapperComponent>
  );
}

/**
 * HeroSection - Wrapper especializado para hero sections con gradientes
 * Usa <main> y <section> semánticos
 */
export interface HeroSectionProps {
  children: ReactNode;
  gradient?: string;
  className?: string;
  containerClassName?: string;
  maxWidth?: "max-w-4xl" | "max-w-6xl" | "max-w-7xl";
  /**
   * Elemento HTML semántico para el wrapper
   * @default 'main'
   */
  as?: ElementType;
}

export function HeroSection({
  children,
  gradient,
  className,
  containerClassName,
  maxWidth = "max-w-6xl",
  as = "main"
}: HeroSectionProps) {
  return (
    <PageWrapper
      variant="hero"
      gradient={gradient}
      className={className}
      containerClassName={containerClassName}
      maxWidth={maxWidth}
      overflow={true}
      relative={true}
      as={as}
      sectionAs="section"
    >
      {children}
    </PageWrapper>
  );
}

/**
 * ContentPage - Wrapper especializado para páginas de contenido simple
 * Usa <main> semántico por defecto
 */
export interface ContentPageProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  maxWidth?: "max-w-4xl" | "max-w-6xl" | "max-w-7xl";
  /**
   * Elemento HTML semántico para el wrapper
   * @default 'main'
   */
  as?: ElementType;
  /**
   * Elemento HTML semántico para el contenedor interno
   * @default 'article' para páginas de contenido
   */
  sectionAs?: ElementType;
}

export function ContentPage({
  children,
  className,
  containerClassName,
  maxWidth = "max-w-4xl",
  as = "main",
  sectionAs = "article"
}: ContentPageProps) {
  return (
    <PageWrapper
      variant="content"
      className={className}
      containerClassName={containerClassName}
      maxWidth={maxWidth}
      as={as}
      sectionAs={sectionAs}
    >
      {children}
    </PageWrapper>
  );
}

/**
 * GridPage - Wrapper especializado para páginas con grid layout
 * Usa <main> y <section> semánticos
 */
export interface GridPageProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  maxWidth?: "max-w-4xl" | "max-w-6xl" | "max-w-7xl";
  /**
   * Elemento HTML semántico para el wrapper
   * @default 'main'
   */
  as?: ElementType;
  /**
   * Elemento HTML semántico para el contenedor interno
   * @default 'section' para páginas de grid/listados
   */
  sectionAs?: ElementType;
}

export function GridPage({
  children,
  className,
  containerClassName,
  maxWidth = "max-w-4xl",
  as = "main",
  sectionAs = "section"
}: GridPageProps) {
  return (
    <PageWrapper
      variant="grid"
      className={className}
      containerClassName={containerClassName}
      maxWidth={maxWidth}
      as={as}
      sectionAs={sectionAs}
    >
      {children}
    </PageWrapper>
  );
}


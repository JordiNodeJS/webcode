import type { ReactNode } from "react";

interface SectionLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * SectionLayout - Layout component that provides proper spacing to compensate for fixed header
 * 
 * This component applies padding-top using the CSS variable --header-height to ensure
 * content is not hidden behind the fixed header. It's designed to be used in route
 * layouts for pages that need proper offset from the navigation header.
 * 
 * @param children - The content to be rendered within the layout
 * @param className - Optional additional CSS classes
 */
export function SectionLayout({ children, className = "" }: SectionLayoutProps) {
  return (
    <div 
      className={`pt-[var(--header-height)] ${className}`}
      style={{
        paddingTop: "var(--header-height)"
      }}
    >
      {children}
    </div>
  );
}
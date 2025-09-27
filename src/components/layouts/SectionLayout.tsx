import type React from "react";

interface SectionLayoutProps {
  children: React.ReactNode;
}

export function SectionLayout({ children }: SectionLayoutProps) {
  return (
    <section
      style={{ paddingTop: "var(--header-height)" }}
      className="min-h-screen"
      aria-label="Main content"
    >
      <div className="container mx-auto px-4 pb-8">{children}</div>
    </section>
  );
}

// Note: default export removed to follow project convention (named exports for components)

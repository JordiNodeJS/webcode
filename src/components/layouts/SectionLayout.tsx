import type React from "react";

interface SectionLayoutProps {
  children: React.ReactNode;
}

export function SectionLayout({ children }: SectionLayoutProps) {
  return (
    <div
      style={{ paddingTop: "var(--header-height)" }}
      className="min-h-screen"
    >
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}

export default SectionLayout;

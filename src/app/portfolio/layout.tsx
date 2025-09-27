import type { ReactNode } from "react";
import { SectionLayout } from "@/components/layouts/SectionLayout";

interface PortfolioLayoutProps {
  children: ReactNode;
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return <SectionLayout>{children}</SectionLayout>;
}
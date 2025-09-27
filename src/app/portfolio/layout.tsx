import type { ReactNode } from "react";
import { SectionLayout } from "@/components/layouts/SectionLayout";

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return <SectionLayout>{children}</SectionLayout>;
}

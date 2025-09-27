import type { ReactNode } from "react";
import { SectionLayout } from "@/components/layouts/SectionLayout";

interface ServicesLayoutProps {
  children: ReactNode;
}

export default function ServicesLayout({ children }: ServicesLayoutProps) {
  return <SectionLayout>{children}</SectionLayout>;
}
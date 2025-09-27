import type { ReactNode } from "react";
import { SectionLayout } from "@/components/layouts/SectionLayout";

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <SectionLayout>{children}</SectionLayout>;
}

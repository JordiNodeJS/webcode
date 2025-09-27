import type { ReactNode } from "react";
import SectionLayout from "@/components/layouts/SectionLayout";

export default function ContactoLayout({ children }: { children: ReactNode }) {
  return <SectionLayout>{children}</SectionLayout>;
}

import type { ReactNode } from "react";
import { SectionLayout } from "@/components/layouts/SectionLayout";

interface ContactoLayoutProps {
  children: ReactNode;
}

export default function ContactoLayout({ children }: ContactoLayoutProps) {
  return <SectionLayout>{children}</SectionLayout>;
}
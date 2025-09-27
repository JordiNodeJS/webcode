import type { ReactNode } from "react";
import { SectionLayout } from "@/components/layouts/SectionLayout";

interface AboutLayoutProps {
  children: ReactNode;
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return <SectionLayout>{children}</SectionLayout>;
}
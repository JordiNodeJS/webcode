import type { Metadata } from "next";
import { IconShowcase } from "@/components/ui/IconShowcase";

export const metadata: Metadata = {
  title: "Sistema de Iconos | WebCode",
  description: "Showcase del nuevo sistema de iconos multi-familia de WebCode",
  robots: {
    index: false,
    follow: false
  }
};

export default function TestIconsPage() {
  return (
    <div className="min-h-screen bg-background">
      <IconShowcase />
    </div>
  );
}

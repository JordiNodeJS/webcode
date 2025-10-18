import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mantenimiento Web Profesional | WEBCODE",
  description:
    "Mantenimiento continuo, actualizaciones de seguridad y soporte técnico especializado para tu página web. Planes de soporte 24/7.",
  openGraph: {
    title: "Mantenimiento Web Profesional | WEBCODE",
    description:
      "Mantenimiento continuo, actualizaciones de seguridad y soporte técnico especializado para tu página web."
  }
};

export default function MantenimientoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}




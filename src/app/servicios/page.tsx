import type { Metadata } from "next";
import Link from "next/link";
import { generateSEOMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = generateSEOMetadata({
  title: "Servicios - WEBCODE | Desarrollo Web en Barcelona",
  description:
    "Listado de servicios de desarrollo web: landing pages, e-commerce, aplicaciones a medida, SEO y mantenimiento. WEBCODE - Barcelona.",
  canonical: "https://webcode.es/servicios"
});

export default function ServiciosPage() {
  return (
    <main className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground">Servicios</h1>
          <p className="text-muted-foreground mt-3">
            Ofrecemos servicios de desarrollo web profesional adaptados a
            freelancers, PYMEs y startups: desde landing pages hasta tiendas
            online y aplicaciones a medida.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Desarrollo Web</h3>
            <p className="text-muted-foreground mb-4">
              Sitios web corporativos y landing pages optimizadas para
              conversión y rendimiento.
            </p>
            <Link
              href="/services/web-development"
              className="text-primary underline font-medium"
            >
              Ver detalle
            </Link>
          </article>

          <article className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">E‑commerce</h3>
            <p className="text-muted-foreground mb-4">
              Tiendas online completas, integraciones de pasarelas de pago y
              optimización para ventas.
            </p>
            <Link
              href="/services/e-commerce"
              className="text-primary underline font-medium"
            >
              Ver detalle
            </Link>
          </article>

          <article className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Consultoría</h3>
            <p className="text-muted-foreground mb-4">
              Auditorías técnicas, migraciones y consultoría estratégica para tu
              presencia online.
            </p>
            <Link
              href="/services/consulting"
              className="text-primary underline font-medium"
            >
              Ver detalle
            </Link>
          </article>

          <article className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Mantenimiento</h3>
            <p className="text-muted-foreground mb-4">
              Planes de soporte, actualizaciones y backups para mantener tu web
              segura y rápida.
            </p>
            <Link
              href="/contacto"
              className="text-primary underline font-medium"
            >
              Consultar planes
            </Link>
          </article>
        </section>
      </div>
    </main>
  );
}

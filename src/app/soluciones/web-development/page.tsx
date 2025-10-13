import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Desarrollo Web Profesional | WEBCODE",
  description:
    "Creamos sitios web profesionales, landing pages optimizadas y aplicaciones web a medida con Next.js, React y las últimas tecnologías.",
  openGraph: {
    title: "Desarrollo Web Profesional | WEBCODE",
    description:
      "Creamos sitios web profesionales, landing pages optimizadas y aplicaciones web a medida.",
  },
};

export default function WebDevelopmentPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-b-4 border-primary">
        <div className="container mx-auto max-w-6xl px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-4 py-2 bg-primary text-white font-bold uppercase text-sm tracking-wider border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              Desarrollo Web
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-foreground">
              Sitios Web que{" "}
              <span className="text-primary">Convierten Visitantes</span> en
              Clientes
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
              Desarrollo web profesional con Next.js, React y TailwindCSS.
              Diseños modernos, rápidos y optimizados para SEO.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="font-bold text-lg px-8 py-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <Link href="/contacto">Solicitar Presupuesto</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-bold text-lg px-8 py-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <Link href="/portfolio">Ver Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">
          ¿Qué Tipo de Web <span className="text-secondary">Necesitas?</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Landing Pages */}
          <div className="group relative bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-black mb-3">Landing Pages</h3>
            <p className="text-muted-foreground mb-4">
              Páginas de alta conversión diseñadas para captar leads y vender.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Diseño optimizado para conversión</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>A/B Testing integrado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Formularios optimizados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Analytics y tracking</span>
              </li>
            </ul>
          </div>

          {/* Corporate Websites */}
          <div className="group relative bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <div className="text-5xl mb-4">🏢</div>
            <h3 className="text-2xl font-black mb-3">Webs Corporativas</h3>
            <p className="text-muted-foreground mb-4">
              Presencia profesional online para tu empresa o negocio.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Diseño a medida de tu marca</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>CMS para gestión de contenido</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Multi-idioma disponible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>SEO avanzado incluido</span>
              </li>
            </ul>
          </div>

          {/* Portfolios */}
          <div className="group relative bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-2xl font-black mb-3">Portfolios</h3>
            <p className="text-muted-foreground mb-4">
              Muestra tu trabajo de forma impactante y profesional.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Galerías optimizadas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Casos de estudio detallados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Animaciones fluidas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Responsive perfecto</span>
              </li>
            </ul>
          </div>

          {/* Web Apps */}
          <div className="group relative bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-black mb-3">Web Apps</h3>
            <p className="text-muted-foreground mb-4">
              Aplicaciones web complejas y escalables.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Arquitectura escalable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>APIs REST y GraphQL</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Autenticación y roles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Dashboard admin</span>
              </li>
            </ul>
          </div>

          {/* SaaS */}
          <div className="group relative bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <div className="text-5xl mb-4">💼</div>
            <h3 className="text-2xl font-black mb-3">SaaS Products</h3>
            <p className="text-muted-foreground mb-4">
              Plataformas SaaS completas listas para escalar.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Multi-tenancy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Pagos recurrentes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Planes y subscripciones</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Analytics y métricas</span>
              </li>
            </ul>
          </div>

          {/* Custom Development */}
          <div className="group relative bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <div className="text-5xl mb-4">🛠️</div>
            <h3 className="text-2xl font-black mb-3">A Medida</h3>
            <p className="text-muted-foreground mb-4">
              Desarrollo personalizado para necesidades específicas.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Soluciones únicas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Integraciones complejas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Lógica de negocio custom</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Consultoría incluida</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-gradient-to-br from-secondary/10 to-accent/10 border-y-4 border-black py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-center">
            Tecnologías que <span className="text-accent">Dominamos</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
            Utilizamos las tecnologías más modernas y probadas para garantizar
            rendimiento, escalabilidad y mantenibilidad.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Next.js 15", icon: "⚡" },
              { name: "React 19", icon: "⚛️" },
              { name: "TypeScript", icon: "📘" },
              { name: "TailwindCSS", icon: "🎨" },
              { name: "Node.js", icon: "🟢" },
              { name: "PostgreSQL", icon: "🐘" },
              { name: "MongoDB", icon: "🍃" },
              { name: "Vercel", icon: "▲" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="bg-white border-4 border-black p-6 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <div className="text-4xl mb-2">{tech.icon}</div>
                <div className="font-bold">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">
          Nuestro <span className="text-primary">Proceso</span>
        </h2>

        <div className="space-y-8">
          {[
            {
              step: "01",
              title: "Descubrimiento",
              description:
                "Entendemos tu negocio, objetivos y audiencia. Definimos alcance y requisitos técnicos.",
            },
            {
              step: "02",
              title: "Diseño & Prototipo",
              description:
                "Creamos wireframes y prototipos interactivos. Iteramos hasta lograr el diseño perfecto.",
            },
            {
              step: "03",
              title: "Desarrollo",
              description:
                "Construimos tu web con código limpio y escalable. Testing continuo durante el desarrollo.",
            },
            {
              step: "04",
              title: "Lanzamiento",
              description:
                "Deploy optimizado, configuración de analytics y monitorización. Tu web lista para crecer.",
            },
          ].map((phase) => (
            <div
              key={phase.step}
              className="flex gap-6 items-start bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="text-5xl font-black text-primary/20">
                {phase.step}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black mb-2">{phase.title}</h3>
                <p className="text-muted-foreground">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white border-t-4 border-black py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            ¿Listo para Crear tu Web?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Cuéntanos tu proyecto y te enviaremos un presupuesto personalizado
            en 24h.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="font-bold text-lg px-8 py-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            <Link href="/contacto">Solicitar Presupuesto Gratis</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

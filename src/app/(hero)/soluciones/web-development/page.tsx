import type { Metadata } from "next";
import Link from "next/link";
import { SolucionCard } from "@/components/soluciones";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Desarrollo Web Profesional | WEBCODE",
  description:
    "Creamos sitios web profesionales, landing pages optimizadas y aplicaciones web a medida con Next.js, React y las últimas tecnologías.",
  openGraph: {
    title: "Desarrollo Web Profesional | WEBCODE",
    description:
      "Creamos sitios web profesionales, landing pages optimizadas y aplicaciones web a medida."
  }
};

export default function WebDevelopmentPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[image:linear-gradient(to_right,rgb(var(--primary-rgb)_/_0.03),rgb(var(--secondary-rgb)_/_0.03),rgb(var(--accent-rgb)_/_0.03)),linear-gradient(to_bottom_right,rgb(var(--primary-rgb)_/_0.05),rgb(var(--secondary-rgb)_/_0.05),rgb(var(--accent-rgb)_/_0.05))] dark:bg-[image:linear-gradient(to_right,rgb(var(--primary-rgb)_/_0.05),rgb(var(--secondary-rgb)_/_0.05),rgb(var(--accent-rgb)_/_0.05)),linear-gradient(to_bottom_right,rgb(var(--primary-rgb)_/_0.10),rgb(var(--secondary-rgb)_/_0.10),rgb(var(--accent-rgb)_/_0.10))] pt-24 pb-20 md:pb-32">
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 text-primary dark:text-primary font-bold uppercase text-sm tracking-wider rounded-full border border-primary/30">
              Desarrollo Web
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
              Sitios Web que{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Convierten Visitantes
              </span>{" "}
              en Clientes
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Desarrollo web profesional con Next.js, React y TailwindCSS.
              Diseños modernos, rápidos y optimizados para SEO.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="font-bold text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Link href="/contacto">Solicitar Presupuesto</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-bold text-lg px-8 py-6 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all duration-300"
              >
                <Link href="/portfolio">Ver Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          ¿Qué Tipo de Web{" "}
          <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Necesitas?
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Landing Pages */}
          <SolucionCard>
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-3">Landing Pages</h3>
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
          </SolucionCard>

          {/* Corporate Websites */}
          <SolucionCard>
            <div className="text-5xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold mb-3">Webs Corporativas</h3>
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
          </SolucionCard>

          {/* Portfolios */}
          <SolucionCard>
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold mb-3">Portfolios</h3>
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
          </SolucionCard>

          {/* Web Apps */}
          <SolucionCard>
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-3">Web Apps</h3>
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
          </SolucionCard>

          {/* SaaS Products */}
          <SolucionCard>
            <div className="text-5xl mb-4">💼</div>
            <h3 className="text-2xl font-bold mb-3">SaaS Products</h3>
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
          </SolucionCard>

          {/* Custom Development */}
          <SolucionCard>
            <div className="text-5xl mb-4">🛠️</div>
            <h3 className="text-2xl font-bold mb-3">A Medida</h3>
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
          </SolucionCard>
        </div>
      </section>

      {/* Technologies */}
      <section className="bg-gradient-to-br from-accent/5 to-primary/5 dark:from-accent/10 dark:to-primary/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
            Tecnologías que{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Dominamos
            </span>
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Utilizamos las tecnologías más modernas y probadas para garantizar
            rendimiento, escalabilidad y mantenibilidad.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "⚡", name: "Next.js 15" },
              { icon: "⚛️", name: "React 19" },
              { icon: "📘", name: "TypeScript" },
              { icon: "🎨", name: "TailwindCSS" },
              { icon: "🟢", name: "Node.js" },
              { icon: "🐘", name: "PostgreSQL" },
              { icon: "🍃", name: "MongoDB" },
              { icon: "▲", name: "Vercel" }
            ].map((tech) => (
              <SolucionCard key={tech.name} hover={false}>
                <div className="text-4xl mb-2 text-center">{tech.icon}</div>
                <p className="text-center font-semibold text-sm">{tech.name}</p>
              </SolucionCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Nuestro Proceso
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              num: "01",
              title: "Descubrimiento",
              desc: "Entendemos tu negocio, objetivos y audiencia. Definimos alcance y requisitos técnicos."
            },
            {
              num: "02",
              title: "Diseño & Prototipo",
              desc: "Creamos wireframes y prototipos interactivos. Iteramos hasta lograr el diseño perfecto."
            },
            {
              num: "03",
              title: "Desarrollo",
              desc: "Construimos tu web con código limpio y escalable. Testing continuo durante el desarrollo."
            },
            {
              num: "04",
              title: "Lanzamiento",
              desc: "Deploy optimizado, configuración de analytics y monitorización. Tu web lista para crecer."
            }
          ].map((step) => (
            <SolucionCard key={step.num}>
              <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-primary/90 via-primary to-secondary/90 text-white py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
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
            className="font-bold text-lg px-8 py-6 hover:scale-105 transition-transform duration-300"
          >
            <Link href="/contacto">Solicitar Presupuesto Gratis</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

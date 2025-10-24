import type { Metadata } from "next";
import Link from "next/link";
import { SolucionCard } from "@/components/soluciones";
import { Button } from "@/components/ui/button";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiVercel,
  SiGoogleanalytics,
  SiSemrush,
  SiWebflow,
  SiWordpress,
  SiShopify,
  SiCloudflare,
  SiLighthouse,
  SiPagespeedinsights,
  SiNetlify
} from "react-icons/si";

export const metadata: Metadata = {
  title: "Rediseño de Páginas Web | WEBCODE",
  description:
    "Modernizamos tu página web existente con las últimas tecnologías y tendencias de diseño. Migración sin pérdida de SEO y optimización de rendimiento.",
  openGraph: {
    title: "Rediseño de Páginas Web | WEBCODE",
    description:
      "Modernizamos tu página web existente con las últimas tecnologías y tendencias de diseño."
  }
};

export default function RedisenoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[image:linear-gradient(to_right,rgb(var(--secondary-rgb)_/_0.03),rgb(var(--primary-rgb)_/_0.03),rgb(var(--accent-rgb)_/_0.03)),linear-gradient(to_bottom_right,rgb(var(--secondary-rgb)_/_0.05),rgb(var(--primary-rgb)_/_0.05),rgb(var(--accent-rgb)_/_0.05))] dark:bg-[image:linear-gradient(to_right,rgb(var(--secondary-rgb)_/_0.05),rgb(var(--primary-rgb)_/_0.05),rgb(var(--accent-rgb)_/_0.05)),linear-gradient(to_bottom_right,rgb(var(--secondary-rgb)_/_0.10),rgb(var(--primary-rgb)_/_0.10),rgb(var(--accent-rgb)_/_0.10))] pt-24 pb-20 md:pb-32">
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-secondary/20 to-primary/20 dark:from-secondary/30 dark:to-primary/30 text-secondary dark:text-secondary font-bold uppercase text-sm tracking-wider rounded-full border border-secondary/30">
              Rediseño Web
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
              Moderniza tu{" "}
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Presencia Online
              </span>{" "}
              sin Perder Posicionamiento
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Rediseñamos tu página web existente con las últimas tecnologías y
              tendencias. Migración segura, sin pérdida de SEO y con mejoras de
              rendimiento garantizadas.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="font-bold text-lg px-8 py-6 bg-gradient-to-r from-secondary to-primary hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Link href="/contacto">Solicitar Auditoría Gratis</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-bold text-lg px-8 py-6 hover:bg-gradient-to-r hover:from-secondary/10 hover:to-primary/10 transition-all duration-300"
              >
                <Link href="/portfolio">Ver Casos de Rediseño</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Redesign Section */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          ¿Por qué{" "}
          <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Rediseñar tu Web?
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* SEO Preservation */}
          <SolucionCard>
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-3">Preservación SEO</h3>
            <p className="text-muted-foreground mb-4">
              Mantenemos y mejoramos tu posicionamiento actual durante la
              migración.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Migración 301 redirects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Preservación de URLs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Meta tags optimizadas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Estructura mejorada</span>
              </li>
            </ul>
          </SolucionCard>

          {/* Performance */}
          <SolucionCard>
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-3">Rendimiento Optimizado</h3>
            <p className="text-muted-foreground mb-4">
              Tu nueva web será más rápida, eficiente y amigable para usuarios y
              motores de búsqueda.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Carga 3x más rápida</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Core Web Vitals optimizados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Imágenes optimizadas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Código limpio y moderno</span>
              </li>
            </ul>
          </SolucionCard>

          {/* Modern Design */}
          <SolucionCard>
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold mb-3">Diseño Moderno</h3>
            <p className="text-muted-foreground mb-4">
              Actualizamos el diseño siguiendo las últimas tendencias y mejores
              prácticas UX/UI.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Responsive design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>UX optimizada</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Accesibilidad mejorada</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Animaciones fluidas</span>
              </li>
            </ul>
          </SolucionCard>

          {/* New Features */}
          <SolucionCard>
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-3">Nuevas Funcionalidades</h3>
            <p className="text-muted-foreground mb-4">
              Añadimos funcionalidades modernas que mejoran la experiencia del
              usuario.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>CMS moderno</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Formularios avanzados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Integración analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Chat en vivo</span>
              </li>
            </ul>
          </SolucionCard>

          {/* Security */}
          <SolucionCard>
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold mb-3">Seguridad Mejorada</h3>
            <p className="text-muted-foreground mb-4">
              Implementamos las mejores prácticas de seguridad y compliance
              legal.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>HTTPS obligatorio</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Protección DDoS</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Backups automáticos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Compliance RGPD</span>
              </li>
            </ul>
          </SolucionCard>

          {/* Support */}
          <SolucionCard>
            <div className="text-5xl mb-4">🛠️</div>
            <h3 className="text-2xl font-bold mb-3">Soporte Continuo</h3>
            <p className="text-muted-foreground mb-4">
              Te acompañamos durante y después del rediseño con soporte técnico
              especializado.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Migración asistida</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Capacitación del equipo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Mantenimiento incluido</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Soporte 24/7</span>
              </li>
            </ul>
          </SolucionCard>
        </div>
      </section>

      {/* Technologies */}
      <section className="bg-gradient-to-br from-secondary/5 to-primary/5 dark:from-secondary/10 dark:to-primary/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
            Tecnologías{" "}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              de Migración
            </span>
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Utilizamos las tecnologías más modernas para garantizar una
            migración exitosa y un rendimiento óptimo.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: SiNextdotjs, name: "Next.js 15" },
              { icon: SiReact, name: "React 19" },
              { icon: SiTypescript, name: "TypeScript" },
              { icon: SiTailwindcss, name: "TailwindCSS" },
              { icon: SiLighthouse, name: "Lighthouse" },
              { icon: SiPagespeedinsights, name: "PageSpeed" },
              { icon: SiGoogleanalytics, name: "Analytics" },
              { icon: SiSemrush, name: "SEO Tools" },
              { icon: SiWebflow, name: "Webflow" },
              { icon: SiWordpress, name: "WordPress" },
              { icon: SiShopify, name: "Shopify" },
              { icon: SiCloudflare, name: "Cloudflare" },
              { icon: SiVercel, name: "Vercel" },
              { icon: SiNetlify, name: "Netlify" },
              { icon: SiNodedotjs, name: "Node.js" }
            ].map((tech) => {
              const IconComponent = tech.icon;
              return (
                <div key={tech.name} className="relative group">
                  {/* Medalla con el estilo actual de SolucionCard */}
                  <div className="relative overflow-hidden border border-border/30 dark:border-border/20 bg-gradient-to-br from-white/95 via-white/90 to-slate-50/95 dark:from-slate-800/95 dark:via-slate-700/90 dark:to-slate-800/85 rounded-full p-6 shadow-3d-lg hover:shadow-3d-xl transition-all duration-500 hover:-translate-y-2">
                    {/* Glow effect on hover - conservando el efecto actual */}
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/6 via-primary/6 to-secondary/6 dark:from-secondary/8 dark:via-primary/12 dark:to-secondary/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full" />

                    {/* Brillo metálico superior */}
                    <div className="absolute inset-2 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-full opacity-50"></div>

                    {/* Reflejo metálico lateral */}
                    <div className="absolute top-3 left-3 w-6 h-6 bg-gradient-to-br from-white/30 to-transparent rounded-full opacity-60"></div>

                    {/* Contenido centrado */}
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <div className="mb-3 p-3 bg-background/80 rounded-full shadow-inner border border-border/20">
                        <IconComponent className="h-8 w-8 text-foreground" />
                      </div>
                      <p className="text-center font-semibold text-sm text-foreground bg-background/60 px-3 py-1 rounded-full border border-border/20 shadow-sm">
                        {tech.name}
                      </p>
                    </div>
                  </div>

                  {/* Sombra de la medalla */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black/20 rounded-full blur-sm"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Proceso de Rediseño
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              num: "01",
              title: "Auditoría Completa",
              desc: "Analizamos tu web actual: SEO, rendimiento, diseño y funcionalidades. Identificamos oportunidades de mejora."
            },
            {
              num: "02",
              title: "Plan de Migración",
              desc: "Creamos un plan detallado que preserva tu SEO actual y mejora todos los aspectos de tu web."
            },
            {
              num: "03",
              title: "Desarrollo & Testing",
              desc: "Desarrollamos la nueva versión en paralelo, probamos exhaustivamente antes del lanzamiento."
            },
            {
              num: "04",
              title: "Migración & Lanzamiento",
              desc: "Migración segura en horario de menor tráfico. Monitoreo 24/7 durante las primeras 48h."
            }
          ].map((step) => (
            <SolucionCard key={step.num}>
              <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
            </SolucionCard>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gradient-to-br from-accent/5 to-primary/5 dark:from-accent/10 dark:to-primary/10 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Paquetes de{" "}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Rediseño
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Básico */}
            <SolucionCard>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Rediseño Básico</h3>
                <div className="text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-2">
                  €1.990
                </div>
                <p className="text-muted-foreground">
                  Ideal para webs pequeñas
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Diseño moderno responsive</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Migración SEO preservada</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Optimización rendimiento</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Hasta 10 páginas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Soporte 30 días</span>
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full font-bold">
                <Link href="/contacto">Solicitar Presupuesto</Link>
              </Button>
            </SolucionCard>

            {/* Profesional */}
            <SolucionCard>
              <div className="relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-secondary to-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                    Más Popular
                  </span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">
                    Rediseño Profesional
                  </h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-2">
                    €3.990
                  </div>
                  <p className="text-muted-foreground">
                    Para empresas en crecimiento
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold">✓</span>
                    <span>Todo lo del Básico</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold">✓</span>
                    <span>Hasta 25 páginas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold">✓</span>
                    <span>CMS moderno incluido</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold">✓</span>
                    <span>Formularios avanzados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold">✓</span>
                    <span>Analytics & tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold">✓</span>
                    <span>Soporte 90 días</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full font-bold bg-gradient-to-r from-secondary to-primary"
                >
                  <Link href="/contacto">Solicitar Presupuesto</Link>
                </Button>
              </div>
            </SolucionCard>

            {/* Enterprise */}
            <SolucionCard>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Rediseño Enterprise</h3>
                <div className="text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-2">
                  €7.990+
                </div>
                <p className="text-muted-foreground">Para grandes empresas</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Todo lo del Profesional</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Páginas ilimitadas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Integraciones complejas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Multi-idioma</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>API personalizada</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Soporte 6 meses</span>
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full font-bold">
                <Link href="/contacto">Contactar Ventas</Link>
              </Button>
            </SolucionCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[image:linear-gradient(to_right,rgb(var(--secondary-rgb)_/_0.03),rgb(var(--primary-rgb)_/_0.03),rgb(var(--accent-rgb)_/_0.03)),linear-gradient(to_bottom_right,rgb(var(--secondary-rgb)_/_0.05),rgb(var(--primary-rgb)_/_0.05),rgb(var(--accent-rgb)_/_0.05))] dark:bg-[image:linear-gradient(to_right,rgb(var(--secondary-rgb)_/_0.05),rgb(var(--primary-rgb)_/_0.05),rgb(var(--accent-rgb)_/_0.05)),linear-gradient(to_bottom_right,rgb(var(--secondary-rgb)_/_0.10),rgb(var(--primary-rgb)_/_0.10),rgb(var(--accent-rgb)_/_0.10))] py-20 md:py-28">
        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-6 text-3xl font-display font-bold md:text-5xl lg:text-6xl text-foreground">
            ¿Listo para Modernizar tu Web?
          </h2>
          <p className="mb-8 text-lg font-sans md:text-xl lg:text-2xl text-muted-foreground">
            Solicita una auditoría gratuita y descubre cómo podemos mejorar tu
            presencia online sin perder el posicionamiento actual.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className={`
              font-bold text-base md:text-lg px-6 py-4 md:px-8 md:py-5
              hover:opacity-90 hover:-translate-y-0.5
              transition-all duration-200 
              ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              border-0
            `}
            style={{
              backgroundColor: `rgb(var(--secondary-rgb))`,
              color: "rgb(8 11 12)",
              boxShadow: "var(--shadow-3d-sm)"
            }}
          >
            <Link href="/contacto">Auditoría Gratuita de Rediseño</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

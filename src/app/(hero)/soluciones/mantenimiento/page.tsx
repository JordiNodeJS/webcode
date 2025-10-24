"use client";

import Link from "next/link";
import { SolucionCard } from "@/components/soluciones";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/Icon";
import {
  SiNextdotjs,
  SiReact,
  SiWebflow,
  SiShopify,
  SiWix
} from "react-icons/si";
import {
  Settings,
  TrendingUp,
  Shield,
  Database,
  Monitor,
  Zap,
  Rocket,
  Target
} from "@/lib/icons";

export default function MantenimientoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[image:linear-gradient(to_right,rgb(var(--primary-rgb)_/_0.03),rgb(var(--secondary-rgb)_/_0.03),rgb(var(--accent-rgb)_/_0.03)),linear-gradient(to_bottom_right,rgb(var(--primary-rgb)_/_0.05),rgb(var(--secondary-rgb)_/_0.05),rgb(var(--accent-rgb)_/_0.05))] dark:bg-[image:linear-gradient(to_right,rgb(var(--primary-rgb)_/_0.05),rgb(var(--secondary-rgb)_/_0.05),rgb(var(--accent-rgb)_/_0.05)),linear-gradient(to_bottom_right,rgb(var(--primary-rgb)_/_0.10),rgb(var(--secondary-rgb)_/_0.10),rgb(var(--accent-rgb)_/_0.10))] pt-24 pb-20 md:pb-32">
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-accent/20 to-primary/20 dark:from-accent/30 dark:to-primary/30 text-accent dark:text-accent font-bold uppercase text-sm tracking-wider rounded-full border border-accent/30">
              Mantenimiento Web
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
              Tu Web Siempre{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Funcionando Perfectamente
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Mantenimiento continuo, actualizaciones de seguridad y soporte
              técnico especializado. Tu página web siempre actualizada, segura y
              optimizada.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="font-bold text-lg px-8 py-6 bg-gradient-to-r from-accent to-primary hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Link href="/contacto">Solicitar Mantenimiento</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-bold text-lg px-8 py-6 hover:bg-gradient-to-r hover:from-accent/10 hover:to-primary/10 transition-all duration-300"
              >
                <Link href="/servicios">Ver Todos los Servicios</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Planes de Mantenimiento{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Adaptados a Tu Necesidad
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mantenimiento Básico */}
          <SolucionCard>
            <div className="mb-4 flex justify-center">
              <Icon
                icon={Shield}
                size="3xl"
                variant="primary"
                aria-label="Mantenimiento Básico"
              />
            </div>
            <h3 className="text-2xl font-bold mb-3">Mantenimiento Básico</h3>
            <p className="text-muted-foreground mb-4">
              Plan esencial para mantener tu web funcionando sin problemas
              básicos.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Actualizaciones de seguridad mensuales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Backups automáticos semanales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Soporte técnico por email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Monitoreo básico de uptime</span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-border/30">
              <div className="text-2xl font-bold text-primary mb-2">
                Desde 99€/mes
              </div>
              <p className="text-sm text-muted-foreground">
                Perfecto para webs pequeñas
              </p>
            </div>
          </SolucionCard>

          {/* Mantenimiento Profesional */}
          <SolucionCard>
            <div className="mb-4 flex justify-center">
              <Icon
                icon={Zap}
                size="3xl"
                variant="secondary"
                aria-label="Mantenimiento Profesional"
              />
            </div>
            <h3 className="text-2xl font-bold mb-3">
              Mantenimiento Profesional
            </h3>
            <p className="text-muted-foreground mb-4">
              Plan completo con optimización continua y soporte prioritario.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Actualizaciones de seguridad semanales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Backups diarios automáticos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Soporte técnico prioritario</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Optimización de rendimiento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Monitoreo avanzado 24/7</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Reportes mensuales de estado</span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-border/30">
              <div className="text-2xl font-bold text-secondary mb-2">
                Desde 199€/mes
              </div>
              <p className="text-sm text-muted-foreground">
                Ideal para empresas
              </p>
            </div>
          </SolucionCard>

          {/* Mantenimiento Premium */}
          <SolucionCard>
            <div className="mb-4 flex justify-center">
              <Icon
                icon={Rocket}
                size="3xl"
                variant="accent"
                aria-label="Mantenimiento Premium"
              />
            </div>
            <h3 className="text-2xl font-bold mb-3">Mantenimiento Premium</h3>
            <p className="text-muted-foreground mb-4">
              Plan premium con gestión completa y soporte 24/7.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>Actualizaciones inmediatas de seguridad</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>Backups múltiples diarios</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>Soporte técnico 24/7</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>Optimización continua</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>Monitoreo avanzado con alertas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>Gestión de contenido incluida</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>Análisis SEO mensual</span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-border/30">
              <div className="text-2xl font-bold text-accent mb-2">
                Desde 399€/mes
              </div>
              <p className="text-sm text-muted-foreground">
                Para proyectos críticos
              </p>
            </div>
          </SolucionCard>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Tecnologías que{" "}
          <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Mantenemos
          </span>
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-4 max-w-3xl mx-auto">
          <div className="flex flex-col items-center justify-center w-32 h-32 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:shadow-lg transition-all duration-300">
            <SiNextdotjs className="text-3xl text-primary mb-2" />
            <span className="font-semibold text-sm">Next.js</span>
          </div>
          <div className="flex flex-col items-center justify-center w-32 h-32 p-4 rounded-2xl bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/20 hover:shadow-lg transition-all duration-300">
            <SiReact className="text-3xl text-secondary mb-2" />
            <span className="font-semibold text-sm">React</span>
          </div>
          <div className="flex flex-col items-center justify-center w-32 h-32 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:shadow-lg transition-all duration-300">
            <SiWebflow className="text-3xl text-primary mb-2" />
            <span className="font-semibold text-sm">Webflow</span>
          </div>
          <div className="flex flex-col items-center justify-center w-32 h-32 p-4 rounded-2xl bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/20 hover:shadow-lg transition-all duration-300">
            <SiShopify className="text-3xl text-secondary mb-2" />
            <span className="font-semibold text-sm">Shopify</span>
          </div>
          <div className="flex flex-col items-center justify-center w-32 h-32 p-4 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 hover:shadow-lg transition-all duration-300">
            <SiWix className="text-3xl text-accent mb-2" />
            <span className="font-semibold text-sm">Wix</span>
          </div>
        </div>
      </section>

      {/* What We Maintain Section */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          ¿Qué Incluye Nuestro{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Mantenimiento?
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon
                  icon={Shield}
                  size="lg"
                  className="text-white"
                  aria-label="Seguridad Web"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Seguridad Web</h3>
                <p className="text-muted-foreground">
                  Actualizaciones de seguridad, protección contra malware,
                  certificados SSL y monitoreo de vulnerabilidades.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-xl flex items-center justify-center">
                <Icon
                  icon={Database}
                  size="lg"
                  className="text-white"
                  aria-label="Backups Automáticos"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Backups Automáticos</h3>
                <p className="text-muted-foreground">
                  Copias de seguridad automáticas diarias con almacenamiento
                  seguro y recuperación rápida en caso de problemas.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-xl flex items-center justify-center">
                <Icon
                  icon={Zap}
                  size="lg"
                  className="text-white"
                  aria-label="Optimización"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Optimización</h3>
                <p className="text-muted-foreground">
                  Mejora continua del rendimiento, optimización de imágenes,
                  cache y velocidad de carga.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon
                  icon={Monitor}
                  size="lg"
                  className="text-white"
                  aria-label="Monitoreo 24/7"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Monitoreo 24/7</h3>
                <p className="text-muted-foreground">
                  Supervisión continua del uptime, alertas automáticas y
                  respuesta rápida ante incidencias.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-xl flex items-center justify-center">
                <Icon
                  icon={Settings}
                  size="lg"
                  className="text-white"
                  aria-label="Soporte Técnico"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Soporte Técnico</h3>
                <p className="text-muted-foreground">
                  Asistencia técnica especializada, resolución de problemas y
                  consultas sobre funcionalidades.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-xl flex items-center justify-center">
                <Icon
                  icon={TrendingUp}
                  size="lg"
                  className="text-white"
                  aria-label="Reportes Mensuales"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Reportes Mensuales</h3>
                <p className="text-muted-foreground">
                  Informes detallados del estado de tu web, estadísticas de
                  rendimiento y recomendaciones de mejora.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          ¿Por Qué Elegir{" "}
          <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            WEBCODE?
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <SolucionCard>
            <div className="mb-4 flex justify-center">
              <Icon
                icon={Target}
                size="3xl"
                variant="primary"
                aria-label="Especialistas en Web"
              />
            </div>
            <h3 className="text-2xl font-bold mb-3">Especialistas en Web</h3>
            <p className="text-muted-foreground">
              Más de 5 años de experiencia manteniendo y optimizando páginas web
              de todo tipo. Conocemos las mejores prácticas.
            </p>
          </SolucionCard>

          <SolucionCard>
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-3">Respuesta Rápida</h3>
            <p className="text-muted-foreground">
              Tiempo de respuesta promedio de 2 horas en planes profesionales.
              Tu web siempre funcionando sin interrupciones.
            </p>
          </SolucionCard>

          <SolucionCard>
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-2xl font-bold mb-3">Precios Justos</h3>
            <p className="text-muted-foreground">
              Planes de mantenimiento transparentes sin costes ocultos. Solo
              pagas por lo que realmente necesitas.
            </p>
          </SolucionCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12 border border-primary/20 shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              ¿Listo para Mantener tu Web{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Siempre Actualizada?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              No esperes a que algo se rompa. Con nuestros planes de
              mantenimiento, tu página web estará siempre segura, rápida y
              funcionando perfectamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="font-bold text-lg px-8 py-6 bg-gradient-to-r from-accent to-primary hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Link href="/contacto">Solicitar Presupuesto</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-bold text-lg px-8 py-6 hover:bg-gradient-to-r hover:from-accent/10 hover:to-primary/10 transition-all duration-300"
              >
                <Link href="/portfolio">Ver Casos de Éxito</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { AnimatedLogo } from "./Footer.AnimatedLogo";

/**
 * Footer.Section - Componente principal del footer de WEBCODE
 *
 * Características:
 * - Logo animado central inspirado en el CodePen
 * - Información de contacto y enlaces
 * - Soporte completo para modo claro/oscuro
 * - Diseño responsive
 * - Integración con el sistema de temas WEBCODE
 */
export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background border-t border-border/50 overflow-hidden">
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/30 via-transparent to-transparent" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Columna Izquierda - Información de Servicios */}
          <div className="text-center lg:text-left space-y-6">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Servicios
            </h3>
            <div className="space-y-3">
              <Link
                href="/services/web-development"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Desarrollo Web
              </Link>
              <Link
                href="/services/e-commerce"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                E-commerce
              </Link>
              <Link
                href="/services/seo"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                SEO & Marketing
              </Link>
              <Link
                href="/services/consulting"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Consultoría
              </Link>
            </div>

            {/* Badge de ubicación - Colores corregidos del tema */}
            <div
              className="inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm"
              style={{
                backgroundColor: "oklch(var(--secondary) / 0.1)",
                color: "oklch(var(--secondary))",
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Barcelona, España</span>
            </div>
          </div>

          {/* Columna Central - Logo Animado */}
          <div className="flex justify-center">
            <AnimatedLogo />
          </div>

          {/* Columna Derecha - Contacto y Enlaces */}
          <div className="text-center lg:text-right space-y-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Contacto</h3>
            <div className="space-y-3">
              <a
                href="mailto:info@webcode.es"
                className="block transition-colors duration-200"
                style={{
                  color: "oklch(var(--muted-foreground))",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "oklch(var(--secondary))")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    "oklch(var(--muted-foreground))")
                }
              >
                info@webcode.es
              </a>
              <Link
                href="/about"
                className="block transition-colors duration-200"
                style={{
                  color: "oklch(var(--muted-foreground))",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "oklch(var(--secondary))")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    "oklch(var(--muted-foreground))")
                }
              >
                Sobre Nosotros
              </Link>
              <Link
                href="/portfolio"
                className="block transition-colors duration-200"
                style={{
                  color: "oklch(var(--muted-foreground))",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "oklch(var(--secondary))")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    "oklch(var(--muted-foreground))")
                }
              >
                Portfolio
              </Link>
            </div>

            {/* Enlaces sociales - Colores corregidos del tema */}
            <div className="flex justify-center lg:justify-end space-x-4 pt-4">
              <a
                href="https://linkedin.com/company/webcode"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full transition-all duration-200 flex items-center justify-center group"
                style={{
                  backgroundColor: "oklch(var(--muted))",
                  color: "oklch(var(--muted-foreground))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "oklch(var(--primary))";
                  e.currentTarget.style.color =
                    "oklch(var(--primary-foreground))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "oklch(var(--muted))";
                  e.currentTarget.style.color =
                    "oklch(var(--muted-foreground))";
                }}
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.71zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
                </svg>
              </a>
              <a
                href="https://github.com/webcode-es"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full transition-all duration-200 flex items-center justify-center group"
                style={{
                  backgroundColor: "oklch(var(--muted))",
                  color: "oklch(var(--muted-foreground))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "oklch(var(--secondary))";
                  e.currentTarget.style.color =
                    "oklch(var(--secondary-foreground))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "oklch(var(--muted))";
                  e.currentTarget.style.color =
                    "oklch(var(--muted-foreground))";
                }}
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://twitter.com/webcode_es"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full transition-all duration-200 flex items-center justify-center group"
                style={{
                  backgroundColor: "oklch(var(--muted))",
                  color: "oklch(var(--muted-foreground))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "oklch(var(--primary))";
                  e.currentTarget.style.color =
                    "oklch(var(--primary-foreground))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "oklch(var(--muted))";
                  e.currentTarget.style.color =
                    "oklch(var(--muted-foreground))";
                }}
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-border/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {currentYear} WEBCODE. Todos los derechos reservados.
            </div>

            {/* Enlaces legales - Colores corregidos del tema */}
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="transition-colors duration-200"
                style={{ color: "oklch(var(--muted-foreground))" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "oklch(var(--foreground))")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    "oklch(var(--muted-foreground))")
                }
              >
                Privacidad
              </Link>
              <Link
                href="/terms"
                className="transition-colors duration-200"
                style={{ color: "oklch(var(--muted-foreground))" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "oklch(var(--foreground))")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    "oklch(var(--muted-foreground))")
                }
              >
                Términos
              </Link>
              <Link
                href="/cookies"
                className="transition-colors duration-200"
                style={{ color: "oklch(var(--muted-foreground))" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "oklch(var(--foreground))")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    "oklch(var(--muted-foreground))")
                }
              >
                Cookies
              </Link>
            </div>

            {/* Tecnologías utilizadas - Colores corregidos del tema */}
            <div
              className="text-xs flex items-center space-x-2"
              style={{ color: "oklch(var(--muted-foreground) / 0.7)" }}
            >
              <span>Desarrollado con</span>
              <span style={{ color: "oklch(var(--primary))" }}>Next.js</span>
              <span>&</span>
              <span style={{ color: "oklch(var(--secondary))" }}>React</span>
            </div>
          </div>
        </div>
      </div>

      {/* Efecto de ondas en el borde superior - Colores corregidos del tema */}
      <div
        className="absolute top-0 left-0 w-full h-1 opacity-30"
        style={{
          background: `linear-gradient(to right, 
            oklch(var(--primary)), 
            oklch(var(--secondary)), 
            oklch(var(--primary))
          )`,
        }}
      />
    </footer>
  );
}

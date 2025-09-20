"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { WSFadeIn } from "@/components/animations/ws-fade-in";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useScrollPosition from "@/hooks/use-scroll-position";
import { ThemeToggle } from "./Hero.ThemeToggle";

interface NavigationItem {
  href: string;
  label: string;
}

const navigationItems: NavigationItem[] = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contacto", label: "Contacto" },
];

const languages = [
  { code: "es", label: "ES" },
  { code: "ca", label: "CA" },
  { code: "en", label: "EN" },
];

/**
 * Navegación principal del header
 *
 * Componente Client Component para manejar la interactividad del menú móvil
 * y el selector de idiomas. Usa el sistema de colores WebCode.
 *
 * Optimizado usando React hooks estándar y Tailwind CSS.
 */
export function HeaderNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition.y > 10;

  // Opacidad dinámica del fondo según scroll (1 en top -> 0 tras fadeEnd px)
  const fadeStart = 0; // px desde el top donde empieza a desvanecerse
  const fadeEnd = 240; // px a partir de los cuales la opacidad llega a 0
  const progress = Math.min(
    1,
    Math.max(
      0,
      (scrollPosition.y - fadeStart) / Math.max(1, fadeEnd - fadeStart)
    )
  );
  const bgOpacity = 1 - progress; // 1 -> 0

  // Función para manejar el smooth scroll con offset para el header responsive
  const handleSmoothScroll = (
    href: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Scroll simple - el título ya tiene scroll-mt-20 para el offset del header
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ease-out ${
        isScrolled
          ? "backdrop-blur-lg border-b border-border/40 shadow-xl py-2"
          : "backdrop-blur-md border-b border-border/30 shadow-lg py-4"
      }`}
      // Usamos tokens CSS del tema para que funcione en light/dark: hsl(var(--background)/alpha)
      style={{
        backgroundColor: `hsl(var(--background) / ${bgOpacity.toFixed(3)})`,
      }}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <WSFadeIn delay={0.1}>
            <div className="flex items-center">
              <Link
                href="/"
                className={`font-bold text-gradient-webcode transition-all duration-300 ${
                  isScrolled ? "text-xl" : "text-2xl"
                }`}
              >
                WebCode
              </Link>
            </div>
          </WSFadeIn>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <WSFadeIn key={item.href} delay={0.1 + index * 0.1}>
                <a
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(item.href, e)}
                  className={`transition-all duration-300 font-medium cursor-pointer ${
                    isScrolled
                      ? "text-foreground hover:text-primary text-sm"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </a>
              </WSFadeIn>
            ))}
          </div>

          {/* Language Selector & Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <WSFadeIn delay={0.3}>
              <div
                className={`hidden md:flex items-center space-x-1 bg-muted/40 backdrop-blur-sm transition-all duration-300 ${
                  isScrolled ? "rounded-md p-0.5 scale-90" : "rounded-lg p-1"
                }`}
              >
                {languages.map((lang) => (
                  <button
                    type="button"
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang.code)}
                    className={`transition-all duration-300 font-medium rounded ${
                      isScrolled ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-sm"
                    } ${
                      currentLanguage === lang.code
                        ? "bg-primary/60 text-primary-foreground/80 backdrop-blur-sm"
                        : "text-muted-foreground/50 hover:text-foreground/80 hover:bg-muted/30"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </WSFadeIn>

            {/* Theme Toggle */}
            <WSFadeIn delay={0.4}>
              <ThemeToggle />
            </WSFadeIn>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Language Selector */}
              <WSFadeIn delay={0.3}>
                <div className="flex items-center space-x-1 bg-muted/40 backdrop-blur-sm rounded-md p-0.5">
                  {languages.map((lang) => (
                    <button
                      type="button"
                      key={lang.code}
                      onClick={() => setCurrentLanguage(lang.code)}
                      className={`px-1.5 py-0.5 text-xs font-medium rounded transition-all duration-300 ${
                        currentLanguage === lang.code
                          ? "bg-primary/60 text-primary-foreground/80 backdrop-blur-sm"
                          : "text-muted-foreground/50 hover:text-foreground/80 hover:bg-muted/30"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </WSFadeIn>

              {/* Sheet para menú móvil */}
              <WSFadeIn delay={0.4}>
                <Sheet
                  open={isMobileMenuOpen}
                  onOpenChange={setIsMobileMenuOpen}
                >
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="md:hidden"
                      aria-label="Toggle mobile menu"
                    >
                      <Menu size={20} />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[200px] sm:w-[50px]">
                    {/* Título oculto visualmente para accesibilidad */}
                    <SheetTitle className="sr-only">Navegación</SheetTitle>
                    <div className="flex flex-col space-y-4 mt-6 ps-4 text-center">
                      {navigationItems.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="text-foreground hover:text-primary transition-colors duration-200 font-medium text-lg py-2 cursor-pointer"
                          onClick={(e) => {
                            handleSmoothScroll(item.href, e);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </WSFadeIn>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

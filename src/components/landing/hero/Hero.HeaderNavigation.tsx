"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./Hero.ThemeToggle";
import useScrollPosition from "@/hooks/use-scroll-position";
import { WSFadeIn } from "@/components/animations/ws-fade-in";

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
 * y el selector de idiomas. Usa el sistema de colores WebSnack.
 *
 * Optimizado usando React hooks estándar y Tailwind CSS.
 */
export function HeaderNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition.y > 10;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border/40 shadow-xl py-2"
          : "bg-background/80 backdrop-blur-md border-b border-border/30 shadow-lg py-4"
      }`}
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
                  className={`transition-all duration-300 font-medium ${
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
                className={`hidden md:flex items-center space-x-1 bg-muted transition-all duration-300 ${
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
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
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
                <div className="flex items-center space-x-1 bg-muted rounded-md p-0.5">
                  {languages.map((lang) => (
                    <button
                      type="button"
                      key={lang.code}
                      onClick={() => setCurrentLanguage(lang.code)}
                      className={`px-1.5 py-0.5 text-xs font-medium rounded transition-all duration-300 ${
                        currentLanguage === lang.code
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </WSFadeIn>

              {/* Sheet para menú móvil */}
              <WSFadeIn delay={0.4}>
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
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
                          className="text-foreground hover:text-primary transition-colors duration-200 font-medium text-lg py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
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
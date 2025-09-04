"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
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
 * y el selector de idiomas. Usa el sistema de colores WebSnack.
 */
export function HeaderNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Cuando el usuario hace scroll más de 10px, activamos el estado "scrolled"
      setIsScrolled(window.scrollY > 10);
    };

    // Agregamos el event listener
    window.addEventListener("scroll", handleScroll);
    
    // Limpiamos el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-background/90 backdrop-blur-lg border-b border-border/40 shadow-xl py-2" 
        : "bg-background/80 backdrop-blur-md border-b border-border/30 shadow-lg py-4"
    }`}>
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className={`font-bold text-gradient-websnack transition-all duration-300 ${
                isScrolled ? "text-xl" : "text-2xl"
              }`}
            >
              WebSnack
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`transition-all duration-300 font-medium ${
                  isScrolled 
                    ? "text-foreground hover:text-primary text-sm" 
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Language Selector & Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className={`flex items-center space-x-1 transition-all duration-300 ${
              isScrolled 
                ? "bg-muted rounded-md p-0.5 scale-90" 
                : "bg-muted rounded-lg p-1"
            }`}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLanguage(lang.code)}
                  className={`transition-all duration-300 font-medium rounded ${
                    isScrolled 
                      ? "px-1.5 py-0.5 text-xs" 
                      : "px-2 py-1 text-sm"
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

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
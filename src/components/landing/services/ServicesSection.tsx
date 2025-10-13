"use client";

import { useEffect, useRef } from "react";
import { useAnimationContext } from "@/contexts/AnimationContext";
import { ServiceCard, ServiceHeader } from ".";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { disableAnimationsForSection } = useAnimationContext();

  // Sistema bidireccional: suspender animaciones en Services, reactivar en Hero
  useEffect(() => {
    const servicesObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Entrando a Services: suspender animaciones costosas
            disableAnimationsForSection("hero");

            const waveElements = document.querySelectorAll(
              '[class*="animate-wave"]',
            );
            waveElements.forEach((wave) => {
              wave.classList.add("animation-suspended");
            });

            const header = document.querySelector("header");
            if (header) {
              header.classList.add("reduce-motion");
            }
          } else {
            // Saliendo de Services (volviendo a Hero): reactivar animaciones
            const waveElements = document.querySelectorAll(
              '[class*="animate-wave"]',
            );
            waveElements.forEach((wave) => {
              wave.classList.remove("animation-suspended");
            });

            const header = document.querySelector("header");
            if (header) {
              header.classList.remove("reduce-motion");
            }

            const wavesBackground = document.querySelector(".waves-background");
            if (wavesBackground) {
              wavesBackground.classList.remove("out-of-view");
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -20% 0px",
      },
    );

    if (sectionRef.current) {
      servicesObserver.observe(sectionRef.current);
    }

    return () => servicesObserver.disconnect();
  }, [disableAnimationsForSection]);

  const services = [
    {
      id: 1,
      icon: "🚀",
      title: "Web Express",
      subtitle: "PRESENCIA DIGITAL EN 7 DÍAS",
      features: [
        "Sitio profesional listo para usar — Plantilla premium personalizada con tu contenido, colores de marca y logo. Responsive en todos los dispositivos y optimizado para Google desde el primer día.",
        "Gestión de contenido fácil — Panel simple donde puedes editar textos, cambiar imágenes y añadir nuevos servicios sin conocimientos técnicos. Todo visual, todo intuitivo.",
        "SEO básico incluido — Tu negocio aparecerá en Google Maps, tendrás meta descriptions optimizadas y estructura correcta para buscadores. Sin complicaciones técnicas.",
        "Formulario de contacto integrado — Los clientes pueden contactarte directamente desde tu web. Recibes los mensajes por email al instante y puedes responder desde tu móvil.",
      ],
      target:
        "Freelancers, consultores, pequeños negocios locales, profesionales que necesitan presencia online YA.",
      ctaText: "Empezar Web Express",
      href: "/soluciones/web-development",
      delay: 0,
    },
    {
      id: 2,
      icon: "🛒",
      title: "Tienda Online Básica",
      subtitle: "VENDE ONLINE SIN COMPLICACIONES",
      features: [
        "Catálogo de productos simple — Sube fotos, añade descripciones y precios. Tus clientes pueden navegar, seleccionar y comprar en 3 clics. Gestión de stock automática.",
        "Pagos seguros integrados — Acepta pagos con tarjeta, Bizum y transferencia. Todo configurado y listo para recibir dinero desde el día uno. Sin mensualidades extra de pasarelas.",
        "Pedidos por WhatsApp — Opción de checkout directo a WhatsApp para clientes que prefieren hablar contigo antes de comprar. Perfecto para productos personalizados.",
        "Gestión desde móvil — Controla pedidos, actualiza stock y responde clientes desde cualquier lugar. App móvil incluida para gestión sobre la marcha.",
      ],
      target:
        "Artesanos, pequeñas tiendas, productos locales, negocios familiares que quieren vender online.",
      ctaText: "Crear Mi Tienda",
      href: "/soluciones/e-commerce",
      delay: 0.1,
    },
    {
      id: 3,
      icon: "📅",
      title: "Reservas y Citas",
      subtitle: "AGENDA DIGITAL AUTOMÁTICA",
      features: [
        "Calendario online 24/7 — Tus clientes reservan cuando quieren, tu agenda se actualiza sola. Evita llamadas constantes y dobles reservas. Sincronización con Google Calendar.",
        "Recordatorios automáticos — SMS y emails de confirmación se envían solos. Menos no-shows, más organización. Tus clientes nunca olvidan su cita.",
        "Gestión de servicios — Define duración, precio y disponibilidad de cada servicio. El sistema calcula automáticamente horarios libres y slots disponibles.",
        "Pagos y depósitos — Opcional: cobra anticipos o el servicio completo al reservar. Reduce cancelaciones de última hora y asegura tu tiempo.",
      ],
      target:
        "Peluquerías, consultas, terapeutas, instructores, cualquier negocio por citas.",
      ctaText: "Configurar Agenda",
      href: "/soluciones/reservas",
      delay: 0.2,
    },
    {
      id: 4,
      icon: "🎯",
      title: "Landing de Captación",
      subtitle: "GENERA LEADS MIENTRAS DUERMES",
      features: [
        "Página enfocada en conversión — Una sola página diseñada para un objetivo: conseguir clientes. Formulario optimizado, testimonios reales y llamada a la acción clara.",
        "Lead magnets irresistibles — Descarga gratuita (PDF, checklist, mini-curso) a cambio del email. Base de datos de clientes potenciales que crece automáticamente.",
        "Seguimiento automatizado — Emails de bienvenida y secuencia de nurturing configurados. Tus leads reciben valor antes de convertirse en clientes.",
        "Analytics simples — Dashboard que muestra visitantes, conversiones y origen del tráfico. Sabes qué funciona sin complicarte con métricas avanzadas.",
      ],
      target:
        "Coaches, cursos online, servicios premium, lanzamientos de producto.",
      ctaText: "Generar Leads",
      href: "/soluciones/landing-pages",
      delay: 0.3,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen pt-16 pb-20 px-4 sm:px-6 lg:px-8"
      data-animation-section="services"
      data-testid="services-section"
    >
      <div className="max-w-7xl mx-auto">
        <ServiceHeader />

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-16"
          style={{
            // Optimización: subgrid cuando esté disponible
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              style={{
                // Usar will-change solo durante las animaciones
                willChange: index < 2 ? "transform, opacity" : "auto",
              }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

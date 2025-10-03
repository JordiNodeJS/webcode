import type { Metadata } from "next";
import Link from "next/link";
import { FAQItem } from "@/components/faq/FAQItem";
import { MudanzasCard } from "@/components/faq/MudanzasCard";
import { FAQStructuredData } from "@/components/seo/FAQStructuredData";
import { ArrowRight } from "@/lib/icons";
import { generateSEOMetadata } from "@/lib/seo-metadata";

// Contenido de preguntas frecuentes optimizado para SEO
const faqs = [
  {
    question: "¿Qué servicios de desarrollo web ofrecéis en Barcelona?",
    answer: (
      <>
        <p>
          Ofrecemos un servicio integral de desarrollo web adaptado a PYMEs,
          startups y profesionales: desde landing pages hasta tiendas online y
          aplicaciones web.
        </p>

        <ul className="mt-3 ml-5 list-disc space-y-2">
          <li>Diseño y desarrollo de páginas web a medida</li>
          <li>Tiendas online (e-commerce) y pasarelas de pago</li>
          <li>Aplicaciones web progresivas (PWA)</li>
          <li>Optimización técnica y SEO</li>
          <li>Mantenimiento, actualizaciones y soporte</li>
          <li>Migración de sitios y consultoría técnica</li>
        </ul>
      </>
    )
  },
  {
    question:
      "¿Cuánto tiempo se tarda en desarrollar una página web profesional?",
    answer: (
      <>
        <p>
          El plazo depende del alcance y funcionalidades requeridas.
          Orientación:
        </p>

        <ul className="mt-3 ml-5 list-disc space-y-2">
          <li>Landing page básica: 1–2 semanas</li>
          <li>Sitio corporativo: 3–4 semanas</li>
          <li>E-commerce o aplicaciones personalizadas: 6–12 semanas</li>
        </ul>

        <p className="mt-3">
          En la consulta inicial entregamos un calendario detallado y revisiones
          regulares para que el proyecto avance con transparencia.
        </p>
      </>
    )
  },
  {
    question: "¿Cuál es el precio de un sitio web profesional?",
    answer: (
      <>
        <p>
          Los precios varían según funcionalidades, diseño y requisitos
          técnicos. A modo orientativo:
        </p>

        <ul className="mt-3 ml-5 list-disc space-y-2">
          <li>
            Landing page profesional: desde <strong>800€</strong>
          </li>
          <li>
            Sitio corporativo: desde <strong>1.500€</strong>
          </li>
          <li>
            E-commerce: desde <strong>2.500€</strong>
          </li>
        </ul>

        <p className="mt-3">
          Todas las propuestas incluyen diseño responsive, optimización básica
          SEO, hosting el primer año y formación. Ofrecemos una consulta
          gratuita para evaluar tu caso y darte un presupuesto detallado sin
          compromiso.
        </p>
      </>
    )
  },
  {
    question: "¿Qué tecnologías utilizáis para desarrollar páginas web?",
    answer: (
      <>
        <p>Trabajamos con un stack moderno y probado para 2025:</p>

        <ul className="mt-3 ml-5 list-disc space-y-2">
          <li>
            <strong>Next.js 15</strong> (App Router) y <strong>React 19</strong>
          </li>
          <li>
            <strong>TypeScript</strong> para seguridad y mantenibilidad
          </li>
          <li>
            <strong>Tailwind CSS v4</strong> para estilos utility-first
          </li>
          <li>
            <strong>WAS</strong> (nuestro sistema de animaciones) para
            microinteracciones optimizadas
          </li>
        </ul>

        <p className="mt-3">
          Este stack nos permite entregar sitios rápidos, accesibles y fáciles
          de mantener, con foco en Core Web Vitals y SEO técnico.
        </p>
      </>
    )
  },
  {
    question: "¿Hacéis diseño responsive y mobile-first?",
    answer: (
      <>
        <p>
          Sí. Aplicamos un enfoque <strong>mobile-first</strong>: diseñamos
          pensando primero en móviles y escalamos a tablet y escritorio.
        </p>

        <p className="mt-3">
          Probamos en múltiples dispositivos y navegadores para asegurar una
          experiencia consistente y accesible en todos los tamaños de pantalla.
        </p>
      </>
    )
  },
  {
    question: "¿Ofrecéis servicios de SEO en Barcelona?",
    answer: (
      <>
        <p>
          Sí — ofrecemos SEO técnico y estratégico para nuevos y existentes
          sitios.
        </p>

        <ul className="mt-3 ml-5 list-disc space-y-2">
          <li>Investigación de palabras clave y estrategia de contenidos</li>
          <li>Optimización técnica (velocidad, estructura, Core Web Vitals)</li>
          <li>SEO on-page: metadatos, headings y enlaces internos</li>
          <li>SEO local específico para Barcelona y Catalunya</li>
          <li>Auditorías completas y planes de optimización</li>
        </ul>
      </>
    )
  },
  {
    question: "¿Qué incluye el mantenimiento web?",
    answer: (
      <>
        <p>
          Nuestro mantenimiento cubre las tareas necesarias para mantener tu web
          sana y segura:
        </p>

        <ul className="mt-3 ml-5 list-disc space-y-2">
          <li>Actualizaciones de seguridad mensuales</li>
          <li>Copias de seguridad automáticas semanales</li>
          <li>Monitoreo 24/7 del tiempo de actividad</li>
          <li>Actualizaciones de contenido (textos, imágenes)</li>
          <li>Soporte prioritario por email y chat</li>
          <li>Optimización de rendimiento e informes mensuales</li>
        </ul>

        <p className="mt-3">
          Ofrecemos planes desde <strong>49€/mes</strong> adaptados a cada
          necesidad. El primer año de hosting suele ir incluido en nuestros
          proyectos.
        </p>
      </>
    )
  },
  {
    question: "¿Trabajáis con clientes de toda España o solo en Barcelona?",
    answer: (
      <>
        <p>
          Aunque estamos basados en Barcelona, trabajamos con clientes de toda
          España y también internacionalmente.
        </p>

        <p className="mt-3">
          Usamos herramientas de comunicación online (videollamadas, gestión de
          proyectos y repositorios en la nube) para colaborar de forma
          eficiente. Para clientes locales ofrecemos reuniones presenciales si
          es necesario.
        </p>
      </>
    )
  },
  {
    question: "¿Proporcionáis hosting y dominio?",
    answer: (
      <>
        <p>
          Sí — nos encargamos de todo lo necesario para que tu web esté en
          producción de forma segura y fiable.
        </p>

        <ul className="mt-3 ml-5 list-disc space-y-2">
          <li>
            <strong>Registro de dominio:</strong> te asesoramos y gestionamos el
            registro (.es, .com, .cat, etc.) como parte del proyecto.
          </li>
          <li>
            <strong>Hosting incluido el primer año:</strong> el primer año de
            hosting va incluido en nuestros proyectos para que no tengas que
            preocuparte por la infraestructura inicial.
          </li>
          <li>
            <strong>Seguridad y backups:</strong> certificados SSL, copias de
            seguridad automáticas y medidas básicas de protección.
          </li>
          <li>
            <strong>Disponibilidad y soporte:</strong> servidores seleccionados
            con uptime garantizado (99.9%) y soporte técnico para incidencias.
          </li>
          <li>
            <strong>Planes tras el primer año:</strong> ofrecemos hosting y
            mantenimiento desde <strong>8€/mes</strong> con todo incluido
            (soporte, actualizaciones de seguridad y backups).
          </li>
          <li>
            <strong>¿Ya tienes hosting?</strong> Podemos trabajar con tu
            proveedor actual y ayudarte en la migración si procede.
          </li>
        </ul>

        <p className="mt-3">
          Si quieres un desglose de precios o comparar opciones (cloud
          gestionado, VPS o compartido){" "}
          <Link href="/contacto">contáctanos</Link>y te preparamos una
          recomendación adaptada a tu proyecto.
        </p>
      </>
    )
  },
  {
    question: "¿Cómo es el proceso de trabajo en un proyecto web?",
    answer: (
      <>
        <p>Nuestro proceso de trabajo está estructurado en 5 fases claras:</p>
        <ol className="mt-3 ml-5 list-decimal space-y-2">
          <li>
            <strong>Consulta inicial gratuita:</strong> entendemos tus
            necesidades y objetivos.
          </li>
          <li>
            <strong>Propuesta y presupuesto:</strong> entregamos un plan
            detallado con calendario de entregas.
          </li>
          <li>
            <strong>Diseño y desarrollo:</strong> trabajamos con revisiones
            regulares y tu feedback continuo.
          </li>
          <li>
            <strong>Testing completo:</strong> pruebas de funcionalidad,
            rendimiento, dispositivos, navegadores y accesibilidad.
          </li>
          <li>
            <strong>Lanzamiento y formación:</strong> publicamos el sitio y te
            formamos para gestionarlo.
          </li>
        </ol>
        <p className="mt-3">
          Durante todo el proceso mantenemos comunicación constante, entregas
          parciales para revisión, y total transparencia en tiempos y costes.
        </p>
      </>
    )
  },
  {
    question:
      "¿Puedo actualizar el contenido de mi web yo mismo después del lanzamiento?",
    answer: (
      <>
        <p>
          Sí — y depende de la solución que acordemos en el proyecto. Aquí
          tienes las opciones habituales y cómo afectan al mantenimiento y al
          precio:
        </p>

        <ol className="mt-3 ml-5 list-decimal space-y-2">
          <li>
            <strong>Sitio estático sin CMS:</strong> contenido incluido en el
            código. Es la opción más económica y rápida, pero cualquier cambio
            requiere que un desarrollador haga una nueva entrega (build +
            deploy).
          </li>
          <li>
            <strong>
              Sitio estático con CMS headless (p. ej. Sanity, Contentful,
              Netlify CMS):
            </strong>
            el contenido se edita desde un panel sin necesidad de tocar código.
            Mantiene buena performance y permite que el equipo no técnico
            gestione textos e imágenes. El coste aumenta respecto al sitio
            estático simple por la integración y licencias (si aplican).
          </li>
          <li>
            <strong>
              Sitio dinámico con CMS integrado (p. ej. WordPress, Strapi):
            </strong>
            ideal si necesitas roles de usuario, flujos de trabajo, o un
            ecosistema de plugins. Más flexible pero con mayor coste inicial y
            requisitos de mantenimiento continuo.
          </li>
        </ol>

        <p className="mt-3">
          También ofrecemos formación práctica (normalmente 2–3 horas) y
          documentación en vídeo para que puedas gestionar el contenido por tu
          cuenta. Si prefieres delegarlo, tenemos planes de mantenimiento y
          actualización desde <strong>49€/mes</strong>.
        </p>

        <p>
          Si quieres que te recomendemos la mejor opción para tu proyecto y un
          presupuesto claro (impacto en precio y timeline),{" "}
          <Link href="/contacto">contáctanos</Link>y te preparamos una propuesta
          adaptada.
        </p>
      </>
    )
  },
  {
    question: "¿Qué diferencia a WEBCODE de otras agencias de desarrollo web?",
    answer: (
      <>
        <p>
          Nos diferenciamos por varios aspectos clave que aportan valor real:
        </p>

        <ul className="mt-3 ml-5 list-disc space-y-2">
          <li>
            <strong>Tecnología de vanguardia:</strong> trabajamos con Next.js 15
            y React 19 para obtener rendimiento y escalabilidad.
          </li>
          <li>
            <strong>Sistema de animación propio (WAS):</strong>{" "}
            microinteracciones y animaciones optimizadas que mejoran la
            experiencia de usuario.
          </li>
          <li>
            <strong>Enfoque en performance:</strong> optimizamos para Core Web
            Vitals y mejores prácticas de carga (prioridad en velocidad).
          </li>
          <li>
            <strong>SEO técnico incluido:</strong> desde arquitectura hasta
            metadatos y rendimiento, para ayudar a mejorar la visibilidad.
          </li>
          <li>
            <strong>Transparencia y procesos claros:</strong> planificación,
            entregas y costes siempre documentados y acordados.
          </li>
          <li>
            <strong>Soporte postventa y formación:</strong> formación para tu
            equipo y planes de mantenimiento adaptados.
          </li>
          <li>
            <strong>Conocimiento del mercado local:</strong> experiencia en
            Barcelona y España para decisiones de UX, SEO y negocio.
          </li>
          <li>
            <strong>Relación calidad-precio:</strong> soluciones competitivas
            sin sacrificar la calidad técnica ni la accesibilidad.
          </li>
        </ul>
      </>
    )
  },
  {
    question: "¿Ofrecéis garantía en vuestros desarrollos web?",
    answer:
      "Sí, todos nuestros proyectos incluyen garantía de 3 meses desde el lanzamiento que cubre cualquier error de programación, bug funcional, o problema técnico relacionado con nuestro desarrollo. Durante este período, cualquier corrección está incluida sin coste adicional. Además, el primer año de hosting incluye soporte técnico y actualizaciones de seguridad. Nuestro objetivo es tu satisfacción completa y una relación a largo plazo, por lo que siempre estamos disponibles para resolver cualquier duda o incidencia."
  },
  {
    question: "¿Puedo ver ejemplos de vuestros trabajos anteriores?",
    answer: (
      <>
        <p>
          Sí. Actualmente tenemos un ejemplo público que puedes visitar:
          <a
            href="https://mudanzasandy.es"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-primary underline"
          >
            mudanzasandy.es
          </a>
          — desarrollado con <strong>Astro</strong> y{" "}
          <strong>TypeScript</strong> para máxima rapidez y optimizaciones de
          rendimiento.
        </p>

        <MudanzasCard />

        <p className="mt-3">
          Si deseas ver más proyectos (casos de estudio privados) podemos
          mostrarlos durante la consulta inicial o preparar un dossier con
          ejemplos similares a tu sector bajo petición.
        </p>
      </>
    )
  }
];

// Metadata optimizada para SEO
export const metadata: Metadata = generateSEOMetadata({
  title: "Preguntas Frecuentes - Desarrollo Web Barcelona | WEBCODE FAQ",
  description:
    "Resuelve todas tus dudas sobre desarrollo web, diseño responsive, SEO, e-commerce y servicios digitales en Barcelona. Preguntas frecuentes sobre precios, plazos, tecnologías y proceso de trabajo.",
  keywords: [
    "preguntas frecuentes desarrollo web",
    "FAQ desarrollo web Barcelona",
    "precio página web Barcelona",
    "cuánto cuesta una web profesional",
    "servicios web Barcelona",
    "desarrollo web preguntas",
    "agencia web FAQ",
    "tiempo desarrollo web",
    "tecnologías desarrollo web 2025",
    "SEO Barcelona preguntas",
    "e-commerce FAQ",
    "mantenimiento web Barcelona",
    "hosting web España",
    "diseño responsive FAQ",
    "Next.js desarrollo Barcelona"
  ],
  canonical: "https://webcode.es/faqs"
});

export default function FAQsPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />

      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-16 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Preguntas Frecuentes
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Encuentra respuestas a las dudas más comunes sobre nuestros
              servicios de desarrollo web, diseño, SEO y soluciones digitales en
              Barcelona.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 md:p-8 shadow-lg">
            <div className="divide-y divide-border/30">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={`faq-${faq.question.slice(0, 20).replace(/\s+/g, "-")}`}
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Estamos aquí para ayudarte. Contáctanos y resolveremos todas tus
              dudas sobre tu proyecto web.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 group"
              >
                Consulta Gratuita
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services/web-development"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm font-semibold hover:bg-accent transition-all duration-200"
              >
                Ver Servicios
              </Link>
            </div>
          </div>

          {/* Additional SEO Content */}
          <div className="mt-20 prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Servicios de Desarrollo Web en Barcelona
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              En <strong>WEBCODE</strong>, nos especializamos en ofrecer
              soluciones de <strong>desarrollo web profesional</strong> para
              freelancers, PYMEs y startups en <strong>Barcelona</strong> y toda
              España. Nuestro equipo utiliza las tecnologías más avanzadas de
              2025, incluyendo <strong>Next.js 15</strong>,{" "}
              <strong>React 19</strong>, y <strong>TypeScript</strong>, para
              crear sitios web de alto rendimiento que destacan en los motores
              de búsqueda.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Desde <strong>landing pages optimizadas</strong> hasta{" "}
              <strong>tiendas online completas</strong> y{" "}
              <strong>aplicaciones web personalizadas</strong>, cada proyecto se
              desarrolla con un enfoque en el <strong>rendimiento</strong>, la{" "}
              <strong>accesibilidad</strong> y el <strong>SEO</strong>.
              Integramos animaciones y microinteracciones diseñadas para mejorar
              la experiencia de usuario, reforzar la personalidad de la marca y
              favorecer la conversión.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              ¿Buscas una{" "}
              <strong>agencia de desarrollo web en Barcelona</strong> que
              combine tecnología de vanguardia con comprensión del mercado
              local? Contáctanos para una <strong>consulta gratuita</strong> y
              descubre cómo podemos ayudarte a alcanzar tus objetivos digitales.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

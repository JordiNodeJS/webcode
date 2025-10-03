import type { Metadata } from "next";
import Link from "next/link";
import { FAQItem } from "@/components/faq/FAQItem";
import { FAQStructuredData } from "@/components/seo/FAQStructuredData";
import { ArrowRight } from "@/lib/icons";
import { generateSEOMetadata } from "@/lib/seo-metadata";

// Contenido de preguntas frecuentes optimizado para SEO
const faqs = [
  {
    question: "¿Qué servicios de desarrollo web ofrecéis en Barcelona?",
    answer: "En WEBCODE ofrecemos servicios completos de desarrollo web profesional en Barcelona y toda España: diseño y desarrollo de páginas web personalizadas, tiendas online (e-commerce), aplicaciones web progresivas (PWA), optimización SEO, mantenimiento web, migración de sitios web, y consultoría técnica. Utilizamos las tecnologías más modernas de 2025 como Next.js 15, React 19 y TypeScript para garantizar sitios web rápidos, seguros y escalables."
  },
  {
    question: "¿Cuánto tiempo se tarda en desarrollar una página web profesional?",
    answer: "El tiempo de desarrollo depende de la complejidad del proyecto. Una landing page básica puede estar lista en 1-2 semanas. Un sitio web corporativo completo suele tardar 3-4 semanas. Para proyectos de e-commerce o aplicaciones web personalizadas, el plazo es de 6-12 semanas. Siempre proporcionamos un calendario detallado durante la consulta inicial gratuita y mantenemos comunicación constante durante todo el proceso de desarrollo."
  },
  {
    question: "¿Cuál es el precio de un sitio web profesional?",
    answer: "Nuestros precios se adaptan a cada proyecto y presupuesto. Una landing page profesional parte desde 800€. Sitios web corporativos desde 1.500€. Tiendas online (e-commerce) desde 2.500€. Aplicaciones web personalizadas se presupuestan según requisitos específicos. Todos nuestros proyectos incluyen diseño responsive, optimización SEO básica, hosting el primer año y formación para gestionar el contenido. Ofrecemos una consulta gratuita para evaluar tus necesidades y proporcionar un presupuesto detallado sin compromiso."
  },
  {
    question: "¿Qué tecnologías utilizáis para desarrollar páginas web?",
    answer: "Utilizamos el stack tecnológico más avanzado de 2025: Next.js 15 como framework principal (React 19 incluido), TypeScript para mayor seguridad y mantenibilidad, Tailwind CSS v4 para diseño responsive y moderno, y nuestro sistema propio WAS (WEBCODE Animation System) para animaciones fluidas. Este stack garantiza sitios web ultra-rápidos (Core Web Vitals óptimos), excelente SEO, máxima accesibilidad (WCAG 2.1 AA) y escalabilidad para crecer con tu negocio."
  },
  {
    question: "¿Hacéis diseño responsive y mobile-first?",
    answer: "Sí, absolutamente. Todos nuestros sitios web se desarrollan con enfoque mobile-first, lo que significa que diseñamos primero para móviles y luego adaptamos a tablets y ordenadores. Más del 60% del tráfico web en España proviene de dispositivos móviles, por lo que garantizamos que tu web se vea y funcione perfectamente en cualquier dispositivo: smartphones, tablets, ordenadores portátiles y de sobremesa. Todos nuestros proyectos se prueban en múltiples dispositivos y navegadores antes de la entrega."
  },
  {
    question: "¿Ofrecéis servicios de SEO en Barcelona?",
    answer: "Sí, ofrecemos servicios completos de SEO (Search Engine Optimization) tanto para nuevos sitios web como para optimizar webs existentes. Nuestro servicio incluye: investigación de palabras clave, optimización técnica (velocidad, estructura, Core Web Vitals), SEO on-page (contenido, metadatos, enlaces internos), SEO local para negocios en Barcelona y Catalunya, auditorías SEO completas, y estrategias de contenido. Todos nuestros desarrollos incluyen SEO técnico desde el inicio para garantizar la mejor visibilidad en Google y otros buscadores."
  },
  {
    question: "¿Qué incluye el mantenimiento web?",
    answer: "Nuestro servicio de mantenimiento web incluye: actualizaciones de seguridad mensuales, copias de seguridad automáticas semanales, monitoreo 24/7 del tiempo de actividad, actualizaciones de contenido (textos, imágenes), soporte técnico prioritario por email y chat, optimización continua de rendimiento, informes mensuales de analíticas, y soporte para resolver cualquier incidencia técnica. Ofrecemos planes desde 49€/mes adaptados a las necesidades de cada cliente. El primer año de hosting está incluido en todos nuestros proyectos de desarrollo."
  },
  {
    question: "¿Trabajáis con clientes de toda España o solo en Barcelona?",
    answer: "Aunque estamos basados en Barcelona, trabajamos con clientes de toda España y también internacionalmente. Gracias a nuestras herramientas de comunicación online (videollamadas, gestión de proyectos digital, repositorios en la nube), podemos colaborar eficientemente sin importar la ubicación. Ofrecemos servicios completamente remotos manteniendo la misma calidad y comunicación que con clientes locales. Para proyectos en Barcelona y alrededores, también ofrecemos reuniones presenciales si lo prefieres."
  },
  {
    question: "¿Proporcionáis hosting y dominio?",
    answer: "Sí, nos encargamos de todo el proceso técnico. Te ayudamos a registrar el dominio (.es, .com, .cat, etc.) y lo incluimos en el presupuesto. El hosting del primer año está incluido en todos nuestros proyectos de desarrollo. Utilizamos servidores de alta calidad con garantía de uptime del 99.9%, certificados SSL incluidos, copias de seguridad automáticas, y soporte técnico 24/7. Tras el primer año, ofrecemos planes de hosting desde 8€/mes con todo incluido. También podemos trabajar con tu hosting actual si ya tienes uno."
  },
  {
    question: "¿Cómo es el proceso de trabajo en un proyecto web?",
    answer: "Nuestro proceso consta de 5 fases: 1) Consulta inicial gratuita para entender tus necesidades y objetivos. 2) Propuesta y presupuesto detallado con calendario de entregas. 3) Diseño y desarrollo con revisiones regulares y tu feedback continuo. 4) Testing completo (funcionalidad, rendimiento, dispositivos, navegadores, accesibilidad). 5) Lanzamiento y formación para que puedas gestionar tu web. Durante todo el proceso mantenemos comunicación constante, entregas parciales para revisión, y total transparencia en tiempos y costes."
  },
  {
    question: "¿Puedo actualizar el contenido de mi web yo mismo después del lanzamiento?",
    answer: "Sí, todos nuestros sitios web incluyen un sistema de gestión de contenido (CMS) intuitivo que te permite actualizar textos, imágenes, productos (en e-commerce), noticias, y otros elementos sin conocimientos técnicos. Proporcionamos formación personalizada de 2-3 horas tras el lanzamiento, documentación en vídeo paso a paso, y manual de usuario detallado. Si prefieres no gestionarlo tú mismo, ofrecemos servicios de mantenimiento y actualización de contenido desde 49€/mes."
  },
  {
    question: "¿Qué diferencia a WEBCODE de otras agencias de desarrollo web?",
    answer: "Nos diferenciamos en varios aspectos clave: 1) Tecnología de vanguardia 2025 (Next.js 15, React 19) que garantiza rendimiento excepcional. 2) Sistema propio WAS de animaciones para experiencias únicas. 3) Enfoque en performance (score 100/100 en Core Web Vitals). 4) SEO técnico incluido desde el inicio. 5) Transparencia total en proceso y costes. 6) Soporte postventa excepcional y disponible. 7) Comprensión profunda del mercado español y barcelona. 8) Relación calidad-precio competitiva sin sacrificar calidad."
  },
  {
    question: "¿Ofrecéis garantía en vuestros desarrollos web?",
    answer: "Sí, todos nuestros proyectos incluyen garantía de 3 meses desde el lanzamiento que cubre cualquier error de programación, bug funcional, o problema técnico relacionado con nuestro desarrollo. Durante este período, cualquier corrección está incluida sin coste adicional. Además, el primer año de hosting incluye soporte técnico y actualizaciones de seguridad. Nuestro objetivo es tu satisfacción completa y una relación a largo plazo, por lo que siempre estamos disponibles para resolver cualquier duda o incidencia."
  },
  {
    question: "¿Puedo ver ejemplos de vuestros trabajos anteriores?",
    answer: "Por supuesto. Puedes ver nuestro portfolio completo con casos de estudio, tecnologías utilizadas, y resultados obtenidos en nuestra página de portfolio. Incluimos ejemplos de diferentes tipos de proyectos: landing pages, sitios corporativos, e-commerce, aplicaciones web, y optimizaciones SEO. También compartimos métricas de rendimiento reales (velocidad de carga, puntuaciones Core Web Vitals, mejoras en ranking SEO) para demostrar la calidad de nuestro trabajo. Durante la consulta inicial, podemos mostrarte proyectos similares al tuyo."
  },
  {
    question: "¿Trabajáis con startups y pequeñas empresas o solo con grandes empresas?",
    answer: "Trabajamos principalmente con freelancers, PYMEs, startups y pequeñas empresas, que son nuestro público objetivo principal. Entendemos los desafíos específicos de los negocios en crecimiento: presupuestos ajustados, necesidad de resultados rápidos, y escalabilidad futura. Ofrecemos soluciones flexibles, planes de pago adaptados, y la posibilidad de empezar con un MVP (Producto Mínimo Viable) e ir creciendo según las necesidades. Nuestro objetivo es democratizar el acceso a soluciones web profesionales de calidad para todos los emprendedores en España."
  }
];

// Metadata optimizada para SEO
export const metadata: Metadata = generateSEOMetadata({
  title: "Preguntas Frecuentes - Desarrollo Web Barcelona | WEBCODE FAQ",
  description: "Resuelve todas tus dudas sobre desarrollo web, diseño responsive, SEO, e-commerce y servicios digitales en Barcelona. Preguntas frecuentes sobre precios, plazos, tecnologías y proceso de trabajo.",
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
  canonical: "https://webcode.es/preguntas-frecuentes"
});

export default function PreguntasFrecuentesPage() {
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
              Encuentra respuestas a las dudas más comunes sobre nuestros servicios de 
              desarrollo web, diseño, SEO y soluciones digitales en Barcelona.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 md:p-8 shadow-lg">
            <div className="divide-y divide-border/30">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={`faq-${faq.question.slice(0, 20).replace(/\s+/g, '-')}`}
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
              Estamos aquí para ayudarte. Contáctanos y resolveremos todas tus dudas 
              sobre tu proyecto web.
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
              En <strong>WEBCODE</strong>, nos especializamos en ofrecer soluciones de <strong>desarrollo web profesional</strong> 
              para freelancers, PYMEs y startups en <strong>Barcelona</strong> y toda España. Nuestro equipo utiliza las 
              tecnologías más avanzadas de 2025, incluyendo <strong>Next.js 15</strong>, <strong>React 19</strong>, y 
              <strong>TypeScript</strong>, para crear sitios web de alto rendimiento que destacan en los motores de búsqueda.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Desde <strong>landing pages optimizadas</strong> hasta <strong>tiendas online completas</strong> y 
              <strong>aplicaciones web personalizadas</strong>, cada proyecto se desarrolla con un enfoque en el 
              <strong>rendimiento</strong>, la <strong>accesibilidad</strong> y el <strong>SEO</strong>. Nuestro 
              sistema propio <strong>WAS (WEBCODE Animation System)</strong> garantiza experiencias de usuario fluidas 
              y memorables que convierten visitantes en clientes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              ¿Buscas una <strong>agencia de desarrollo web en Barcelona</strong> que combine tecnología de vanguardia 
              con comprensión del mercado local? Contáctanos para una <strong>consulta gratuita</strong> y descubre 
              cómo podemos ayudarte a alcanzar tus objetivos digitales.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

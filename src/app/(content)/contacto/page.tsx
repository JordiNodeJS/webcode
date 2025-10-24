import type { Metadata } from "next";
import { ContactForm } from "@/components/features/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contacto - WEBCODE | ¿Hablamos?",
  description:
    "¿Hablamos? Ponte en contacto con WEBCODE para solicitar presupuesto o consultar sobre nuestros servicios de diseño web profesional en Barcelona.",
  robots: {
    index: true,
    follow: true
  }
};

export default function ContactoPage() {
  return (
    <>
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Contacto Directo
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
          ¿Hablamos?
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Cada empresa es única. Te creamos un{" "}
          <strong className="text-foreground">
            servicio de diseño web a medida
          </strong>
          : webs únicas con diseños originales y{" "}
          <strong className="text-foreground">
            100% orientados a los resultados
          </strong>{" "}
          que buscas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Formulario de contacto */}
        <div>
          <ContactForm />
        </div>

        {/* Información de contacto */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Nuestra ventaja: diseño web a medida
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Páginas web únicas con diseños originales</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>100% orientados a los resultados que buscas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Sistema de gestión propio de alto rendimiento</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Específicamente preparado para optimización SEO</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Proceso de trabajo
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-foreground">
                    Consulta inicial
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Analizamos tus necesidades y objetivos
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-foreground">
                    Propuesta personalizada
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Te enviamos un presupuesto detallado
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Desarrollo</h4>
                  <p className="text-sm text-muted-foreground">
                    Creamos tu solución web profesional
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-muted/30 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Privacidad garantizada
            </h3>
            <p className="text-sm text-muted-foreground">
              Solo recopilamos tu email para responder a tu consulta. No
              compartimos tus datos con terceros y puedes ejercer tus derechos
              en cualquier momento.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { ContactForm } from "@/components/features/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contacto - WEBCODE",
  description:
    "Ponte en contacto con WEBCODE para solicitar presupuesto o consultar sobre nuestros servicios de desarrollo web profesional.",
  robots: {
    index: true,
    follow: true
  }
};

export default function ContactoPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 pt-24 pb-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Contacta con nosotros
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          ¿Tienes un proyecto en mente? Nos encantaría conocer tus ideas y
          ayudarte a hacerlas realidad. Completa el formulario y te
          responderemos lo antes posible.
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
              ¿Por qué elegirnos?
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Desarrollo web profesional con tecnologías modernas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Soluciones personalizadas para tu negocio</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Respuesta rápida y atención personalizada</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Precios competitivos y transparentes</span>
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
    </div>
  );
}

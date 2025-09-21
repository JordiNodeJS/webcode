import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad - WEBCODE",
  description:
    "Política de privacidad y cookies de WEBCODE - Tu privacidad es importante para nosotros",
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8 text-foreground">
          Política de Privacidad
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              1. Información que recopilamos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              En WEBCODE recopilamos información que nos proporcionas
              directamente cuando utilizas nuestros servicios, como cuando te
              registras para recibir información, solicitas un presupuesto o
              contactas con nosotros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              2. Uso de cookies
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Utilizamos cookies y tecnologías similares para mejorar tu
              experiencia en nuestro sitio web. Las cookies nos ayudan a:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Recordar tus preferencias y configuraciones</li>
              <li>Proporcionar funcionalidades personalizadas</li>
              <li>Analizar el rendimiento de nuestro sitio web</li>
              <li>Mejorar nuestros servicios</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              3. Tipos de cookies que utilizamos
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2 text-foreground">
                  Cookies esenciales
                </h3>
                <p className="text-muted-foreground">
                  Necesarias para el funcionamiento básico del sitio web, como
                  la gestión de sesiones y configuraciones de seguridad.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-foreground">
                  Cookies de rendimiento
                </h3>
                <p className="text-muted-foreground">
                  Nos ayudan a entender cómo interactúas con nuestro sitio web
                  para poder mejorarlo.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-foreground">
                  Cookies de funcionalidad
                </h3>
                <p className="text-muted-foreground">
                  Permiten recordar tus preferencias, como el idioma o región
                  seleccionados.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              4. Control de cookies
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Puedes controlar y gestionar las cookies de varias formas. Ten en
              cuenta que eliminar o bloquear cookies puede afectar tu
              experiencia de usuario y que es posible que algunas partes del
              sitio web no funcionen correctamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              5. Contacto
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Si tienes preguntas sobre esta política de privacidad o sobre el
              tratamiento de tus datos personales, puedes contactarnos a través
              de nuestro formulario de contacto o enviando un email a
              <a
                href="mailto:privacy@webcode.es"
                className="text-primary hover:text-primary/80 underline"
              >
                privacy@webcode.es
              </a>
            </p>
          </section>

          <section className="bg-muted/50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Última actualización
            </h2>
            <p className="text-muted-foreground">
              Esta política de privacidad fue actualizada por última vez el 21
              de septiembre de 2025.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

import { EmailProtection } from "@/components/ui/EmailProtection";

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
              1. Responsable del Tratamiento de Datos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              WEBCODE, con correo electrónico de contacto{" "}
              <EmailProtection
                email="info@webcode.es"
                className="text-primary hover:text-primary/80 underline"
              />
              , es el responsable del tratamiento de los datos personales
              recopilados a través de este sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              2. Datos que Recopilamos
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              El único dato personal que solicitamos y almacenamos es tu{" "}
              <strong>dirección de correo electrónico</strong>. Esta información
              se recopila exclusivamente cuando nos contactas de forma
              voluntaria a través de un formulario de consulta o para solicitar
              un presupuesto.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              No recopilamos, solicitamos ni almacenamos ningún otro tipo de
              dato personal, como nombre, número de teléfono, dirección postal o
              cualquier otra información de carácter identificativo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              3. Finalidad del Tratamiento
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              La dirección de correo electrónico se utiliza con la única
              finalidad de:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Responder a tus consultas, preguntas o solicitudes de
                información.
              </li>
              <li>Gestionar y enviar los presupuestos que nos solicites.</li>
              <li>
                Establecer un canal de comunicación directo si así lo deseas.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              No utilizaremos tu correo electrónico para enviarte comunicaciones
              comerciales, newsletters o cualquier otro tipo de marketing no
              solicitado.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              4. Legitimación para el Tratamiento
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              La base legal para el tratamiento de tu correo electrónico es tu{" "}
              <strong>consentimiento explícito</strong>, que otorgas al
              proporcionarnos tu dirección de correo y aceptar esta política de
              privacidad antes de enviar tu consulta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              5. Conservación de los Datos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Conservaremos tu dirección de correo electrónico únicamente
              durante el tiempo necesario para cumplir con la finalidad para la
              que fue recopilada, es decir, hasta que finalice nuestra
              comunicación o se resuelva tu consulta. Una vez concluida la
              interacción, los datos podrán ser eliminados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              6. Cesión de Datos a Terceros
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Nos comprometemos a <strong>no ceder ni compartir</strong> tu
              dirección de correo electrónico con terceros. Tus datos son
              confidenciales y solo serán utilizados por WEBCODE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              7. Derechos del Usuario
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              En cualquier momento, puedes ejercer tus derechos de acceso,
              rectificación, supresión, limitación del tratamiento y
              portabilidad de tus datos enviando un correo electrónico a{" "}
              <a
                href="mailto:privacy@webcode.es"
                className="text-primary hover:text-primary/80 underline"
              >
                privacy@webcode.es
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              8. Cambios en la Política de Privacidad
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              WEBCODE se reserva el derecho a modificar esta política de
              privacidad para adaptarla a novedades legislativas o
              jurisprudenciales. Cualquier cambio será debidamente publicado en
              este sitio web.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong>Última actualización:</strong> 22 de septiembre de 2025.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

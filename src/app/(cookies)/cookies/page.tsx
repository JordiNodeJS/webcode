import { EmailProtection } from "@/components/ui/EmailProtection";

export default function CookiesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8 text-foreground">
          Política de Cookies
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              1. ¿Qué son las cookies?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Una cookie es un pequeño fichero de texto que se almacena en tu
              navegador cuando visitas casi cualquier página web. Su utilidad es
              que la web sea capaz de recordar tu visita cuando vuelvas a
              navegar por esa página. Las cookies suelen almacenar información
              de carácter técnico, preferencias personales, personalización de
              contenidos, estadísticas de uso, enlaces a redes sociales, acceso
              a cuentas de usuario, etc.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              2. Cookies utilizadas en este sitio web
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Siguiendo las directrices de la Agencia Española de Protección de
              Datos, procedemos a detallar el uso de cookies que hace esta web
              con el fin de informarte con la máxima exactitud posible.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Este sitio web utiliza exclusivamente las siguientes{" "}
              <strong>cookies técnicas y necesarias</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Cookies de sesión:</strong> Para garantizar que el sitio
                funcione correctamente y para gestionar la navegación entre
                páginas. Son temporales y se eliminan al cerrar el navegador.
              </li>
              <li>
                <strong>Cookies de preferencias de usuario:</strong> Utilizamos
                una cookie para recordar tu preferencia sobre el modo de
                visualización (claro/oscuro). Esta cookie nos permite mostrarte
                el tema correcto en tus futuras visitas.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong>
                No utilizamos cookies de terceros, de análisis, de publicidad ni
                de seguimiento.
              </strong>{" "}
              Nuestra prioridad es tu privacidad, por lo que no recopilamos
              datos sobre tus hábitos de navegación con fines comerciales o
              estadísticos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              3. Desactivación o eliminación de cookies
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              En cualquier momento podrás ejercer tu derecho de desactivación o
              eliminación de cookies de este sitio web. Estas acciones se
              realizan de forma diferente en función del navegador que estés
              usando. La mayoría de los navegadores te permiten gestionar las
              cookies a través de sus opciones de configuración.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Ten en cuenta que si decides bloquear las cookies, es posible que
              algunas funcionalidades de este sitio, como la preferencia del
              tema oscuro, no funcionen correctamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              4. Notas adicionales
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Ni esta web ni sus representantes legales se hacen responsables
                ni del contenido ni de la veracidad de las políticas de
                privacidad que puedan tener los terceros mencionados en esta
                política de cookies.
              </li>
              <li>
                Los navegadores web son las herramientas encargadas de almacenar
                las cookies y desde este lugar debe efectuar su derecho a
                eliminación o desactivación de las mismas. Ni esta web ni sus
                representantes legales pueden garantizar la correcta o
                incorrecta manipulación de las cookies por parte de los
                mencionados navegadores.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              5. Contacto
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Si tienes alguna duda sobre esta política de cookies, puedes
              contactarnos a través de{" "}
              <EmailProtection
                email="info@webcode.es"
                className="text-primary hover:text-primary/80 underline"
              />
              .
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

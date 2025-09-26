export const metadata = {
  title: 'Política de privacidad - WEBCODE',
  description: 'Política de privacidad básica para WEBCODE'
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Política de privacidad</h1>
      <p className="mb-4 text-muted-foreground">
        En WEBCODE respetamos tu privacidad. Esta es una versión mínima de la
        política destinada a evitar enlaces rotos durante pruebas. Sustituye
        este contenido por la versión legal final.
      </p>
      <section className="prose max-w-none">
        <h2>Datos que recogemos</h2>
        <p>Recogemos tu email para responder a consultas. No compartimos datos con terceros.</p>
        <h2>Finalidad</h2>
        <p>Responder a tu consulta y prestar el servicio solicitado.</p>
        <h2>Derechos</h2>
        <p>Puedes ejercer tus derechos de acceso, rectificación o supresión contactando con info@webcode.es.</p>
      </section>
    </main>
  );
}

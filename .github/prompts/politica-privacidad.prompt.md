Quiero que generes la página **politica-privacidad** en mi proyecto con Astro, creando los enlaces a ellos en el footer, con el siguiente contenido y características::
Genera los siguientes archivos HTML dentro de mi proyecto:

1. **politica-privacidad**

   - Adaptada a la normativa española (RGPD y LOPDGDD).
   - Redactada en español de España.
   - Incluir:
     a) Introducción y responsable ([Nombre de la empresa], [dirección], [correo electrónico]).
     b) Finalidad: recogida de datos vía formulario (email y teléfono) y uso de Google Analytics.
     c) Base legal: consentimiento del usuario.
     d) Plazos de conservación de datos.
     e) Destinatarios: Google LLC (Google Analytics) y cualquier obligación legal.
     f) Transferencia internacional de datos (EE. UU.) y medidas adoptadas (anonimización IP).
     g) Derechos del usuario y cómo ejercerlos.
     h) Procedimiento para presentar reclamación ante la AEPD.

2. **politica-cookies**

   - Cumpliendo RGPD, LOPDGDD y LSSI-CE.
   - Explicar qué son las cookies y para qué sirven.
   - Detallar cookies usadas por Google Analytics (nombre, duración, finalidad, proveedor).
   - Incluir cómo el usuario puede aceptar, rechazar o configurar cookies.
   - Explicar cómo revocar el consentimiento.
   - Enlace al complemento de inhabilitación de Google Analytics para navegadores.

3. **banner-cookies**
   - Banner/popup de cookies que se muestre al cargar la página.
   - Debe bloquear las cookies de Google Analytics hasta que el usuario las acepte.
   - Botones: “Aceptar”, “Rechazar” y “Configurar”.
   - Enlace a la política de cookies.
   - Diseño responsive y accesible.
   - Javascript mínimo para guardar la preferencia del usuario y aplicarla en futuras visitas.

**Para todos los archivos:**

- HTML5 semántico con `<header>`, `<main>`, `<footer>`.
- `<title>` descriptivo y metaetiquetas SEO (`charset`, `viewport`, `description`).
- CSS mínimo embebido para estilo limpio y profesional.
- Texto con marcadores como [Nombre de la empresa] y [correo electrónico] para personalización.

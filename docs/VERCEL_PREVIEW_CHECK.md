# Vercel Preview Check

Este archivo se ha añadido únicamente para crear una pull request y comprobar si Vercel genera una preview deployment para esta rama/PR.

Objetivo
- Forzar un cambio no disruptivo en el repositorio para verificar que Vercel crea una preview al abrir un PR.

Cómo verificar
1. Crear una PR desde la rama creada por el agente.
2. Ir al panel de Vercel y comprobar si hay una nueva Preview Deployment asociada a la PR.
3. Confirmar que la URL de preview está accesible y responde con el contenido del sitio.

Criterios de éxito
- Existe una Preview Deployment en Vercel vinculada a la PR.
- La URL de preview responde con un 200 y muestra la aplicación (o la página de mantenimiento si el proyecto lo requiere).

Notas
- Este cambio es intencionalmente pequeño y documentativo. Si quieres que el PR incluya una modificación concreta (por ejemplo, cambiar `package.json` o añadir un `vercel.json`), indícalo y lo añadiré al PR.

Fecha: 2025-09-27

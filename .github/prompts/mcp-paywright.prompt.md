# PLAYWRIGHT -Verificación Visual

### **Flujo de Trabajo Estándar**

1. **Asume que el servidor de desarrollo está en marcha**
2. **Utiliza el MCP de Playwright** para verificar cambios implementados
3. **Toma screenshots** para validar el resultado visualmente
4. **Analiza la imagen tomada** para confirmar que refleja los cambios esperados
5. **Si no coincide**: ajusta el código y repite el proceso
   Instrucciones para el MCP Playwright - VERIFICACIÓN VISUAL (ESPAÑOL)

## Objetivo

Proveer una guía comprensible y estricta para que un agente automatizado utilice exclusivamente las acciones del MCP Playwright (mcp*playwright*\*) con el fin de validar visualmente funcionalidades de la aplicación web. El agente debe actuar sobre las páginas con comandos del MCP, capturar evidencias (screenshots, snapshots de accesibilidad opcionales) y devolver un informe estructurado con hallazgos, pasos reproducibles y recomendaciones.

## Reglas estrictas

- Usa únicamente las funciones del MCP Playwright disponibles (prefijo mcp*playwright*\*) para interactuar con la app: navegar, click, type, fill, wait_for, snapshot, take_screenshot, evaluate, tabs, etc.
- No ejecutes comandos externos, no asumas estados fuera de las herramientas MCP.
- Si necesitas confirmar que el servidor está en marcha, intenta navegar a la URL raíz y evalúa la respuesta visual o estructura del DOM.
- Todas las acciones deben tener una breve intención (por qué) y un criterio de éxito (qué indicarás como OK/FAIL).

## Flujo de trabajo recomendado

1. Preparación

   - Verifica la URL base de la app y navega a la página objetivo.
   - Espera que la página cargue (usa wait_for o espera por un selector clave).

2. Interacción y escenario

   - Define el escenario/historia de usuario que vas a comprobar (p.ej. "Inicio -> Login -> Dashboard" o "Página de producto muestra precio correcto").
   - Por cada paso: usa las acciones MCP para realizar la interacción (click, type, select, etc.).
   - Tras cada paso crítico, espera por un selector que confirme el estado esperado.

3. Captura de evidencias

   - Toma al menos una captura de pantalla representativa del estado final.
   - Opcional: toma un snapshot de accesibilidad si está disponible.

4. Validación automática

   - Analiza el DOM mediante evaluate para comprobar textos, atributos o estados importantes.
   - Compara visualmente (manual review recomendado) la screenshot con el criterio esperado y marca OK/FAIL.

5. Informe y conclusiones
   - Devuelve un informe estructurado (ver plantilla abajo) que incluya: escenario, pasos ejecutados, comandos MCP usados, evidencias (nombres de archivos/screenshots), resultados esperados vs. obtenidos, y recomendaciones.

## Plantilla de escenario (ejemplo)

- Nombre del caso: Verificar header y navegación principal
- URL inicial: http://localhost:3000/
- Pasos:
  1. Navegar a URL inicial (mcp_playwright_navigate)
  - Criterio: selector "header nav" presente
  2. Hacer click en "Servicios" (mcp_playwright_browser_click)
  - Criterio: URL contiene "/services" y el H1 contiene "Servicios"
  3. Capturar screenshot (mcp_playwright_browser_take_screenshot)
  - Archivo: header-services-{timestamp}.png

## Formato del informe (obligatorio)

- resumen: breve párrafo con estado general (OK/FAIL)
- escenario_nombre: string
- url_inicial: string
- pasos_ejecutados: lista de objetos { orden, accion_mcp, selector_o_texto, criterio, resultado }
- evidencias: lista de { tipo: screenshot|snapshot, archivo: nombre.png, nota }
- checks_dom: lista de { expresion_evaluate, esperado, obtenido, status }
- problemas: lista de strings (si los hay)
- recomendaciones: lista de strings

## Criterios de éxito

- Un caso se marca OK si todos los pasos críticos pasan su criterio y la evidencia visual muestra el cambio esperado.
- Si un paso falla por timeout o selector no encontrado, marca FAIL y registra el error exacto y el stack de acciones.

## Buenas prácticas y notas

- Usa selectores robustos (data-testid o ids semánticos) en vez de selectores frágiles.
- Para pasos que modifican el estado del servidor (p. ej. crear, eliminar), intenta usar datos de prueba o rutas de staging.
- Mantén brevedad en los screenshots: nombres claros y descripción en el informe.
- Evita suposiciones: si un paso depende de autenticación, indica cómo obtener credenciales o si se debe usar un entorno con sesión ya creada.

## Ejemplo mínimo de ejecución (narrativa que el agente debe seguir)

1. mcp_playwright_browser_tabs action -> abrir nueva pestaña
2. mcp_playwright_browser_navigate -> ir a http://localhost:3000/
3. mcp_playwright_browser_wait_for -> esperar selector "header nav"
4. mcp_playwright_browser_click -> click en ref del enlace 'Servicios'
5. mcp_playwright_browser_wait_for -> esperar selector 'h1' con texto 'Servicios'
6. mcp_playwright_browser_take_screenshot -> guardar 'services-page-{timestamp}.png'
7. mcp_playwright_browser_evaluate -> comprobar document.querySelector('h1').innerText === 'Servicios'
8. Generar el informe con la plantilla

## Reporte final

Al terminar, retorna solo el objeto JSON del informe (sin explicaciones largas) y anexa al menos 1 línea de texto con recomendaciones prioritarias. Usa claves exactas de la plantilla.

Fin de instrucciones.

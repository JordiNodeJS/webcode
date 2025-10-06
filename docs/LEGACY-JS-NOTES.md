### Lighthouse: “Legacy JavaScript” — why ~14 KiB remains and can’t be removed (for now)

Context
- Lighthouse sigue reportando “JavaScript antiguo” (~13.9 KiB) tras modernizar el target. Ese peso no viene del código de la app, sino de pequeños shims del runtime de Next.js y de algunos vendors ya en ESM.

Qué hemos hecho ya (estado actual)
- Browserslist modernizado (evergreen) en `package.json` para evitar transpilar/polyfills para navegadores legacy.
- TypeScript actualizado a `target ES2022`, `lib ES2023`, `module ESNext`.
- No hay imports globales de `core-js`/`regenerator-runtime` en la app.
- Forzado ESM tree‑shaking en vendors de animación:
  - Alias en `next.config.ts` → `framer-motion/dist/es/index.js` y `motion/dist/es/index.js`.
- Carga diferida de UI/animaciones en rutas pesadas con `next/dynamic`.

De dónde sale el “legacy JS” restante
- Los bytes que Lighthouse marca provienen de chunks del runtime del cliente de Next.js/Turbopack que incluyen comprobaciones/ponyfills defensivos para plataformas variadas. En nuestro build:
  - `.next/static/chunks/6e9f41e65113e7b3.js`
  - `.next/static/chunks/57f0dcc1f428cc04.js`
- Dentro de estos ficheros aparecen referencias a APIs como `Array.prototype.flat/flatMap/at`, `Object.fromEntries/hasOwn`, `String.prototype.trimStart/trimEnd`. Están protegidas por feature‑detection; en navegadores modernos su ejecución es mínima, pero los bytes siguen contabilizando en el bundle.

Por qué no se puede “optimizar” más sin romper soporte
- Estos trozos forman parte del runtime de Next.js y están diseñados para entornos heterogéneos (distintos user agents, execution contexts). No están expuestos vía configuración fina de proyecto.
- El tree‑shaking no elimina completamente estos helpers porque son usados de forma dinámica y/o protegidos por condiciones en tiempo de ejecución.
- Quitarlos requeriría forquear el runtime de Next.js o modificar Turbopack, lo que no es viable ni mantenible.

Impacto real
- Lighthouse estima ~14 KiB “potenciales”; en browsers modernos el coste de parse/execute es bajo y muchas ramas quedan no ejecutadas.
- El foco de rendimiento más rentable ahora es reducir “First Load JS” por ruta y dividir vendors pesados, cosa ya aplicada.

Cómo monitorizar
- Tras cada build: revisar “First Load JS shared by all” y los tamaños de páginas en la salida de `pnpm build`.
- En producción: ejecutar Lighthouse y Core Web Vitals. Si el reporte cambia sustancialmente, reevaluar vendors y divisiones dinámicas.

Conclusión
- Hemos eliminado polyfills/transforms innecesarios a nivel de aplicación. El residuo que Lighthouse marca proviene del runtime de Next.js y no es configurable a nivel de proyecto sin comprometer compatibilidad/mantenibilidad. El plan recomendado es aceptar este overhead pequeño y seguir optimizando división de código y carga diferida.



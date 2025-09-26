This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Recursos y Herramientas

### Favicon y App Icons

Para generar favicons y app icons optimizados para todas las plataformas:

**🔗 [Favicon Generator](https://www.favicon-generator.org/)**

Esta herramienta genera automáticamente:

- Favicons para navegadores (16x16, 32x32, 96x96)
- Apple Touch Icons para iOS (7 tamaños diferentes)
- Android Icons para PWA (6 tamaños diferentes)
- Microsoft Tiles para Windows (4 tamaños diferentes)
- `manifest.json` para Web App
- `browserconfig.xml` para Windows

**Ubicación**: Todos los archivos se almacenan en `/public/` y están referenciados en `src/app/layout.tsx`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Reglas de Linting y Formateo (Bioma)

Para facilitar la generación de código consistente y libre de errores, este repositorio incluye una referencia rápida con las reglas críticas y comandos de Biome (lint + format).

- 📘 `.github/instructions/biome-quick-reference.md` — Resumen rápido con las reglas más importantes y ejemplos para desarrolladores y herramientas automáticas (Copilot).

Se recomienda revisar ese archivo antes de generar o commitear código y ejecutar:

```bash
pnpm lint     # corre Biome para detectar errores/warnings
pnpm lint:fix # intenta corregir automáticamente problemas detectados
```

## Política de formateo

- Prettier es la fuente de verdad para formateo (incluido `trailingComma`). El archivo de configuración está en `.prettierrc`.
- Biome está configurado para _no_ formatear automáticamente (`formatter.enabled: false`) y se usa sólo para linting.

Para formatear localmente y antes de commitear ejecuta:

```bash
pnpm format      # ejecuta Prettier sobre el repo
pnpm lint        # ejecuta Biome (solo lint)
```

Ejecuta `pnpm format` antes de commitear si no usas hooks automáticos.

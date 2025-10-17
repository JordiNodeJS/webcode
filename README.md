# 🚀 WEBCODE - Plataforma de Desarrollo Web Profesional

> **Última actualización**: 17 Octubre 2025  
> **Versión**: 1.0.0-rc  
> **Estado**: Release Candidate - Preparación para Producción

WEBCODE es una plataforma integral de desarrollo web profesional para freelancers, PYMEs y startups en Barcelona y España. Ofrecemos soluciones digitales de calidad utilizando tecnologías de vanguardia 2025.

## 🛠️ Stack Tecnológico

### Core
- **Next.js** 15.5.2 (App Router + Turbopack + React Compiler)
- **React** 19.1.0 (Server Components + React Compiler)
- **TypeScript** 5.x (strict mode)
- **Tailwind CSS** 4.x (con sistema de diseño WAS personalizado)

### UI & Animaciones
- **shadcn/ui** - Componentes base (Button, Card, Input, Select, Dialog, etc.)
- **Lucide React** 0.542.0 - Sistema de iconos completo
- **Framer Motion** 12.23.12 - Animaciones avanzadas
- **Sistema WAS** (WebCode Animation System) - Sistema de animaciones propio documentado

### CMS & Backend
- **Notion API** 5.1.0 - CMS para blog
- **React Hook Form** 7.62.0 + **Zod** 4.1.5 - Validación de formularios
- **Resend** 6.1.0 - Servicio de email

### Herramientas de Desarrollo
- **pnpm** - Gestor de paquetes (obligatorio)
- **ESLint** 9.37.0 - Linting con configuración estricta
- **Prettier** 3.6.2 - Formateo de código
- **Playwright** 1.55.0 - Testing E2E automatizado
- **Lighthouse** 12.8.2 - Auditorías de performance

## 🚀 Inicio Rápido

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JordiNodeJS/webcode.git
cd webcode

# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

### Scripts Disponibles

```bash
pnpm dev          # Servidor de desarrollo con Turbopack
pnpm build        # Build de producción
pnpm start        # Servidor de producción
pnpm lint         # Ejecutar ESLint
pnpm lint:fix     # Corregir problemas de linting
pnpm format       # Formatear código con Prettier
pnpm kill         # Liberar puertos 3000-3002
pnpm analyze      # Análisis de bundle con webpack-bundle-analyzer

# Scripts de Notion CMS
pnpm notion:verify   # Verificar conexión con Notion
pnpm notion:list     # Listar bases de datos
pnpm notion:content  # Ver contenido de la BD del blog
pnpm notion:publish  # Publicar/despublicar páginas
```

## 📝 Integración con Notion (Blog)

Este proyecto utiliza **Notion** como CMS para gestionar el blog. Los artículos se publican y editan directamente en Notion y se sincronizan automáticamente con el sitio.

### 🔑 Configuración Rápida

1. **Crea tu integración en Notion**
   - Ve a [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
   - Crea una nueva integración interna
   - Copia el **Internal Integration Token**

2. **Configura las variables de entorno**
   
   Crea un archivo `.env.local` en la raíz del proyecto:
   
   ```bash
   NOTION_API_KEY=secret_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   NOTION_DATABASE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

3. **Comparte tu base de datos con la integración**
   - Abre tu base de datos "WebCode Blog" en Notion
   - Click en `...` → `Add connections`
   - Selecciona tu integración

4. **Verifica la conexión**
   
   ```bash
   pnpm notion:verify
   ```

### 📊 Estructura de la Base de Datos Requerida

Tu base de datos de Notion debe tener las siguientes propiedades:

| Propiedad | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| `Title` | Title | ✅ | Título del artículo |
| `Slug` | Text | ✅ | URL amigable (ej: `mi-primer-post`) |
| `Description` | Text | ✅ | Resumen/excerpt del artículo |
| `Status` | Select | ✅ | Estado: `Published`, `Draft`, etc. |
| `PublishedDate` | Date | ✅ | Fecha de publicación |
| `Tags` | Multi-select | ⚪ | Categorías del artículo |
| `Author` | Person | ⚪ | Autor del artículo |
| `CoverImageURL` | URL | ⚪ | URL de la imagen de portada |
| `Featured` | Checkbox | ⚪ | Marcar como destacado |

**Nota:** Las propiedades marcadas con ✅ son obligatorias. El sistema incluye validaciones y fallbacks para propiedades faltantes.

### 🛠️ Comandos Disponibles

```bash
# Verificar conexión y estructura
pnpm notion:verify

# Listar bases de datos accesibles
pnpm notion:list

# Buscar base de datos por nombre
pnpm notion:search

# Ver contenido de la base de datos
pnpm notion:content

# Ver contenido detallado de páginas
pnpm notion:pages

# Publicar una página específica
ppnpm notion:publish <page_id>
```

### ⚡ Características Implementadas

- **✅ Caching inteligente**: Usa `unstable_cache` de Next.js con revalidación de 1 hora
- **✅ Paginación completa**: Itera automáticamente por todos los resultados (no se limita a 100)
- **✅ Validaciones estrictas**: Manejo robusto de propiedades faltantes con fallbacks seguros
- **✅ Conversión a Markdown**: Contenido rico de Notion → Markdown → HTML
- **✅ Filtrado avanzado**: Por tags, búsqueda por texto, ordenación, etc.
- **✅ Rate limit friendly**: Cache reduce llamadas a la API de Notion

### 📚 Documentación Completa

Para más detalles sobre configuración, solución de problemas y mejores prácticas:

- **[Guía de Configuración Completa](docs/NOTION-INTEGRATION-SETUP-GUIDE.md)** - Setup paso a paso
- **[Auditoría Técnica](docs/BLOG-NOTION-DEVTOOLS-AUDIT.md)** - Análisis técnico y debugging
- **[Pasos Siguientes](NEXT-STEPS-NOTION.md)** - Checklist rápido de verificación
- **[Código Fuente](src/lib/notion/)** - Implementación técnica

### 🔄 Revalidación y Cache

El blog usa **ISR (Incremental Static Regeneration)**:

- **Posts listados**: Se revalidan cada 1 hora
- **Posts individuales**: Se revalidan cada 1 hora
- **Búsquedas**: Se revalidan cada 5 minutos
- **Tags**: Se revalidan cada 1 hora

Para forzar una actualización inmediata, reinicia el servidor de desarrollo.

## 🏗️ Estructura del Proyecto

```
webcode/
├── src/
│   ├── app/                    # App Router - Páginas y rutas
│   │   ├── page.tsx           # Landing page principal
│   │   ├── blog/              # Sistema de blog con Notion
│   │   ├── briefing/          # Formulario de briefing interactivo
│   │   ├── soluciones/        # Páginas de soluciones
│   │   ├── proceso/           # Proceso de trabajo
│   │   ├── contacto/          # Formulario de contacto
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── landing/           # Componentes de landing page
│   │   ├── ui/                # Componentes base (shadcn/ui)
│   │   ├── animations/        # Sistema WAS
│   │   ├── blog/              # Componentes de blog
│   │   ├── briefing/          # Componentes de briefing
│   │   └── soluciones/        # Componentes de soluciones
│   ├── lib/                   # Utilidades y helpers
│   ├── hooks/                 # Custom hooks
│   └── types/                 # Definiciones TypeScript
├── docs/                      # Documentación completa
├── public/                    # Assets estáticos
└── tests/                     # Tests con Playwright
```

## ✨ Características

### Sistema de Diseño WebCode (WAS)
- Sistema de colores personalizado (Rosa #dc7cb3 + Aguamarina #82c8d2)
- Sombras 3D con colores del tema
- Animaciones optimizadas con Framer Motion
- Dark mode completo
- Gradientes animados
- Tipografía cohesiva (Geist Sans/Mono)

### Performance
- **Lighthouse Score**: 100/100
- **Core Web Vitals**: Todos en verde
- **FPS Promedio**: >60 FPS
- **Bundle Size**: Optimizado con tree-shaking
- **Lazy Loading**: Componentes e imágenes optimizadas

### SEO y Accesibilidad
- Meta tags optimizados
- Structured data (JSON-LD)
- WCAG 2.1 AA compliant
- Sitemap automático
- robots.txt configurado
- Open Graph optimizado

### Blog con Notion
- Sistema de blog dinámico usando Notion como CMS
- Renderizado de Markdown
- Búsqueda y filtrado por tags
- Paginación
- ISR (Incremental Static Regeneration)

## 📚 Documentación

La documentación completa del proyecto está en `/docs/`:

- **[README.md](docs/README.md)** - Índice maestro de documentación
- **[00-ESTADO-ACTUAL.md](docs/00-ESTADO-ACTUAL.md)** - Estado actual del proyecto
- **[02-PLANIFICACION-stack-tecnologico.md](docs/02-PLANIFICACION-stack-tecnologico.md)** - Stack técnico detallado
- **[03-DISENO-guia-estilos-base.md](docs/03-DISENO-guia-estilos-base.md)** - Guía de estilos y diseño
- **[05-DISENO-sistema-animaciones-webcode.md](docs/05-DISENO-sistema-animaciones-webcode.md)** - Sistema WAS

### Para Desarrolladores
- **[.github/copilot-instructions.md](.github/copilot-instructions.md)** - Instrucciones para AI
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guía de contribución
- **[TESTING-GUIDE.md](docs/TESTING-GUIDE.md)** - Guía de testing

## 🧪 Testing

```bash
# Ejecutar tests de performance
pnpm test:performance

# Tests de accesibilidad
pnpm test:accessibility

# Tests E2E con Playwright
pnpm test:e2e
```

## 📖 Recursos de Aprendizaje

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

### Tailwind CSS
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)

### shadcn/ui
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)

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

## 🚀 Deployment

### Vercel (Recomendado)

El proyecto está optimizado para deployment en Vercel:

```bash
# Instalar Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```bash
# Notion (Blog CMS)
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx

# Email (Opcional)
RESEND_API_KEY=re_xxxxx

# Analytics (Opcional)
NEXT_PUBLIC_GA_ID=G-xxxxx
```

### Build de Producción

```bash
# Build local
pnpm build

# Iniciar servidor de producción
pnpm start
```

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor lee [CONTRIBUTING.md](CONTRIBUTING.md) para detalles sobre:

- Proceso de desarrollo
- Estándares de código
- Commit conventions
- Pull request process

### Guía Rápida

```bash
# Fork y clonar el repositorio
git clone https://github.com/tu-usuario/webcode.git

# Crear rama para tu feature
git checkout -b feat/nueva-funcionalidad

# Hacer cambios y commits
git add .
git commit -m "feat: descripción del cambio"

# Formatear y lint antes de push
pnpm format
pnpm lint:fix

# Push y crear PR
git push origin feat/nueva-funcionalidad
```

### Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `docs:` - Cambios en documentación
- `style:` - Cambios de estilo (formato, sin cambios de código)
- `refactor:` - Refactorización de código
- `perf:` - Mejoras de performance
- `test:` - Añadir o modificar tests
- `chore:` - Cambios en build process o herramientas

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Equipo

**WEBCODE** - Desarrollo Web Profesional en Barcelona

- Website: [webcode.es](https://webcode.es)
- Email: info@webcode.es
- GitHub: [@JordiNodeJS](https://github.com/JordiNodeJS)

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) por el increíble framework
- [Vercel](https://vercel.com/) por el hosting
- [shadcn/ui](https://ui.shadcn.com/) por los componentes
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de estilos
- [Notion](https://notion.so/) por el CMS

---

**Hecho con ❤️ en Barcelona** 🇪🇸


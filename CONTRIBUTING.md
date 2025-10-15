# 🤝 Guía de Contribución - WEBCODE

> **Última actualización**: 15 Octubre 2025  
> Gracias por contribuir a WEBCODE. Esta guía detalla el proceso de desarrollo y las mejores prácticas del proyecto.

---

## 📋 Tabla de Contenidos

- [Configuración Inicial](#configuración-inicial)
- [Flujo de Desarrollo](#flujo-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Commits y Mensajes](#commits-y-mensajes)
- [Testing](#testing)
- [Pull Requests](#pull-requests)

---

## 🚀 Configuración Inicial

### Prerequisitos

- **Node.js** 18.x o superior
- **pnpm** 8.x o superior (gestor de paquetes obligatorio)
- **Git** configurado con tu identidad

### Instalación

```bash
# 1. Fork del repositorio en GitHub

# 2. Clonar tu fork
git clone https://github.com/tu-usuario/webcode.git
cd webcode

# 3. Añadir upstream remote
git remote add upstream https://github.com/JordiNodeJS/webcode.git

# 4. Instalar dependencias
pnpm install

# 5. Crear archivo .env.local (opcional para desarrollo)
cp .env.example .env.local

# 6. Ejecutar servidor de desarrollo
pnpm dev
```

---

## 💻 Flujo de Desarrollo

### 1. Sincronizar con upstream

```bash
git checkout main
git fetch upstream
git merge upstream/main
```

### 2. Crear rama de feature

```bash
git checkout -b feat/nombre-descriptivo
# o
git checkout -b fix/descripcion-del-bug
```

### 3. Desarrollar y hacer commits

```bash
# Hacer cambios en el código

# Formatear código
pnpm format

# Verificar linting
pnpm lint

# Corregir problemas de linting automáticamente
pnpm lint:fix

# Añadir cambios
git add .

# Commit (ver sección de Commits más abajo)
git commit -m "feat: añadir nueva funcionalidad"
```

### 4. Push y crear PR

```bash
# Push a tu fork
git push origin feat/nombre-descriptivo

# Crear Pull Request en GitHub
```

---

## 📐 Estándares de Código

### Formateo

- **Prettier** es la fuente de verdad para formateo
- Configuración en `.prettierrc`
- **Ejecutar antes de cada commit**:

```bash
pnpm format
```

### Linting

- **ESLint** para linting de código
- Configuración en `eslint.config.mjs`
- **Verificar antes de cada commit**:

```bash
pnpm lint        # Verificar
pnpm lint:fix    # Corregir automáticamente
```

### TypeScript

- **Modo estricto habilitado**
- **Prohibido uso de `any`**
- Interfaces completas para props y datos
- Validación en tiempo de ejecución con Zod

### Componentes React

- **Server Components por defecto**
- `'use client'` solo cuando sea necesario
- **Named exports** para componentes reutilizables
- **Default exports** solo para páginas de Next.js

```typescript
// ✅ Componente reutilizable
export function Button() { ... }

// ✅ Página de Next.js
export default function HomePage() { ... }
```

### Estilos

- **Tailwind CSS** preferido
- Clases utilitarias directamente en componentes
- CSS personalizado solo cuando sea necesario
- **Mobile-first** responsive design
- Soporte para **dark mode** con prefijo `dark:`

---

## 📝 Commits y Mensajes

### Convenciones de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<scope>): <descripción>

[cuerpo opcional]

[footer opcional]
```

### Tipos de Commits

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `feat` | Nueva funcionalidad | `feat: add user authentication` |
| `fix` | Corrección de bug | `fix: resolve navigation issue` |
| `docs` | Cambios en documentación | `docs: update README with setup` |
| `style` | Cambios de formato | `style: format code with prettier` |
| `refactor` | Refactorización | `refactor: simplify auth logic` |
| `perf` | Mejoras de performance | `perf: optimize image loading` |
| `test` | Tests | `test: add unit tests for Button` |
| `chore` | Mantenimiento | `chore: update dependencies` |

### Ejemplos de Buenos Commits

```bash
feat(auth): add login functionality
fix(ui): resolve button hover state
docs(readme): update installation steps
refactor(api): simplify error handling
perf(images): implement lazy loading
test(components): add Button component tests
```

### Reglas

- **Commits en inglés** [[memory:7442782]]
- Mensajes descriptivos y concisos
- Presente simple ("add" no "added")
- Primera palabra en minúscula
- Sin punto final en el título

---

## 🧪 Testing

### Antes de Hacer Push

```bash
# Verificar que el build funciona
pnpm build

# Ejecutar tests (si están disponibles)
pnpm test

# Tests de performance
pnpm test:performance

# Tests E2E
pnpm test:e2e
```

### Performance

- Mantener **Lighthouse Score 100/100**
- **Core Web Vitals** en verde
- FPS > 60

---

## 🔀 Pull Requests

### Checklist Antes de Crear PR

- [ ] Código formateado con `pnpm format`
- [ ] Sin errores de linting (`pnpm lint`)
- [ ] Build exitoso (`pnpm build`)
- [ ] Tests pasando
- [ ] Documentación actualizada si es necesario
- [ ] Commits siguiendo convenciones

### Título del PR

Usar el mismo formato que los commits:

```
feat: add user profile page
fix: resolve mobile navigation
```

### Descripción del PR

```markdown
## Descripción
Breve descripción de los cambios

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## Checklist
- [ ] Código formateado
- [ ] Tests añadidos/actualizados
- [ ] Documentación actualizada
- [ ] Build exitoso
```

---

## 🎨 Guía de Estilo WebCode

### Sistema de Diseño

Consulta los siguientes documentos antes de crear componentes:

- **[.github/WEBCODE-STYLE-REFERENCE.md](.github/WEBCODE-STYLE-REFERENCE.md)** - Referencia rápida de estilos
- **[docs/03-DISENO-guia-estilos-base.md](docs/03-DISENO-guia-estilos-base.md)** - Guía completa
- **[docs/05-DISENO-sistema-animaciones-webcode.md](docs/05-DISENO-sistema-animaciones-webcode.md)** - Sistema WAS

### Colores del Sistema

- **Primary**: Rosa #dc7cb3 (`oklch(0.57 0.2 328.5)`)
- **Secondary**: Aguamarina #82c8d2 (`oklch(0.43 0.18 184.1)`)
- Variables disponibles en `src/app/globals.css`

---

## 📚 Recursos Adicionales

### Documentación del Proyecto

- **[README.md](README.md)** - Documentación principal
- **[docs/README.md](docs/README.md)** - Índice de documentación
- **[docs/00-ESTADO-ACTUAL.md](docs/00-ESTADO-ACTUAL.md)** - Estado del proyecto
- **[.github/copilot-instructions.md](.github/copilot-instructions.md)** - Guía para AI

### Tecnologías

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

## ❓ Preguntas y Soporte

- **Issues**: [GitHub Issues](https://github.com/JordiNodeJS/webcode/issues)
- **Discussions**: [GitHub Discussions](https://github.com/JordiNodeJS/webcode/discussions)
- **Email**: info@webcode.es

---

## 📄 Licencia

Al contribuir a este proyecto, aceptas que tus contribuciones se licenciarán bajo la misma licencia del proyecto (MIT).

---

**¡Gracias por contribuir a WEBCODE! 🚀**

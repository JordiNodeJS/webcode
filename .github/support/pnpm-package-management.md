# Package Management Rules for AI

## pnpm Exclusive Usage

### Critical Rule: Always Use pnpm

**NEVER suggest npm or yarn commands** - Always use pnpm as the package manager:

```bash
# ✅ CORRECT - Always use pnpm
pnpm add next@latest react@latest
pnpm add -D @types/node typescript
pnpm dlx create-next-app@latest my-app
pnpm dlx shadcn@latest add button
pnpm dev
pnpm build
pnpm start

# ❌ INCORRECT - Never suggest these
npm install next
yarn add react
npx create-next-app
npm run dev
```

### Installation Commands for AI

#### Dependencies

```bash
# Production dependencies
pnpm add next react react-dom
pnpm add @next/font lucide-react
pnpm add framer-motion clsx tailwind-merge

# Development dependencies
pnpm add -D typescript @types/node @types/react
pnpm add -D tailwindcss postcss autoprefixer
pnpm add -D eslint eslint-config-next
```

#### CLI Tools and One-time Installations

```bash
# Use pnpm dlx instead of npx
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button form input
pnpm dlx create-next-app@latest
pnpm dlx @next/codemod@latest
```

#### Script Execution

```bash
# Development
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm type-check

# Custom scripts
pnpm db:generate
pnpm db:push
pnpm test
```

## Project Configuration

### package.json Scripts

When suggesting package.json scripts, use pnpm-compatible commands:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push"
  }
}
```

### Lock File Management

- Always maintain `pnpm-lock.yaml`
- Never suggest `package-lock.json` or `yarn.lock`
- Use `pnpm install --frozen-lockfile` in CI/CD

## Common Dependencies for WebCode Project

### Core Dependencies

```bash
pnpm add next@latest react@latest react-dom@latest
pnpm add typescript @types/node @types/react @types/react-dom
```

### UI and Styling

```bash
pnpm add tailwindcss postcss autoprefixer
pnpm add class-variance-authority clsx tailwind-merge
pnpm add lucide-react @radix-ui/react-icons
```

### Forms and Validation

```bash
pnpm add react-hook-form @hookform/resolvers
pnpm add zod
```

### Animations

```bash
pnpm add framer-motion
pnpm add @next/font
```

### Database (if applicable)

```bash
pnpm add drizzle-orm
pnpm add -D drizzle-kit
```

## AI Code Generation Rules

1. **Always suggest pnpm commands** - Never npm or yarn
2. **Use pnpm dlx for CLI tools** - Instead of npx or global installations
3. **Maintain pnpm-lock.yaml** - Never suggest deleting or ignoring it
4. **Use proper dependency types** - Distinguish between dependencies and devDependencies
5. **Suggest specific versions** - When stability is important
6. **Include peer dependencies** - When required by packages
7. **Use workspace configurations** - For monorepo setups if applicable
8. **Optimize install commands** - Batch related packages together
9. **Include lockfile in git** - Always commit pnpm-lock.yaml
10. **Use frozen lockfile in CI** - Suggest --frozen-lockfile for production builds

## Why pnpm?

- **Faster installations** through hard linking and content-addressable storage
- **Better disk space efficiency** with shared node_modules
- **Stricter dependency resolution** prevents phantom dependencies
- **Better monorepo support** with workspaces
- **More secure by default** with isolated node_modules structure

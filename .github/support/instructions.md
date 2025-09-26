# GitHub Copilot Instructions for WebSnack Project

This document contains AI coding assistant instructions converted from Qoder rules for use with GitHub Copilot and other VS Code AI extensions.

## Project Overview

WebSnack is a modern Next.js 15 application built with:

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Magic UI components with Framer Motion
- **Package Manager**: pnpm (mandatory)
- **Language**: TypeScript with strict configuration

## Core Development Principles

### 1. Next.js App Router First

- Use ONLY App Router (app/ directory) - Pages Router is deprecated
- Server Components by default, Client Components only when necessary
- Follow modern data fetching patterns with native fetch

### 2. TypeScript Strict Mode

- All code must be fully typed with strict TypeScript
- Use proper interfaces and type definitions
- Follow established naming conventions

### 3. Component Architecture

- shadcn/ui for base components (never modify directly)
- Custom components in components/custom/
- Magic UI for advanced animations
- Proper component composition patterns

### 4. Package Management

- Use pnpm exclusively - never npm or yarn
- Use pnpm dlx for CLI tools and one-time installations
- Maintain pnpm-lock.yaml integrity

## Specific Rules by Category

Refer to the individual rule files in this directory for detailed guidelines on:

- Next.js App Router patterns
- TypeScript best practices
- Component architecture
- Performance optimization
- Git workflow standards
- Package management
- Styling with Tailwind CSS
- Animation implementation

## Code Quality Standards

1. **Clean Code**: Follow established patterns and anti-patterns
2. **Performance**: Optimize images, lazy loading, code splitting
3. **Accessibility**: Implement proper ARIA labels and keyboard navigation
4. **Responsive Design**: Mobile-first approach with Tailwind utilities
5. **SEO**: Proper meta tags, structured data, and semantic HTML

## AI Assistant Guidelines

When assisting with code:

1. Always suggest App Router patterns over Pages Router
2. Prefer Server Components unless client interactivity is needed
3. Use proper TypeScript types and interfaces
4. Follow the established project structure
5. Implement proper error handling and validation
6. Suggest performance optimizations when applicable
7. Include accessibility considerations
8. Use modern React patterns (hooks, composition)

Remember: These instructions ensure consistency with the project's architecture and development standards.

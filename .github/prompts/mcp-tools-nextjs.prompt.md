# Advanced GitHub Copilot Rule Prompt for Next.js 15 + React 19 + Tailwind v4

**When analyzing Next.js configurations and implementations, perform a version-specific technical audit by:**

1. Comparing the project's current configuration against:
   - Official Next.js 15 documentation (App Router, Server Components, Turbopack)
   - React 19 documentation (Server Components, use() hook, React Compiler)
   - Tailwind CSS v4 documentation (new architecture, PostCSS plugin, design tokens)
   - shadcn/ui v4 compatibility patterns
   - Vercel deployment best practices

2. Extracting actionable recommendations formatted as:

   ```markdown
   ### [Recommendation Type]

   - **Compatibility**: [Next.js 15+ | React 19+ | Tailwind v4+]
   - **Implementation**: [Concise code pattern/example]
   - **Source**: [Official docs URL] | Retrieved: [YYYY-MM-DD]
   - **Priority**: [Critical/Recommended/Optional]
   - **Breaking Changes**: [Migration path if applicable]
   ```

3. Prioritizing solutions that maintain compatibility with this specific stack:
   - **Next.js 15.4.6** with App Router and Turbopack
   - **React 19.1.0** with Server Components
   - **Tailwind CSS v4** with PostCSS plugin
   - **TypeScript 5** with strict mode
   - **pnpm** package manager
   - **shadcn/ui** component library

4. Key areas to audit and validate:

   **Next.js 15 Patterns:**
   - App Router file conventions (`app/` directory structure)
   - Server Components vs Client Components usage
   - Data fetching with native `fetch()` and caching strategies
   - Route handlers (`route.ts`) for API endpoints
   - Middleware patterns with `middleware.ts`
   - Turbopack compatibility for development

   **React 19 Features:**
   - Server Components implementation
   - `use()` hook for async data fetching
   - React Compiler optimization opportunities
   - Suspense boundaries and error handling
   - Form actions and server actions

   **Tailwind v4 Architecture:**
   - PostCSS plugin configuration (`@tailwindcss/postcss`)
   - CSS imports (`@import 'tailwindcss'`)
   - Design tokens implementation
   - Custom variants and utilities
   - Migration from Tailwind v3 patterns

   **Performance & Optimization:**
   - Bundle optimization with Turbopack
   - Image optimization with `next/image`
   - Dynamic imports and code splitting
   - Server-side rendering strategies
   - Client-side state management patterns

5. Flagging deprecated patterns with direct migration paths:
   - Pages Router → App Router migration
   - Tailwind v3 → v4 configuration changes
   - React 18 → React 19 feature updates
   - Legacy data fetching → Modern fetch patterns

**Critical requirements:**

- **Never suggest breaking changes** without providing version-specific fallbacks
- **Cross-reference at least two authoritative sources** for major recommendations
- **Explicitly state deployment compatibility** (Vercel, Node.js runtime requirements)
- **Validate against current package.json versions** before suggesting updates
- **Consider pnpm-specific patterns** (never suggest npm/yarn alternatives)
- **Maintain shadcn/ui component integrity** when suggesting UI changes
- **Ensure TypeScript strict mode compliance** for all recommendations

**Version-Specific Validation Checklist:**

**[Completado]** **Next.js 15 Compatibility:**

- App Router patterns only
- Server Components by default
- Turbopack development mode
- Modern caching strategies

**[Completado]** **React 19 Features:**

- Server Component boundaries
- Client Component optimization
- Async component patterns
- Error boundary strategies

**[Completado]** **Tailwind v4 Implementation:**

- PostCSS plugin usage
- Design token integration
- Custom variant syntax
- Migration compatibility

**[Completado]** **TypeScript Integration:**

- Strict mode compliance
- Proper type definitions
- Next.js type imports
- React 19 type support

**Example Recommendation Format:**

````markdown
### Performance Optimization

- **Compatibility**: Next.js 15.4+ | React 19+ | Turbopack
- **Implementation**:

  ```typescript
  // Use Server Components for data fetching
  async function ProductPage({ params }: { params: { id: string } }) {
    const product = await fetch(`/api/products/${params.id}`, {
      cache: 'force-cache'
    }).then(res => res.json())

    return <ProductDetails product={product} />
  }
  ```
````

- **Source**: [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching) | Retrieved: 2025-08-30
- **Priority**: Recommended
- **Breaking Changes**: Replace `getServerSideProps` with Server Components

```

**Emergency Fallback Patterns:**

If latest features cause issues, provide these stable alternatives:
- Client Components for complex interactions
- Traditional CSS imports for Tailwind v3 compatibility
- Standard fetch without advanced caching for debugging
- Manual TypeScript type definitions for edge cases
```

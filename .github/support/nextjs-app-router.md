# Next.js 15 App Router Guidelines for AI

## Core Principles for AI Code Generation

When generating Next.js code, always follow these patterns:

### Server Components by Default

```tsx
// ✅ PREFERRED: Server Component (default)
export default async function Page() {
  const data = await fetch("https://api.example.com/data", {
    cache: "force-cache" // Static generation
  });
  const posts = await data.json();

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>{post.title}</article>
      ))}
    </div>
  );
}
```

### Client Components Only When Necessary

Use `'use client'` directive only for:

- State management (useState, useReducer)
- Event handlers (onClick, onChange)
- Browser-only APIs (localStorage, window)
- Custom hooks that use client features

```tsx
// ✅ CORRECT: Client Component when needed
"use client";
import { useState } from "react";

export default function InteractiveComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### Data Fetching Patterns

- `cache: 'force-cache'` for static data (replaces getStaticProps)
- `cache: 'no-store'` for dynamic data (replaces getServerSideProps)
- `next: { revalidate: 60 }` for ISR behavior

### Route Structure

- Use `app/` directory exclusively
- `page.tsx` for route components
- `layout.tsx` for shared layouts
- `loading.tsx` for loading states
- `error.tsx` for error boundaries
- Route groups: `(auth)/login/page.tsx`

### API Routes (Route Handlers)

```tsx
// app/api/users/route.ts
export async function GET() {
  const users = await getUsersFromDB();
  return Response.json(users);
}

export async function POST(request: Request) {
  const data = await request.json();
  const user = await createUser(data);
  return Response.json(user, { status: 201 });
}
```

## AI Code Generation Rules

1. **Always suggest App Router patterns** - Never generate Pages Router code
2. **Default to Server Components** - Only add 'use client' when interactive features are needed
3. **Use modern data fetching** - Native fetch with cache options instead of getStaticProps/getServerSideProps
4. **Proper TypeScript typing** - Include interfaces for props and API responses
5. **Follow file naming conventions** - Use page.tsx, layout.tsx, loading.tsx, error.tsx
6. **Implement proper error handling** - Use error boundaries and try-catch blocks
7. **Include loading states** - Provide loading.tsx files and Suspense boundaries

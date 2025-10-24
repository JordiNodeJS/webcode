/**
 * Componente de ejemplo: React 19 'use' Hook
 *
 * Este componente demuestra cómo usar el nuevo hook 'use()' de React 19
 * para unwrapping de Promises en Client Components.
 *
 * Casos de uso:
 * - Client Components que reciben params/searchParams como Promise
 * - Resolución de datos asíncronos en componentes de cliente
 * - Suspense boundaries con loading states
 *
 * @see https://react.dev/reference/react/use
 * @see Next.js 16: https://nextjs.org/docs/app/api-reference/file-conventions/page
 */

"use client";

import { use, Suspense } from "react";

// ============================================================================
// EJEMPLO 1: use() con params de Next.js en Client Component
// ============================================================================

interface ClientPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ filter?: string }>;
}

/**
 * Client Component que usa 'use()' para resolver params y searchParams
 * Esta es la forma recomendada en Next.js 16 + React 19
 */
export function ClientPageWithParams({
  params,
  searchParams
}: ClientPageProps) {
  // ✅ Usar 'use()' hook para unwrap las Promises
  const { id } = use(params);
  const { filter } = use(searchParams);

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-xl font-bold mb-2">Client Component con Params</h2>
      <p className="text-muted-foreground">
        ID: <code className="text-primary">{id}</code>
      </p>
      {filter && (
        <p className="text-muted-foreground">
          Filter: <code className="text-primary">{filter}</code>
        </p>
      )}
    </div>
  );
}

// ============================================================================
// EJEMPLO 2: use() con Promise de datos
// ============================================================================

/**
 * Función que simula fetch de datos (devuelve Promise)
 */
function fetchUserData(
  userId: string
): Promise<{ name: string; email: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: `Usuario ${userId}`,
        email: `user${userId}@webcode.es`
      });
    }, 1000);
  });
}

interface UserDataProps {
  userPromise: Promise<{ name: string; email: string }>;
}

/**
 * Client Component que usa 'use()' para resolver Promise de datos
 */
function UserData({ userPromise }: UserDataProps) {
  // ✅ use() suspende el componente hasta que la Promise se resuelve
  const user = use(userPromise);

  return (
    <div className="rounded-lg border p-6">
      <h3 className="font-bold text-lg mb-2">Datos del Usuario</h3>
      <p>Nombre: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

/**
 * Wrapper con Suspense para manejar el loading state
 */
export function UserDataWithSuspense({ userId }: { userId: string }) {
  const userPromise = fetchUserData(userId);

  return (
    <Suspense
      fallback={
        <div className="rounded-lg border p-6 animate-pulse">
          <div className="h-4 bg-muted rounded mb-2" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
      }
    >
      <UserData userPromise={userPromise} />
    </Suspense>
  );
}

// ============================================================================
// EJEMPLO 3: use() con Context
// ============================================================================

import { createContext } from "react";

const ThemeContext = createContext<Promise<"light" | "dark"> | null>(null);

/**
 * Client Component que usa 'use()' para resolver un Context con Promise
 */
export function ThemeConsumer() {
  const themePromise = use(ThemeContext);

  if (!themePromise) {
    throw new Error(
      "ThemeConsumer debe usarse dentro de ThemeContext.Provider"
    );
  }

  // ✅ use() también puede unwrap Promises de Context
  const theme = use(themePromise);

  return (
    <div className="rounded-lg border p-6">
      <h3 className="font-bold text-lg mb-2">Tema Actual</h3>
      <p>
        Tema: <span className="text-primary">{theme}</span>
      </p>
    </div>
  );
}

// ============================================================================
// EJEMPLO 4: Comparación Patrones Antes vs Después
// ============================================================================

/**
 * ❌ PATRÓN ANTIGUO (No funciona en Next.js 16)
 *
 * export function OldClientComponent({ params }: { params: { id: string } }) {
 *   const { id } = params; // ❌ params es Promise, esto falla
 *   return <div>{id}</div>;
 * }
 */

/**
 * ✅ PATRÓN NUEVO (Next.js 16 + React 19)
 *
 * Opción A: Server Component (Recomendado)
 * export default async function Page({ params }: { params: Promise<{ id: string }> }) {
 *   const { id } = await params;
 *   return <div>{id}</div>;
 * }
 *
 * Opción B: Client Component con use()
 * "use client";
 * import { use } from "react";
 *
 * export function ClientComponent({ params }: { params: Promise<{ id: string }> }) {
 *   const { id } = use(params);
 *   return <div>{id}</div>;
 * }
 */

// ============================================================================
// DEMO PRINCIPAL
// ============================================================================

/**
 * Componente demo que muestra todos los ejemplos
 */
export function React19UseHookDemo() {
  // Crear promises de ejemplo
  const paramsPromise = Promise.resolve({ id: "123" });
  const searchParamsPromise = Promise.resolve({ filter: "active" });

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">
          React 19 &apos;use()&apos; Hook - Ejemplos
        </h1>
        <p className="text-muted-foreground mb-8">
          Demostraciones del nuevo hook &apos;use()&apos; de React 19 para
          unwrapping de Promises
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">1. Params de Next.js</h2>
        <Suspense fallback={<div>Cargando...</div>}>
          <ClientPageWithParams
            params={paramsPromise}
            searchParams={searchParamsPromise}
          />
        </Suspense>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">2. Promise de Datos</h2>
        <UserDataWithSuspense userId="123" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">
          Ventajas del &apos;use()&apos; Hook
        </h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>✅ Unwrap de Promises directamente en componentes</li>
          <li>✅ Integración perfecta con Suspense</li>
          <li>✅ Código más limpio y directo</li>
          <li>✅ Soporte nativo de TypeScript</li>
          <li>✅ Compatible con Context y otras APIs de React</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">
          Cuándo Usar &apos;use()&apos;
        </h2>
        <div className="rounded-lg border p-6 space-y-4">
          <div>
            <h3 className="font-bold text-green-600">
              ✅ Usar &apos;use()&apos; cuando:
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1 mt-2">
              <li>Necesitas params/searchParams en un Client Component</li>
              <li>Tienes una Promise que ya está iniciada</li>
              <li>Quieres integración con Suspense</li>
              <li>El componente DEBE ser cliente (&apos;use client&apos;)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-blue-600">
              💡 Alternativa (Preferida):
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1 mt-2">
              <li>Usa Server Components con async/await cuando sea posible</li>
              <li>
                Solo usa Client Components cuando necesites interactividad
              </li>
              <li>Server Components tienen mejor performance</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

# 🚨 Referencia Rápida: Reglas Críticas de Biome para Copilot

## **ERRORES CRÍTICOS QUE BIOME DETECTA**

### 1. **Prohibición de `any`** (ERROR)

```typescript
// ❌ ERROR - Biome bloqueará esto
const data: any = response;
function handler(event: any) {}

// ✅ CORRECTO - Usar tipos específicos
const data: ApiResponse = response;
function handler(event: React.MouseEvent<HTMLButtonElement>) {}
```

### 2. **Keys faltantes en JSX** (WARNING)

```tsx
// ❌ WARNING - Biome detectará esto
{
  items.map((item) => <div>{item.name}</div>);
}

// ✅ CORRECTO - Siempre incluir key
{
  items.map((item) => <div key={item.id}>{item.name}</div>);
}
```

### 3. **Non-null assertions** (WARNING)

```typescript
// ❌ WARNING - Biome advertirá sobre esto
const element = document.getElementById("id")!;

// ✅ CORRECTO - Validación explícita
const element = document.getElementById("id");
if (!element) throw new Error("Element not found");
```

### 4. **Variables no utilizadas** (WARNING con fix automático)

```typescript
// ❌ WARNING - Variable sin usar
const unusedVar = "value";

// ✅ CORRECTO - Biome puede auto-fix a:
const _unusedVar = "value"; // o simplemente eliminarla
```

### 5. **Import types** (WARNING con fix automático)

```typescript
// ❌ WARNING - Import innecesario para tipos
import React from "react";

// ✅ CORRECTO - Biome auto-fix a:
import type React from "react";
```

## **COMANDOS BIOME ESENCIALES**

```bash
# Verificar errores sin corregir
pnpm biome check .

# Corregir automáticamente lo que se pueda
pnpm biome check --write .

# Solo formatear
pnpm biome format --write .

# Ver qué cambiaría sin aplicar
pnpm biome check --dry-run .
```

## **CONFIGURACIÓN ACTUAL DEL PROYECTO**

```json
// biome.json - Configuración activa
{
  "linter": {
    "rules": {
      "suspicious": { "noExplicitAny": "error" },
      "correctness": { "useJsxKeyInIterable": "warn" },
      "style": { "noNonNullAssertion": "warn" }
    }
  }
}
```

## **REGLAS DE ORO PARA COPILOT**

1. **NUNCA generar código con `any`** → Error automático
2. **SIEMPRE incluir `key` en elementos JSX iterables** → Warning automático
3. **EVITAR non-null assertions (`!`)** → Preferir validación explícita
4. **USAR named exports** para componentes reutilizables
5. **TIPAR event handlers** específicamente (React.MouseEvent, etc.)

## **EJEMPLO DE CÓDIGO QUE PASA BIOME SIN PROBLEMAS**

```tsx
interface Props {
  items: Array<{ id: string; name: string }>;
  onSelect?: (id: string) => void;
}

export function ItemList({ items, onSelect }: Props) {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();
    onSelect?.(id);
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="p-2 border rounded">
          <span>{item.name}</span>
          <button type="button" onClick={(e) => handleClick(e, item.id)}>
            Select
          </button>
        </div>
      ))}
    </div>
  );
}
```

**🎯 OBJETIVO**: Generar código que pase `pnpm biome check` sin errores ni warnings.

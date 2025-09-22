---
applyTo: "**/*.{ts,tsx,js,jsx,json,css,scss}"
---

# Instrucciones para Biome - Linting y Formateo WebCode

## 🎯 **REGLAS CRÍTICAS DE BIOME**

**ANTES DE GENERAR CUALQUIER CÓDIGO, asegúrate de que cumple con estas reglas de Biome para evitar errores y warnings:**

### **Configuración Activa de Biome**

El proyecto usa **Biome v2.2.3** como linter y formateador principal. Todas las reglas están configuradas en `biome.json`:

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "useJsxKeyInIterable": "warn"
      },
      "suspicious": {
        "noExplicitAny": "error",
        "noUnknownAtRules": "off"
      },
      "style": {
        "noNonNullAssertion": "warn"
      }
    }
  }
}
```

## **REGLAS CRÍTICAS A SEGUIR**

### **1. Prohibición Estricta de `any`**

```tsx
// ❌ ERROR - Biome detectará esto como error
const data: any = await fetch("/api/services");
const handleClick = (event: any) => {};

// ✅ CORRECTO - Tipos específicos
const data: ServiceResponse = await fetch("/api/services").then((res) =>
  res.json()
);
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {};

// ✅ CORRECTO - Tipos genéricos cuando sea apropiado
function processData<T>(data: T): T {
  return data;
}
```

### **2. Keys en Elementos JSX Iterables**

```tsx
// ❌ WARNING - Biome detectará esto
{
  services.map((service) => <ServiceCard service={service} />);
}

// ✅ CORRECTO - Siempre incluir key única
{
  services.map((service) => <ServiceCard key={service.id} service={service} />);
}

// ✅ Para arrays sin ID único
{
  items.map((item, index) => (
    <div key={`${item.name}-${index}`}>{item.name}</div>
  ));
}
```

### **3. Estilo de Código Biome**

```tsx
// ✅ FORMATO REQUERIDO por Biome
export function ServiceCard({
  id,
  title,
  description,
  price,
}: ServiceCardProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <span className="text-lg font-semibold">{price}€</span>
    </div>
  );
}
```

### **4. Importaciones y Exportaciones**

```tsx
// ✅ CORRECTO - Named exports para componentes
export function Button() { ... }
export function Card() { ... }

// ✅ CORRECTO - Default exports solo para páginas Next.js
export default function HomePage() { ... }

// ✅ CORRECTO - Importaciones ordenadas
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "./ServiceCard";
```

### **5. Non-null Assertions (!)**

```tsx
// ⚠️ WARNING - Biome emitirá warning
const element = document.getElementById("myId")!;
const value = data!.value;

// ✅ PREFERIDO - Validación explícita
const element = document.getElementById("myId");
if (!element) throw new Error("Element not found");

const value = data?.value ?? defaultValue;
```

## **CONFIGURACIÓN ESPECÍFICA TYPESCRIPT**

### **Overrides para .ts y .tsx**

```typescript
// Para archivos TypeScript, Biome aplica reglas más estrictas:

// ❌ ERROR en .ts/.tsx
const unknownData: any = response;

// ❌ ERROR en .ts/.tsx
@unknown-rule { color: red; } // CSS desconocido

// ✅ CORRECTO
interface ResponseData {
  services: Service[];
  total: number;
}

const typedData: ResponseData = response as ResponseData;
```

### **Reglas CSS/SCSS**

```css
/* ❌ Biome detectará reglas CSS desconocidas */
.my-class {
  unknown-property: value;
}

/* ✅ CORRECTO - Solo propiedades CSS válidas */
.my-class {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## **HERRAMIENTAS DE DESARROLLO**

### **Comandos Biome Disponibles**

```bash
# Formatear archivos
pnpm biome format --write src/

# Linting con corrección automática
pnpm biome check --write src/

# Solo linting sin correcciones
pnpm biome lint src/

# Verificar todo el proyecto
pnpm biome check .
```

### **Integración con Editor**

- **VS Code**: Extension oficial de Biome instalada
- **Formato automático**: Al guardar archivos
- **Linting en tiempo real**: Errores y warnings visibles inmediatamente

## **PATRONES DE PREVENCIÓN DE ERRORES**

### **1. Validación de Props**

```tsx
// ✅ PATRÓN RECOMENDADO
interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    price: number;
  };
  onSelect?: (id: string) => void;
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
  // Biome no detectará errores aquí
  return (
    <div onClick={() => onSelect?.(service.id)}>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <span>{service.price}€</span>
    </div>
  );
}
```

### **2. Event Handlers Tipados**

```tsx
// ✅ Event handlers específicos
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Lógica del formulario
};

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  // Lógica del click
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
};
```

### **3. Async/Await con Manejo de Errores**

```tsx
// ✅ PATRÓN RECOMENDADO
async function fetchServices(): Promise<Service[]> {
  try {
    const response = await fetch("/api/services");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ServiceResponse = await response.json();
    return data.services;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}
```

## **INTEGRACIÓN CON FLUJO DE DESARROLLO**

### **Pre-commit Checks**

El proyecto debería incluir verificaciones automáticas de Biome antes de commit:

```json
// package.json scripts sugeridos
{
  "scripts": {
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write .",
    "type-check": "tsc --noEmit"
  }
}
```

### **CI/CD Integration**

```yaml
# .github/workflows/quality.yml (sugerido)
- name: Run Biome
  run: |
    pnpm biome check .
    pnpm biome format --check .
```

## **RESUMEN DE COMPLIANCE**

**Al generar código, SIEMPRE verificar:**

1. ✅ **No usar `any`** - Usar tipos específicos
2. ✅ **Keys en JSX** - Todos los elementos iterables tienen `key`
3. ✅ **Importaciones ordenadas** - React primero, luego librerías, luego locales
4. ✅ **Named exports** - Para componentes reutilizables
5. ✅ **Event handlers tipados** - Usar tipos React específicos
6. ✅ **Props interfaces** - Definir interfaces para todas las props
7. ✅ **CSS válido** - Solo propiedades CSS estándar
8. ⚠️ **Minimizar non-null assertions** - Preferir validación explícita

**El objetivo es generar código que pase Biome check sin errores ni warnings.**

---
applyTo: "**/*.{ts,tsx,js,jsx}"
---

# Instrucciones para TypeScript y Mejores Prácticas WebSnack

## Configuración TypeScript Estricta

### Tipos y Interfaces

```tsx
// ✅ Interfaces explícitas para props
interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'web' | 'ecommerce' | 'consulting';
  featured?: boolean;
}

// ✅ Tipos para datos de API
type APIResponse<T> = {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

// ❌ PROHIBIDO usar 'any'
// const data: any = await fetch(...);

// ✅ CORRECTO - tipar apropiadamente
const data: APIResponse<Service[]> = await fetch(...).then(res => res.json());
```

### Validación con Zod

```tsx
import { z } from "zod";

// Esquemas de validación
const ContactFormSchema = z.object({
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  message: z.string().min(10, "Mensaje debe tener al menos 10 caracteres"),
  service: z.enum(["web", "ecommerce", "consulting"]),
});

type ContactFormData = z.infer<typeof ContactFormSchema>;

// Validación en runtime
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = ContactFormSchema.parse(body);
    // ... procesar datos validados
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }
  }
}
```

### Gestión de Estados y Hooks

```tsx
// ✅ Estados tipados apropiadamente
const [isLoading, setIsLoading] = useState<boolean>(false);
const [services, setServices] = useState<Service[]>([]);
const [error, setError] = useState<string | null>(null);

// ✅ Custom hooks tipados
function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const response = await fetch("/api/services");
        const data: APIResponse<Service[]> = await response.json();
        setServices(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return { services, loading, error };
}
```

### Manejo de Errores

```tsx
// ✅ Error boundaries tipados
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// ✅ Try-catch apropiado
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  if (error instanceof ValidationError) {
    // Manejar error de validación
  } else if (error instanceof NetworkError) {
    // Manejar error de red
  } else {
    // Error genérico
    console.error("Error inesperado:", error);
  }
}
```

### Convenciones de Naming

```tsx
// ✅ Componentes: PascalCase
const ServiceCard = () => {};
const ContactForm = () => {};

// ✅ Variables y funciones: camelCase
const isLoading = true;
const handleSubmit = () => {};

// ✅ Constantes: UPPER_SNAKE_CASE
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5MB

// ✅ Tipos e interfaces: PascalCase
interface User {}
type ServiceCategory = "web" | "ecommerce";
```

### Performance y Optimización

```tsx
// ✅ Memo para componentes pesados
const ExpensiveComponent = React.memo<ExpensiveComponentProps>(
  ({ data, onUpdate }) => {
    // ... componente pesado
  }
);

// ✅ useCallback para funciones en dependencias
const handleClick = useCallback(
  (id: string) => {
    onItemClick?.(id);
  },
  [onItemClick]
);

// ✅ useMemo para cálculos costosos
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

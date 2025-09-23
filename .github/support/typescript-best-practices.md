# TypeScript Best Practices for AI Code Generation

## Configuration Requirements

When suggesting TypeScript configurations, always use strict mode:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Type Definition Patterns

### Component Props

Always define interfaces for component props:

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### API Response Types

Define proper types for API responses:

```tsx
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Usage in components
async function getUsers(): Promise<ApiResponse<User[]>> {
  const response = await fetch("/api/users");
  return response.json();
}
```

### Form Handling with Zod

Use Zod for runtime validation with progressive patterns:

```tsx
import { z } from "zod";

// Base schema for reusability
const baseContactSchema = z.object({
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  gdprConsent: z
    .boolean()
    .refine((val) => val === true, "Debes aceptar la política de privacidad")
});

// Progressive validation - extending base schemas
const webServiceSchema = baseContactSchema.extend({
  projectType: z.enum(["landing", "corporate", "portfolio", "blog"]),
  budget: z.enum(["1000-3000", "3000-7000", "7000-15000", "15000+"]),
  features: z.array(z.enum(["responsive_design", "cms", "seo_basic"])).min(1)
});

// Niche-specific validation
const floristeriaSchema = webServiceSchema.extend({
  businessInfo: z.object({
    location: z.string().min(5, "Incluye barrio de Barcelona"),
    specialties: z
      .array(z.enum(["bodas", "funerales", "eventos_corporativos"]))
      .min(1)
  })
});

type ContactFormData = z.infer<typeof baseContactSchema>;
type WebServiceFormData = z.infer<typeof webServiceSchema>;
type FloristeriaFormData = z.infer<typeof floristeriaSchema>;

function UserForm() {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    age: 0
  });

  const handleSubmit = (data: UserFormData) => {
    const result = UserSchema.safeParse(data);
    if (result.success) {
      // Handle valid data
    } else {
      // Handle validation errors
    }
  };
}
```

## AI Code Generation Rules

1. **Always include type annotations** - Never use `any` type
2. **Define interfaces for all props** - Include JSDoc comments when helpful
3. **Use proper generic types** - For reusable components and utilities
4. **Implement runtime validation** - Use Zod schemas for forms and API data
5. **Type external API responses** - Create interfaces for third-party data
6. **Use strict null checks** - Handle undefined/null cases explicitly
7. **Prefer type over interface** - Use `type` for unions, `interface` for objects
8. **Use const assertions** - For literal types and readonly arrays
9. **Implement proper error types** - Define custom error interfaces
10. **Use path aliases** - Prefer `@/` imports over relative paths

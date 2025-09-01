# Shadcn/ui Component Guidelines for AI

## Installation and Usage Rules

### Component Installation Commands

When suggesting component installations, always use pnpm:

```bash
# ✅ CORRECT - Use pnpm dlx for shadcn CLI
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add form input label
pnpm dlx shadcn@latest add dialog sheet toast

# Install multiple components at once
pnpm dlx shadcn@latest add button input label form dialog
```

### Component Architecture

- **Never modify** files in `components/ui/` - these are auto-generated
- Create **custom components** in `components/custom/` that extend shadcn/ui
- Use proper TypeScript interfaces for all component props

```
components/
├── ui/                    # Shadcn/ui components (DO NOT MODIFY)
│   ├── button.tsx
│   ├── input.tsx
│   └── dialog.tsx
├── magicui/               # Magic UI components
│   ├── text-animate.tsx
│   └── shimmer-button.tsx
└── custom/               # Custom components extending ui/
    ├── auth-form.tsx
    └── data-table.tsx
```

## Form Implementation Patterns

### React Hook Form + Zod Integration

Always use this pattern for forms:

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## Custom Component Patterns

### Extending Button Component

```tsx
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

export function LoadingButton({
  loading,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={loading || props.disabled}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
```

### Data Table Implementation

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={String(column.key)}>{column.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={String(column.key)}>
                {String(row[column.key])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## AI Code Generation Rules

1. **Always suggest pnpm dlx** for shadcn component installation
2. **Never modify ui/ components** - create custom wrappers instead
3. **Use Form components** with react-hook-form and Zod validation
4. **Include proper TypeScript types** for all component props
5. **Follow shadcn patterns** for component composition
6. **Implement accessibility** with proper ARIA labels
7. **Use lucide-react icons** for consistency with shadcn/ui
8. **Handle loading and error states** appropriately
9. **Use proper form validation** with descriptive error messages
10. **Maintain design system consistency** across all components

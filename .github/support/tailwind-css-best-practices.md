# Tailwind CSS Guidelines for AI Code Generation

## Utility-First Approach

### Direct Utility Usage

Always suggest utility classes instead of custom CSS:

```tsx
// ✅ PREFERRED - Use utilities directly
<div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <h2 className="text-xl font-semibold text-gray-900">Title</h2>
  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
    Action
  </button>
</div>

// ❌ AVOID - Custom CSS classes
<div className="card">
  <h2 className="card-title">Title</h2>
  <button className="btn btn-primary">Action</button>
</div>
```

## Responsive Design Patterns

### Mobile-First Approach

Always use responsive prefixes with mobile-first design:

```tsx
// ✅ CORRECT - Mobile-first responsive design
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {items.map(item => (
    <div key={item.id} className="p-4 bg-white rounded-lg">
      <h3 className="text-lg font-medium sm:text-xl">{item.title}</h3>
      <p className="mt-2 text-sm text-gray-600 sm:text-base">{item.description}</p>
    </div>
  ))}
</div>

// Hero section responsive text
<h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
  WebCode
</h1>
```

## Dark Mode Implementation

### Class Strategy Setup

Always implement dark mode support:

```tsx
// Layout with dark mode toggle
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {children}
    </div>
  );
}

// Component with dark mode variants
<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
  <h2 className="text-gray-900 dark:text-gray-100">Title</h2>
  <p className="text-gray-600 dark:text-gray-300">Description</p>
</div>;
```

## Common Layout Patterns

### Flexbox Layouts

```tsx
// Centered container
<div className="flex items-center justify-center min-h-screen">
  <div className="w-full max-w-md">Content</div>
</div>

// Header with navigation
<header className="flex items-center justify-between p-4 bg-white border-b">
  <div className="flex items-center space-x-4">
    <Logo />
    <nav className="hidden md:flex space-x-6">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  </div>
  <div className="flex items-center space-x-2">
    <Button variant="ghost">Login</Button>
    <Button>Sign Up</Button>
  </div>
</header>
```

### Grid Layouts

```tsx
// Dashboard grid
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  <div className="col-span-1 md:col-span-2 lg:col-span-3">
    <StatsOverview />
  </div>
  <div className="col-span-1">
    <RecentActivity />
  </div>
  <div className="col-span-1 md:col-span-1 lg:col-span-2">
    <Chart />
  </div>
</div>
```

## Color and Spacing Guidelines

### Consistent Spacing

Use Tailwind's spacing scale consistently:

```tsx
// Component spacing
<div className="space-y-6">
  <div className="space-y-2">
    <h2 className="text-2xl font-bold">Title</h2>
    <p className="text-gray-600">Subtitle</p>
  </div>
  <div className="space-y-4">
    <Button>Primary Action</Button>
    <Button variant="outline">Secondary Action</Button>
  </div>
</div>

// Container padding and margins
<div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto">
    <Content />
  </div>
</div>
```

### Focus and Interactive States

Always include proper focus and hover states:

```tsx
<button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
  Interactive Button
</button>

<a href="#" className="text-blue-600 hover:text-blue-800 focus:outline-none focus:underline transition-colors">
  Link
</a>
```

## AI Code Generation Rules

1. **Use utility classes directly** - Avoid custom CSS unless absolutely necessary
2. **Implement mobile-first responsive design** - Always include responsive prefixes
3. **Include dark mode support** - Use dark: prefix for dark mode variants
4. **Follow consistent spacing** - Use Tailwind's spacing scale (4, 6, 8, 12, etc.)
5. **Add proper focus states** - Include focus:outline-none focus:ring for accessibility
6. **Use semantic color names** - Prefer gray-900, blue-600 over arbitrary values
7. **Implement hover transitions** - Add transition-colors or transition-all
8. **Use proper container patterns** - container mx-auto px-4 for page layouts
9. **Include loading and disabled states** - Handle all interactive states
10. **Maintain visual hierarchy** - Use consistent text sizes and weights

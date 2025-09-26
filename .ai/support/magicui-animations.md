# Magic UI Animation Guidelines for AI

## Installation and Setup

### Component Installation Process

Always use shadcn CLI to install Magic UI components:

```bash
# ✅ CORRECT - Install Magic UI components via shadcn
pnpm dlx shadcn@latest add "https://magicui.design/r/text-animate.json"
pnpm dlx shadcn@latest add "https://magicui.design/r/shimmer-button.json"
pnpm dlx shadcn@latest add "https://magicui.design/r/blur-fade.json"
pnpm dlx shadcn@latest add "https://magicui.design/r/retro-grid.json"
pnpm dlx shadcn@latest add "https://magicui.design/r/sparkles-text.json"
pnpm dlx shadcn@latest add "https://magicui.design/r/fade-text.json"

# Install required dependencies
pnpm add framer-motion
pnpm add class-variance-authority
```

### Component Organization

```
components/
├── magicui/               # Magic UI components (installed via shadcn)
│   ├── text-animate.tsx
│   ├── shimmer-button.tsx
│   ├── blur-fade.tsx
│   ├── retro-grid.tsx
│   └── sparkles-text.tsx
└── custom/               # Custom animated components
    ├── animated-hero.tsx
    └── animated-card.tsx
```

## Animation Patterns for Heroes and Landing Pages

### Animated Hero Section

```tsx
import { SparklesText } from "@/components/magicui/sparkles-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { BlurFade } from "@/components/magicui/blur-fade";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { FadeText } from "@/components/magicui/fade-text";

export function AnimatedHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <RetroGrid />

      <div className="relative z-10 container text-center space-y-8">
        <BlurFade delay={0.25} inView>
          <SparklesText
            className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl"
            text="WebSnack"
          />
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <FadeText
            direction="up"
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            text="Build amazing web experiences with modern tools and beautiful animations."
          />
        </BlurFade>

        <BlurFade delay={0.75} inView>
          <div className="flex gap-4 justify-center">
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Get Started
              </span>
            </ShimmerButton>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
```

### Feature Cards with Staggered Animation

```tsx
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const features = [
  {
    title: "Modern Framework",
    description: "Built with Next.js 15 and App Router for optimal performance."
  },
  {
    title: "Beautiful UI",
    description:
      "Crafted with shadcn/ui and Tailwind CSS for stunning interfaces."
  },
  {
    title: "Smooth Animations",
    description:
      "Enhanced with Magic UI components for delightful interactions."
  }
];

export function AnimatedFeatures() {
  return (
    <section className="py-24">
      <div className="container">
        <BlurFade delay={0.25} inView>
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <BlurFade key={index} delay={0.25 + index * 0.1} inView>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Text Animation Patterns

### Typewriter and Fade Effects

```tsx
import { TextAnimate } from "@/components/magicui/text-animate";
import { FadeText } from "@/components/magicui/fade-text";

export function AnimatedText() {
  return (
    <div className="space-y-8">
      {/* Typewriter effect */}
      <TextAnimate
        animation="typewriter"
        className="text-4xl font-bold"
        text="Welcome to WebSnack"
      />

      {/* Fade in from different directions */}
      <FadeText
        direction="up"
        className="text-xl text-muted-foreground"
        text="Fade in from bottom"
      />

      <FadeText
        direction="left"
        className="text-lg"
        text="Slide in from left"
      />

      <FadeText
        direction="right"
        className="text-lg"
        text="Slide in from right"
      />
    </div>
  );
}
```

### Sparkles and Shimmer Effects

```tsx
import { SparklesText } from "@/components/magicui/sparkles-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

export function ShimmeryComponents() {
  return (
    <div className="space-y-8 text-center">
      <SparklesText
        className="text-6xl font-bold"
        text="Magical Text"
        colors={{ first: "#A07CFE", second: "#FE8FB5" }}
      />

      <div className="space-x-4">
        <ShimmerButton className="shadow-2xl">
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
            Primary Action
          </span>
        </ShimmerButton>

        <ShimmerButton variant="secondary" className="shadow-2xl">
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight lg:text-lg">
            Secondary Action
          </span>
        </ShimmerButton>
      </div>
    </div>
  );
}
```

## Performance Considerations

### Optimized Animation Loading

```tsx
import dynamic from "next/dynamic";

// Lazy load heavy animation components
const AnimatedHero = dynamic(() => import("@/components/animated-hero"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse space-y-4 text-center">
        <div className="h-12 bg-gray-200 rounded w-96 mx-auto" />
        <div className="h-6 bg-gray-200 rounded w-64 mx-auto" />
      </div>
    </div>
  )
});

export function HomePage() {
  return (
    <main>
      <AnimatedHero />
      {/* Other content */}
    </main>
  );
}
```

### Reduce Motion Preference

```tsx
"use client";
import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

// Usage in components
export function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <BlurFade
      delay={prefersReducedMotion ? 0 : 0.25}
      duration={prefersReducedMotion ? 0 : 0.5}
      inView
    >
      <div>Content</div>
    </BlurFade>
  );
}
```

## AI Code Generation Rules

1. **Always install via shadcn CLI** - Use the official Magic UI registry URLs
2. **Include framer-motion dependency** - Most Magic UI components require it
3. **Use staggered delays** - Create visual hierarchy with timing
4. **Implement blur-fade for sections** - Standard pattern for page sections
5. **Add sparkles for headings** - Use SparklesText for hero titles
6. **Include shimmer buttons** - For primary call-to-action buttons
7. **Respect motion preferences** - Handle prefers-reduced-motion
8. **Lazy load heavy animations** - Use dynamic imports for performance
9. **Use proper delay timing** - 0.25s base delay, increment by 0.1s for staggering
10. **Combine with Tailwind classes** - Maintain consistent styling with animations

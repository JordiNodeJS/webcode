# Performance Optimization Guidelines for AI

## Image Optimization Patterns

### Next.js Image Component Usage

Always suggest the Next.js Image component for optimal performance:

```tsx
import Image from "next/image";

// ✅ CORRECT - Hero images with priority
export function HeroSection() {
  return (
    <div className="relative w-full h-96">
      <Image
        src="/hero-image.jpg"
        alt="Hero banner"
        fill
        className="object-cover rounded-lg"
        priority // Above-the-fold image
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

// ✅ CORRECT - Profile avatars
export function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-10 h-10">
      <Image
        src={src}
        alt={alt}
        fill
        className="rounded-full object-cover"
        sizes="40px"
      />
    </div>
  );
}

// ✅ CORRECT - Gallery images with lazy loading
export function Gallery({ images }: { images: ImageType[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={image.id} className="relative aspect-square">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            priority={index < 6} // First 6 images get priority
          />
        </div>
      ))}
    </div>
  );
}
```

## Code Splitting and Lazy Loading

### Dynamic Imports

```tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";

// ✅ CORRECT - Lazy load heavy components
const HeavyChart = dynamic(() => import("@/components/heavy-chart"), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded" />,
  ssr: false // If component doesn't need SSR
});

const DashboardModal = dynamic(() => import("@/components/dashboard-modal"));

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading chart...</div>}>
        <HeavyChart />
      </Suspense>
    </div>
  );
}
```

### Route-based Code Splitting

```tsx
// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded animate-pulse" />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}
```

## Data Fetching Optimization

### Caching Strategies

```tsx
// Static data (equivalent to getStaticProps)
async function getStaticData() {
  const data = await fetch("https://api.example.com/static-data", {
    cache: "force-cache"
  });
  return data.json();
}

// Dynamic data (equivalent to getServerSideProps)
async function getDynamicData() {
  const data = await fetch("https://api.example.com/dynamic-data", {
    cache: "no-store"
  });
  return data.json();
}

// ISR behavior (revalidate every hour)
async function getISRData() {
  const data = await fetch("https://api.example.com/isr-data", {
    next: { revalidate: 3600 }
  });
  return data.json();
}

// Per-request caching
async function getCachedData() {
  const data = await fetch("https://api.example.com/data", {
    cache: "force-cache",
    next: { tags: ["data"] }
  });
  return data.json();
}
```

### Streaming and Suspense

```tsx
import { Suspense } from "react";

async function SlowComponent() {
  // Simulate slow data fetch
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <div>Slow loaded content</div>;
}

export default function Page() {
  return (
    <div>
      <h1>Page with streaming</h1>
      <Suspense fallback={<div>Loading slow component...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
```

## Bundle Optimization

### Tree Shaking Imports

```tsx
// ✅ CORRECT - Import only what you need
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { formatDistance } from "date-fns";

// ❌ AVOID - Importing entire libraries
import * as React from "react";
import * as dateFns from "date-fns";
import { Button, Input, Dialog } from "@/components/ui"; // if not tree-shaken
```

### Webpack Bundle Analyzer Setup

```json
// package.json
{
  "scripts": {
    "analyze": "cross-env ANALYZE=true next build",
    "analyze:server": "cross-env BUNDLE_ANALYZE=server next build",
    "analyze:browser": "cross-env BUNDLE_ANALYZE=browser next build"
  }
}
```

## Performance Monitoring

### Web Vitals Implementation

```tsx
// app/layout.tsx
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
```

### Custom Performance Metrics

```tsx
"use client";
import { useEffect } from "react";

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Largest Contentful Paint
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log("LCP:", entry.startTime);
      });
    });

    observer.observe({ entryTypes: ["largest-contentful-paint"] });

    return () => observer.disconnect();
  }, []);

  return null;
}
```

## AI Code Generation Rules

1. **Always suggest Next.js Image** - Never use regular <img> tags
2. **Include proper image sizing** - Use fill, width/height, or sizes attribute
3. **Implement loading states** - Provide Suspense fallbacks
4. **Use appropriate caching** - Choose correct cache strategy for data type
5. **Suggest dynamic imports** - For heavy or conditional components
6. **Include priority for above-fold** - Use priority prop for critical images
7. **Implement proper error boundaries** - Handle loading and error states
8. **Optimize bundle size** - Suggest tree-shaking friendly imports
9. **Monitor performance** - Include performance monitoring setup
10. **Use streaming patterns** - Implement Suspense for gradual page loading

# Layout Patterns - WEBCODE

## Overview

This document defines the standard layout patterns used throughout the WEBCODE application to ensure consistent spacing, avoid navbar overlap issues, and maintain a cohesive user experience.

## Fixed Navbar

The application uses a fixed navbar that stays at the top of the viewport as users scroll. The navbar has the following characteristics:

- **Position**: `fixed top-0 z-50`
- **Approximate Height**: ~72-80px (varies slightly based on scroll state)
- **Behavior**: Transparent with backdrop blur, becomes more opaque on scroll

### Navbar Implementation

Located in: `src/components/landing/hero/Hero.HeaderNavigation.tsx`

```tsx
<header className={`fixed top-0 z-50 w-full transition-all duration-300 ease-out ${
  isScrolled
    ? "backdrop-blur-lg border-b border-border/40 shadow-xl py-2"
    : "backdrop-blur-md border-b border-border/30 shadow-lg py-4"
}`}>
```

## Standard Page Layout Pattern

### The `pt-24` Standard

All pages MUST use `pt-24` (96px) as the top padding for their main content area to ensure proper clearance from the fixed navbar.

#### Why 96px?

- Provides comfortable spacing above content (24 * 4px = 96px)
- Accounts for navbar height (~72-80px) plus breathing room
- Prevents any overlap across all screen sizes
- Consistent with Tailwind's spacing scale

### Standard Pattern Implementation

```tsx
// ✅ CORRECT: Hero/Header Section
<section className="pt-24 pb-20 md:pb-32">
  <div className="container mx-auto px-4">
    <h1>Page Title</h1>
    {/* Page content */}
  </div>
</section>

// ✅ CORRECT: Main Wrapper
<main className="min-h-screen pt-24 pb-20 px-4">
  <div className="container mx-auto max-w-4xl">
    <h1>Page Title</h1>
    {/* Page content */}
  </div>
</main>

// ❌ INCORRECT: Using py instead of pt-24
<section className="py-20 md:py-32">
  {/* This may cause overlap */}
</section>

// ❌ INCORRECT: Insufficient top padding
<section className="pt-12">
  {/* Only 48px - will overlap with navbar */}
</section>
```

## Page Types and Patterns

### 1. Hero Pages (with Background Gradients)

Used in: `/soluciones/*`, `/proceso`, `/briefing`

```tsx
<div className="min-h-screen">
  <section className="relative pt-24 pb-20 md:pb-32 overflow-hidden bg-[gradient...]">
    <div className="container mx-auto max-w-6xl px-4 relative z-10">
      {/* Hero content with title, description, CTAs */}
    </div>
  </section>
  
  {/* Additional sections */}
</div>
```

### 2. Simple Content Pages

Used in: `/contacto`, `/about`, `/servicios`

```tsx
<main className="min-h-screen pt-24 pb-20 px-4">
  <div className="container mx-auto max-w-4xl">
    <h1>Page Title</h1>
    {/* Content */}
  </div>
</main>
```

### 3. Grid Layout Pages

Used in: `/blog`, `/faqs`

```tsx
<div className="min-h-screen pt-24 pb-20 px-4">
  <div className="container mx-auto max-w-4xl">
    <div className="text-center mb-16">
      <h1>Page Title</h1>
      <p>Description</p>
    </div>
    
    <div className="grid grid-cols-1 gap-8">
      {/* Grid items */}
    </div>
  </div>
</div>
```

### 4. Custom Layout Pages

Used in: `/portfolio`

```tsx
<div className="min-h-screen flex flex-col">
  <div className="pt-24 pb-12 border-b border-border/30">
    <div className="container mx-auto max-w-7xl px-4">
      <h1>Page Title</h1>
    </div>
  </div>
  
  {/* Additional content */}
</div>
```

### 5. Full-Screen Hero (Homepage)

Used in: `/` (homepage)

The homepage uses a full-screen hero with integrated navigation. The content area uses the same `pt-24` pattern:

```tsx
<div className="relative min-h-screen w-full overflow-hidden">
  <HeaderNavigation />
  
  <div className="container relative z-10 mx-auto px-4 pt-24 pb-20 md:pb-32">
    {/* Hero content */}
  </div>
</div>
```

## Responsive Considerations

### Bottom Padding

While top padding is always `pt-24`, bottom padding can be responsive:

- Mobile: `pb-12` or `pb-20` (48px or 80px)
- Desktop: `md:pb-32` (128px for spacious layouts)

Example:
```tsx
className="pt-24 pb-12"           // Fixed spacing for simple pages
className="pt-24 pb-20 md:pb-32"  // Responsive for hero sections
```

### Container Widths

Standard container max-widths:
- Content pages: `max-w-4xl` (896px)
- Wide layouts: `max-w-6xl` (1152px)
- Extra wide: `max-w-7xl` (1280px)

## Migration Guide

When updating existing pages, follow this process:

1. Identify the main content container or hero section
2. Replace any `py-*` classes with `pt-24 pb-*`
3. Remove any `mt-*` (margin-top) used to offset navbar
4. Test with DevTools at different viewport sizes
5. Verify no overlap at any breakpoint

### Before/After Examples

#### Example 1: Hero Section
```tsx
// ❌ Before
<section className="py-20 md:py-32">

// ✅ After
<section className="pt-24 pb-20 md:pb-32">
```

#### Example 2: Combined Padding and Margin
```tsx
// ❌ Before
<section className="pt-14 pb-20 mt-8 md:pt-14 md:pb-32 md:mt-8">

// ✅ After
<section className="pt-24 pb-20 md:pb-32">
```

#### Example 3: Content Page
```tsx
// ❌ Before
<div className="container mx-auto px-4 py-12">

// ✅ After
<div className="container mx-auto px-4 pt-24 pb-12">
```

## Testing Checklist

After implementing the layout pattern, verify:

- [ ] No overlap with navbar at desktop size (1920x1080)
- [ ] No overlap with navbar at tablet size (768x1024)
- [ ] No overlap with navbar at mobile size (375x667)
- [ ] Title is visible and readable when page loads
- [ ] Consistent spacing matches other pages
- [ ] Test in both light and dark modes
- [ ] Test with browser zoom (50%, 100%, 150%, 200%)

## DevTools Verification

Use Chrome DevTools to verify spacing:

```bash
# 1. Open DevTools (F12)
# 2. Select the main content element
# 3. Check computed styles:
#    - padding-top should be 96px (pt-24)
#    - padding-bottom should be 80px (pb-20) or 128px (md:pb-32)
# 4. Use the device toolbar to test different viewport sizes
# 5. Verify no overlap by measuring distance from top
```

## Common Issues and Solutions

### Issue: Content Still Overlaps

**Solution**: Ensure you're using `pt-24` on the outermost content container, not a nested element.

### Issue: Too Much Space Above Content

**Solution**: Verify navbar isn't duplicated or has unexpected margins. Check for multiple navigation components.

### Issue: Responsive Breakpoints Not Working

**Solution**: Make sure you're using `md:` prefix correctly and that the page container has proper width constraints.

### Issue: Different Spacing on Some Pages

**Solution**: Review the page type and apply the appropriate pattern from this document. All pages should use `pt-24` consistently.

## Files Modified

The following files were updated to implement the `pt-24` standard (as of navbar-spacing-standardization branch):

### Solution Pages
- `src/app/servicios/page.tsx`
- `src/app/soluciones/page.tsx`
- `src/app/soluciones/web-development/page.tsx`
- `src/app/soluciones/seo/page.tsx`
- `src/app/soluciones/landing-pages/page.tsx`
- `src/app/soluciones/e-commerce/page.tsx`
- `src/app/soluciones/consulting/page.tsx`
- `src/app/soluciones/reservas/page.tsx`

### Process Pages
- `src/app/proceso/page.tsx`
- `src/app/briefing/page.tsx`

### Content Pages
- `src/app/faqs/page.tsx`
- `src/app/contacto/page.tsx`
- `src/app/about/page.tsx`

### Special Pages
- `src/app/portfolio/page.tsx`
- `src/components/landing/hero/HeroSection.tsx` (homepage)

### Already Compliant
- `src/app/blog/page.tsx` (already used `pt-24`)

## PageWrapper Component

To avoid code repetition and ensure consistency, use the `PageWrapper` component and its specialized variants.

### Available Components

#### 1. ContentPage (for simple content pages)

```tsx
import { ContentPage } from "@/components/layout";

export default function MyPage() {
  return (
    <ContentPage>
      <h1>Page Title</h1>
      <p>Content</p>
    </ContentPage>
  );
}

// With custom max-width
<ContentPage maxWidth="max-w-6xl">
  {/* content */}
</ContentPage>

// With custom bottom padding
<ContentPage containerClassName="pb-12">
  {/* content */}
</ContentPage>
```

#### 2. HeroSection (for hero sections with gradients)

```tsx
import { HeroSection } from "@/components/layout";

export default function MyPage() {
  const gradient = `linear-gradient(to_right,rgb(var(--primary-rgb)_/_0.03),rgb(var(--secondary-rgb)_/_0.03))`;
  
  return (
    <HeroSection gradient={gradient}>
      <div className="max-w-3xl">
        <h1>Hero Title</h1>
        <p>Hero description</p>
      </div>
    </HeroSection>
  );
}
```

#### 3. GridPage (for grid layouts like blog/faqs)

```tsx
import { GridPage } from "@/components/layout";

export default function MyPage() {
  return (
    <GridPage maxWidth="max-w-4xl">
      <div className="text-center mb-16">
        <h1>Page Title</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {/* grid items */}
      </div>
    </GridPage>
  );
}
```

#### 4. PageWrapper (base component - use when you need custom behavior)

```tsx
import { PageWrapper } from "@/components/layout";

export default function MyPage() {
  return (
    <PageWrapper
      variant="content"
      maxWidth="max-w-6xl"
      className="custom-class"
      containerClassName="pb-32"
    >
      {/* content */}
    </PageWrapper>
  );
}
```

### Props Reference

All PageWrapper components accept:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | required | Page content |
| `className` | string | undefined | Additional classes for outer wrapper |
| `containerClassName` | string | undefined | Additional classes for container |
| `maxWidth` | 'max-w-4xl' \| 'max-w-6xl' \| 'max-w-7xl' | variant-dependent | Maximum container width |

Additional props for `PageWrapper` base component:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | 'hero' \| 'content' \| 'full-width' \| 'grid' | 'content' | Page layout variant |
| `gradient` | string | undefined | CSS gradient background (for hero) |
| `overflow` | boolean | false | Apply overflow-hidden |
| `relative` | boolean | true | Apply position-relative |

## Best Practices

1. **Use PageWrapper components** instead of manually applying `pt-24` classes
2. **Choose the right variant**: `ContentPage` for simple pages, `HeroSection` for marketing pages, `GridPage` for list/grid layouts
3. **Override only when necessary** using `containerClassName` for custom bottom padding
4. **Test across breakpoints** before committing changes
5. **Document any exceptions** if a page requires different spacing
6. **Use DevTools** to verify measurements match the design system

## Related Documentation

- [Component Structure](./components/README.md)
- [Design System](./03-DISENO-guia-estilos-base.md)
- [Animation System](./05-DISENO-sistema-animaciones-websnack.md)

## Version History

- **v1.0.0** (2025-10-16): Initial documentation with `pt-24` standard
  - Standardized all pages to use consistent top padding
  - Eliminated navbar overlap issues across the site
  - Created comprehensive testing and migration guides


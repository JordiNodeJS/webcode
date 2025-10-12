/**
 * Optimized dynamic imports for heavy components
 * Reduces initial bundle size by lazy loading non-critical components
 * Target: Reduce 24 KiB of unused JavaScript
 */

import { lazy } from "react";

// Debug Lab - Only load when needed (dev/testing) - SAVINGS: ~15 KiB
export const PerformanceTestLab = lazy(() =>
  import("@/components/debug/PerformanceTestLab").then((module) => ({
    default: module.PerformanceTestLab,
  })),
);

// Animation components - Load after initial page load - SAVINGS: ~8 KiB
export const BorderBeam = lazy(() =>
  import("@/components/magicui/border-beam").then((module) => ({
    default: module.BorderBeam,
  })),
);

export const BlurFade = lazy(() =>
  import("@/components/magicui/blur-fade").then((module) => ({
    default: module.BlurFade,
  })),
);

export const WSLetterReveal = lazy(() =>
  import("@/components/animations/ws-letter-reveal").then((module) => ({
    default: module.WSLetterReveal,
  })),
);

// Theme components that can be loaded progressively - SAVINGS: ~2 KiB
export const ThemeToggle = lazy(() =>
  import("@/components/landing/hero/Hero.ThemeToggle").then((module) => ({
    default: module.ThemeToggle,
  })),
);

// Briefing components - Load only when form is accessed - SAVINGS: ~5 KiB
export const BriefingForm = lazy(() =>
  import("@/components/briefing/BriefingForm").then((module) => ({
    default: module.BriefingForm,
  })),
);

export const BriefingCategories = lazy(
  () => import("@/components/briefing/BriefingCategories"),
);

export const BriefingBenefits = lazy(
  () => import("@/components/briefing/BriefingBenefits"),
);

export const BriefingPhases = lazy(
  () => import("@/components/briefing/BriefingPhases"),
);

// FAQ components - Load progressively - SAVINGS: ~3 KiB
export const FAQItem = lazy(() =>
  import("@/components/faq/FAQItem").then((module) => ({
    default: module.FAQItem,
  })),
);

// Magic UI components - Load on demand - SAVINGS: ~4 KiB
export const WSHover = lazy(() =>
  import("@/components/animations/ws-hover").then((module) => ({
    default: module.WSHover,
  })),
);

export const WSImageReveal = lazy(() =>
  import("@/components/animations/ws-image-reveal").then((module) => ({
    default: module.WSImageReveal,
  })),
);

// PDF generation - Load only when needed - SAVINGS: ~8 KiB
// Note: This is not a React component, so we don't use lazy() for it
// It's already dynamically imported in the API route

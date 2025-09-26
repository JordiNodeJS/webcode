/**
 * Optimized dynamic imports for heavy components
 * Reduces initial bundle size by lazy loading non-critical components
 */

import { lazy } from "react";

// Debug Lab - Only load when needed (dev/testing)
export const PerformanceTestLab = lazy(() => 
  import("@/components/debug/PerformanceTestLab").then(module => ({ 
    default: module.PerformanceTestLab 
  }))
);

// Animation components - Load after initial page load
export const BorderBeam = lazy(() => 
  import("@/components/magicui/border-beam").then(module => ({ 
    default: module.BorderBeam 
  }))
);

export const BlurFade = lazy(() => 
  import("@/components/magicui/blur-fade").then(module => ({ 
    default: module.BlurFade 
  }))
);

export const WSLetterReveal = lazy(() => 
  import("@/components/animations/ws-letter-reveal").then(module => ({ 
    default: module.WSLetterReveal 
  }))
);

// Theme components that can be loaded progressively
export const ThemeToggle = lazy(() => 
  import("@/components/landing/hero/Hero.ThemeToggle").then(module => ({ 
    default: module.ThemeToggle 
  }))
);
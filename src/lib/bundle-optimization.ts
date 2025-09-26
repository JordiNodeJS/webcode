/**
 * Bundle optimization utilities
 * Strategies to reduce First Load JS and improve Core Web Vitals
 */

import { lazy } from "react";

// Lazy load heavy animation components only when they're about to be visible
export const LazyCloudLightningBackground = lazy(() =>
  import("@/components/landing/hero").then((mod) => ({
    default: mod.CloudLightningBackground
  }))
);

export const LazyServicesSection = lazy(() =>
  import("@/components/landing/services").then((mod) => ({
    default: mod.ServicesSection
  }))
);

// Preload critical components during idle time
export const preloadCriticalComponents = () => {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      // Preload components that will likely be needed
      import("@/components/landing/services");
      import("@/components/landing/hero");
    });
  }
};

// Bundle size analysis helper
export const logBundleMetrics = () => {
  if (process.env.NODE_ENV === "development") {
    console.group("🎯 Bundle Optimization Metrics");
    console.log("First Load JS Target: < 200kB");
    console.log("Route Size Target: < 50kB");
    console.log("Middleware Target: < 20kB");
    console.groupEnd();
  }
};

// Dynamic import helper with error handling
export const safeDynamicImport = async <T>(
  importFn: () => Promise<T>,
  fallback?: T
) => {
  try {
    return await importFn();
  } catch (error) {
    console.warn("Dynamic import failed, using fallback:", error);
    return fallback;
  }
};

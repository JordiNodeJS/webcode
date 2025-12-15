"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

interface AnimationContextType {
  isAnimationEnabled: boolean;
  disableAnimationsForSection: (sectionId: string) => void;
  enableAnimationsForSection: (sectionId: string) => void;
  disabledSections: Set<string>;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

interface AnimationProviderProps {
  children: ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [disabledSections, setDisabledSections] = useState<Set<string>>(
    new Set()
  );

  // Initialize with actual value instead of default false
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    // Only listen for changes, don't set initial state
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const disableAnimationsForSection = useMemo(
    () => (sectionId: string) => {
      setDisabledSections((prev) => new Set(prev).add(sectionId));
    },
    []
  );

  const enableAnimationsForSection = useMemo(
    () => (sectionId: string) => {
      setDisabledSections((prev) => {
        const newSet = new Set(prev);
        newSet.delete(sectionId);
        return newSet;
      });
    },
    []
  );

  const isAnimationEnabled = !prefersReducedMotion;

  const contextValue = useMemo(
    () => ({
      isAnimationEnabled,
      disableAnimationsForSection,
      enableAnimationsForSection,
      disabledSections
    }),
    [
      isAnimationEnabled,
      disableAnimationsForSection,
      enableAnimationsForSection,
      disabledSections
    ]
  );

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationContext() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    return {
      isAnimationEnabled: true,
      disableAnimationsForSection: () => {},
      enableAnimationsForSection: () => {},
      disabledSections: new Set<string>()
    };
  }
  return context;
}

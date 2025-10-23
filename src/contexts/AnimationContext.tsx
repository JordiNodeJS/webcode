"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useLayoutEffect,
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // useLayoutEffect para evitar warning de setState en effect
  useLayoutEffect(() => {
    // Detectar preferencias de accesibilidad
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

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
    throw new Error(
      "useAnimationContext must be used within an AnimationProvider"
    );
  }
  return context;
}

export const wsConfig = {
  easings: {
    primary: [0.25, 0.46, 0.45, 0.94] as const,
    smooth: [0.4, 0, 0.2, 1] as const,
    bounce: [0.68, -0.55, 0.265, 1.55] as const,
    subtle: [0.23, 1, 0.32, 1] as const,
    dramatic: [0.87, 0, 0.13, 1] as const,
  },

  durations: {
    instant: 0.1,
    quick: 0.2,
    normal: 0.3,
    smooth: 0.5,
    dramatic: 0.8,
    slow: 1.2,
  },

  stagger: {
    tight: 0.05, // Letters
    normal: 0.1, // List items
    loose: 0.2, // Sections
  },

  // Efectos específicos WebCode
  effects: {
    lift: { y: -4, scale: 1.02 },
    glow: { filter: "brightness(1.1) blur(0.5px)" },
    fade: { opacity: 0.8 },
    scale: { scale: 1.05 },
  },
} as const;

// Hook para transiciones WebCode
export function useWSTransition(
  type: keyof typeof wsConfig.durations = "normal",
) {
  return {
    duration: wsConfig.durations[type],
    ease: wsConfig.easings.primary,
  };
}

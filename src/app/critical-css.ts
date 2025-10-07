// Minimal critical CSS for above-the-fold hero/header to avoid FOUC
// Keep this very small (< 2KB). Only essentials for first paint.

export const criticalCss = `
  html { color-scheme: light dark; }
  body { margin: 0; background-color: hsl(var(--background, 0 0% 100%)); color: hsl(var(--foreground, 0 0% 20%)); }
  .text-gradient-webcode {
    background: linear-gradient(135deg, oklch(0.703 0.135 328.5) 0%, oklch(0.873 0.058 184.1) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    display: inline-block;
    text-shadow: 0 1px 0 rgba(0,0,0,0.03);
  }
  @media (prefers-contrast: more) {
    .text-gradient-webcode { background: none; color: currentColor; -webkit-text-fill-color: initial; }
  }
  header { backdrop-filter: saturate(140%) blur(6px); -webkit-backdrop-filter: saturate(140%) blur(6px); }
`;

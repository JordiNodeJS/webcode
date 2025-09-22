(function () {
  try {
    const stored = localStorage.getItem("theme");
    let theme;

    if (stored === "dark" || stored === "light") {
      theme = stored;
    } else {
      const prefersDark =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      theme = prefersDark ? "dark" : "light";
    }

    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    // Fall back silently si localStorage o matchMedia fallan
  }
})();

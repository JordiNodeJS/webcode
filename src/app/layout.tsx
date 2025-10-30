import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ViewTransitions } from "next-view-transitions";
import { FooterSection } from "@/components/landing/Footer.Section";
import { HeaderNavigation } from "@/components/landing/hero/Hero.HeaderNavigation";
import { StructuredData } from "@/components/seo/StructuredData";
import { DefaultBackground } from "@/components/ui/DefaultBackground";
import { AnimationProvider } from "@/contexts/AnimationContext";
import { generateSEOMetadata } from "@/lib/seo-metadata";
import { initWebVitals } from "@/lib/web-vitals";
import { criticalCss } from "./critical-css";

// Font variables - using CSS with system font fallbacks
// Local Geist fonts can be added to public/fonts/ for enhanced typography
// See public/fonts/README.md for setup instructions
const fontVariables = {
  "--font-geist-sans":
    'var(--font-geist-custom, system-ui, -apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto", sans-serif)',
  "--font-geist-mono":
    'var(--font-geist-mono-custom, ui-monospace, "SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace)'
};

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title:
      "WEBCODE - Desarrollo Web Profesional en Barcelona | Soluciones Digitales",
    description:
      "Desarrollo web profesional, e-commerce y aplicaciones web para freelancers, PYMEs y startups en Barcelona y España. Soluciones digitales de calidad con tecnologías de vanguardia 2025.",
    keywords: [
      "desarrollo web Barcelona",
      "freelancer desarrollo web",
      "sitios web profesionales España",
      "e-commerce Barcelona",
      "aplicaciones web Catalunya",
      "soluciones digitales Barcelona",
      "diseño web responsive",
      "SEO Barcelona",
      "desarrollo web moderno",
      "startup web solutions",
      "Next.js desarrollo",
      "React Barcelona",
      "TypeScript web development"
    ],
    canonical: "https://webcode.es"
  }),
  metadataBase: new URL("https://webcode.es")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inicializar monitoreo de Web Vitals
  initWebVitals();

  return (
    <ViewTransitions>
      <html lang="es" suppressHydrationWarning data-scroll-behavior="smooth">
        <head>
          {/* Inline Critical CSS (small) for above-the-fold, guarded by flag */}
          {process.env.NEXT_PUBLIC_ENABLE_CRITICAL_CSS === "1" && (
            <style
              // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled inline CSS for critical-path
              dangerouslySetInnerHTML={{ __html: criticalCss }}
            />
          )}
          {/* CSS managed by Next.js by default (no manual preload/swap) */}
          {/* Hint the browser to fetch CSS with lower priority by marking as non-render blocking when possible */}
          {/* DNS Prefetch and Preconnect for better performance */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
            crossOrigin="anonymous"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          {/* Favicons and App Icons */}
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="color-scheme" content="light dark" />

          {/* Structured Data */}
          <StructuredData type="Organization" />
          <StructuredData type="WebSite" />
          <StructuredData type="LocalBusiness" />

          {/* Inline, non-blocking theme init to avoid FOUC without network fetch */}
          <script>{`(function(){try{var s=localStorage.getItem('theme');var t=(s==='dark'||s==='light')?s:((window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');var d=document.documentElement;d.classList.add(t);d.style.colorScheme=t;if(t==='dark'){d.style.backgroundColor='rgb(17, 24, 39)';}else{d.style.backgroundColor='rgb(255, 255, 255)';}}catch(e){}})();`}</script>

          {/* Critical CSS para prevenir FOUC en backgrounds */}
          <style>{`html{background-color:#fff;}html.dark{background-color:rgb(17,24,39);}`}</style>

          {/* No manifest-based CSS injection */}
        </head>
        <body
          className="antialiased"
          style={fontVariables as React.CSSProperties}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <AnimationProvider>
              <DefaultBackground />
              <div className="min-h-screen flex flex-col">
                <HeaderNavigation />
                <main className="flex-1">{children}</main>
                <FooterSection />
              </div>
              {/* TODO: se descomentará en caso de añadir analíticas */}
              {/* <CookieBanner /> */}
            </AnimationProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}

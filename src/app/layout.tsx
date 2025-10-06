import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = generateSEOMetadata({
  title: "WEBCODE - Desarrollo Web Profesional en Barcelona | Soluciones Digitales",
  description: "Desarrollo web profesional, e-commerce y aplicaciones web para freelancers, PYMEs y startups en Barcelona y España. Soluciones digitales de calidad con tecnologías de vanguardia 2025.",
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
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inicializar monitoreo de Web Vitals
  initWebVitals();

  return (
    <ViewTransitions>
      <html lang="es" suppressHydrationWarning>
        <head>
          {/* Optional: Defer non-critical CSS via preload+swap (enable with env flag) */}
          {process.env.NEXT_PUBLIC_ENABLE_CSS_SWAP === "1" && (
            <>
              {/* Main CSS chunk (update value via env if hashes change) */}
              <link
                rel="preload"
                as="style"
                href={
                  process.env.NEXT_PUBLIC_CSS_CHUNK_MAIN ||
                  "/_next/static/chunks/a3da1f76b773611a.css"
                }
              />
              <link
                rel="stylesheet"
                href={
                  process.env.NEXT_PUBLIC_CSS_CHUNK_MAIN ||
                  "/_next/static/chunks/a3da1f76b773611a.css"
                }
                media="all"
              />
              {/* Tiny aux CSS chunk */}
              <link
                rel="preload"
                as="style"
                href={
                  process.env.NEXT_PUBLIC_CSS_CHUNK_TINY ||
                  "/_next/static/chunks/2473c16c0c2f6b5f.css"
                }
              />
              <link
                rel="stylesheet"
                href={
                  process.env.NEXT_PUBLIC_CSS_CHUNK_TINY ||
                  "/_next/static/chunks/2473c16c0c2f6b5f.css"
                }
                media="all"
              />
              <noscript>
                {/* Fallback in case JS is disabled */}
                <link
                  rel="stylesheet"
                  href={
                    process.env.NEXT_PUBLIC_CSS_CHUNK_MAIN ||
                    "/_next/static/chunks/a3da1f76b773611a.css"
                  }
                />
                <link
                  rel="stylesheet"
                  href={
                    process.env.NEXT_PUBLIC_CSS_CHUNK_TINY ||
                    "/_next/static/chunks/2473c16c0c2f6b5f.css"
                  }
                />
              </noscript>
            </>
          )}
          {/* DNS Prefetch and Preconnect for better performance */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          
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
          
          {/* Structured Data */}
          <StructuredData type="Organization" />
          <StructuredData type="WebSite" />
          <StructuredData type="LocalBusiness" />
          
          {/* Inline, non-blocking theme init to avoid FOUC without network fetch */}
          <script
            dangerouslySetInnerHTML={{
              __html:
                "(function(){try{var s=localStorage.getItem('theme');var t=(s==='dark'||s==='light')?s:((window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');var d=document.documentElement;d.classList.add(t);d.style.colorScheme=t;}catch(e){}})();"
            }}
          />

          {/* CSS preload+swap injector driven by build manifest (css-chunks.json) */}
          {process.env.NEXT_PUBLIC_ENABLE_CSS_SWAP === "1" && (
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: `(() => { try { 
  const inject = (href) => {
    if (!href) return;
    const pre = document.createElement('link');
    pre.rel = 'preload'; pre.as = 'style'; pre.href = href; document.head.appendChild(pre);
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = href; l.media = 'print'; l.onload = function(){ this.media = 'all'; };
    document.head.appendChild(l);
  };
  fetch('/css-chunks.json', { cache: 'no-store' }).then(r => r.json()).then(({ css }) => {
    (css || []).forEach(inject);
  }).catch(()=>{});
} catch(_) {} })();`
                }}
              />
              <noscript>
                <link rel="stylesheet" href="/_next/static/chunks/a3da1f76b773611a.css" />
                <link rel="stylesheet" href="/_next/static/chunks/2473c16c0c2f6b5f.css" />
              </noscript>
            </>
          )}
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
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

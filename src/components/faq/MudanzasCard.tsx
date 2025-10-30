"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function MudanzasCard() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <article 
      className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-start bg-background/50 border border-border/30 rounded-lg p-4"
      style={{ boxShadow: 'var(--shadow-3d-sm)' }}
    >
      {/* visual */}
      <div className="col-span-1 rounded-md overflow-hidden bg-muted flex items-center justify-center">
        {/* Inline placeholder 'screenshot' */}
        <picture className="w-full h-40 block">
          <source
            type="image/webp"
            srcSet="/images/mudanzasandy-preview-480.webp 480w, /images/mudanzasandy-preview-800.webp 800w, /images/mudanzasandy-preview-1200.webp 1200w"
            sizes="(max-width: 640px) 480px, (max-width: 1024px) 800px, 1200px"
          />
          <img
            src="/images/mudanzasandy-preview-480.png"
            srcSet="/images/mudanzasandy-preview-480.png 480w, /images/mudanzasandy-preview-800.png 800w, /images/mudanzasandy-preview-1200.png 1200w"
            sizes="(max-width: 640px) 480px, (max-width: 1024px) 800px, 1200px"
            alt="Vista previa de mudanzasandy.es"
            width={400}
            height={240}
            loading="lazy"
            decoding="async"
            className="w-full h-40 object-cover block"
          />
        </picture>
      </div>

      {/* content */}
      <div className="col-span-2">
        <h3 className="text-lg font-semibold">mudanzasandy.es</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Sitio público desarrollado con <strong>Astro</strong> y{" "}
          <strong>TypeScript</strong> optimizado para rapidez y buena
          experiencia en móviles.
        </p>

        <ul className="mt-3 ml-5 list-disc text-sm text-muted-foreground">
          <li>Enfoque performance-first y coste contenido</li>
          <li>Diseño responsive y accesible</li>
          <li>Integraciones sencillas para formularios y contactos</li>
        </ul>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="https://mudanzasandy.es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-80 transition-all duration-200"
          >
            Ver demo
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-border rounded-lg text-sm hover:opacity-80 hover:bg-accent transition-all duration-200"
          >
            Previsualizar
          </button>

          <Link
            href="/contacto"
            className="inline-flex items-center px-4 py-2 border border-border rounded-lg text-sm hover:opacity-80 hover:bg-accent transition-all duration-200"
          >
            Solicitar case study
          </Link>
        </div>
      </div>

      {/* modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          <div className="relative max-w-3xl w-full mx-4 md:mx-0">
            <div className="bg-white dark:bg-[#0b1220] rounded-lg overflow-hidden shadow-xl transform transition-all scale-100">
              <div className="p-4">
                <div className="w-full h-72 bg-muted rounded-md flex items-center justify-center">
                  <picture className="w-full h-full block">
                    <source
                      type="image/webp"
                      srcSet="/images/mudanzasandy-preview-480.webp 480w, /images/mudanzasandy-preview-800.webp 800w, /images/mudanzasandy-preview-1200.webp 1200w"
                      sizes="(max-width: 640px) 480px, (max-width: 1024px) 800px, 1200px"
                    />
                    <img
                      src="/images/mudanzasandy-preview-1200.png"
                      srcSet="/images/mudanzasandy-preview-480.png 480w, /images/mudanzasandy-preview-800.png 800w, /images/mudanzasandy-preview-1200.png 1200w"
                      sizes="(max-width: 640px) 480px, (max-width: 1024px) 800px, 1200px"
                      alt="Previsualización ampliada de mudanzasandy.es"
                      width={800}
                      height={480}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-contain block"
                    />
                  </picture>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <a
                    href="https://mudanzasandy.es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-80 transition-all duration-200"
                  >
                    Abrir demo
                  </a>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center px-4 py-2 border border-border rounded-lg text-sm hover:opacity-80 hover:bg-accent transition-all duration-200"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

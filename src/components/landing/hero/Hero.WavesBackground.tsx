/**
 * Waves Background Component
 *
 * Componente que renderiza un fondo con olas animadas SVG
 * que se extienden hasta el final de la sección.
 */
export function WavesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute bottom-0 left-0 w-[200%] h-full"
        viewBox="0 0 2400 200"
        preserveAspectRatio="none"
      >
        {/* Ola principal más grande */}
        <path
          d="M0,100 C300,150 900,50 1200,100 C1500,150 2100,50 2400,100 L2400,200 L0,200 Z"
          fill="oklch(0.703 0.135 328.5 / 0.05)" // Rosa principal con 5% de opacidad
          className="animate-wave-slow"
        />
        {/* Ola media */}
        <path
          d="M0,120 C300,70 900,130 1200,80 C1500,30 2100,130 2400,80 L2400,200 L0,200 Z"
          fill="oklch(0.873 0.058 184.1 / 0.05)" // Aguamarina con 5% de opacidad
          className="animate-wave-fast"
        />
        {/* Ola superior más pequeña */}
        <path
          d="M0,140 C300,90 900,110 1200,60 C1500,10 2100,110 2400,60 L2400,200 L0,200 Z"
          fill="oklch(0.703 0.135 328.5 / 0.03)" // Rosa principal con 3% de opacidad
          className="animate-wave-medium"
        />
      </svg>
    </div>
  );
}

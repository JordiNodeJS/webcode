/**
 * Contenido principal de la Hero Section
 *
 * Server Component que renderiza el headline principal y subheadline
 * con la propuesta de valor de WebSnack.
 */
export function HeroContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Headline Principal */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
        <span className="text-gradient-websnack">Transformamos tus ideas</span>
        <br />
        <span className="text-foreground">en experiencias</span>
        <br />
        <span className="text-gradient-websnack">digitales excepcionales</span>
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        Desarrollo web moderno con{" "}
        <span className="text-primary font-semibold">Next.js 15</span> y{" "}
        <span className="text-primary font-semibold">React 19</span> para{" "}
        <span className="text-secondary-foreground font-semibold">
          freelancers, pequeñas empresas y startups
        </span>{" "}
        en Barcelona y España
      </p>

      {/* Badge de tecnología - contraste aumentado para mejorar legibilidad */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {/* Aumentar opacidad de fondo y añadir ring sutil para mejor contraste */}
        <span className="inline-flex items-center px-4 py-2 bg-primary/30 text-primary-foreground rounded-full text-sm font-medium shadow-3d-sm ring-1 ring-primary/30">
          🚀 Next.js 15
        </span>
        <span className="inline-flex items-center px-4 py-2 bg-secondary/30 text-secondary-foreground rounded-full text-sm font-medium shadow-3d-sm ring-1 ring-secondary/30">
          ⚡ React 19
        </span>
        <span className="inline-flex items-center px-4 py-2 bg-accent/80 text-accent-foreground rounded-full text-sm font-medium shadow-3d-sm ring-1 ring-accent/30">
          📱 Barcelona Local
        </span>
      </div>
    </div>
  );
}

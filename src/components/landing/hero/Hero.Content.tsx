import { WSFadeIn } from "@/components/animations/ws-fade-in";
import { WSLetterReveal } from "@/components/animations/ws-letter-reveal";
import { cn } from "@/lib/utils";
import {
  headingVariants,
  paragraphVariants,
  badgeVariants,
  containerVariants
} from "@/lib/variants";

/**
 * Contenido principal de la Hero Section
 *
 * Server Component que renderiza el headline principal y subheadline
 * con la propuesta de valor de WebCode.
 */
export function HeroContent() {
  return (
    <div className={cn(containerVariants({ size: "lg" }), "space-y-8")}>
      {/* Headline Principal */}
      <WSFadeIn delay={0.2}>
        <h1 className={headingVariants({ size: "h1" })}>
          <WSLetterReveal
            text="Transformamos tus ideas"
            className="text-gradient-webcode"
          />
          <br />
          <span className="text-foreground">en experiencias</span>
          <br />
          <WSLetterReveal
            text="digitales excepcionales"
            className="text-gradient-webcode"
          />
        </h1>
      </WSFadeIn>

      {/* Subheadline */}
      <WSFadeIn delay={0.4}>
        <p
          className={cn(
            paragraphVariants({
              size: "lg",
              color: "muted",
              maxWidth: "3xl"
            }),
            "mx-auto"
          )}
        >
          Desarrollo web moderno con{" "}
          <span className="text-primary font-semibold">Next.js 15</span> y{" "}
          <span className="text-primary font-semibold">React 19</span> para{" "}
          <span className="text-secondary-foreground font-semibold">
            freelancers, pequeñas empresas y startups
          </span>{" "}
          en Barcelona y España
        </p>
      </WSFadeIn>

      {/* Badge de tecnología */}
      <WSFadeIn delay={0.6}>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <span className={badgeVariants({ variant: "primary" })}>
            🚀 Next.js 15
          </span>
          <span className={badgeVariants({ variant: "secondary" })}>
            ⚡ React 19
          </span>
          <span className={badgeVariants({ variant: "accent" })}>
            📱 Barcelona Local
          </span>
        </div>
      </WSFadeIn>
    </div>
  );
}

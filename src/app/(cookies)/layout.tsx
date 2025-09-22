import { WavesBackground } from "@/components/landing/hero";
import { BackButton } from "@/components/ui/BackButton";

export const metadata = {
  title: "Políticas - WEBCODE",
  description: "Páginas de políticas y cookies - no indexar en buscadores",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden">
      {/* Waves background pinned to the top and inverted so the wave crest is at the top */}
      <div className="absolute top-0 left-0 right-0 -z-10 h-[300px] md:h-[400px] lg:h-[500px] pointer-events-none overflow-hidden">
        <div className="w-full h-full scale-y-[-1]">
          <WavesBackground />
        </div>
      </div>
      <div className="container mx-auto max-w-4xl">
        <div className="mt-24">
          <BackButton fallbackHref="/" />
        </div>
      </div>

      <main className="flex-1">{children}</main>
    </div>
  );
}

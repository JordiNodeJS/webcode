import { ContentPage } from "@/components/layout";

export const metadata = {
  title: "Sobre Nosotros - WEBCODE",
  description: "Conoce al equipo y la misión de WEBCODE."
};

export default function AboutPage() {
  return (
    <ContentPage containerClassName="pb-12">
      <h1 className="text-3xl font-bold mb-6">Sobre Nosotros</h1>
      <p className="text-muted-foreground">
        Esta es una página de placeholder para &quot;Sobre Nosotros&quot;. Aquí
        podrás añadir la historia del equipo, valores y formas de colaboración.
      </p>
    </ContentPage>
  );
}

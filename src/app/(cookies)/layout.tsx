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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="mt-24">
          <BackButton fallbackHref="/" />
        </div>
      </div>

      <main className="flex-1">{children}</main>
    </div>
  );
}

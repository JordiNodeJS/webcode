import { PerformanceTestLab } from "@/components/debug/PerformanceTestLab";

export default function PerformanceTestPage() {
  return (
    <main className="min-h-screen bg-background">
      <PerformanceTestLab />
    </main>
  );
}

export const metadata = {
  title: "Performance Test Lab - WebCode",
  description:
    "Herramienta de análisis de rendimiento para componentes de tarjetas",
  robots: { index: false, follow: false } // No indexar esta página de desarrollo
};

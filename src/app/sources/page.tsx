import type { Metadata } from 'next'
import SourcesPageClient from '@/components/sources/SourcesPageClient'

export const metadata: Metadata = {
  title: 'Fuentes y Estadísticas | WebCode - Datos Verificables',
  description: 'Fuentes oficiales y estadísticas verificables sobre gestión de proyectos y requisitos. Datos del Project Management Institute (PMI) y estudios complementarios.',
  keywords: ['fuentes', 'estadísticas', 'PMI', 'gestión proyectos', 'requisitos', 'verificable'],
  openGraph: {
    title: 'Fuentes y Estadísticas | WebCode',
    description: 'Fuentes oficiales y estadísticas verificables sobre gestión de proyectos y requisitos.',
  },
}

export default function SourcesPage() {
  return <SourcesPageClient />
}

import type { Metadata } from "next";
import DocumentationSourcesPageClient from "@/components/sources/DocumentationSourcesPageClient";

export const metadata: Metadata = {
  title: "Sources and Statistics | WebCode - Verifiable Data",
  description:
    "Official sources and verifiable statistics about project management and requirements. Data from Project Management Institute (PMI) and complementary studies.",
  keywords: [
    "sources",
    "statistics",
    "PMI",
    "project management",
    "requirements",
    "verifiable"
  ],
  openGraph: {
    title: "Sources and Statistics | WebCode",
    description:
      "Official sources and verifiable statistics about project management and requirements."
  }
};

export default function DocumentationSourcesPage() {
  return <DocumentationSourcesPageClient />;
}

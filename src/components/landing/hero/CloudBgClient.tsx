"use client";

import dynamic from "next/dynamic";

const CloudLightningBackground = dynamic(
  () =>
    import("@/components/landing/hero").then((m) => m.CloudLightningBackground),
  { ssr: false, loading: () => null },
);

export function CloudBgClient() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      <CloudLightningBackground />
    </div>
  );
}

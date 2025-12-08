"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Particles } from "@/components/magicui/particles";

export function NetworkBackground() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }
  }, [resolvedTheme, mounted]);

  return (
    <Particles
      className="absolute inset-0"
      quantity={100}
      ease={80}
      color={color}
      refresh
    />
  );
}

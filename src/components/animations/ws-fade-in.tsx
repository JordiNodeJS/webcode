"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useAnimationContext } from "@/contexts/AnimationContext";
import { wsConfig } from "@/lib/webcode-motion-config";

interface WSFadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  className?: string;
  sectionId?: string;
}

export function WSFadeIn({
  children,
  delay = 0,
  direction = "up",
  distance = 20,
  className = "",
  sectionId = ""
}: WSFadeInProps) {
  // Temporalmente deshabilitar animaciones para evitar problemas de hidratación
  // Las animaciones de fondo funcionarán a través de CSS puro
  return <div className={className}>{children}</div>;
}

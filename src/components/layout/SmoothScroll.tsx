"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

/**
 * Weiches Scrollen mit Lenis. Wer im Betriebssystem "Bewegung reduzieren"
 * eingestellt hat, bekommt das normale Scrollen des Browsers.
 * Touch-Geräte scrollen grundsätzlich nativ.
 */
export function SmoothScroll() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.115,
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: false,
        anchors: false,
      }}
    />
  );
}

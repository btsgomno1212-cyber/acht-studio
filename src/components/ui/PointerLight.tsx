"use client";

import { useEffect } from "react";

/**
 * Setzt auf Flächen mit `data-lit` die Position des Zeigers als CSS-Variablen
 * (--mx / --my). Die Optik dazu steht in globals.css. Ein einziger Listener
 * für die ganze Seite, gedrosselt auf einen Durchlauf pro Bild.
 */
export function PointerLight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    let frame = 0;
    let lastEvent: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      const event = lastEvent;
      if (!event || !(event.target instanceof Element)) return;
      const surface = event.target.closest<HTMLElement>("[data-lit]");
      if (!surface) return;
      const rect = surface.getBoundingClientRect();
      surface.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      surface.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    const onMove = (event: PointerEvent) => {
      lastEvent = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

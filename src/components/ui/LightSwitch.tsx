"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ElementType,
} from "react";

type LightSwitchProps = Omit<ComponentProps<"div">, "ref"> & {
  /**
   * "focus": leuchtet, solange die Fläche im mittleren Bereich des Bildschirms
   *          steht – außerdem bei Hover und Tastaturfokus. Am Rand des
   *          Bildschirms fällt sie in den Bauplan-Zustand zurück.
   * "view":  leuchtet einmalig auf, sobald die Fläche ins Bild scrollt.
   */
  mode?: "focus" | "view";
  as?: ElementType;
};

/**
 * Schaltet für alles darin "das Licht an": setzt data-active="true" und damit
 * die Tailwind-Variante `lit:` (siehe globals.css). Illustrationen wechseln
 * so vom Bauplan zum fertigen Zustand.
 */
export function LightSwitch({
  mode = "focus",
  as: Tag = "div",
  children,
  ...rest
}: LightSwitchProps) {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (mode === "view") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.35 },
      );
      observer.observe(element);
      return () => observer.disconnect();
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "-30% 0px -30% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [mode]);

  const active = mode === "view" ? inView : hovered || focused || inView;

  return (
    <Tag
      ref={ref}
      data-active={active ? "true" : "false"}
      {...(mode === "focus"
        ? {
            onPointerEnter: (event: React.PointerEvent) => {
              if (event.pointerType !== "touch") setHovered(true);
            },
            onPointerLeave: () => setHovered(false),
            onFocus: () => setFocused(true),
            onBlur: () => setFocused(false),
          }
        : null)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

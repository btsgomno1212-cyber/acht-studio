"use client";

import { m, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type Step = { title: string; text: string };

/**
 * Ablauf als Zeitleiste. Die Neonlinie wächst mit dem Scrollen von Schritt
 * zu Schritt; erreichte Schritte füllen sich. Breite Bildschirme zeigen die
 * Schritte nebeneinander, schmale untereinander.
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  /** Abstand jedes Schritts vom ersten, als Anteil der Linienlänge (0 … 1). */
  const marks = useRef<number[]>([]);
  const [line, setLine] = useState(0);
  const [reached, setReached] = useState(1);

  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start 0.8", "end 0.55"],
  });

  // Positionen der Schritte ausmessen – sie hängen von Layout und Textlänge ab.
  useEffect(() => {
    const element = list.current;
    if (!element) return;

    const measure = () => {
      const items = Array.from(element.children) as HTMLElement[];
      if (items.length < 2) return;
      const horizontal = items[1].offsetTop === items[0].offsetTop;
      const offsets = items.map((item) =>
        horizontal ? item.offsetLeft : item.offsetTop,
      );
      const length = offsets[offsets.length - 1] - offsets[0];
      marks.current = offsets.map((offset) =>
        length > 0 ? (offset - offsets[0]) / length : 0,
      );
      setLine(length);
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const count = marks.current.filter(
      (mark) => progress >= mark - 0.01,
    ).length;
    setReached(Math.max(1, count));
  });

  return (
    <div
      ref={root}
      className="relative mt-14 lg:mt-24"
      style={{ "--line": `${line}px` } as CSSProperties}
    >
      {/* Linie: grau als Spur, Neon als Fortschritt */}
      <div
        aria-hidden="true"
        className="absolute top-[0.4375rem] bg-line max-lg:left-[0.4375rem] max-lg:h-[var(--line)] max-lg:w-px lg:left-0 lg:h-px lg:w-[var(--line)]"
      >
        <m.div
          className="absolute inset-0 bg-neon max-lg:origin-top max-lg:[transform:scaleY(var(--progress,0))] lg:origin-left lg:[transform:scaleX(var(--progress,0))]"
          style={{ "--progress": scrollYProgress } as CSSProperties}
        />
      </div>

      <ol
        ref={list}
        className="relative grid gap-y-12 lg:grid-cols-5 lg:gap-x-8"
      >
        {steps.map((step, index) => {
          const done = index < reached;
          return (
            <li
              key={step.title}
              data-reached={done}
              className="group relative max-lg:pl-11 lg:pt-12 lg:pr-2"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 size-[0.9375rem] rounded-full border border-line-strong bg-ink transition-colors duration-500 ease-expo group-data-[reached=true]:border-neon group-data-[reached=true]:bg-neon"
              />
              <span
                aria-hidden="true"
                className="display numeral-outline block text-[clamp(4.5rem,7.4vw,7.5rem)] leading-[0.78] group-data-[reached=true]:text-paper group-data-[reached=true]:[-webkit-text-stroke-color:var(--color-paper)] max-lg:-mt-1"
              >
                {index + 1}
              </span>
              <h3 className="mt-5 text-[1.25rem] leading-tight font-medium">
                {step.title}
              </h3>
              <p className="mt-2.5 max-w-[34ch] text-[0.9375rem] text-mute">
                {step.text}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

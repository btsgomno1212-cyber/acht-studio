"use client";

import { m } from "motion/react";
import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Verzögerung in Sekunden, z. B. für gestaffelte Kacheln */
  delay?: number;
  /** Startversatz in Pixeln */
  y?: number;
};

/** Blendet einen Block einmalig ein, sobald er ins Bild scrollt. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
}: RevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

type RevealTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

/**
 * Überschriften: Jedes Wort fährt hinter einer Maske nach oben ein.
 * Der Text bleibt normaler, umbrechender Fließtext – wichtig für lange
 * deutsche Wörter und für Screenreader.
 */
export function RevealText({ text, className, delay = 0 }: RevealTextProps) {
  const words = text.split(" ");

  return (
    <m.span
      className={cn("block", className)}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="-mt-[0.14em] -mb-[0.1em] inline-block overflow-clip pt-[0.14em] pb-[0.1em] align-bottom">
            <m.span
              data-reveal
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: "108%" },
                shown: { y: "0%", transition: { duration: 0.95, ease: EASE } },
              }}
            >
              {word}
            </m.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </m.span>
  );
}

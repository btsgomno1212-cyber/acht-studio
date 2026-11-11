import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Bausteine für die Illustrationen.
 *
 * Jede Illustration hat zwei Zustände: Bauplan (gestrichelte Umrisse) und
 * fertig. Umgeschaltet wird über data-active="true" an einem Vorfahren –
 * siehe Variante `lit:` in globals.css. Alle Maße sind in cqw angegeben,
 * also relativ zur Breite des umgebenden Containers (@container).
 */

type SlotProps = {
  className?: string;
  children?: ReactNode;
  /** Verzögerung des fertigen Zustands in Millisekunden */
  delay?: number;
  /** Platzhalter für ein Bild: Umriss mit Diagonalen */
  image?: boolean;
  style?: CSSProperties;
};

const CROSS =
  "bg-[linear-gradient(to_top_right,transparent_calc(50%-0.5px),rgb(255_255_255/0.28)_calc(50%-0.5px),rgb(255_255_255/0.28)_calc(50%+0.5px),transparent_calc(50%+0.5px)),linear-gradient(to_bottom_right,transparent_calc(50%-0.5px),rgb(255_255_255/0.28)_calc(50%-0.5px),rgb(255_255_255/0.28)_calc(50%+0.5px),transparent_calc(50%+0.5px))]";

/** Ein Element der Illustration: erst Umriss, dann Inhalt. */
export function Slot({
  className,
  children,
  delay = 0,
  image,
  style,
}: SlotProps) {
  return (
    <div className={cn("relative", className)} style={style}>
      <div
        className={cn(
          "absolute inset-0 rounded-[inherit] border border-dashed border-white/35 transition-opacity duration-500 lit:opacity-0",
          image && CROSS,
        )}
        style={{ transitionDelay: `${delay}ms` }}
      />
      <div
        className="h-full rounded-[inherit] opacity-0 transition-opacity duration-700 ease-expo lit:opacity-100"
        style={{ transitionDelay: `${delay + 60}ms` }}
      >
        {children}
      </div>
    </div>
  );
}

/** Rahmen eines Browserfensters. `tone` bestimmt die Farbe im fertigen Zustand. */
export function BrowserFrame({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark" | "warm";
}) {
  const tones = {
    light: "lit:bg-[#ecebe6]",
    dark: "lit:bg-[#141414]",
    warm: "lit:bg-[#1d1512]",
  } as const;
  const onLight = tone === "light";

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-t-[2cqw] border border-b-0 border-white/25 bg-ink transition-[background-color,border-color] duration-700 ease-expo lit:border-white/0",
        tones[tone],
        className,
      )}
    >
      <div
        className={cn(
          "flex h-[5.2cqw] items-center gap-[1.1cqw] border-b border-white/15 px-[2.4cqw] transition-colors duration-700",
          onLight ? "lit:border-black/10" : "lit:border-white/10",
        )}
      >
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className={cn(
              "size-[1.5cqw] rounded-full border border-white/35 transition-colors duration-700 lit:border-white/0",
              onLight ? "lit:bg-black/20" : "lit:bg-white/25",
            )}
          />
        ))}
        <span
          className={cn(
            "ml-[2cqw] h-[2.4cqw] w-[34cqw] rounded-full border border-white/20 transition-colors duration-700 lit:border-white/0",
            onLight ? "lit:bg-black/[0.07]" : "lit:bg-white/[0.08]",
          )}
        />
      </div>
      {children}
    </div>
  );
}

/** Rahmen eines Smartphones. */
export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19] overflow-hidden rounded-[13%/6.2%] border border-white/30 bg-ink transition-[background-color,border-color,box-shadow] duration-700 ease-expo lit:border-white/15 lit:bg-[#0c0c0c] lit:shadow-[0_0_0_0.5cqw_#1b1b1b]",
        className,
      )}
    >
      <span className="absolute top-[2.2%] left-1/2 z-10 h-[2.6%] w-[30%] -translate-x-1/2 rounded-full border border-white/30 transition-colors duration-700 lit:border-white/0 lit:bg-black" />
      {children}
    </div>
  );
}

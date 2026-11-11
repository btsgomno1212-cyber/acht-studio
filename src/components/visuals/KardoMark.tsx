import { cn } from "@/lib/cn";

/**
 * Konzept "Rösterei Kardo": Bildmarke, ein K aus einem Stamm und zwei
 * Viertelkreisen. Im Bauplan-Zustand sind die Konstruktionslinien sichtbar.
 *
 * `construction={false}` zeigt nur die fertige Marke (in `currentColor`).
 */
export function KardoMark({
  className,
  construction = true,
}: {
  className?: string;
  construction?: boolean;
}) {
  if (!construction) {
    return (
      <svg viewBox="52 32 100 136" aria-hidden="true" className={className}>
        <path d="M60 40H84V160H60Z" fill="currentColor" />
        <path d="M84 40H144A60 60 0 0 1 84 100Z" fill="currentColor" />
        <path d="M84 160V100A60 60 0 0 1 144 160Z" fill="currentColor" />
      </svg>
    );
  }

  const guide =
    "fill-none stroke-white/30 transition-opacity duration-700 ease-expo lit:opacity-0";
  const shape =
    "fill-white/0 stroke-white/80 transition-[fill,stroke] duration-700 ease-expo lit:fill-[#efe4d2] lit:stroke-white/0";

  return (
    <svg
      viewBox="0 0 204 200"
      aria-hidden="true"
      className={cn("overflow-visible", className)}
    >
      {/* Raster und Hilfslinien */}
      <g className={guide} strokeWidth="0.5">
        {Array.from({ length: 9 }, (_, index) => (
          <line
            key={`v${index}`}
            x1={36 + index * 12 * 1.5}
            y1="8"
            x2={36 + index * 12 * 1.5}
            y2="192"
            strokeOpacity="0.45"
          />
        ))}
        {Array.from({ length: 11 }, (_, index) => (
          <line
            key={`h${index}`}
            x1="20"
            y1={10 + index * 18}
            x2="184"
            y2={10 + index * 18}
            strokeOpacity="0.45"
          />
        ))}
      </g>
      <g className={guide} strokeWidth="0.8" strokeDasharray="3 3">
        <circle cx="84" cy="40" r="60" />
        <circle cx="84" cy="160" r="60" />
        <rect x="60" y="40" width="84" height="120" />
        <line x1="20" y1="100" x2="184" y2="100" />
        <line x1="84" y1="8" x2="84" y2="192" />
      </g>
      <g className={guide} strokeWidth="1">
        <path d="M80 40h8M84 36v8M80 160h8M84 156v8M140 100h8M144 96v8" />
      </g>

      {/* Marke */}
      <g strokeWidth="1.2" strokeLinejoin="round">
        <path d="M60 40H84V160H60Z" className={shape} />
        <path
          d="M84 40H144A60 60 0 0 1 84 100Z"
          className={shape}
          style={{ transitionDelay: "90ms" }}
        />
        <path
          d="M84 160V100A60 60 0 0 1 144 160Z"
          className={shape}
          style={{ transitionDelay: "180ms" }}
        />
      </g>
    </svg>
  );
}

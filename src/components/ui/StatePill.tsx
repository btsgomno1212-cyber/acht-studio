import { cn } from "@/lib/cn";

/**
 * Kleine Glasmarke über einer Illustration: zeigt, welcher Zustand gerade zu
 * sehen ist (z. B. "Drahtgitter" oder "Render"). Folgt der Variante `lit:`.
 */
export function StatePill({
  from,
  to,
  className,
}: {
  from: string;
  to: string;
  className?: string;
}) {
  return (
    <p
      aria-hidden="true"
      className={cn(
        "glass pointer-events-none z-10 flex items-center gap-2.5 rounded-full px-3.5 py-2 text-[0.8125rem] leading-none",
        className,
      )}
    >
      <span className="text-paper transition-colors duration-500 lit:text-faint">
        {from}
      </span>
      <span className="h-3 w-px bg-line-strong" />
      <span className="text-faint transition-colors duration-500 lit:text-paper">
        {to}
      </span>
      <span className="size-1.5 rounded-full bg-graphite-3 transition-colors duration-500 lit:bg-neon" />
    </p>
  );
}

/** Schlichte Glasmarke mit einem Wort, z. B. "Konzeptprojekt". */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "glass pointer-events-none z-10 rounded-full px-3.5 py-2 text-[0.8125rem] leading-none text-paper",
        className,
      )}
    >
      {children}
    </span>
  );
}

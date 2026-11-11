import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Bildmarke: eine Acht aus einem Ring (Drahtgitter) und einer Scheibe
 * (fertige Fläche). Austauschbar – eigene SVG-Datei hier einsetzen.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 30"
      aria-hidden="true"
      className={cn("h-[1.15em] w-auto", className)}
    >
      <circle
        cx="10"
        cy="7.4"
        r="5.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <circle cx="10" cy="21.2" r="8.4" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="display text-[1.5rem] leading-none tracking-[0.02em]">
        {siteConfig.name}
      </span>
    </span>
  );
}

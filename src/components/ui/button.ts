import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none transition-[background-color,border-color,color,transform] duration-300 ease-expo active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Weiß ist die Standard-Aktion. Bei Hover geht das Licht an.
  primary: "bg-paper text-ink hover:bg-neon",
  secondary:
    "border border-line-strong text-paper hover:border-paper hover:bg-paper/[0.06]",
  ghost: "text-paper hover:bg-paper/[0.08]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.9375rem]",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-7 text-[1.0625rem]",
};

/** Klassen für Schaltflächen und Links im Schaltflächen-Look. */
export function buttonClass(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className);
}

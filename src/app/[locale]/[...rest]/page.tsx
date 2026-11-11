import { notFound } from "next/navigation";

/**
 * Fängt alle unbekannten Adressen unterhalb einer Sprache ab (z. B. /de/xyz)
 * und zeigt dafür die 404-Seite im Layout der Website.
 */
export const instant = false;

export default function CatchAll() {
  notFound();
}

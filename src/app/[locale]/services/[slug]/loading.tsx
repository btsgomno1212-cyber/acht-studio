/**
 * Platzhalter, während eine Leistungsseite lädt. Zeichnet den Kopf der Seite
 * als Umriss vor – passend zum Bauplan-Zustand der Illustrationen.
 */
export default function Loading() {
  return (
    <div className="shell pt-32 pb-40 sm:pt-40" role="status">
      <span className="sr-only">Lädt … / Loading …</span>
      <div aria-hidden="true">
        <div className="h-5 w-36 rounded-full border border-dashed border-white/25" />
        <div className="mt-8 h-[clamp(3rem,1.9rem+5.2vw,7.5rem)] w-[min(100%,40rem)] rounded-2xl border border-dashed border-white/25" />
        <div className="mt-12 h-[clamp(17rem,54vw,40rem)] animate-pulse rounded-panel border border-line bg-coal lg:mt-16" />
      </div>
    </div>
  );
}

/**
 * Standbild der Hero-Szene. Erscheint nur, wenn der Browser kein WebGL
 * unterstützt oder die 3D-Szene nicht starten kann.
 */
export function HeroPoster() {
  return (
    <div className="absolute inset-0 flex items-start justify-center lg:items-center lg:justify-end">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-poster.webp"
        alt=""
        width={1200}
        height={1200}
        decoding="async"
        className="mt-[9svh] w-[min(90vw,42svh)] lg:mt-0 lg:mr-[3vw] lg:w-[min(50vw,82svh)]"
      />
    </div>
  );
}

import { KardoMark } from "./KardoMark";
import { Slot } from "./primitives";

/*
 * Markenauftritte der Konzeptprojekte "Rösterei Kardo" und "Studio Vela".
 * Maße in cqmin: Die Kompositionen bleiben in jeder Kachelform mittig und
 * vollständig sichtbar. Die umgebende Kachel muss `container-type: size` haben.
 */

export type KardoLabels = { product: string; origin: string; weight: string };

const KARDO_PALETTE = ["#efe4d2", "#d4582a", "#6b4a35", "#2a1a12"];

/** Konzept "Rösterei Kardo": Kaffeetüte, Becher und Farbpalette. */
export function KardoBrand({ labels }: { labels: KardoLabels }) {
  return (
    <div className="absolute inset-0 grid place-items-center overflow-hidden transition-colors duration-700 ease-expo lit:bg-[#2a1a12]">
      <div className="absolute inset-0 bg-[radial-gradient(70cqmin_circle_at_28%_18%,rgb(255_196_130/0.24),transparent)] opacity-0 transition-opacity duration-1000 ease-expo lit:opacity-100" />

      <div className="relative flex items-end gap-[5cqmin] pb-[3cqmin]">
        {/* Tüte */}
        <Slot className="h-[60cqmin] w-[39cqmin] rounded-[1.6cqmin]">
          <div className="relative flex h-full flex-col items-center rounded-[1.6cqmin] bg-[linear-gradient(100deg,#dccdb4,#f4ead9_28%,#efe4d2_72%,#d3c3a8)] px-[3.6cqmin] pt-[10.5cqmin] shadow-[0_4cqmin_8cqmin_rgb(0_0_0/0.5)]">
            <div className="absolute inset-x-0 top-0 h-[5.4cqmin] rounded-t-[1.6cqmin] border-b border-[#2a1a12]/20 bg-[#2a1a12]/[0.08]" />
            <KardoMark
              construction={false}
              className="h-[16cqmin] w-auto text-[#2a1a12]"
            />
            <span className="display mt-[3.4cqmin] block text-[7.2cqmin] leading-none tracking-[0.16em] text-[#2a1a12]">
              KARDO
            </span>
            <span className="mt-[1.8cqmin] block text-[2.5cqmin] leading-none whitespace-nowrap text-[#2a1a12]/70">
              {labels.product}
            </span>
            <span className="mt-auto mb-[4.2cqmin] flex w-full items-center justify-between rounded-[0.8cqmin] bg-[#d4582a] px-[2.2cqmin] py-[1.7cqmin] text-[2.3cqmin] leading-none whitespace-nowrap text-[#fff3e4]">
              <span>{labels.origin}</span>
              <span>{labels.weight}</span>
            </span>
          </div>
        </Slot>

        {/* Becher */}
        <Slot
          delay={140}
          className="h-[30cqmin] w-[21cqmin] rounded-[1.4cqmin]"
        >
          <div className="flex h-full flex-col items-center">
            <span className="block h-[3.4cqmin] w-full rounded-[1.4cqmin] bg-[#1c110b]" />
            <span className="grid w-[92%] flex-1 place-items-center bg-[linear-gradient(100deg,#b84620,#e0632f_35%,#d4582a_70%,#a93e1b)] [clip-path:polygon(0_0,100%_0,86%_100%,14%_100%)]">
              <KardoMark
                construction={false}
                className="h-[9.5cqmin] w-auto text-[#efe4d2]"
              />
            </span>
          </div>
        </Slot>
      </div>

      {/* Farbpalette */}
      <div className="absolute bottom-[5cqmin] left-[5cqmin] flex gap-[1.4cqmin]">
        {KARDO_PALETTE.map((color, index) => (
          <Slot
            key={color}
            delay={260 + index * 50}
            className="size-[4.6cqmin] rounded-full"
          >
            <span
              className="block size-full rounded-full ring-1 ring-white/15"
              style={{ backgroundColor: color }}
            />
          </Slot>
        ))}
      </div>
    </div>
  );
}

export type VelaLabels = { tagline: string; schedule: string };

/** Bildmarke "Vela": zwei Blätter, die sich zu einem V schließen. */
function VelaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 44" aria-hidden="true" className={className}>
      <path d="M2 2C2 26 16 42 40 42C40 20 26 4 2 2Z" fill="currentColor" />
      <path d="M78 2C78 26 64 42 40 42C40 20 54 4 78 2Z" fill="currentColor" />
    </svg>
  );
}

/** Konzept "Studio Vela": Logo und Visitenkarten für ein Yogastudio. */
export function VelaBrand({ labels }: { labels: VelaLabels }) {
  return (
    <div className="absolute inset-0 grid place-items-center overflow-hidden transition-colors duration-700 ease-expo lit:bg-[#d9dfcf]">
      <div className="absolute inset-0 bg-[radial-gradient(80cqmin_circle_at_75%_10%,rgb(255_255_255/0.55),transparent)] opacity-0 transition-opacity duration-1000 ease-expo lit:opacity-100" />

      <div className="relative h-[70cqmin] w-[84cqmin]">
        {/* Rückseite */}
        <Slot className="absolute top-[36%] left-[2%] h-[37cqmin] w-[60cqmin] -rotate-[9deg] rounded-[1.4cqmin]">
          <div className="flex h-full flex-col justify-between rounded-[1.4cqmin] bg-[#f6f2e8] p-[4.4cqmin] shadow-[0_3cqmin_7cqmin_rgb(40_60_40/0.28)]">
            <VelaMark className="h-[5cqmin] w-auto self-start text-[#2f4a3c]" />
            <div>
              <span className="block text-[3cqmin] leading-none font-medium text-[#2f4a3c]">
                {labels.schedule}
              </span>
              <span className="mt-[2.4cqmin] block h-[0.9cqmin] w-[34cqmin] rounded-full bg-[#2f4a3c]/25" />
              <span className="mt-[1.5cqmin] block h-[0.9cqmin] w-[26cqmin] rounded-full bg-[#2f4a3c]/25" />
              <span className="mt-[1.5cqmin] block h-[0.9cqmin] w-[30cqmin] rounded-full bg-[#2f4a3c]/25" />
            </div>
          </div>
        </Slot>

        {/* Vorderseite */}
        <Slot
          delay={140}
          className="absolute top-[4%] right-[2%] h-[37cqmin] w-[60cqmin] rotate-[5deg] rounded-[1.4cqmin]"
        >
          <div className="flex h-full flex-col items-center justify-center rounded-[1.4cqmin] bg-[linear-gradient(135deg,#3a5a49,#294235)] shadow-[0_4cqmin_9cqmin_rgb(30_50_35/0.4)]">
            <VelaMark className="h-[10cqmin] w-auto text-[#eef0e4]" />
            <span className="mt-[3.2cqmin] block pl-[0.42em] text-[5.2cqmin] leading-none font-light tracking-[0.42em] text-[#eef0e4]">
              vela
            </span>
            <span className="mt-[2.4cqmin] block text-[2.3cqmin] leading-none whitespace-nowrap text-[#eef0e4]/60">
              {labels.tagline}
            </span>
          </div>
        </Slot>
      </div>
    </div>
  );
}

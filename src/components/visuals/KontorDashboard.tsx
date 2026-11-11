import { cn } from "@/lib/cn";
import { BrowserFrame, Slot } from "./primitives";

export type KontorLabels = {
  nav: string[];
  title: string;
  period: string;
  kpis: { label: string; value: string }[];
  listTitle: string;
  status: string[];
};

const CHART =
  "M0 44C10 42 16 30 26 31C36 32 40 40 50 36C60 32 64 16 74 14C84 12 90 22 100 9";

const ROWS = [
  { width: "62%", amount: "42%" },
  { width: "48%", amount: "36%" },
  { width: "70%", amount: "44%" },
];

/**
 * Konzept "Kontor": Finanz-Dashboard für kleine Unternehmen.
 * Im Bauplan-Zustand ein Wireframe, im fertigen Zustand das Interface.
 */
export function KontorDashboard({
  labels,
  className,
}: {
  labels: KontorLabels;
  className?: string;
}) {
  return (
    <BrowserFrame tone="dark" className={className}>
      <div className="grid grid-cols-[19cqw_1fr]">
        {/* Seitenleiste */}
        <div className="border-r border-white/15 px-[2.6cqw] pt-[3.4cqw] transition-colors duration-700 lit:border-white/[0.07]">
          <Slot className="h-[3.2cqw] w-[12cqw]">
            <span className="display block text-[3.9cqw] leading-[0.82] text-white">
              Kontor
            </span>
          </Slot>
          <div className="mt-[5cqw] flex flex-col gap-[1cqw]">
            {labels.nav.map((label, index) => (
              <Slot
                key={label}
                delay={60 + index * 40}
                className="h-[4.2cqw] rounded-[1cqw]"
              >
                <span
                  className={cn(
                    "flex h-full items-center gap-[1.2cqw] rounded-[1cqw] px-[1.4cqw] text-[1.65cqw] leading-none whitespace-nowrap",
                    index === 0 ? "bg-white/10 text-white" : "text-white/55",
                  )}
                >
                  <span
                    className={cn(
                      "block size-[1.1cqw] rounded-full",
                      index === 0 ? "bg-neon" : "bg-white/30",
                    )}
                  />
                  {label}
                </span>
              </Slot>
            ))}
          </div>
        </div>

        {/* Inhalt */}
        <div className="px-[3.4cqw] pt-[3.4cqw]">
          <div className="flex items-center justify-between">
            <Slot className="h-[4.4cqw] w-[22cqw]">
              <span className="display block text-[5.4cqw] leading-[0.82] whitespace-nowrap text-white">
                {labels.title}
              </span>
            </Slot>
            <Slot delay={60} className="h-[3.8cqw] w-[11cqw] rounded-full">
              <span className="grid h-full place-items-center rounded-full bg-white/10 text-[1.6cqw] leading-none text-white/80">
                {labels.period}
              </span>
            </Slot>
          </div>

          {/* Kennzahlen */}
          <div className="mt-[3.2cqw] grid grid-cols-3 gap-[1.6cqw]">
            {labels.kpis.map((kpi, index) => (
              <Slot
                key={kpi.label}
                delay={120 + index * 60}
                className="h-[12.4cqw] rounded-[1.6cqw]"
              >
                <div className="flex h-full flex-col justify-between rounded-[1.6cqw] bg-white/[0.06] p-[1.8cqw]">
                  <span className="block text-[1.6cqw] leading-none text-white/55">
                    {kpi.label}
                  </span>
                  <span
                    className={cn(
                      "display block text-[4.5cqw] leading-[0.82] whitespace-nowrap",
                      index === 2 ? "text-neon" : "text-white",
                    )}
                  >
                    {kpi.value}
                  </span>
                </div>
              </Slot>
            ))}
          </div>

          {/* Verlauf */}
          <Slot delay={300} className="mt-[1.6cqw] h-[20cqw] rounded-[1.6cqw]">
            <div className="relative h-full overflow-hidden rounded-[1.6cqw] bg-white/[0.06]">
              <div className="absolute inset-x-0 top-1/4 h-px bg-white/[0.07]" />
              <div className="absolute inset-x-0 top-1/2 h-px bg-white/[0.07]" />
              <div className="absolute inset-x-0 top-3/4 h-px bg-white/[0.07]" />
              <svg
                viewBox="0 0 100 50"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute inset-0 size-full transition-[clip-path] duration-[1600ms] ease-expo [clip-path:inset(0_100%_0_0)] lit:[clip-path:inset(0_0_0_0)]"
                style={{ transitionDelay: "420ms" }}
              >
                <defs>
                  <linearGradient id="kontor-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffe23d" stopOpacity="0.28" />
                    <stop offset="1" stopColor="#ffe23d" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={`${CHART}V50H0Z`} fill="url(#kontor-area)" />
                <path
                  d={CHART}
                  fill="none"
                  stroke="#ffe23d"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </Slot>

          {/* Rechnungen */}
          <Slot delay={380} className="mt-[2.6cqw] h-[2.2cqw] w-[16cqw]">
            <span className="block text-[1.8cqw] leading-[1.1] text-white/55">
              {labels.listTitle}
            </span>
          </Slot>
          <div className="mt-[1.4cqw] flex flex-col gap-[1cqw]">
            {ROWS.map((row, index) => (
              <Slot
                key={index}
                delay={420 + index * 50}
                className="h-[5cqw] rounded-[1.2cqw]"
              >
                <div className="flex h-full items-center gap-[2cqw] rounded-[1.2cqw] bg-white/[0.06] px-[1.8cqw]">
                  <span className="block size-[2.2cqw] rounded-full bg-white/20" />
                  <span className="block flex-1">
                    <span
                      className="block h-[1.1cqw] rounded-full bg-white/35"
                      style={{ width: row.width }}
                    />
                  </span>
                  <span className="block w-[9cqw]">
                    <span
                      className="ml-auto block h-[1.1cqw] rounded-full bg-white/60"
                      style={{ width: row.amount }}
                    />
                  </span>
                  <span
                    className={cn(
                      "grid h-[2.9cqw] w-[9.5cqw] place-items-center rounded-full text-[1.4cqw] leading-none whitespace-nowrap",
                      index === 1
                        ? "bg-neon/15 text-neon"
                        : "bg-white/10 text-white/70",
                    )}
                  >
                    {labels.status[index]}
                  </span>
                </div>
              </Slot>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

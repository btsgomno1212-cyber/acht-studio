import { cn } from "@/lib/cn";
import { PhoneFrame, Slot } from "./primitives";

export type RunaLabels = {
  today: string;
  distance: string;
  time: string;
  pace: string;
  week: string;
  route: string;
  routeDistance: string;
  unit: string;
};

const WEEK = [38, 62, 0, 84, 46, 100, 28];

/**
 * Konzept "Runa": Startbildschirm einer Lauf-App.
 * Im Bauplan-Zustand ein Wireframe, im fertigen Zustand das Interface.
 */
export function RunaScreen({
  labels,
  className,
}: {
  labels: RunaLabels;
  className?: string;
}) {
  return (
    <PhoneFrame className={cn("@container", className)}>
      <div className="flex h-full flex-col px-[8cqw] pt-[16cqw] pb-[6cqw]">
        {/* Kopfzeile */}
        <div className="flex items-center justify-between">
          <Slot className="h-[7cqw] w-[26cqw]">
            <span className="display block text-[9cqw] leading-[0.8] tracking-[0.02em] text-white">
              Runa
            </span>
          </Slot>
          <Slot className="size-[10cqw] rounded-full">
            <span className="block size-full rounded-full bg-[linear-gradient(140deg,#ffe23d,#ff9d2e)]" />
          </Slot>
        </div>

        {/* Tagesziel */}
        <div className="relative mx-auto mt-[9cqw] w-[58cqw]">
          <svg viewBox="0 0 100 100" className="block w-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              strokeWidth="1"
              strokeDasharray="2.5 2.5"
              className="stroke-white/40 transition-opacity duration-500 lit:opacity-0"
            />
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              strokeWidth="9"
              className="stroke-white/10 opacity-0 transition-opacity duration-700 lit:opacity-100"
            />
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              strokeWidth="9"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="100"
              className="stroke-neon opacity-0 transition-[stroke-dashoffset,opacity] duration-[1400ms] ease-expo [stroke-dashoffset:100] lit:opacity-100 lit:[stroke-dashoffset:26]"
              style={{ transitionDelay: "160ms" }}
            />
          </svg>
          <div className="absolute inset-0 grid place-content-center justify-items-center gap-[1.5cqw]">
            <Slot delay={120} className="h-[4cqw] w-[18cqw]">
              <span className="block text-center text-[4.2cqw] leading-none text-white/60">
                {labels.today}
              </span>
            </Slot>
            <Slot delay={160} className="h-[13cqw] w-[34cqw]">
              <span className="display block text-center text-[16cqw] leading-[0.82] text-white">
                {labels.distance}
              </span>
            </Slot>
          </div>
        </div>

        {/* Kennzahlen */}
        <div className="mt-[8cqw] grid grid-cols-2 gap-[3.5cqw]">
          {[labels.time, labels.pace].map((value, index) => (
            <Slot
              key={value}
              delay={220 + index * 60}
              className="h-[19cqw] rounded-[4.5cqw]"
            >
              <div className="flex h-full flex-col justify-between rounded-[4.5cqw] bg-white/[0.07] p-[3.6cqw]">
                <span className="block size-[2.4cqw] rounded-full bg-white/40" />
                <span className="display block text-[8.4cqw] leading-[0.8] text-white">
                  {value}
                </span>
              </div>
            </Slot>
          ))}
        </div>

        {/* Woche */}
        <div className="mt-[6cqw]">
          <Slot delay={320} className="h-[3.8cqw] w-[22cqw]">
            <span className="block text-[4cqw] leading-none text-white/60">
              {labels.week}
            </span>
          </Slot>
          <div className="mt-[3.5cqw] flex h-[20cqw] items-end justify-between gap-[2.4cqw]">
            {WEEK.map((height, index) => (
              <Slot
                key={index}
                delay={340 + index * 35}
                className="flex-1 rounded-[1.6cqw]"
                style={{ height: `${Math.max(height, 10)}%` }}
              >
                <span
                  className={cn(
                    "block h-full rounded-[1.6cqw]",
                    index === 5 ? "bg-neon" : "bg-white/20",
                  )}
                />
              </Slot>
            ))}
          </div>
        </div>

        {/* Tab-Leiste */}
        <div className="mt-auto flex items-center justify-between px-[6cqw] pt-[5cqw]">
          {[0, 1, 2, 3].map((tab) => (
            <Slot
              key={tab}
              delay={420 + tab * 30}
              className="size-[5.5cqw] rounded-full"
            >
              <span
                className={cn(
                  "block size-full rounded-full",
                  tab === 0 ? "bg-neon" : "bg-white/20",
                )}
              />
            </Slot>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

/** Zweiter Bildschirm: laufende Aufzeichnung mit Karte und Strecke. */
export function RunaRoute({
  labels,
  className,
}: {
  labels: RunaLabels;
  className?: string;
}) {
  return (
    <PhoneFrame className={cn("@container", className)}>
      <div className="relative h-full">
        {/* Karte: Straßenraster, Park und Fluss aus Verläufen */}
        <div className="absolute inset-0 bg-[#0f1312] opacity-0 transition-opacity duration-700 ease-expo lit:opacity-100">
          <div className="absolute -inset-[30%] rotate-[18deg] bg-[repeating-linear-gradient(0deg,transparent_0_11cqw,rgb(255_255_255/0.07)_11cqw_11.6cqw),repeating-linear-gradient(90deg,transparent_0_15cqw,rgb(255_255_255/0.07)_15cqw_15.6cqw)]" />
          <div className="absolute top-[14%] left-[-12%] h-[26%] w-[62%] rotate-[18deg] rounded-[8cqw] bg-[#16261d]" />
          <div className="absolute top-[38%] right-[-30%] h-[7%] w-[120%] -rotate-[24deg] rounded-full bg-[#14212b]" />
        </div>

        {/* Strecke */}
        <svg
          viewBox="0 0 90 190"
          aria-hidden="true"
          className="absolute inset-0 size-full"
        >
          <path
            d="M22 108C18 88 30 78 28 62C26 46 40 40 52 44C66 49 72 38 66 28"
            fill="none"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            className="stroke-white/50 transition-opacity duration-500 lit:opacity-0"
          />
          <path
            d="M22 108C18 88 30 78 28 62C26 46 40 40 52 44C66 49 72 38 66 28"
            fill="none"
            strokeWidth="2.6"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="100"
            className="stroke-neon opacity-0 transition-[stroke-dashoffset,opacity] duration-[1600ms] ease-expo [stroke-dashoffset:100] lit:opacity-100 lit:[stroke-dashoffset:0]"
            style={{ transitionDelay: "200ms" }}
          />
          <circle
            cx="22"
            cy="108"
            r="3"
            className="fill-ink stroke-white/60 transition-colors duration-700 lit:fill-white lit:stroke-white"
            strokeWidth="1"
          />
          <circle
            cx="66"
            cy="28"
            r="4.2"
            className="fill-ink stroke-white/60 transition-colors duration-700 lit:fill-neon lit:stroke-ink"
            strokeWidth="1.4"
            style={{ transitionDelay: "900ms" }}
          />
        </svg>

        {/* Kennzahlen der laufenden Aufzeichnung */}
        <div className="absolute inset-x-[5cqw] bottom-[5cqw]">
          <Slot delay={260} className="rounded-[8cqw]">
            <div className="rounded-[8cqw] bg-[#1a1a1a] p-[6cqw]">
              <span className="block text-[4.2cqw] leading-none text-white/60">
                {labels.route}
              </span>
              <div className="mt-[3.5cqw] flex items-end gap-[2.5cqw]">
                <span className="display block text-[22cqw] leading-[0.76] text-white">
                  {labels.routeDistance}
                </span>
                <span className="block pb-[0.6cqw] text-[4.2cqw] leading-none text-white/60">
                  {labels.unit}
                </span>
              </div>
              <div className="mt-[5cqw] flex items-center justify-between">
                <div className="flex gap-[5cqw]">
                  {[labels.time, labels.pace].map((value) => (
                    <span
                      key={value}
                      className="display block text-[7.4cqw] leading-none text-white"
                    >
                      {value}
                    </span>
                  ))}
                </div>
                <span className="grid size-[13cqw] place-items-center rounded-full bg-neon">
                  <span className="flex gap-[1.6cqw]">
                    <span className="block h-[4.6cqw] w-[1.5cqw] rounded-full bg-ink" />
                    <span className="block h-[4.6cqw] w-[1.5cqw] rounded-full bg-ink" />
                  </span>
                </span>
              </div>
            </div>
          </Slot>
        </div>
      </div>
    </PhoneFrame>
  );
}

const PLAN = [
  { day: "12", load: 46, done: true },
  { day: "13", load: 72, done: true },
  { day: "14", load: 30, done: false, today: true },
  { day: "15", load: 88, done: false },
  { day: "16", load: 54, done: false },
  { day: "17", load: 100, done: false },
];

/** Dritter Bildschirm: Trainingsplan der Woche. */
export function RunaPlan({
  labels,
  className,
}: {
  labels: RunaLabels;
  className?: string;
}) {
  return (
    <PhoneFrame className={cn("@container", className)}>
      <div className="flex h-full flex-col px-[8cqw] pt-[16cqw] pb-[6cqw]">
        <Slot className="h-[9cqw] w-[58cqw]">
          <span className="display block text-[11cqw] leading-[0.82] whitespace-nowrap text-white">
            {labels.week}
          </span>
        </Slot>

        <div className="mt-[8cqw] flex flex-col gap-[3cqw]">
          {PLAN.map((entry, index) => (
            <Slot
              key={entry.day}
              delay={120 + index * 55}
              className="h-[17cqw] rounded-[5cqw]"
            >
              <div
                className={cn(
                  "flex h-full items-center gap-[4cqw] rounded-[5cqw] px-[4cqw]",
                  entry.today
                    ? "bg-neon text-ink"
                    : "bg-white/[0.07] text-white",
                )}
              >
                <span className="display block w-[9cqw] text-[8cqw] leading-none">
                  {entry.day}
                </span>
                <span
                  className={cn(
                    "block h-[2.2cqw] flex-1 rounded-full",
                    entry.today ? "bg-ink/15" : "bg-white/10",
                  )}
                >
                  <span
                    className={cn(
                      "block h-full rounded-full",
                      entry.today
                        ? "bg-ink"
                        : entry.done
                          ? "bg-white"
                          : "bg-white/35",
                    )}
                    style={{ width: `${entry.load}%` }}
                  />
                </span>
                <span
                  className={cn(
                    "block size-[4.6cqw] rounded-full border-[0.5cqw]",
                    entry.today
                      ? "border-ink"
                      : entry.done
                        ? "border-white bg-white"
                        : "border-white/35",
                  )}
                />
              </div>
            </Slot>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between px-[6cqw] pt-[5cqw]">
          {[0, 1, 2, 3].map((tab) => (
            <Slot
              key={tab}
              delay={460 + tab * 30}
              className="size-[5.5cqw] rounded-full"
            >
              <span
                className={cn(
                  "block size-full rounded-full",
                  tab === 1 ? "bg-neon" : "bg-white/20",
                )}
              />
            </Slot>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

import { cn } from "@/lib/cn";
import { BrowserFrame, Slot } from "./primitives";

export type ArvenLabels = {
  nav: string[];
  headline: string[];
  projects: string[];
};

/** Abstrakte Architekturmotive, nur aus Flächen und Verläufen gebaut. */
function Building({ variant }: { variant: 0 | 1 | 2 }) {
  if (variant === 0) {
    return (
      <div className="relative h-full overflow-hidden bg-[linear-gradient(to_bottom,#c9d2d6,#e6e3db_70%)]">
        <div className="absolute inset-0 bg-[#2f3133] [clip-path:polygon(8%_100%,8%_38%,58%_22%,58%_100%)]" />
        <div className="absolute inset-0 bg-[#8b8f92] [clip-path:polygon(58%_22%,94%_40%,94%_100%,58%_100%)]" />
        <div className="absolute top-[52%] left-[16%] h-[5%] w-[34%] bg-[#e9e6dc]/85" />
        <div className="absolute top-[66%] left-[16%] h-[5%] w-[34%] bg-[#e9e6dc]/60" />
        <div className="absolute top-[80%] left-[16%] h-[5%] w-[20%] bg-[#e9e6dc]/40" />
      </div>
    );
  }
  if (variant === 1) {
    return (
      <div className="relative h-full overflow-hidden bg-[linear-gradient(to_bottom,#d9cbb8,#efe6d8)]">
        <div className="absolute inset-x-[14%] top-[20%] bottom-0 rounded-t-full bg-[#b9552f]" />
        <div className="absolute inset-x-[30%] top-[40%] bottom-0 rounded-t-full bg-[#27201c]" />
        <div className="absolute right-0 bottom-0 left-0 h-[9%] bg-[#8a7a66]" />
      </div>
    );
  }
  return (
    <div className="relative h-full overflow-hidden bg-[linear-gradient(160deg,#1c1d1f,#3a3c3f)]">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#f1eee6,#b8b3a7)] [clip-path:polygon(34%_0,70%_0,100%_100%,6%_100%)] opacity-90" />
      <div className="absolute inset-0 bg-[#141516] [clip-path:polygon(0_62%,100%_48%,100%_56%,0_70%)]" />
      <div className="absolute inset-0 bg-[#141516] [clip-path:polygon(0_80%,100%_70%,100%_78%,0_88%)]" />
    </div>
  );
}

/**
 * Konzept "Arven Architekten": Portfolio-Website eines Architekturbüros.
 * Dient als Illustration der Website-Leistung und als Projekt-Cover.
 */
export function ArvenSite({
  labels,
  className,
}: {
  labels: ArvenLabels;
  className?: string;
}) {
  return (
    <BrowserFrame tone="light" className={className}>
      <div className="px-[4cqw] pt-[3.2cqw]">
        <div className="flex items-center justify-between">
          <Slot className="h-[2.9cqw] w-[13cqw]">
            <span className="display block text-[3.5cqw] leading-[0.84] tracking-[0.08em] text-black">
              ARVEN
            </span>
          </Slot>
          <div className="flex gap-[2.8cqw]">
            {labels.nav.map((label, index) => (
              <Slot
                key={label}
                delay={index * 40}
                className="h-[1.9cqw] w-[8.6cqw]"
              >
                <span className="block text-right text-[1.75cqw] leading-[1.1] text-black/70">
                  {label}
                </span>
              </Slot>
            ))}
          </div>
        </div>

        <div className="mt-[5.2cqw]">
          {labels.headline.map((line, index) => (
            <Slot
              key={line}
              delay={90 + index * 70}
              className={cn(
                "h-[8.6cqw]",
                index === 0 ? "w-[58cqw]" : "mt-[1.3cqw] w-[45cqw]",
              )}
            >
              <span className="display block text-[10.4cqw] leading-[0.83] whitespace-nowrap text-black">
                {line}
              </span>
            </Slot>
          ))}
        </div>

        <div className="mt-[5cqw] grid grid-cols-3 gap-[2.2cqw]">
          {([0, 1, 2] as const).map((variant) => (
            <div key={variant}>
              <Slot image delay={220 + variant * 70} className="aspect-[4/5]">
                <Building variant={variant} />
              </Slot>
              <Slot
                delay={300 + variant * 70}
                className="mt-[1.4cqw] h-[1.8cqw] w-[70%]"
              >
                <span className="block text-[1.7cqw] leading-[1.1] whitespace-nowrap text-black/70">
                  {labels.projects[variant]}
                </span>
              </Slot>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

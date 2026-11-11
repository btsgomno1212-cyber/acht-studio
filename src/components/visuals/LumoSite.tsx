import { BrowserFrame, Slot } from "./primitives";

export type LumoLabels = {
  nav: string[];
  headline: string[];
  sub: string;
  chips: string[];
  cta: string;
};

/** Ein Teller Tagliatelle, nur aus Kreisen und Verläufen gebaut. */
function Plate() {
  return (
    <div className="relative size-full rounded-full bg-[radial-gradient(circle_at_32%_26%,#fffaf0,#eadcc4_58%,#c9b698)] shadow-[0_3cqw_6cqw_rgb(0_0_0/0.55)]">
      <div className="absolute inset-[11%] rounded-full bg-[radial-gradient(circle_at_40%_34%,#f6ecd9,#dfcfb2)] shadow-[inset_0_0.6cqw_1.4cqw_rgb(90_60_20/0.35)]" />
      <div className="absolute inset-[22%] rounded-full bg-[repeating-radial-gradient(circle_at_46%_44%,#f0c35c_0_5%,#d49a2c_5%_9%)] shadow-[0_0.6cqw_1.2cqw_rgb(80_40_0/0.4)]" />
      <div className="absolute inset-[37%] rounded-[46%_54%_52%_48%] bg-[radial-gradient(circle_at_40%_35%,#d2482c,#9c2a17)]" />
      <div className="absolute top-[36%] left-[47%] h-[9%] w-[16%] -rotate-[28deg] rounded-[60%_40%_60%_40%] bg-[#4f7a35]" />
      <div className="absolute top-[47%] left-[40%] h-[7%] w-[12%] rotate-[40deg] rounded-[60%_40%_60%_40%] bg-[#5f8f3f]" />
    </div>
  );
}

/**
 * Konzept "Osteria Lumo": Website eines italienischen Restaurants mit
 * Tischreservierung direkt auf der Startseite.
 */
export function LumoSite({
  labels,
  className,
}: {
  labels: LumoLabels;
  className?: string;
}) {
  return (
    <BrowserFrame tone="warm" className={className}>
      <div className="px-[4.4cqw] pt-[3.2cqw]">
        <div className="flex items-center justify-between">
          <Slot className="h-[3.6cqw] w-[12cqw]">
            <span className="display block text-[4.6cqw] leading-[0.8] text-[#f3e3cb]">
              Lumo
            </span>
          </Slot>
          <div className="flex gap-[2.8cqw]">
            {labels.nav.map((label, index) => (
              <Slot
                key={label}
                delay={index * 40}
                className="h-[1.9cqw] w-[10cqw]"
              >
                <span className="block text-right text-[1.75cqw] leading-[1.1] whitespace-nowrap text-[#f3e3cb]/70">
                  {label}
                </span>
              </Slot>
            ))}
          </div>
        </div>

        <div className="mt-[5.4cqw] grid grid-cols-[1.2fr_1fr] items-start gap-[3cqw]">
          <div>
            {labels.headline.map((line, index) => (
              <Slot
                key={line}
                delay={90 + index * 70}
                className={
                  index === 0
                    ? "h-[8.4cqw] w-[38cqw]"
                    : "mt-[1.2cqw] h-[8.4cqw] w-[45cqw]"
                }
              >
                <span className="display block text-[10.2cqw] leading-[0.83] whitespace-nowrap text-[#f3e3cb]">
                  {line}
                </span>
              </Slot>
            ))}

            <Slot delay={240} className="mt-[3.2cqw] h-[2.2cqw] w-[30cqw]">
              <span className="block text-[1.95cqw] leading-[1.15] whitespace-nowrap text-[#f3e3cb]/65">
                {labels.sub}
              </span>
            </Slot>

            {/* Reservierung */}
            <div className="mt-[4cqw] flex gap-[1.2cqw]">
              {labels.chips.map((chip, index) => (
                <Slot
                  key={chip}
                  delay={300 + index * 50}
                  className="h-[5cqw] flex-1 rounded-[1.2cqw]"
                >
                  <span className="grid h-full place-items-center rounded-[1.2cqw] bg-[#f3e3cb]/10 text-[1.7cqw] leading-none whitespace-nowrap text-[#f3e3cb]">
                    {chip}
                  </span>
                </Slot>
              ))}
            </div>
            <Slot
              delay={460}
              className="mt-[1.2cqw] h-[5.6cqw] rounded-[1.2cqw]"
            >
              <span className="grid h-full place-items-center rounded-[1.2cqw] bg-[#e2552f] text-[1.9cqw] leading-none font-medium whitespace-nowrap text-[#fff6ea]">
                {labels.cta}
              </span>
            </Slot>
          </div>

          <Slot
            image
            delay={200}
            className="-mr-[9cqw] aspect-square rounded-full"
          >
            <Plate />
          </Slot>
        </div>
      </div>
    </BrowserFrame>
  );
}

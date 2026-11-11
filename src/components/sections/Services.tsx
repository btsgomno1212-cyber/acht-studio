import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { buttonClass } from "@/components/ui/button";
import { LightSwitch } from "@/components/ui/LightSwitch";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatePill } from "@/components/ui/StatePill";
import { ServiceVisual } from "@/components/visuals/covers";
import { serviceIds, serviceSlugs, type ServiceId } from "@/content/services";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { cn } from "@/lib/cn";

type ServicesProps = {
  locale: Locale;
  services: Dictionary["services"];
  visuals: Dictionary["visuals"];
};

/** Breite der Karten im 12-spaltigen Raster: abwechselnd breit und schmal. */
const SPAN: Record<ServiceId, string> = {
  web: "lg:col-span-7",
  "3d": "lg:col-span-5",
  graphic: "lg:col-span-5",
  uiux: "lg:col-span-7",
};

export function Services({ locale, services, visuals }: ServicesProps) {
  return (
    <section
      id="services"
      tabIndex={-1}
      aria-labelledby="services-title"
      className="section-y outline-none"
    >
      <div className="shell">
        <SectionHeading
          id="services-title"
          title={services.title}
          intro={services.intro}
        />

        <ul className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          {serviceIds.map((id, index) => {
            const item = services.items[id];
            return (
              <li key={id} className={SPAN[id]}>
                <Reveal delay={(index % 2) * 0.09} className="h-full">
                  <LightSwitch
                    as="article"
                    data-lit
                    className="flex h-full flex-col overflow-hidden rounded-panel border border-line bg-coal transition-colors duration-500 ease-expo hover:border-line-strong"
                  >
                    <div className="stage h-[clamp(17rem,64vw,23rem)] lg:h-[clamp(20rem,27vw,27rem)]">
                      <ServiceVisual id={id} visuals={visuals} />
                    </div>
                    <StatePill
                      from={item.states[0]}
                      to={item.states[1]}
                      className="absolute top-4 left-4 sm:top-5 sm:left-5"
                    />

                    <div className="flex flex-1 flex-col gap-6 border-t border-line p-6 sm:p-8 xl:flex-row xl:items-end xl:justify-between">
                      <div>
                        <h3 className="display text-title">{item.title}</h3>
                        <p className="mt-3 max-w-[38ch] text-mute">
                          {item.short}
                        </p>
                      </div>
                      <Link
                        href={`/${locale}/services/${serviceSlugs[id]}`}
                        prefetch={true}
                        className={cn(
                          buttonClass("secondary", "md"),
                          "shrink-0 self-start after:absolute after:inset-0 after:rounded-panel xl:self-auto",
                        )}
                      >
                        {services.more}
                        <span className="sr-only">: {item.title}</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-[1.125rem]"
                        />
                      </Link>
                    </div>
                  </LightSwitch>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

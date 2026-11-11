import { HeroVisual } from "@/components/three/HeroVisual";
import { buttonClass } from "@/components/ui/button";
import { SectionLink } from "@/components/ui/SectionLink";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";

type HeroProps = {
  locale: Locale;
  hero: Dictionary["hero"];
};

export function Hero({ locale, hero }: HeroProps) {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col justify-end overflow-clip"
    >
      <HeroVisual wire={hero.wire} render={hero.render} hint={hero.hint} />

      <div className="shell pt-32 pb-10 sm:pb-14">
        {/* Die Zeilen fahren per CSS ein – ohne JavaScript, damit der Text sofort steht. */}
        <h1 data-hero-title className="display text-hero">
          {hero.title.map((line, index) => (
            <span key={line} className="line-mask">
              <span
                className="block animate-rise"
                style={{ animationDelay: `${140 + index * 110}ms` }}
              >
                {line}{" "}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center md:gap-12 lg:mt-12">
          <p
            className="max-w-[30ch] animate-fade-in text-lead text-mute"
            style={{ animationDelay: "640ms" }}
          >
            {hero.sub}
          </p>
          <div
            className="grid animate-fade-in grid-cols-2 gap-3 sm:flex sm:flex-nowrap"
            style={{ animationDelay: "780ms" }}
          >
            <SectionLink
              locale={locale}
              section="contact"
              className={buttonClass("primary", "lg", "max-sm:px-3")}
            >
              {hero.primary}
            </SectionLink>
            <SectionLink
              locale={locale}
              section="services"
              className={buttonClass("secondary", "lg", "max-sm:px-3")}
            >
              {hero.secondary}
            </SectionLink>
          </div>
        </div>
      </div>
    </section>
  );
}

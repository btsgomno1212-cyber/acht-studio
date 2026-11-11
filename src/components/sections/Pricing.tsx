import { InquiryLink } from "@/components/form/InquiryLink";
import { PackageCard } from "@/components/pricing/PackageCard";
import { buttonClass } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingGroups } from "@/content/pricing";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { PricingTabs } from "./PricingTabs";

type PricingProps = {
  locale: Locale;
  pricing: Dictionary["pricing"];
};

export function Pricing({ locale, pricing }: PricingProps) {
  return (
    <section
      id="pricing"
      tabIndex={-1}
      aria-labelledby="pricing-title"
      className="section-y outline-none"
    >
      <div className="shell">
        <SectionHeading
          id="pricing-title"
          title={pricing.title}
          intro={pricing.intro}
        />

        <Reveal>
          <PricingTabs
            label={pricing.tabsLabel}
            tabs={pricingGroups.map((group) => ({
              id: group.service,
              label: pricing.tabs[group.service],
            }))}
            panels={pricingGroups.map((group) => (
              <ul
                key={group.service}
                className="grid gap-5 lg:grid-cols-3 lg:gap-6"
              >
                {group.packages.map((pkg) => (
                  <li key={pkg.id}>
                    <PackageCard
                      locale={locale}
                      service={group.service}
                      pkg={pkg}
                      pricing={pricing}
                    />
                  </li>
                ))}
              </ul>
            ))}
          />

          {/* UI/UX: kein Paket, immer individuelles Angebot */}
          <div
            data-lit
            className="mt-5 flex flex-col gap-7 rounded-panel border border-line p-7 sm:p-8 lg:mt-6 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <h3 className="display text-[2.25rem] leading-[0.95]">
                {pricing.uiuxTitle}
              </h3>
              <p className="mt-3 max-w-[62ch] text-mute">{pricing.uiuxText}</p>
            </div>
            <InquiryLink
              locale={locale}
              service="uiux"
              className={buttonClass(
                "secondary",
                "md",
                "shrink-0 self-start lg:self-auto",
              )}
            >
              {pricing.cta}
              <span className="sr-only">: {pricing.uiuxTitle}</span>
            </InquiryLink>
          </div>

          <p className="mt-6 max-w-[70ch] text-[0.875rem] text-faint">
            {pricing.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

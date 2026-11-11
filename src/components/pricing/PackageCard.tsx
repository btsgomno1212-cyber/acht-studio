import { Check } from "lucide-react";
import { InquiryLink } from "@/components/form/InquiryLink";
import { buttonClass } from "@/components/ui/button";
import type { PricingPackage } from "@/content/pricing";
import type { ServiceId } from "@/content/services";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { cn } from "@/lib/cn";
import { priceLabel } from "@/lib/pricing";

type PackageCardProps = {
  locale: Locale;
  service: ServiceId;
  pkg: PricingPackage;
  pricing: Dictionary["pricing"];
  /** Kompakte Fassung ohne Leistungsliste (für die Leistungsseiten). */
  compact?: boolean;
  className?: string;
};

export function PackageCard({
  locale,
  service,
  pkg,
  pricing,
  compact = false,
  className,
}: PackageCardProps) {
  const text = pricing.packages[pkg.id];
  const price = priceLabel(pkg, locale, pricing);

  return (
    <article
      data-lit
      className={cn(
        "flex h-full flex-col rounded-panel border border-line bg-coal p-7 sm:p-8",
        className,
      )}
    >
      <h3 className="display text-[2.25rem] leading-[0.95]">{text.name}</h3>
      <p className="mt-3 text-mute lg:min-h-[3.3em]">{text.tagline}</p>

      <p className="mt-7 flex h-[5.25rem] items-end gap-2.5 border-t border-line">
        {price.kind === "custom" ? (
          <span className="display text-[2.25rem] leading-[0.95]">
            {price.text}
          </span>
        ) : (
          <>
            {price.prefix ? (
              <span className="pb-1 text-mute">{price.prefix}</span>
            ) : null}
            <span className="display text-[3.25rem] leading-[0.8]">
              {price.amount}
            </span>
          </>
        )}
      </p>

      {compact ? null : (
        <ul className="mt-7 flex flex-col gap-3 text-[0.9375rem]">
          {text.features.map((feature) => (
            <li key={feature} className="flex gap-3">
              <Check
                aria-hidden="true"
                className="mt-[0.2rem] size-4 shrink-0 text-neon"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-9">
        <InquiryLink
          locale={locale}
          service={service}
          pkg={pkg.id}
          className={buttonClass("secondary", "md", "w-full")}
        >
          {pricing.cta}
          <span className="sr-only">: {text.name}</span>
        </InquiryLink>
      </div>
    </article>
  );
}

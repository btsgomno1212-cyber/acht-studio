import type { PricingPackage } from "@/content/pricing";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";

const formats: Record<Locale, Intl.NumberFormat> = {
  de: new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }),
  en: new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }),
};

export type PriceLabel =
  | { kind: "custom"; text: string }
  | { kind: "from"; prefix: string; amount: string };

/**
 * Preisangabe eines Pakets:
 *   custom            → "Individuelles Angebot"
 *   priceFrom: 1490   → "Ab 1.490 €"
 *   priceFrom: null   → "Ab … €" (Platzhalter, bis ein Preis eingetragen ist)
 */
export function priceLabel(
  pkg: PricingPackage,
  locale: Locale,
  labels: Pick<Dictionary["pricing"], "from" | "placeholder" | "custom">,
): PriceLabel {
  if (pkg.custom) return { kind: "custom", text: labels.custom };

  const amount =
    pkg.priceFrom === null
      ? `${labels.placeholder} €`
      : formats[locale].format(pkg.priceFrom);

  return { kind: "from", prefix: pkg.fixed ? "" : labels.from, amount };
}

import type { ServiceId } from "./services";

/**
 * Pakete und Preise.
 *
 * `priceFrom` ist der Einstiegspreis in Euro (netto oder brutto – das legen
 * Sie im Hinweistext unter den Paketen fest):
 *   - Zahl  → Anzeige "Ab 1.490 €"
 *   - null  → Anzeige "Ab … €" (Platzhalter, bis Sie einen Preis eintragen)
 * `custom: true` zeigt statt eines Preises "Individuelles Angebot".
 *
 * Namen, Beschreibungen und Leistungslisten der Pakete stehen in
 * `src/i18n/dictionaries/de.ts` und `en.ts` unter `pricing.packages`.
 */
export type PricingPackage = {
  id: PackageId;
  priceFrom: number | null;
  custom?: boolean;
  /** Festpreis: zeigt "79 €" statt "Ab 79 €". */
  fixed?: boolean;
};

/** Disziplinen mit festen Paketen. UI/UX wird immer individuell angeboten. */
export type PricedService = Exclude<ServiceId, "uiux">;

export type PricingGroup = {
  /** Disziplin, die beim Klick auf "Angebot anfragen" vorausgewählt wird. */
  service: PricedService;
  packages: PricingPackage[];
};

export const packageIds = [
  "starter-website",
  "business-website",
  "premium-website",
  "basic-3d",
  "professional-3d",
  "premium-cgi",
  "logo-design",
  "brand-identity",
  "complete-branding",
] as const;

export type PackageId = (typeof packageIds)[number];

export const pricingGroups: PricingGroup[] = [
  {
    service: "web",
    packages: [
      { id: "starter-website", priceFrom: 79, fixed: true },
      { id: "business-website", priceFrom: 300 },
      { id: "premium-website", priceFrom: 450 },
    ],
  },
  {
    service: "3d",
    packages: [
      { id: "basic-3d", priceFrom: 49 },
      { id: "professional-3d", priceFrom: 149 },
      { id: "premium-cgi", priceFrom: null, custom: true },
    ],
  },
  {
    service: "graphic",
    packages: [
      { id: "logo-design", priceFrom: 59 },
      { id: "brand-identity", priceFrom: 199 },
      { id: "complete-branding", priceFrom: 399 },
    ],
  },
];

export const isPackageId = (value: string): value is PackageId =>
  (packageIds as readonly string[]).includes(value);

/** Pakete einer Disziplin – oder `undefined`, wenn es dafür keine festen Pakete gibt. */
export const packagesFor = (service: ServiceId): PricingGroup | undefined =>
  pricingGroups.find((group) => group.service === service);

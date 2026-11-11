export const locales = ["de", "en"] as const;

export type Locale = (typeof locales)[number];

/** Hauptsprache der Website. */
export const defaultLocale: Locale = "de";

export const isLocale = (value: string | undefined): value is Locale =>
  !!value && (locales as readonly string[]).includes(value);

/** Sprach-Tags für <html lang>, hreflang und Open Graph. */
export const localeTags: Record<Locale, { html: string; og: string }> = {
  de: { html: "de", og: "de_DE" },
  en: { html: "en", og: "en_US" },
};

export const locales = ["de", "en", "ru"] as const;

export type Locale = (typeof locales)[number];

/** Hauptsprache der Website. */
export const defaultLocale: Locale = "de";

export const isLocale = (value: string | undefined): value is Locale =>
  !!value && (locales as readonly string[]).includes(value);

/** Sprach-Tags für <html lang>, hreflang und Open Graph. */
export const localeTags: Record<Locale, { html: string; og: string }> = {
  de: { html: "de", og: "de_DE" },
  en: { html: "en", og: "en_US" },
  ru: { html: "ru", og: "ru_RU" },
};

/** Name jeder Sprache in ihr selbst – für den Sprachwechsler. */
export const localeNames: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  ru: "Русский",
};

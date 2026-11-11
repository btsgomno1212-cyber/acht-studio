import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { defaultLocale, locales, localeTags, type Locale } from "@/i18n/config";

/** Absolute Adresse einer Seite, z. B. absoluteUrl("/de/impressum"). */
export const absoluteUrl = (path = "") => `${siteConfig.url}${path}`;

/**
 * Metadaten einer Seite: Titel, Beschreibung, Canonical, Sprachalternativen
 * (hreflang) sowie Open Graph und Twitter-Karte.
 *
 * `path` ist der Pfad hinter dem Sprachkürzel, z. B. "/impressum" – für die
 * Startseite leer lassen.
 */
export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  index = true,
}: {
  locale: Locale;
  path?: string;
  /** Ohne Titel gilt der Standardtitel aus dem Layout. */
  title?: string;
  description: string;
  index?: boolean;
}): Metadata {
  const languages = Object.fromEntries(
    locales.map((code) => [localeTags[code].html, `/${code}${path}`]),
  );
  const fullTitle = title ? `${title} – ${siteConfig.name}` : undefined;

  return {
    ...(title ? { title } : null),
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { ...languages, "x-default": `/${defaultLocale}${path}` },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: localeTags[locale].og,
      alternateLocale: locales
        .filter((code) => code !== locale)
        .map((code) => localeTags[code].og),
      url: `/${locale}${path}`,
      ...(fullTitle ? { title: fullTitle } : null),
      description,
    },
    twitter: {
      card: "summary_large_image",
      ...(fullTitle ? { title: fullTitle } : null),
      description,
    },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

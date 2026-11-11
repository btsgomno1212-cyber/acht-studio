import type { MetadataRoute } from "next";
import { serviceIds, serviceSlugs } from "@/content/services";
import { locales, localeTags } from "@/i18n/config";
import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap für Suchmaschinen: Startseite und Leistungsseiten in allen Sprachen.
 * Impressum und Datenschutz fehlen bewusst (sie sind auf "noindex" gesetzt).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    ...serviceIds.map((id) => `/services/${serviceSlugs[id]}`),
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${path}`),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((code) => [
            localeTags[code].html,
            absoluteUrl(`/${code}${path}`),
          ]),
        ),
      },
    })),
  );
}

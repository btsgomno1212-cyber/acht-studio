import { siteConfig } from "@/config/site";
import { serviceIds, serviceSlugs } from "@/content/services";
import { localeTags, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { absoluteUrl } from "./seo";

/** Das Studio als Dienstleister mit seinen vier Leistungen. */
export function studioSchema(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#studio"),
    name: siteConfig.name,
    url: absoluteUrl(`/${locale}`),
    description: dict.meta.description,
    email: siteConfig.email,
    inLanguage: localeTags[locale].html,
    knowsLanguage: ["de", "en", "ru"],
    areaServed: ["DE", "AT", "CH", "Europe"],
    ...(siteConfig.social.length > 0
      ? { sameAs: siteConfig.social.map((profile) => profile.href) }
      : null),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.services.title,
      itemListElement: serviceIds.map((id) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: dict.services.items[id].title,
          description: dict.services.items[id].short,
          url: absoluteUrl(`/${locale}/services/${serviceSlugs[id]}`),
        },
      })),
    },
  };
}

/** Die häufigen Fragen der Startseite. */
export function faqSchema(dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Einzelne Leistung auf ihrer Detailseite. */
export function serviceSchema(
  locale: Locale,
  dict: Dictionary,
  id: (typeof serviceIds)[number],
) {
  const item = dict.services.items[id];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.title,
    description: item.lead,
    serviceType: item.title,
    url: absoluteUrl(`/${locale}/services/${serviceSlugs[id]}`),
    provider: {
      "@id": absoluteUrl("/#studio"),
      "@type": "ProfessionalService",
      name: siteConfig.name,
    },
    areaServed: ["DE", "AT", "CH", "Europe"],
  };
}

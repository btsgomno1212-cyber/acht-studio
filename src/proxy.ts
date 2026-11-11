import { NextResponse, type NextRequest } from "next/server";
import { serviceBySlug } from "@/content/services";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

/**
 * Leitet Aufrufe ohne Sprachkürzel auf die passende Sprachversion um:
 *   /            → /de   (oder /en, wenn der Browser Englisch bevorzugt)
 *   /impressum   → /de/impressum
 * Deutsch ist die Hauptsprache und gilt für alle anderen Browsersprachen.
 */
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const quality = params
        .map((param) => param.trim())
        .find((param) => param.startsWith("q="));
      const q = quality ? Number.parseFloat(quality.slice(2)) : 1;
      return {
        lang: tag.toLowerCase().split("-")[0],
        q: Number.isNaN(q) ? 0 : q,
      };
    })
    .filter((entry) => entry.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { lang } of ranked) {
    const match = locales.find((locale) => locale === lang);
    if (match) return match;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) {
    // Unbekannte Leistungsseiten (z. B. /de/services/xyz) sollen einen echten
    // 404-Status liefern. Dazu leiten wir intern auf eine Adresse um, die es
    // nicht gibt – sie landet bei der 404-Seite der jeweiligen Sprache.
    const [, locale, section, slug, ...more] = pathname.split("/");
    if (
      section === "services" &&
      (more.length > 0 || !slug || !serviceBySlug(slug))
    ) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/404`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Nicht anfassen: API, Next-Interna und Dateien mit Endung (Bilder, robots.txt, sitemap.xml …)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

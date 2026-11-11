"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/** Sprachkürzel am Anfang des Pfads, z. B. "/de" in "/de/impressum". */
const LOCALE_PREFIX = new RegExp(`^/(?:${locales.join("|")})(?=/|$)`);

type LanguageSwitcherProps = {
  locale: Locale;
  /** Beschriftung der Gruppe für Screenreader, z. B. "Sprache". */
  label: string;
  /** Hinweis in der jeweils anderen Sprache, z. B. "Switch to English". */
  switchTo: string;
  className?: string;
};

/** Wechselt die Sprache und bleibt dabei auf derselben Unterseite. */
export function LanguageSwitcher({
  locale,
  label,
  switchTo,
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const rest = pathname.replace(LOCALE_PREFIX, "");

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex items-center rounded-full border border-line p-0.5 text-[0.8125rem] font-medium",
        className,
      )}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={`/${code}${rest}`}
            hrefLang={code}
            lang={code}
            aria-current={active ? "true" : undefined}
            aria-label={active ? undefined : switchTo}
            title={active ? undefined : switchTo}
            scroll={false}
            className={cn(
              "rounded-full px-2.5 py-1.5 leading-none uppercase transition-colors duration-300",
              active ? "bg-paper text-ink" : "text-mute hover:text-paper",
            )}
          >
            {code}
          </Link>
        );
      })}
    </div>
  );
}

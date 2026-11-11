"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import type { ComponentProps, MouseEvent } from "react";
import type { Locale } from "@/i18n/config";

type SectionLinkProps = Omit<ComponentProps<"a">, "href"> & {
  locale: Locale;
  /** id des Abschnitts, z. B. "contact" */
  section: string;
};

/**
 * Sucht den sichtbaren Abschnitt mit dieser id. Next.js hält zuletzt besuchte
 * Seiten unsichtbar im Dokument vor – deren Abschnitte zählen nicht.
 */
export function findSection(id: string): HTMLElement | null {
  const candidates = document.querySelectorAll<HTMLElement>(
    `[id="${CSS.escape(id)}"]`,
  );
  for (const element of candidates) {
    if (element.getClientRects().length > 0) return element;
  }
  return null;
}

/**
 * Link zu einem Abschnitt. Liegt der Abschnitt auf der aktuellen Seite, wird
 * weich dorthin gescrollt; sonst führt der Link zur Startseite mit Anker.
 */
export function SectionLink({
  locale,
  section,
  onClick,
  children,
  ...rest
}: SectionLinkProps) {
  const lenis = useLenis();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = findSection(section);
    if (!target) return; // Abschnitt nicht auf dieser Seite: normale Navigation

    event.preventDefault();
    window.history.replaceState(
      null,
      "",
      section === "top" ? window.location.pathname : `#${section}`,
    );

    // Erst im nächsten Bild scrollen: Ein offenes Menü hält das Scrollen an
    // und gibt es erst frei, nachdem es sich geschlossen hat.
    requestAnimationFrame(() => {
      // Der Abstand zur Navigation steht als scroll-margin-top in globals.css.
      if (lenis) lenis.scrollTo(target, { force: true });
      else target.scrollIntoView({ behavior: "auto", block: "start" });
      // Fokus nachziehen, damit Tastatur und Screenreader am Ziel weitermachen.
      target.focus({ preventScroll: true });
    });
  };

  const href = section === "top" ? `/${locale}` : `/${locale}#${section}`;

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}

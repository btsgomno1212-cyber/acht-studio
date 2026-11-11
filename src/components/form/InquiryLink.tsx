"use client";

import type { ReactNode } from "react";
import { SectionLink } from "@/components/ui/SectionLink";
import type { PackageId } from "@/content/pricing";
import type { ServiceId } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { useInquiry } from "./InquiryContext";

type InquiryLinkProps = {
  locale: Locale;
  /** Leistung, die im Formular vorausgewählt wird. */
  service: ServiceId;
  /** Optional: Paket, das im Formular vermerkt wird. */
  pkg?: PackageId;
  className?: string;
  children: ReactNode;
};

/**
 * Führt zum Anfrageformular und trägt dort Leistung und Paket schon ein.
 * Funktioniert auch von Unterseiten aus (Sprung zur Startseite mit Anker).
 */
export function InquiryLink({
  locale,
  service,
  pkg,
  className,
  children,
}: InquiryLinkProps) {
  const { choose } = useInquiry();

  return (
    <SectionLink
      locale={locale}
      section="contact"
      onClick={() => choose(service, pkg)}
      className={className}
    >
      {children}
    </SectionLink>
  );
}

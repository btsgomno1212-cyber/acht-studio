/**
 * Zentrale Stammdaten der Website.
 *
 * Alles, was hier mit "TODO" markiert ist, sind Platzhalter – bitte vor dem
 * Livegang durch echte Angaben ersetzen. Texte der Seite liegen in
 * `src/i18n/dictionaries/`, Preise in `src/content/pricing.ts`.
 */
type LegalInfo = {
  company: string;
  owner: string;
  street: string;
  city: string;
  country: string;
  phone: string;
  vatId: string;
  register: string;
};

export const siteConfig = {
  /** Name des Studios (erscheint im Logo, Footer, Titel und in E-Mails). */
  name: "ACHT",

  /** Öffentliche Kontakt-Adresse (wird auf der Seite angezeigt). */
  email: "webdesinsite@gmail.com",

  /**
   * TODO: WhatsApp-Nummer im internationalen Format, nur Ziffern, ohne "+"
   * und ohne führende Nullen – z. B. "4915112345678".
   * Leer lassen: Alle WhatsApp-Links und der schwebende Button werden ausgeblendet.
   */
  whatsapp: "4917663015887",

  /**
   * Basis-URL der Website ohne Slash am Ende. Wird für Canonical-Links,
   * Sitemap und Open Graph benötigt. Auf Vercel als Umgebungsvariable
   * NEXT_PUBLIC_SITE_URL setzen.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(
    /\/+$/,
    "",
  ),

  /** Optional: Social-Media-Profile. Leere Liste = kein Block im Footer. */
  social: [] as { label: string; href: string }[],

  /**
   * TODO: Pflichtangaben für das Impressum (§ 5 DDG). Leere Felder werden auf
   * der Seite als sichtbare Platzhalter ausgegeben.
   */
  legal: {
    /** Firmenname oder Vor- und Nachname, z. B. "ACHT Studio – Max Mustermann" */
    company: "ACHT – Nazar Honcharov",
    /** Inhaber oder Geschäftsführung */
    owner: "Nazar Honcharov",
    /** Straße und Hausnummer */
    street: "Freiimfelder Str. 95",
    /** Postleitzahl und Ort */
    city: "06112 Halle (Saale)",
    country: "Deutschland",
    /** Optional, z. B. "+49 151 12345678" */
    phone: "",
    /** Optional: Umsatzsteuer-ID, z. B. "DE123456789" */
    vatId: "",
    /** Optional: Registereintrag, z. B. "Amtsgericht Berlin, HRB 12345" */
    register: "",
  } as LegalInfo,
};

export type SiteConfig = typeof siteConfig;

/** Ist eine WhatsApp-Nummer eingetragen? */
export const hasWhatsapp = siteConfig.whatsapp.trim() !== "";

/** Link, der einen WhatsApp-Chat mit vorbereitetem Text öffnet. */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

import type { PackageId } from "./pricing";
import type { ServiceId } from "./services";

/**
 * Auswahlmöglichkeiten im Anfrageformular. Die sichtbaren Bezeichnungen
 * stehen in den Wörterbüchern unter `contact.budgets` und `contact.timelines`.
 */
export const budgetIds = ["s", "m", "l", "xl", "open"] as const;
export type BudgetId = (typeof budgetIds)[number];

export const timelineIds = ["asap", "soon", "later", "flexible"] as const;
export type TimelineId = (typeof timelineIds)[number];

/** Längenbegrenzungen – gelten im Browser und auf dem Server. */
export const inquiryLimits = {
  name: 120,
  company: 160,
  email: 254,
  messageMin: 20,
  messageMax: 5000,
} as const;

/** Inhalt einer Anfrage, wie ihn das Formular an den Server schickt. */
export type Inquiry = {
  name: string;
  company: string;
  email: string;
  services: ServiceId[];
  budget: BudgetId | "";
  timeline: TimelineId | "";
  message: string;
  pkg: PackageId | null;
};

export type InquiryField =
  "name" | "company" | "email" | "services" | "budget" | "timeline" | "message";

/** Schlüssel der Fehlermeldungen in den Wörterbüchern (`contact.errors`). */
export type InquiryErrorKey =
  | "name"
  | "company"
  | "email"
  | "services"
  | "budget"
  | "timeline"
  | "message"
  | "messageLong";

export type InquiryErrors = Partial<Record<InquiryField, InquiryErrorKey>>;

const EMAIL_PATTERN = /^[^\s@<>(),;:"]+@[^\s@<>(),;:"]+\.[^\s@.<>(),;:"]{2,}$/;

/**
 * Prüft eine Anfrage. Dieselbe Funktion läuft im Browser (sofortige
 * Rückmeldung) und auf dem Server (maßgebliche Prüfung).
 */
export function validateInquiry(inquiry: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {};
  const name = inquiry.name.trim();
  const email = inquiry.email.trim();
  const message = inquiry.message.trim();

  if (name.length === 0 || name.length > inquiryLimits.name) {
    errors.name = "name";
  }
  if (inquiry.company.trim().length > inquiryLimits.company) {
    errors.company = "company";
  }
  if (email.length > inquiryLimits.email || !EMAIL_PATTERN.test(email)) {
    errors.email = "email";
  }
  if (inquiry.services.length === 0) errors.services = "services";
  if (!inquiry.budget) errors.budget = "budget";
  if (!inquiry.timeline) errors.timeline = "timeline";
  if (message.length < inquiryLimits.messageMin) errors.message = "message";
  else if (message.length > inquiryLimits.messageMax) {
    errors.message = "messageLong";
  }

  return errors;
}

/** Reihenfolge der Felder im Formular – für den Sprung zum ersten Fehler. */
export const inquiryFieldOrder: InquiryField[] = [
  "name",
  "company",
  "email",
  "services",
  "budget",
  "timeline",
  "message",
];

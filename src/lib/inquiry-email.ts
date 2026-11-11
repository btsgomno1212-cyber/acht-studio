import "server-only";

import { siteConfig } from "@/config/site";
import type { Inquiry } from "@/content/inquiry";
import type { Locale } from "@/i18n/config";
import { de } from "@/i18n/dictionaries/de";
import type { OutgoingMail } from "./mail";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const LANGUAGE: Record<Locale, string> = { de: "Deutsch", en: "Englisch" };

/**
 * Baut die Benachrichtigung für das Studio. Die Bezeichnungen sind immer
 * deutsch – unabhängig davon, in welcher Sprache die Anfrage gestellt wurde.
 */
export function buildInquiryEmail(
  inquiry: Inquiry,
  locale: Locale,
): OutgoingMail {
  const services = inquiry.services
    .map((id) => de.services.items[id].title)
    .join(", ");

  const rows: Array<[string, string]> = [
    ["Name", inquiry.name],
    ["Unternehmen", inquiry.company || "–"],
    ["E-Mail", inquiry.email],
    ["Leistung", services],
  ];
  if (inquiry.pkg) rows.push(["Paket", de.pricing.packages[inquiry.pkg].name]);
  rows.push(
    ["Budget", inquiry.budget ? de.contact.budgets[inquiry.budget] : "–"],
    [
      "Zeitrahmen",
      inquiry.timeline ? de.contact.timelines[inquiry.timeline] : "–",
    ],
    ["Sprache", LANGUAGE[locale]],
  );

  const subject = `Projektanfrage von ${inquiry.name}${
    inquiry.company ? ` (${inquiry.company})` : ""
  }`;
  const footer = `Gesendet über das Anfrageformular auf ${siteConfig.url}. Antworten Sie direkt auf diese E-Mail, um ${inquiry.name} zu erreichen.`;

  const labelWidth = Math.max(...rows.map(([label]) => label.length)) + 2;
  const text = [
    "Neue Projektanfrage über die Website",
    "",
    ...rows.map(
      ([label, value]) => `${`${label}:`.padEnd(labelWidth)}${value}`,
    ),
    "",
    "Projektbeschreibung:",
    inquiry.message,
    "",
    "--",
    footer,
  ].join("\n");

  const html = `<!doctype html>
<html lang="de">
<body style="margin:0;padding:24px;background:#f4f4f2;font-family:Helvetica,Arial,sans-serif;color:#111111;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:12px;">
<tr><td style="padding:28px 32px 8px;">
<p style="margin:0;font-size:13px;color:#6b6b6b;">${escapeHtml(siteConfig.name)}</p>
<h1 style="margin:6px 0 0;font-size:22px;line-height:1.25;">Neue Projektanfrage</h1>
</td></tr>
<tr><td style="padding:16px 32px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:15px;line-height:1.5;">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="padding:7px 16px 7px 0;color:#6b6b6b;white-space:nowrap;vertical-align:top;border-top:1px solid #ececea;">${escapeHtml(label)}</td><td style="padding:7px 0;border-top:1px solid #ececea;">${escapeHtml(value)}</td></tr>`,
  )
  .join("\n")}
</table>
</td></tr>
<tr><td style="padding:20px 32px 0;">
<p style="margin:0 0 8px;font-size:13px;color:#6b6b6b;">Projektbeschreibung</p>
<p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(inquiry.message)}</p>
</td></tr>
<tr><td style="padding:24px 32px 28px;">
<p style="margin:0;padding-top:16px;border-top:1px solid #ececea;font-size:12px;line-height:1.5;color:#8a8a8a;">${escapeHtml(footer)}</p>
</td></tr>
</table>
</body>
</html>`;

  return {
    subject,
    text,
    html,
    replyTo: { name: inquiry.name, address: inquiry.email },
  };
}

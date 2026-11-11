import "server-only";

import nodemailer, { type Transporter } from "nodemailer";
import { siteConfig } from "@/config/site";

/**
 * E-Mail-Versand für das Anfrageformular.
 *
 * Zwei Wege, gesteuert über Umgebungsvariablen (siehe .env.example):
 *   1. SMTP   – jedes Postfach (IONOS, Strato, Google Workspace, Mailbox.org …)
 *   2. Resend – HTTP-Dienst, falls kein SMTP-Zugang vorhanden ist
 * Ist beides gesetzt, gewinnt Resend. Ist nichts gesetzt, schlägt der Versand
 * mit `MailNotConfiguredError` fehl – das Formular meldet dann einen Fehler
 * und bietet den Versand per E-Mail-Programm an. Es gibt keinen Scheinversand.
 */

export type OutgoingMail = {
  subject: string;
  text: string;
  html: string;
  /** Absender der Anfrage; Antworten gehen direkt an diese Adresse. */
  replyTo: { name: string; address: string };
};

export class MailNotConfiguredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MailNotConfiguredError";
  }
}

const env = (key: string) => {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
};

/** Welcher Versandweg ist eingerichtet? Für Diagnose und Tests. */
export function mailTransport(): "resend" | "smtp" | "none" {
  if (!env("MAIL_TO")) return "none";
  if (env("RESEND_API_KEY")) return "resend";
  if (env("SMTP_HOST")) return "smtp";
  return "none";
}

let smtp: Transporter | null = null;

function smtpTransporter(): Transporter {
  if (smtp) return smtp;

  const port = Number.parseInt(env("SMTP_PORT") ?? "587", 10);
  const secureSetting = env("SMTP_SECURE");
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");

  smtp = nodemailer.createTransport({
    host: env("SMTP_HOST"),
    port,
    // Port 465 spricht sofort TLS, 587 startet unverschlüsselt und wechselt per STARTTLS.
    secure: secureSetting ? secureSetting === "true" : port === 465,
    auth: user && pass ? { user, pass } : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return smtp;
}

async function sendViaSmtp(mail: OutgoingMail, to: string) {
  const from = env("MAIL_FROM") ?? env("SMTP_USER");
  if (!from) {
    throw new MailNotConfiguredError(
      "MAIL_FROM (oder SMTP_USER) fehlt: Absenderadresse für den Versand eintragen.",
    );
  }

  await smtpTransporter().sendMail({
    from,
    to,
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });
}

async function sendViaResend(mail: OutgoingMail, to: string) {
  // Ohne eigene, bei Resend bestätigte Domain erlaubt Resend nur diesen Testabsender.
  const from =
    env("MAIL_FROM") ?? `${siteConfig.name} Website <onboarding@resend.dev>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: mail.replyTo.address,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Resend antwortet mit ${response.status}: ${detail.slice(0, 300)}`,
    );
  }
}

/** Verschickt eine E-Mail an die in MAIL_TO hinterlegte Adresse. */
export async function sendMail(mail: OutgoingMail): Promise<void> {
  const to = env("MAIL_TO");
  if (!to) {
    throw new MailNotConfiguredError(
      "MAIL_TO fehlt: Adresse eintragen, an die Anfragen gehen sollen.",
    );
  }

  switch (mailTransport()) {
    case "resend":
      return sendViaResend(mail, to);
    case "smtp":
      return sendViaSmtp(mail, to);
    default:
      throw new MailNotConfiguredError(
        "Kein Versandweg eingerichtet: SMTP_HOST (mit SMTP_USER/SMTP_PASS) oder RESEND_API_KEY setzen.",
      );
  }
}

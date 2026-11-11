import { z } from "zod";
import {
  budgetIds,
  timelineIds,
  validateInquiry,
  type Inquiry,
} from "@/content/inquiry";
import { packageIds } from "@/content/pricing";
import { serviceIds } from "@/content/services";
import { locales } from "@/i18n/config";
import { buildInquiryEmail } from "@/lib/inquiry-email";
import { MailNotConfiguredError, sendMail } from "@/lib/mail";
import { rateLimit } from "@/lib/rate-limit";

/**
 * POST /api/inquiry – nimmt eine Projektanfrage entgegen und schickt sie per
 * E-Mail an das Studio (siehe src/lib/mail.ts).
 *
 * Antworten:
 *   200 { ok: true }                         Anfrage verschickt
 *   400 { error: "validation", fields }      Eingaben unvollständig
 *   400 { error: "invalid" }                 Anfrage nicht lesbar
 *   403 { error: "forbidden" }               Aufruf von fremder Website
 *   429 { error: "rate_limited" }            zu viele Anfragen
 *   502 { error: "send_failed" }             Versand fehlgeschlagen
 *   503 { error: "not_configured" }          Versand nicht eingerichtet
 */

const MAX_BODY = 64 * 1024;

/** Grobe Form der Anfrage. Die inhaltliche Prüfung übernimmt `validateInquiry`. */
const shape = z.object({
  name: z.string().max(1000),
  company: z.string().max(1000).default(""),
  email: z.string().max(1000),
  services: z.array(z.enum(serviceIds)).max(serviceIds.length),
  budget: z.union([z.enum(budgetIds), z.literal("")]),
  timeline: z.union([z.enum(timelineIds), z.literal("")]),
  message: z.string().max(50_000),
  pkg: z.enum(packageIds).nullish(),
  locale: z.enum(locales).default("de"),
  /** Honeypot: Dieses Feld sehen nur Bots. */
  website: z.string().max(1000).default(""),
  /** Millisekunden zwischen Anzeige und Absenden des Formulars. */
  elapsed: z.number().finite().optional(),
});

const singleLine = (value: string) => value.replace(/[\r\n\t]+/g, " ").trim();

const json = (body: unknown, status: number, headers?: HeadersInit) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // z. B. curl oder ältere Browser: kein Origin-Header
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "forbidden" }, 403);

  let payload: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY) return json({ error: "invalid" }, 413);
    payload = JSON.parse(raw);
  } catch {
    return json({ error: "invalid" }, 400);
  }

  const parsed = shape.safeParse(payload);
  if (!parsed.success) return json({ error: "invalid" }, 400);
  const data = parsed.data;

  // Bots füllen das versteckte Feld aus oder senden schneller, als ein Mensch
  // tippen kann. Sie bekommen eine Erfolgsmeldung, aber es geht keine E-Mail raus.
  if (
    data.website !== "" ||
    (data.elapsed !== undefined && data.elapsed < 2500)
  ) {
    return json({ ok: true }, 200);
  }

  const inquiry: Inquiry = {
    name: singleLine(data.name),
    company: singleLine(data.company),
    email: singleLine(data.email),
    services: [...new Set(data.services)],
    budget: data.budget,
    timeline: data.timeline,
    message: data.message.trim(),
    pkg: data.pkg ?? null,
  };

  const fields = validateInquiry(inquiry);
  if (Object.keys(fields).length > 0) {
    return json({ error: "validation", fields }, 400);
  }

  const limit = rateLimit(`inquiry:${clientIp(request)}`, {
    max: 5,
    windowMs: 10 * 60_000,
  });
  if (!limit.ok) {
    return json({ error: "rate_limited" }, 429, {
      "Retry-After": String(limit.retryAfterSeconds),
    });
  }

  try {
    await sendMail(buildInquiryEmail(inquiry, data.locale));
    return json({ ok: true }, 200);
  } catch (error) {
    if (error instanceof MailNotConfiguredError) {
      console.error(
        `[Anfrageformular] Versand nicht eingerichtet: ${error.message} Siehe .env.example und README.`,
      );
      return json({ error: "not_configured" }, 503);
    }
    console.error("[Anfrageformular] Versand fehlgeschlagen:", error);
    return json({ error: "send_failed" }, 502);
  }
}

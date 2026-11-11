import "server-only";

/**
 * Einfache Bremse gegen Massenanfragen: höchstens `max` Aufrufe je Schlüssel
 * im Zeitfenster. Der Zähler liegt im Arbeitsspeicher der Server-Instanz –
 * auf Vercel also je Funktions-Instanz. Das hält Skripte auf, ersetzt aber
 * keinen verteilten Zähler (z. B. Upstash), falls einmal echter Missbrauch
 * auftritt.
 */
const hits = new Map<string, number[]>();

export function rateLimit(
  key: string,
  { max, windowMs }: { max: number; windowMs: number },
): { ok: true } | { ok: false; retryAfterSeconds: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= max) {
    hits.set(key, recent);
    return {
      ok: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((recent[0] + windowMs - now) / 1000),
      ),
    };
  }

  recent.push(now);
  hits.set(key, recent);

  // Alte Einträge gelegentlich aufräumen, damit die Liste nicht wächst.
  if (hits.size > 5000) {
    for (const [entry, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(entry);
    }
  }

  return { ok: true };
}

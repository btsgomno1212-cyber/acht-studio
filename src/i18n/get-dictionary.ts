import "server-only";

import { de, type Dictionary } from "./dictionaries/de";
import { en } from "./dictionaries/en";
import { ru } from "./dictionaries/ru";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { de, en, ru };

/**
 * Liefert alle Texte einer Sprache. Läuft nur auf dem Server – Client-
 * Komponenten bekommen die Textabschnitte, die sie brauchen, als Props.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };

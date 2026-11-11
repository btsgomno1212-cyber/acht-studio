"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dictionary } from "@/i18n/dictionaries/de";

/**
 * Texte, die Client-Komponenten ohne eigene Props brauchen – etwa die
 * Fehlerseite (error.tsx bekommt von Next.js keine Sprache übergeben).
 */
export type UiText = {
  error: Dictionary["error"];
};

const UiTextContext = createContext<UiText | null>(null);

export function UiTextProvider({
  value,
  children,
}: {
  value: UiText;
  children: ReactNode;
}) {
  return (
    <UiTextContext.Provider value={value}>{children}</UiTextContext.Provider>
  );
}

export function useUiText(): UiText | null {
  return useContext(UiTextContext);
}

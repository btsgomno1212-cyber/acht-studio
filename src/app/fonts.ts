import localFont from "next/font/local";

/**
 * Archivo als variable Schrift (Gewicht 100–900, Breite 62–125 %).
 * Die Datei liegt lokal im Projekt – beim Aufruf der Seite wird keine
 * Verbindung zu einem Schriftanbieter aufgebaut.
 * Lizenz: SIL Open Font License, siehe src/fonts/OFL.txt
 */
export const archivo = localFont({
  src: "../fonts/Archivo-Variable-Latin.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

/**
 * Roboto Flex nur mit kyrillischen Zeichen – für die russische Fassung.
 * Archivo enthält keine Kyrillik; der Browser nimmt fehlende Zeichen
 * automatisch aus dieser Schrift. Auch sie kann schmal laufen (Breite 25–151 %),
 * damit die Überschriften im selben Stil bleiben.
 * Lizenz: SIL Open Font License, siehe src/fonts/OFL-RobotoFlex.txt
 */
export const cyrillic = localFont({
  src: "../fonts/RobotoFlex-Variable-Cyrillic.woff2",
  variable: "--font-cyrillic",
  weight: "100 1000",
  display: "swap",
  preload: false,
  declarations: [
    { prop: "font-stretch", value: "25% 151%" },
    {
      prop: "unicode-range",
      value: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
    },
  ],
  // Keine Ersatzschriften: Sonst würde der Browser auch lateinische Zeichen
  // aus Arial nehmen, bevor er Archivo erreicht (siehe --font-sans).
  fallback: [],
  adjustFontFallback: false,
});

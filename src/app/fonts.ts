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

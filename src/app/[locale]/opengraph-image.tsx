import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

/**
 * Vorschaubild für geteilte Links (Open Graph, 1200 × 630). Wird beim Build
 * je Sprache erzeugt: Name und Überschrift kommen aus der Konfiguration und
 * den Wörterbüchern, die Formen aus einem Standbild der Hero-Szene.
 */
export const alt = `${siteConfig.name} – Websites, 3D Design, Branding, UI/UX`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Schriften und Motiv. Die Pfade stehen wörtlich im Code, damit der Build
 * genau diese drei Dateien in die Auslieferung aufnimmt. Das Ergebnis wird
 * zwischengespeichert, das Bild entsteht so schon beim Build.
 */
async function loadAssets() {
  "use cache";
  const [condensed, regular, shapes, condensedCyr, regularCyr] =
    await Promise.all([
      readFile(
        join(process.cwd(), "src/fonts/Archivo-Condensed-ExtraBold.ttf"),
        "base64",
      ),
      readFile(join(process.cwd(), "src/fonts/Archivo-Regular.ttf"), "base64"),
      readFile(join(process.cwd(), "src/assets/og-shapes.png"), "base64"),
      // Kyrillische Zeichen für die russische Fassung (Archivo hat keine).
      readFile(
        join(process.cwd(), "src/fonts/RobotoFlex-Condensed-Cyrillic.ttf"),
        "base64",
      ),
      readFile(
        join(process.cwd(), "src/fonts/RobotoFlex-Regular-Cyrillic.ttf"),
        "base64",
      ),
    ]);
  return { condensed, regular, shapes, condensedCyr, regularCyr };
}

const toBuffer = (base64: string) => Buffer.from(base64, "base64");

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: code } = await params;
  const locale = isLocale(code) ? code : defaultLocale;
  const dict = getDictionary(locale);

  const assets = await loadAssets();
  const shapesUrl = `data:image/png;base64,${assets.shapes}`;

  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#080808",
        color: "#ffffff",
        fontFamily: "Archivo, Cyrillic",
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        src={shapesUrl}
        width={700}
        height={700}
        style={{ position: "absolute", top: -34, right: -76 }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          padding: "54px 64px 58px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="30" height="45" viewBox="0 0 20 30">
            <circle
              cx="10"
              cy="7.4"
              r="5.9"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.9"
            />
            <circle cx="10" cy="21.2" r="8.4" fill="#ffffff" />
          </svg>
          <span
            style={{
              fontFamily: "Archivo Condensed, Cyrillic Condensed",
              fontSize: 50,
              lineHeight: 1,
              letterSpacing: 1,
            }}
          >
            {siteConfig.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Archivo Condensed, Cyrillic Condensed",
              fontSize: 122,
              lineHeight: 0.92,
            }}
          >
            {dict.hero.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          <span style={{ marginTop: 30, fontSize: 30, color: "#b4b4b4" }}>
            {dict.meta.ogTagline}
          </span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Archivo Condensed",
          data: toBuffer(assets.condensed),
          weight: 800,
          style: "normal",
        },
        {
          name: "Archivo",
          data: toBuffer(assets.regular),
          weight: 400,
          style: "normal",
        },
        {
          name: "Cyrillic Condensed",
          data: toBuffer(assets.condensedCyr),
          weight: 800,
          style: "normal",
        },
        {
          name: "Cyrillic",
          data: toBuffer(assets.regularCyr),
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}

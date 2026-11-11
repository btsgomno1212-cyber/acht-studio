import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { de } from "@/i18n/dictionaries/de";

/** Angaben für "Zum Startbildschirm hinzufügen" auf Smartphones. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: de.meta.description,
    start_url: "/",
    display: "browser",
    background_color: "#080808",
    theme_color: "#080808",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}

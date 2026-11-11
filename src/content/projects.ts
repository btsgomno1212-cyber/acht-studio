/**
 * Konzeptprojekte für die Galerie.
 *
 * Alle Einträge sind eigene Studien mit frei erfundenen Marken – keine
 * Kundenaufträge. Sobald echte Projekte vorliegen: Eintrag ergänzen,
 * `concept: false` setzen und ein Cover in `src/components/visuals/covers.tsx`
 * (oder ein Bild) hinterlegen.
 */
export const workCategories = ["websites", "3d", "branding", "uiux"] as const;

export type WorkCategory = (typeof workCategories)[number];

export const projectIds = [
  "lumo",
  "nuvra",
  "kardo",
  "runa",
  "arven",
  "mono",
  "vela",
  "kontor",
] as const;

export type ProjectId = (typeof projectIds)[number];

export type Project = {
  id: ProjectId;
  category: WorkCategory;
  concept: boolean;
  /** Breite Kachel im Raster (nimmt mehr Spalten ein). */
  wide?: boolean;
};

export const projects: Project[] = [
  { id: "lumo", category: "websites", concept: true, wide: true },
  { id: "nuvra", category: "3d", concept: true },
  { id: "kardo", category: "branding", concept: true },
  { id: "runa", category: "uiux", concept: true, wide: true },
  { id: "arven", category: "websites", concept: true, wide: true },
  { id: "mono", category: "3d", concept: true },
  { id: "vela", category: "branding", concept: true },
  { id: "kontor", category: "uiux", concept: true, wide: true },
];

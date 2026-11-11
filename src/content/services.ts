/** Die vier Disziplinen des Studios. Texte dazu stehen in den Wörterbüchern. */
export const serviceIds = ["web", "3d", "graphic", "uiux"] as const;

export type ServiceId = (typeof serviceIds)[number];

/** URL-Teil der Detailseite, z. B. /de/services/website-development */
export const serviceSlugs: Record<ServiceId, string> = {
  web: "website-development",
  "3d": "3d-design",
  graphic: "graphic-design",
  uiux: "ui-ux-design",
};

export const serviceBySlug = (slug: string): ServiceId | undefined =>
  serviceIds.find((id) => serviceSlugs[id] === slug);

export const isServiceId = (value: string): value is ServiceId =>
  (serviceIds as readonly string[]).includes(value);

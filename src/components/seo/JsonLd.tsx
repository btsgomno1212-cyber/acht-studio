/** Strukturierte Daten (schema.org) für Suchmaschinen. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // "<" maskieren, damit Inhalte das Skript-Element nicht verlassen können.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";

/** Fehlen noch Pflichtangaben in src/config/site.ts? */
export const legalIncomplete = () => {
  const { company, owner, street, city } = siteConfig.legal;
  return !company || !owner || !street || !city;
};

/** Gemeinsamer Rahmen für Impressum und Datenschutzerklärung. */
export function LegalPage({
  title,
  note,
  children,
}: {
  title: string;
  /** Hinweis für den Betreiber, solange Angaben fehlen */
  note?: string;
  children: ReactNode;
}) {
  return (
    <article className="shell pt-32 pb-[clamp(5rem,3rem+8vw,10rem)] sm:pt-40">
      <div className="max-w-[46rem]">
        <h1 className="display text-display">
          <span className="line-mask">
            <span
              className="block animate-rise"
              style={{ animationDelay: "120ms" }}
            >
              {title}
            </span>
          </span>
        </h1>

        {note ? (
          <p className="mt-10 rounded-field border border-neon/40 bg-neon/[0.06] p-5 text-[0.9375rem] text-paper/90">
            {note}
          </p>
        ) : null}

        <div className="mt-12 flex flex-col gap-11">{children}</div>
      </div>
    </article>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[1.375rem] leading-tight font-medium">{title}</h2>
      <div className="mt-4 flex flex-col gap-3 text-mute [&_a]:text-paper [&_a]:underline [&_a]:underline-offset-4 [&_address]:not-italic">
        {children}
      </div>
    </section>
  );
}

/** Anschrift aus src/config/site.ts; leere Felder erscheinen als Platzhalter. */
export function PostalAddress({ missing }: { missing: string }) {
  const { company, street, city, country } = siteConfig.legal;
  return (
    <address>
      {company || missing}
      <br />
      {street || missing}
      <br />
      {city || missing}
      <br />
      {country}
    </address>
  );
}

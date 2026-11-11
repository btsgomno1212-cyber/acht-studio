"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useUiText } from "@/components/layout/UiText";
import { buttonClass } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { defaultLocale, isLocale } from "@/i18n/config";

/** Fehlerseite: erscheint, wenn eine Seite beim Laden abbricht. */
export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const params = useParams<{ locale?: string }>();
  const locale = isLocale(params?.locale) ? params.locale : defaultLocale;
  const text = useUiText()?.error ?? {
    title: "Die Seite konnte nicht geladen werden",
    text: "Laden Sie die Seite neu. Wenn der Fehler bleibt, schreiben Sie uns eine E-Mail.",
    retry: "Seite neu laden",
    home: "Zur Startseite",
  };

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      role="alert"
      className="shell flex min-h-svh flex-col justify-center pt-32 pb-20"
    >
      <h1 className="display max-w-[16ch] text-display">{text.title}</h1>
      <p className="mt-5 max-w-[44ch] text-lead text-mute">{text.text}</p>
      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="button"
          onClick={() => retry()}
          className={buttonClass("primary", "lg")}
        >
          {text.retry}
        </button>
        <Link href={`/${locale}`} className={buttonClass("secondary", "lg")}>
          {text.home}
        </Link>
        <a
          href={`mailto:${siteConfig.email}`}
          className="link-underline text-mute transition-colors duration-300 hover:text-paper"
        >
          {siteConfig.email}
        </a>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  LegalPage,
  LegalSection,
  PostalAddress,
  legalIncomplete,
} from "@/components/legal/LegalPage";
import { siteConfig } from "@/config/site";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";

type Props = PageProps<"/[locale]/datenschutz">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const text = getDictionary(locale).legal.privacy;

  return pageMetadata({
    locale,
    path: "/datenschutz",
    title: text.title,
    description: text.description,
    index: false,
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { legal } = getDictionary(locale);
  const text = legal.privacy;

  return (
    <LegalPage
      title={text.title}
      note={legalIncomplete() ? legal.templateNote : undefined}
    >
      {text.sections.map((section) => (
        <LegalSection key={section.title} title={section.title}>
          {section.body.map((paragraph) =>
            // "{controller}" steht für die Anschrift des Verantwortlichen.
            paragraph === "{controller}" ? (
              <div key={paragraph}>
                <PostalAddress missing={legal.missing} />
                <p className="mt-3">
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </p>
              </div>
            ) : (
              <p key={paragraph}>{paragraph}</p>
            ),
          )}
        </LegalSection>
      ))}
    </LegalPage>
  );
}

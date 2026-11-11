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

type Props = PageProps<"/[locale]/impressum">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const text = getDictionary(locale).legal.imprint;

  return pageMetadata({
    locale,
    path: "/impressum",
    title: text.title,
    description: text.description,
    index: false,
  });
}

export default async function ImprintPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { legal } = getDictionary(locale);
  const text = legal.imprint;
  const data = siteConfig.legal;

  return (
    <LegalPage
      title={text.title}
      note={legalIncomplete() ? legal.templateNote : undefined}
    >
      <LegalSection title={text.providerTitle}>
        <PostalAddress missing={legal.missing} />
        <p>
          {text.representedBy}: {data.owner || legal.missing}
        </p>
      </LegalSection>

      <LegalSection title={text.contactTitle}>
        <p>
          {data.phone ? (
            <>
              {text.phone}:{" "}
              <a href={`tel:${data.phone.replace(/[^\d+]/g, "")}`}>
                {data.phone}
              </a>
              <br />
            </>
          ) : null}
          {text.email}:{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>
      </LegalSection>

      {data.vatId ? (
        <LegalSection title={text.vatTitle}>
          <p>
            {text.vatText} {data.vatId}
          </p>
        </LegalSection>
      ) : null}

      {data.register ? (
        <LegalSection title={text.registerTitle}>
          <p>{data.register}</p>
        </LegalSection>
      ) : null}

      <LegalSection title={text.responsibleTitle}>
        <p>{text.responsibleText}</p>
        <address>
          {data.owner || legal.missing}
          <br />
          {data.street || legal.missing}
          <br />
          {data.city || legal.missing}
        </address>
      </LegalSection>

      <LegalSection title={text.disputeTitle}>
        <p>{text.disputeText}</p>
      </LegalSection>

      <LegalSection title={text.conceptTitle}>
        <p>{text.conceptText}</p>
      </LegalSection>
    </LegalPage>
  );
}

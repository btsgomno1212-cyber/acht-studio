import { notFound } from "next/navigation";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Studio } from "@/components/sections/Studio";
import { Work } from "@/components/sections/Work";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { faqSchema, studioSchema } from "@/lib/structured-data";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <JsonLd data={studioSchema(locale, dict)} />
      <JsonLd data={faqSchema(dict)} />

      <Hero locale={locale} hero={dict.hero} />
      <Services
        locale={locale}
        services={dict.services}
        visuals={dict.visuals}
      />
      <Work work={dict.work} visuals={dict.visuals} />
      <Process process={dict.process} />
      <Pricing locale={locale} pricing={dict.pricing} />
      <Studio studio={dict.studio} />
      <Faq faq={dict.faq} />
      <Contact locale={locale} dict={dict} />
    </>
  );
}

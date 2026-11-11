import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryLink } from "@/components/form/InquiryLink";
import { PackageCard } from "@/components/pricing/PackageCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { buttonClass } from "@/components/ui/button";
import { LightSwitch } from "@/components/ui/LightSwitch";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { SectionLink } from "@/components/ui/SectionLink";
import { StatePill } from "@/components/ui/StatePill";
import { ServiceVisual } from "@/components/visuals/covers";
import { packagesFor } from "@/content/pricing";
import { serviceBySlug, serviceIds, serviceSlugs } from "@/content/services";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/structured-data";

type Props = PageProps<"/[locale]/services/[slug]">;

export function generateStaticParams() {
  return serviceIds.map((id) => ({ slug: serviceSlugs[id] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const id = serviceBySlug(slug);
  if (!isLocale(locale) || !id) return {};
  const item = getDictionary(locale).services.items[id];

  return pageMetadata({
    locale,
    path: `/services/${slug}`,
    title: item.title,
    description: `${item.short} ${item.lead}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  const id = serviceBySlug(slug);
  if (!isLocale(locale) || !id) notFound();

  const dict = getDictionary(locale);
  const item = dict.services.items[id];
  const page = dict.servicePage;
  const group = packagesFor(id);
  const others = serviceIds.filter((other) => other !== id);

  return (
    <article>
      <JsonLd data={serviceSchema(locale, dict, id)} />

      {/* Kopf */}
      <header className="shell pt-32 sm:pt-40">
        <SectionLink
          locale={locale}
          section="services"
          className="inline-flex items-center gap-2 text-[0.9375rem] text-mute transition-colors duration-300 hover:text-paper"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          {page.back}
        </SectionLink>

        <div className="mt-8 grid gap-x-10 gap-y-7 lg:grid-cols-12 lg:items-end">
          <h1 className="display text-display lg:col-span-8">
            <span className="line-mask">
              <span
                className="block animate-rise"
                style={{ animationDelay: "120ms" }}
              >
                {item.title}
              </span>
            </span>
          </h1>
          <div
            className="animate-fade-in lg:col-span-4"
            style={{ animationDelay: "420ms" }}
          >
            <p className="max-w-[34ch] text-lead text-mute">{item.lead}</p>
            <InquiryLink
              locale={locale}
              service={id}
              className={buttonClass("primary", "lg", "mt-7")}
            >
              {dict.nav.cta}
            </InquiryLink>
          </div>
        </div>

        <LightSwitch
          mode="view"
          className="stage mt-12 h-[clamp(17rem,54vw,40rem)] rounded-panel border border-line bg-coal lg:mt-16"
        >
          <ServiceVisual id={id} visuals={dict.visuals} />
          <StatePill
            from={item.states[0]}
            to={item.states[1]}
            className="absolute top-4 left-4 sm:top-5 sm:left-5"
          />
        </LightSwitch>
      </header>

      {/* Beschreibung und Leistungsumfang */}
      <section className="shell section-y grid gap-x-10 gap-y-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="max-w-[34ch] text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] leading-[1.35]">
            {item.intro}
          </p>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="display text-title">
            <RevealText text={page.includes} />
          </h2>
          <Reveal delay={0.08}>
            <ul className="mt-7 border-t border-line">
              {item.deliverables.map((entry) => (
                <li
                  key={entry}
                  className="flex gap-4 border-b border-line py-4"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-[0.3rem] size-[1.125rem] shrink-0 text-neon"
                  />
                  <span>{entry}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <h2 className="display mt-16 text-title">
            <RevealText text={page.useCases} />
          </h2>
          <Reveal delay={0.08}>
            <ul className="mt-7 flex flex-wrap gap-2">
              {item.useCases.map((entry) => (
                <li
                  key={entry}
                  className="rounded-full border border-line-strong px-4 py-2.5 text-[0.9375rem]"
                >
                  {entry}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Pakete */}
      <section className="shell pb-[clamp(3.75rem,2.5rem+5.4vw,7.75rem)]">
        <div className="grid gap-x-10 gap-y-5 lg:grid-cols-12 lg:items-end">
          <h2 className="display text-title lg:col-span-7">
            <RevealText text={group ? page.pricingTitle : page.customTitle} />
          </h2>
          <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[44ch] text-mute">
              {group ? page.pricingText : page.customText}
            </p>
          </Reveal>
        </div>

        <Reveal>
          {group ? (
            <ul className="mt-10 grid gap-5 lg:grid-cols-3 lg:gap-6">
              {group.packages.map((pkg) => (
                <li key={pkg.id}>
                  <PackageCard
                    locale={locale}
                    service={group.service}
                    pkg={pkg}
                    pricing={dict.pricing}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <InquiryLink
              locale={locale}
              service={id}
              className={buttonClass("secondary", "lg", "mt-8")}
            >
              {dict.pricing.cta}
            </InquiryLink>
          )}
          <p className="mt-6 max-w-[70ch] text-[0.875rem] text-faint">
            {dict.pricing.note}
          </p>
        </Reveal>
      </section>

      {/* Weitere Leistungen */}
      <section className="shell pb-[clamp(3.75rem,2.5rem+5.4vw,7.75rem)]">
        <h2 className="text-[0.9375rem] text-faint">{page.others}</h2>
        <ul className="mt-4 border-t border-line">
          {others.map((other) => {
            const entry = dict.services.items[other];
            return (
              <li key={other} className="border-b border-line">
                <Link
                  href={`/${locale}/services/${serviceSlugs[other]}`}
                  prefetch={true}
                  className="group grid items-center gap-x-8 gap-y-2 py-7 sm:grid-cols-[1fr_auto] lg:grid-cols-[minmax(0,5fr)_minmax(0,5fr)_auto] lg:py-9"
                >
                  <span className="display text-title transition-colors duration-500 ease-expo group-hover:text-neon">
                    {entry.title}
                  </span>
                  <span className="max-w-[42ch] text-mute max-lg:hidden">
                    {entry.short}
                  </span>
                  <span className="grid size-12 place-items-center rounded-full border border-line-strong transition-colors duration-500 ease-expo group-hover:border-neon group-hover:bg-neon group-hover:text-ink max-sm:hidden">
                    <ArrowUpRight aria-hidden="true" className="size-5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Abschluss */}
      <section className="shell pb-[clamp(5rem,3rem+8vw,10rem)]">
        <div
          data-lit
          className="flex flex-col gap-8 rounded-panel border border-line bg-coal p-8 sm:p-12 lg:flex-row lg:items-end lg:justify-between lg:p-16"
        >
          <div>
            <h2 className="display max-w-[14ch] text-display">
              <RevealText text={page.ctaTitle} />
            </h2>
            <p className="mt-6 max-w-[40ch] text-lead text-mute">
              {dict.contact.intro}
            </p>
          </div>
          <InquiryLink
            locale={locale}
            service={id}
            className={buttonClass(
              "primary",
              "lg",
              "shrink-0 self-start lg:self-auto",
            )}
          >
            {dict.nav.cta}
          </InquiryLink>
        </div>
      </section>
    </article>
  );
}

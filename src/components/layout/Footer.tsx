import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SectionLink } from "@/components/ui/SectionLink";
import { hasWhatsapp, siteConfig, whatsappUrl } from "@/config/site";
import { serviceIds, serviceSlugs } from "@/content/services";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { LanguageSwitcher } from "./LanguageSwitcher";

const SECTIONS = [
  "services",
  "work",
  "process",
  "pricing",
  "studio",
  "faq",
  "contact",
] as const;

const link =
  "link-underline text-mute transition-colors duration-300 hover:text-paper";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { footer, nav } = dict;
  const name = siteConfig.name;

  return (
    <footer className="border-t border-line">
      <div className="shell pt-16 pb-10 lg:pt-24">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <SectionLink
              locale={locale}
              section="top"
              aria-label={`${name} – ${dict.a11y.home}`}
              className="inline-block rounded-full"
            >
              <Logo />
            </SectionLink>
            <p className="mt-5 max-w-[30ch] text-mute">{footer.claim}</p>
            <LanguageSwitcher
              locale={locale}
              label={dict.a11y.language}
              switchTo={dict.a11y.switchTo}
              className="mt-7 inline-flex"
            />
          </div>

          <nav aria-label={footer.navTitle} className="lg:col-span-2">
            <h2 className="text-[0.875rem] text-faint">{footer.navTitle}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SECTIONS.map((section) => (
                <li key={section}>
                  <SectionLink
                    locale={locale}
                    section={section}
                    className={link}
                  >
                    {nav[section]}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={footer.servicesTitle} className="lg:col-span-3">
            <h2 className="text-[0.875rem] text-faint">
              {footer.servicesTitle}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {serviceIds.map((id) => (
                <li key={id}>
                  <Link
                    href={`/${locale}/services/${serviceSlugs[id]}`}
                    className={link}
                  >
                    {dict.services.items[id].title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-9 lg:col-span-3 lg:block">
            <div>
              <h2 className="text-[0.875rem] text-faint">
                {footer.contactTitle}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <a href={`mailto:${siteConfig.email}`} className={link}>
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  {hasWhatsapp ? (
                    <a
                      href={whatsappUrl(dict.whatsapp.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={link}
                    >
                      {dict.whatsapp.label}
                    </a>
                  ) : null}
                </li>
                {siteConfig.social.map((profile) => (
                  <li key={profile.href}>
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={link}
                    >
                      {profile.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:mt-9">
              <h2 className="text-[0.875rem] text-faint">
                {footer.legalTitle}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <Link href={`/${locale}/impressum`} className={link}>
                    {footer.imprint}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/datenschutz`} className={link}>
                    {footer.privacy}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/*
          Wortmarke als Umriss über die ganze Breite. Die Schriftgröße richtet
          sich nach der Länge des Namens, damit auch längere Namen passen.
        */}
        <div className="@container mt-16 lg:mt-24">
          <p
            aria-hidden="true"
            className="display numeral-outline leading-[0.8] whitespace-nowrap select-none hover:text-paper hover:[-webkit-text-stroke-color:var(--color-paper)]"
            style={{
              fontSize: `min(${(200 / Math.max(name.length, 3)).toFixed(2)}cqw, 64svh)`,
            }}
          >
            {name}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-[0.875rem] text-faint sm:flex-row sm:items-center sm:justify-between sm:pr-48">
          <p>
            © {name}. {footer.rights}
          </p>
          <p className="max-w-[52ch] sm:text-center">{footer.conceptNote}</p>
          <SectionLink
            locale={locale}
            section="top"
            className="inline-flex items-center gap-1.5 self-start text-mute transition-colors duration-300 hover:text-paper sm:self-auto"
          >
            <ArrowUp aria-hidden="true" className="size-4" />
            {footer.backToTop}
          </SectionLink>
        </div>
      </div>
    </footer>
  );
}

import { Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/form/ContactForm";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { hasWhatsapp, siteConfig, whatsappUrl } from "@/config/site";
import { packageIds, type PackageId } from "@/content/pricing";
import { serviceIds, type ServiceId } from "@/content/services";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";

type ContactProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Contact({ locale, dict }: ContactProps) {
  const { contact } = dict;

  const serviceLabels = Object.fromEntries(
    serviceIds.map((id) => [id, dict.services.items[id].title]),
  ) as Record<ServiceId, string>;
  const packageLabels = Object.fromEntries(
    packageIds.map((id) => [id, dict.pricing.packages[id].name]),
  ) as Record<PackageId, string>;

  const direct =
    "group flex items-center gap-4 border-b border-line py-5 transition-colors duration-300 ease-expo hover:border-paper";

  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      className="section-y outline-none"
    >
      <div className="shell grid gap-x-10 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="display text-display">
            <RevealText text={contact.title} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[38ch] text-lead text-mute">
              {contact.intro}
            </p>

            <div className="mt-12 max-w-md lg:mt-16">
              <h3 className="text-[0.9375rem] text-faint">
                {contact.directTitle}
              </h3>
              <div className="mt-3 border-t border-line">
                <a href={`mailto:${siteConfig.email}`} className={direct}>
                  <Mail
                    aria-hidden="true"
                    className="size-5 shrink-0 text-mute transition-colors duration-300 group-hover:text-neon"
                  />
                  <span className="min-w-0">
                    <span className="block text-[0.875rem] text-faint">
                      {contact.emailLabel}
                    </span>
                    <span className="block truncate text-[1.1875rem] font-medium">
                      {siteConfig.email}
                    </span>
                  </span>
                </a>
                {hasWhatsapp ? (
                  <a
                    href={whatsappUrl(dict.whatsapp.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={direct}
                  >
                    <MessageCircle
                      aria-hidden="true"
                      className="size-5 shrink-0 text-mute transition-colors duration-300 group-hover:text-neon"
                    />
                    <span className="min-w-0">
                      <span className="block text-[0.875rem] text-faint">
                        {contact.whatsappLabel}
                      </span>
                      <span className="block text-[1.1875rem] font-medium">
                        {dict.whatsapp.label}
                      </span>
                    </span>
                  </a>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7">
          <div className="rounded-panel border border-line bg-coal p-6 sm:p-10">
            <ContactForm
              locale={locale}
              contact={contact}
              serviceLabels={serviceLabels}
              packageLabels={packageLabels}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

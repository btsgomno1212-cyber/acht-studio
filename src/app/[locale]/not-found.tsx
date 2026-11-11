import Link from "next/link";
import { locale as rootLocale } from "next/root-params";
import { buttonClass } from "@/components/ui/button";
import { SectionLink } from "@/components/ui/SectionLink";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function NotFound() {
  const code = await rootLocale();
  const locale = isLocale(code) ? code : defaultLocale;
  const text = getDictionary(locale).notFound;

  return (
    <section className="shell flex min-h-svh flex-col justify-center pt-32 pb-20">
      <p
        aria-hidden="true"
        className="display numeral-outline text-[clamp(8rem,34vw,26rem)] leading-[0.78]"
      >
        {text.code}
      </p>
      <h1 className="display mt-8 text-display">{text.title}</h1>
      <p className="mt-5 max-w-[44ch] text-lead text-mute">{text.text}</p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href={`/${locale}`} className={buttonClass("primary", "lg")}>
          {text.home}
        </Link>
        <SectionLink
          locale={locale}
          section="contact"
          className={buttonClass("secondary", "lg")}
        >
          {text.contact}
        </SectionLink>
      </div>
    </section>
  );
}

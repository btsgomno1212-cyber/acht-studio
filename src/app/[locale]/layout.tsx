import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { PointerLight } from "@/components/ui/PointerLight";
import { hasWhatsapp, siteConfig } from "@/config/site";
import { isLocale, locales, localeTags } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";
import { archivo } from "../fonts";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const base = pageMetadata({ locale, description: dict.meta.description });

  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    ...base,
    title: {
      default: dict.meta.title,
      template: `%s – ${siteConfig.name}`,
    },
    openGraph: { ...base.openGraph, title: dict.meta.title },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <html lang={localeTags[locale].html} className={archivo.variable}>
      <head>
        {/*
          Automatische Übersetzung im Browser (z. B. Google Translate) ersetzt
          Textknoten. React stürzt danach beim nächsten Update ab
          (removeChild/insertBefore auf fremden Knoten). Dieser Schutz fängt
          genau diesen Fall ab, statt die Fehlerseite zu zeigen.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof Node!=="function"||!Node.prototype)return;var r=Node.prototype.removeChild;Node.prototype.removeChild=function(c){if(c&&c.parentNode!==this){return c}return r.apply(this,arguments)};var i=Node.prototype.insertBefore;Node.prototype.insertBefore=function(n,ref){if(ref&&ref.parentNode!==this){return n}return i.apply(this,arguments)}})();`,
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-full bg-paper px-5 py-3 font-medium text-ink transition-transform duration-300 focus-visible:translate-y-0"
        >
          {dict.a11y.skip}
        </a>

        <Providers text={{ error: dict.error }}>
          <Header
            locale={locale}
            nav={dict.nav}
            a11y={dict.a11y}
            whatsapp={dict.whatsapp}
          />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer locale={locale} dict={dict} />
          {hasWhatsapp ? (
            <WhatsAppButton
              label={dict.whatsapp.label}
              aria={dict.whatsapp.aria}
              message={dict.whatsapp.message}
            />
          ) : null}
        </Providers>

        <PointerLight />

        {/* Ohne JavaScript bleiben Inhalte sichtbar, die sonst erst beim Scrollen einblenden. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}[data-faq-panel]{grid-template-rows:1fr!important;opacity:1!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}

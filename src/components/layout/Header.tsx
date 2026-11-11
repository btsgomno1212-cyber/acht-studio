"use client";

import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { buttonClass } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { SectionLink } from "@/components/ui/SectionLink";
import { hasWhatsapp, siteConfig, whatsappUrl } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "./LanguageSwitcher";

type HeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  a11y: Dictionary["a11y"];
  whatsapp: Dictionary["whatsapp"];
};

const SECTIONS = [
  "services",
  "work",
  "process",
  "pricing",
  "studio",
  "faq",
] as const;

export function Header({ locale, nav, a11y, whatsapp }: HeaderProps) {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const lenis = useLenis();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Beim Herunterscrollen ausblenden, beim Hochscrollen sofort wieder zeigen.
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > 180) setHidden(true);
    else if (current < previous) setHidden(false);
  });

  // Menü schließen, sobald eine andere Seite geladen ist.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    lenis?.stop();
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      root.style.overflow = previousOverflow;
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, lenis]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 pt-3 transition-transform duration-500 ease-expo sm:pt-4",
          hidden && !open && "-translate-y-[130%] focus-within:translate-y-0",
        )}
      >
        <div className="shell">
          <div className="glass flex h-14 items-center justify-between rounded-full pr-2 pl-5 sm:h-16 sm:pr-2.5 sm:pl-6">
            <SectionLink
              locale={locale}
              section="top"
              aria-label={`${siteConfig.name} – ${a11y.home}`}
              onClick={close}
              className="rounded-full"
            >
              <Logo />
            </SectionLink>

            <nav aria-label={a11y.mainNav} className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {SECTIONS.map((section) => (
                  <li key={section}>
                    <SectionLink
                      locale={locale}
                      section={section}
                      className="rounded-full px-3.5 py-2 text-[0.9375rem] text-mute transition-colors duration-300 hover:text-paper"
                    >
                      {nav[section]}
                    </SectionLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <LanguageSwitcher
                locale={locale}
                label={a11y.language}
                switchTo={a11y.switchTo}
                className="hidden sm:flex"
              />
              <SectionLink
                locale={locale}
                section="contact"
                onClick={close}
                className={buttonClass(
                  "primary",
                  "sm",
                  "max-[380px]:hidden sm:h-11 sm:px-5",
                )}
              >
                {nav.cta}
              </SectionLink>
              <button
                ref={toggleRef}
                type="button"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? a11y.closeMenu : a11y.openMenu}
                onClick={() => setOpen((value) => !value)}
                className="grid size-10 place-items-center rounded-full text-paper transition-colors duration-300 hover:bg-paper/10 lg:hidden"
              >
                {open ? (
                  <X aria-hidden="true" className="size-5" />
                ) : (
                  <Menu aria-hidden="true" className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobiles Menü */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={a11y.mainNav}
        inert={!open}
        data-lenis-prevent
        className={cn(
          "fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink/95 backdrop-blur-xl transition-[opacity,visibility] duration-500 ease-expo lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav
          aria-label={a11y.mainNav}
          className="shell flex flex-1 flex-col justify-center pt-28 pb-10"
        >
          <ul className="flex flex-col gap-1">
            {SECTIONS.map((section, index) => (
              <li key={section} className="overflow-clip">
                <SectionLink
                  ref={index === 0 ? firstLinkRef : undefined}
                  locale={locale}
                  section={section}
                  onClick={close}
                  style={{
                    transitionDelay: open ? `${80 + index * 45}ms` : "0ms",
                  }}
                  className={cn(
                    "display block py-1.5 text-[clamp(2.75rem,13vw,4.5rem)] transition-transform duration-700 ease-expo",
                    open ? "translate-y-0" : "translate-y-full",
                  )}
                >
                  {nav[section]}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-line py-6 text-[0.9375rem]">
          <LanguageSwitcher
            locale={locale}
            label={a11y.language}
            switchTo={a11y.switchTo}
          />
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-mute">
            <a
              href={`mailto:${siteConfig.email}`}
              className="transition-colors hover:text-paper"
            >
              {siteConfig.email}
            </a>
            {hasWhatsapp ? (
              <a
                href={whatsappUrl(whatsapp.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-paper"
              >
                {whatsapp.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { MessageCircle } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { whatsappUrl } from "@/config/site";
import { cn } from "@/lib/cn";

type WhatsAppButtonProps = {
  label: string;
  aria: string;
  message: string;
};

/**
 * Schwebender WhatsApp-Kontakt unten rechts. Erscheint erst, wenn der erste
 * Bildschirm verlassen ist, damit er die Startansicht nicht stört.
 * Die Nummer steht in src/config/site.ts.
 */
export function WhatsAppButton({ label, aria, message }: WhatsAppButtonProps) {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setVisible(value > window.innerHeight * 0.6);
  });

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      tabIndex={visible ? undefined : -1}
      className={cn(
        "glass group fixed right-4 bottom-4 z-30 flex h-14 items-center gap-2.5 rounded-full pr-5 pl-4 font-medium text-paper transition-[opacity,transform,background-color,color,border-color] duration-500 ease-expo hover:border-neon hover:bg-neon hover:text-ink max-sm:w-14 max-sm:justify-center max-sm:p-0 sm:right-6 sm:bottom-6",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <MessageCircle aria-hidden="true" className="size-[1.375rem] shrink-0" />
      <span className="max-sm:sr-only">{label}</span>
    </a>
  );
}

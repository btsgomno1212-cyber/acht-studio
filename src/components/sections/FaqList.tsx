"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

type FaqItem = { q: string; a: string };

/** Aufklappbare Fragen. Es ist immer höchstens eine Antwort geöffnet. */
export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="border-t border-line">
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;

        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-[1.1875rem] leading-snug font-medium sm:text-[1.3125rem]"
              >
                <span>{item.q}</span>
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color,transform] duration-500 ease-expo",
                    isOpen
                      ? "rotate-45 border-neon bg-neon text-ink"
                      : "border-line-strong text-paper group-hover:border-paper",
                  )}
                >
                  <Plus aria-hidden="true" className="size-[1.125rem]" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              data-faq-panel
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-expo",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pr-12 pb-8 text-mute">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

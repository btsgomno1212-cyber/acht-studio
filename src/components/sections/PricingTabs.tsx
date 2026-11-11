"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type PricingTabsProps = {
  /** Beschriftung der Reitergruppe für Screenreader */
  label: string;
  tabs: { id: string; label: string }[];
  /** Inhalt je Reiter, in derselben Reihenfolge wie `tabs` */
  panels: ReactNode[];
};

/**
 * Reiter für die Preisgruppen. Alle Inhalte stehen im HTML (gut für
 * Suchmaschinen); sichtbar ist jeweils nur der gewählte.
 */
export function PricingTabs({ label, tabs, panels }: PricingTabsProps) {
  const [active, setActive] = useState(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    setActive(next);
    buttons.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") select(active + 1);
    else if (event.key === "ArrowLeft") select(active - 1);
    else if (event.key === "Home") select(0);
    else if (event.key === "End") select(tabs.length - 1);
    else return;
    event.preventDefault();
  };

  return (
    <>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="mt-10 inline-flex max-w-full rounded-full border border-line p-1 lg:mt-14"
      >
        {tabs.map((tab, index) => {
          const selected = index === active;
          return (
            <button
              key={tab.id}
              ref={(element) => {
                buttons.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`pricing-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`pricing-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={cn(
                "h-11 rounded-full px-3.5 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-300 ease-expo sm:px-6",
                selected ? "bg-paper text-ink" : "text-mute hover:text-paper",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`pricing-panel-${tab.id}`}
          aria-labelledby={`pricing-tab-${tab.id}`}
          hidden={index !== active}
          className="mt-8 animate-fade-in"
        >
          {panels[index]}
        </div>
      ))}
    </>
  );
}

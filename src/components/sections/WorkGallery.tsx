"use client";

import { useState, type ReactNode } from "react";
import { LightSwitch } from "@/components/ui/LightSwitch";
import { Tag } from "@/components/ui/StatePill";
import {
  projects,
  workCategories,
  type ProjectId,
  type WorkCategory,
} from "@/content/projects";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { cn } from "@/lib/cn";

type Filter = WorkCategory | "all";

type WorkGalleryProps = {
  labels: Dictionary["work"];
  covers: Record<ProjectId, ReactNode>;
};

const FILTERS: Filter[] = ["all", ...workCategories];

export function WorkGallery({ labels, covers }: WorkGalleryProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = projects.filter(
    (project) => filter === "all" || project.category === filter,
  );

  return (
    <>
      <div
        role="group"
        aria-label={labels.filterLabel}
        className="mt-10 flex flex-wrap gap-2 lg:mt-14"
      >
        {FILTERS.map((key) => {
          const active = key === filter;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(key)}
              className={cn(
                "h-11 rounded-full border px-5 text-[0.9375rem] font-medium transition-colors duration-300 ease-expo",
                active
                  ? "border-paper bg-paper text-ink"
                  : "border-line-strong text-mute hover:border-paper hover:text-paper",
              )}
            >
              {key === "all" ? labels.all : labels.categories[key]}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-mute">{labels.empty}</p>
      ) : (
        // Der Schlüssel baut die Liste bei jedem Filterwechsel neu auf:
        // Die Kacheln blenden ein und "rendern" erneut vom Bauplan zum Bild.
        <ul
          key={filter}
          className="mt-8 grid animate-fade-in gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-y-14"
        >
          {visible.map((project) => {
            const wide = project.wide && filter === "all";
            const browsing = filter === "all";
            const text = labels.projects[project.id];

            return (
              <li
                key={project.id}
                className={cn(
                  browsing
                    ? wide
                      ? "sm:col-span-2 lg:col-span-4"
                      : "lg:col-span-2"
                    : "lg:col-span-3",
                )}
              >
                <figure>
                  <LightSwitch
                    mode="view"
                    className={cn(
                      "stage rounded-panel border border-line bg-coal lg:aspect-auto lg:h-[clamp(21rem,31vw,30rem)]",
                      wide ? "aspect-[4/3] sm:aspect-[16/9]" : "aspect-[8/7]",
                    )}
                  >
                    {covers[project.id]}
                    {project.concept ? (
                      <Tag className="absolute top-4 left-4">
                        {labels.concept}
                      </Tag>
                    ) : null}
                  </LightSwitch>

                  <figcaption className="mt-4 px-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-[1.25rem] leading-tight font-medium">
                        {text.title}
                      </h3>
                      <span className="shrink-0 text-[0.875rem] text-faint">
                        {labels.categories[project.category]}
                      </span>
                    </div>
                    <p className="mt-1.5 max-w-[46ch] text-[0.9375rem] text-mute">
                      {text.description}
                    </p>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

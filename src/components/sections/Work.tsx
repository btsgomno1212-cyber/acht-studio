import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCover } from "@/components/visuals/covers";
import { projects, type ProjectId } from "@/content/projects";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { WorkGallery } from "./WorkGallery";

type WorkProps = {
  work: Dictionary["work"];
  visuals: Dictionary["visuals"];
};

export function Work({ work, visuals }: WorkProps) {
  // Die Titelbilder entstehen auf dem Server; der Filter im Browser sortiert sie nur.
  const covers = Object.fromEntries(
    projects.map((project) => [
      project.id,
      <ProjectCover key={project.id} id={project.id} visuals={visuals} />,
    ]),
  ) as Record<ProjectId, ReactNode>;

  return (
    <section
      id="work"
      tabIndex={-1}
      aria-labelledby="work-title"
      className="section-y outline-none"
    >
      <div className="shell">
        <SectionHeading id="work-title" title={work.title} intro={work.intro} />
        <WorkGallery labels={work} covers={covers} />
      </div>
    </section>
  );
}

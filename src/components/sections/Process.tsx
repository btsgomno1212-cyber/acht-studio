import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { ProcessTimeline } from "./ProcessTimeline";

export function Process({ process }: { process: Dictionary["process"] }) {
  return (
    <section
      id="process"
      tabIndex={-1}
      aria-labelledby="process-title"
      className="section-y outline-none"
    >
      <div className="shell">
        <SectionHeading
          id="process-title"
          title={process.title}
          intro={process.intro}
        />
        <ProcessTimeline steps={process.steps} />
      </div>
    </section>
  );
}

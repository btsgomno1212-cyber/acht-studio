import { cn } from "@/lib/cn";
import { Reveal, RevealText } from "./Reveal";

type SectionHeadingProps = {
  title: string;
  intro?: string;
  id?: string;
  className?: string;
};

/** Abschnittsüberschrift: großer Titel links, kurzer Begleittext rechts. */
export function SectionHeading({
  title,
  intro,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "grid gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end",
        className,
      )}
    >
      <h2 id={id} className="display text-display lg:col-span-7">
        <RevealText text={title} />
      </h2>
      {intro ? (
        <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
          <p className="max-w-[44ch] text-lead text-mute">{intro}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

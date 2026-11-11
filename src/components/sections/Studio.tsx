import { Reveal, RevealText } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries/de";

export function Studio({ studio }: { studio: Dictionary["studio"] }) {
  return (
    <section
      id="studio"
      tabIndex={-1}
      aria-labelledby="studio-title"
      className="section-y outline-none"
    >
      <div className="shell">
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
          <h2 id="studio-title" className="display text-display lg:col-span-8">
            <RevealText text={studio.title} />
          </h2>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <p className="text-lead text-mute">{studio.text}</p>
          </Reveal>
        </div>

        {/* Grundsätze: links der Satz, rechts die Erklärung */}
        <dl className="mt-16 border-t border-line lg:mt-24">
          {studio.principles.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 0.05}>
              <div className="group grid gap-x-10 gap-y-3 border-b border-line py-8 lg:grid-cols-12 lg:items-baseline lg:py-10">
                <dt className="display text-title transition-colors duration-500 ease-expo group-hover:text-neon lg:col-span-6">
                  {principle.title}
                </dt>
                <dd className="max-w-[46ch] text-mute lg:col-span-5 lg:col-start-8">
                  {principle.text}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

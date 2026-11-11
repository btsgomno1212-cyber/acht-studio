import { Reveal, RevealText } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { FaqList } from "./FaqList";

export function Faq({ faq }: { faq: Dictionary["faq"] }) {
  return (
    <section
      id="faq"
      tabIndex={-1}
      aria-labelledby="faq-title"
      className="section-y outline-none"
    >
      <div className="shell grid gap-x-10 gap-y-10 lg:grid-cols-12">
        <h2
          id="faq-title"
          className="display text-display lg:sticky lg:top-32 lg:col-span-5 lg:self-start"
        >
          <RevealText text={faq.title} />
        </h2>
        <Reveal className="lg:col-span-7">
          <FaqList items={faq.items} />
        </Reveal>
      </div>
    </section>
  );
}

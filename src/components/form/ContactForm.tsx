"use client";

import { LoaderCircle, TriangleAlert, X } from "lucide-react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { buttonClass } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  budgetIds,
  inquiryFieldOrder,
  inquiryLimits,
  timelineIds,
  validateInquiry,
  type BudgetId,
  type Inquiry,
  type InquiryErrors,
  type InquiryField,
  type TimelineId,
} from "@/content/inquiry";
import type { PackageId } from "@/content/pricing";
import { serviceIds, type ServiceId } from "@/content/services";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { cn } from "@/lib/cn";
import { useInquiry } from "./InquiryContext";

type ContactFormProps = {
  locale: Locale;
  contact: Dictionary["contact"];
  /** Namen der Leistungen und Pakete für die Auswahl */
  serviceLabels: Record<ServiceId, string>;
  packageLabels: Record<PackageId, string>;
};

type Values = Omit<Inquiry, "pkg">;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; name: string; email: string }
  | { kind: "error"; reason: "send" | "rateLimited" | "offline" };

const EMPTY: Values = {
  name: "",
  company: "",
  email: "",
  services: [],
  budget: "",
  timeline: "",
  message: "",
};

export function ContactForm({
  locale,
  contact,
  serviceLabels,
  packageLabels,
}: ContactFormProps) {
  const { form, errors: errorText, success } = contact;
  const id = useId();
  const { preset, clear } = useInquiry();
  const lenis = useLenis();

  const [values, setValues] = useState<Values>(EMPTY);
  const [pkg, setPkg] = useState<PackageId | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Vorauswahl aus einem Preispaket oder einer Leistungsseite übernehmen.
  const [seenStamp, setSeenStamp] = useState(0);
  if (preset && preset.stamp !== seenStamp) {
    setSeenStamp(preset.stamp);
    setValues((current) =>
      current.services.includes(preset.service)
        ? current
        : { ...current, services: [...current.services, preset.service] },
    );
    if (preset.pkg) setPkg(preset.pkg);
    setErrors((current) => ({ ...current, services: undefined }));
    if (status.kind === "success") setStatus({ kind: "idle" });
  }

  // Next.js behält besuchte Seiten im Hintergrund. Eine alte Erfolgsmeldung
  // soll beim Zurückkehren nicht mehr stehen.
  const resetOnHide = useRef(false);
  useLayoutEffect(() => {
    return () => {
      if (resetOnHide.current) {
        resetOnHide.current = false;
        setStatus({ kind: "idle" });
      }
    };
  }, []);

  useEffect(() => {
    if (status.kind === "success") successRef.current?.focus();
    if (status.kind === "error") alertRef.current?.focus();
  }, [status]);

  const fieldId = (field: InquiryField) => `${id}-${field}`;
  const errorId = (field: InquiryField) => `${id}-${field}-error`;

  const update = <K extends keyof Values>(field: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field as InquiryField]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const toggleService = (service: ServiceId) => {
    update(
      "services",
      values.services.includes(service)
        ? values.services.filter((entry) => entry !== service)
        : [...values.services, service],
    );
  };

  const focusFirstError = (found: InquiryErrors) => {
    const first = inquiryFieldOrder.find((field) => found[field]);
    if (!first) return;
    const target =
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`) ??
      null;
    if (!target) return;
    target.focus({ preventScroll: true });
    if (lenis) lenis.scrollTo(target, { offset: -window.innerHeight * 0.38 });
    else target.scrollIntoView({ block: "center" });
  };

  const send = async () => {
    const found = validateInquiry({ ...values, pkg });
    setErrors(found);
    if (Object.values(found).some(Boolean)) {
      setStatus({ kind: "idle" });
      focusFirstError(found);
      return;
    }

    setStatus({ kind: "submitting" });

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          pkg,
          locale,
          website: honeypot,
          elapsed: Date.now() - startedAt.current,
        }),
        signal: AbortSignal.timeout(25_000),
      });

      if (response.ok) {
        setStatus({
          kind: "success",
          name: values.name.trim(),
          email: values.email.trim(),
        });
        resetOnHide.current = true;
        setValues(EMPTY);
        setPkg(null);
        clear();
        startedAt.current = Date.now();
        return;
      }

      if (response.status === 400) {
        const data: { fields?: InquiryErrors } | null = await response
          .json()
          .catch(() => null);
        if (data?.fields && Object.keys(data.fields).length > 0) {
          setErrors(data.fields);
          setStatus({ kind: "idle" });
          focusFirstError(data.fields);
          return;
        }
      }

      setStatus({
        kind: "error",
        reason: response.status === 429 ? "rateLimited" : "send",
      });
    } catch (error) {
      // Zeitüberschreitung: Der Server war erreichbar, hat aber nicht geantwortet.
      const timedOut =
        error instanceof DOMException && error.name === "TimeoutError";
      setStatus({ kind: "error", reason: timedOut ? "send" : "offline" });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.kind === "submitting") return;
    void send();
  };

  /** Fertig ausgefüllte E-Mail als Ausweg, falls der Versand nicht klappt. */
  const mailtoHref = () => {
    const lines = [
      `${form.name}: ${values.name}`,
      values.company ? `${form.company}: ${values.company}` : null,
      `${form.email}: ${values.email}`,
      `${form.services}: ${values.services.map((entry) => serviceLabels[entry]).join(", ")}`,
      pkg ? `${form.packageLabel}: ${packageLabels[pkg]}` : null,
      values.budget
        ? `${form.budget}: ${contact.budgets[values.budget]}`
        : null,
      values.timeline
        ? `${form.timeline}: ${contact.timelines[values.timeline]}`
        : null,
      "",
      values.message,
    ].filter((line) => line !== null);

    return `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      contact.mailto.subject,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  /* ---------------------------------------------------------------- Erfolg */
  if (status.kind === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="outline-none"
      >
        <svg viewBox="0 0 64 64" aria-hidden="true" className="size-16">
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="none"
            strokeWidth="2.5"
            pathLength="1"
            strokeDasharray="1"
            className="origin-center -rotate-90 animate-draw stroke-neon"
          />
          <path
            d="M20 33.5l8.5 8.5L45 24.5"
            fill="none"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            strokeDasharray="1"
            className="animate-draw stroke-neon"
            style={{ animationDelay: "450ms" }}
          />
        </svg>

        <h3 className="display mt-8 animate-fade-in text-title">
          {success.title}
        </h3>
        <p
          className="mt-4 max-w-[52ch] animate-fade-in text-lead text-mute"
          style={{ animationDelay: "120ms" }}
        >
          {success.text
            .replace("{name}", status.name)
            .replace("{email}", status.email)}
        </p>

        <div
          className="mt-10 animate-fade-in border-t border-line pt-8"
          style={{ animationDelay: "240ms" }}
        >
          <h4 className="font-medium">{success.nextTitle}</h4>
          <ol className="mt-5 flex flex-col gap-4">
            {success.next.map((step, index) => (
              <li key={step} className="flex gap-4 text-mute">
                <span
                  aria-hidden="true"
                  className="display grid size-7 shrink-0 place-items-center rounded-full border border-line-strong text-[1.0625rem] leading-none text-paper"
                >
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <button
          type="button"
          onClick={() => {
            resetOnHide.current = false;
            setStatus({ kind: "idle" });
          }}
          className={buttonClass("secondary", "md", "mt-10")}
        >
          {success.again}
        </button>
      </div>
    );
  }

  /* -------------------------------------------------------------- Formular */
  const submitting = status.kind === "submitting";
  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={`${id}-legend`}
      className="flex flex-col gap-8"
    >
      <h3 id={`${id}-legend`} className="sr-only">
        {form.legend}
      </h3>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label={form.name}
          htmlFor={fieldId("name")}
          error={errors.name ? errorText[errors.name] : undefined}
          errorId={errorId("name")}
        >
          <input
            id={fieldId("name")}
            data-field="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={inquiryLimits.name}
            placeholder={form.namePlaceholder}
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? errorId("name") : undefined}
            className="field"
          />
        </Field>

        <Field
          label={form.company}
          hint={form.optional}
          htmlFor={fieldId("company")}
          error={errors.company ? errorText[errors.company] : undefined}
          errorId={errorId("company")}
        >
          <input
            id={fieldId("company")}
            data-field="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={form.companyPlaceholder}
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? errorId("company") : undefined}
            className="field"
          />
        </Field>
      </div>

      <Field
        label={form.email}
        htmlFor={fieldId("email")}
        error={errors.email ? errorText[errors.email] : undefined}
        errorId={errorId("email")}
      >
        <input
          id={fieldId("email")}
          data-field="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          required
          placeholder={form.emailPlaceholder}
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? errorId("email") : undefined}
          className="field"
        />
      </Field>

      <ChoiceGroup
        legend={form.services}
        hint={form.servicesHint}
        error={errors.services ? errorText[errors.services] : undefined}
        errorId={errorId("services")}
      >
        {serviceIds.map((service, index) => (
          <Choice
            key={service}
            type="checkbox"
            name="services"
            value={service}
            label={serviceLabels[service]}
            checked={values.services.includes(service)}
            onChange={() => toggleService(service)}
            dataField={index === 0 ? "services" : undefined}
            describedBy={errors.services ? errorId("services") : undefined}
          />
        ))}
      </ChoiceGroup>

      {pkg ? (
        <p className="-mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.9375rem]">
          <span className="text-mute">{form.packageLabel}</span>
          <span className="inline-flex h-9 items-center gap-1 rounded-full border border-neon/60 pr-1 pl-3.5 text-paper">
            {packageLabels[pkg]}
            <button
              type="button"
              onClick={() => {
                setPkg(null);
                clear();
              }}
              aria-label={`${form.removePackage}: ${packageLabels[pkg]}`}
              className="grid size-7 place-items-center rounded-full text-mute transition-colors duration-300 hover:bg-paper/10 hover:text-paper"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </span>
        </p>
      ) : null}

      <ChoiceGroup
        legend={form.budget}
        error={errors.budget ? errorText[errors.budget] : undefined}
        errorId={errorId("budget")}
      >
        {budgetIds.map((budget, index) => (
          <Choice
            key={budget}
            type="radio"
            name="budget"
            value={budget}
            label={contact.budgets[budget]}
            checked={values.budget === budget}
            onChange={() => update("budget", budget as BudgetId)}
            dataField={index === 0 ? "budget" : undefined}
            describedBy={errors.budget ? errorId("budget") : undefined}
          />
        ))}
      </ChoiceGroup>

      <ChoiceGroup
        legend={form.timeline}
        error={errors.timeline ? errorText[errors.timeline] : undefined}
        errorId={errorId("timeline")}
      >
        {timelineIds.map((timeline, index) => (
          <Choice
            key={timeline}
            type="radio"
            name="timeline"
            value={timeline}
            label={contact.timelines[timeline]}
            checked={values.timeline === timeline}
            onChange={() => update("timeline", timeline as TimelineId)}
            dataField={index === 0 ? "timeline" : undefined}
            describedBy={errors.timeline ? errorId("timeline") : undefined}
          />
        ))}
      </ChoiceGroup>

      <Field
        label={form.message}
        htmlFor={fieldId("message")}
        error={errors.message ? errorText[errors.message] : undefined}
        errorId={errorId("message")}
      >
        <textarea
          id={fieldId("message")}
          data-field="message"
          name="message"
          rows={6}
          required
          placeholder={form.messagePlaceholder}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? errorId("message") : undefined}
          className="field min-h-40 resize-y"
        />
      </Field>

      {/* Honeypot: für Menschen unsichtbar, Bots füllen es aus. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] size-px overflow-hidden"
      >
        <label>
          {form.honeypot}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </label>
      </div>

      {status.kind === "error" ? (
        <div
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          className="rounded-field border border-danger/50 bg-danger/[0.07] p-5 outline-none"
        >
          <p className="flex items-center gap-2.5 font-medium text-danger">
            <TriangleAlert aria-hidden="true" className="size-5 shrink-0" />
            {errorText.sendTitle}
          </p>
          <p className="mt-2 text-[0.9375rem] text-paper/85">
            {errorText[status.reason]}
          </p>
          <a
            href={mailtoHref()}
            className="link-underline mt-3 inline-block text-[0.9375rem] font-medium text-paper"
          >
            {errorText.viaEmail}
          </a>
        </div>
      ) : null}

      <div className="flex flex-col gap-5">
        {hasErrors ? (
          <p role="alert" className="text-[0.9375rem] text-danger">
            {errorText.summary}
          </p>
        ) : null}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
          <button
            type="submit"
            aria-disabled={submitting}
            className={cn(
              buttonClass("primary", "lg", "shrink-0 sm:min-w-[13.5rem]"),
              submitting && "pointer-events-none opacity-70",
            )}
          >
            {submitting ? (
              <>
                <LoaderCircle
                  aria-hidden="true"
                  className="size-5 animate-spin-slow"
                />
                {form.submitting}
              </>
            ) : status.kind === "error" ? (
              errorText.retry
            ) : (
              form.submit
            )}
          </button>

          <p className="max-w-[46ch] text-[0.8125rem] leading-relaxed text-faint">
            {form.privacy}{" "}
            <Link
              href={`/${locale}/datenschutz`}
              className="text-mute underline underline-offset-4 transition-colors duration-300 hover:text-paper"
            >
              {form.privacyLink}
            </Link>
            .
          </p>
        </div>
      </div>
    </form>
  );
}

/* ---------------------------------------------------------------- Bausteine */

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-2 text-[0.875rem] text-danger">
      {children}
    </p>
  );
}

function Field({
  label,
  hint,
  htmlFor,
  error,
  errorId,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2.5 flex items-baseline gap-2 font-medium"
      >
        {label}
        {hint ? (
          <span className="text-[0.875rem] font-normal text-faint">{hint}</span>
        ) : null}
      </label>
      {children}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}

function ChoiceGroup({
  legend,
  hint,
  error,
  errorId,
  children,
}: {
  legend: string;
  hint?: string;
  error?: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mb-3 flex flex-wrap items-baseline gap-x-2 font-medium">
        {legend}
        {hint ? (
          <span className="text-[0.875rem] font-normal text-faint">{hint}</span>
        ) : null}
      </legend>
      <div className="flex flex-wrap gap-2">{children}</div>
      <FieldError id={errorId}>{error}</FieldError>
    </fieldset>
  );
}

function Choice({
  type,
  name,
  value,
  label,
  checked,
  onChange,
  dataField,
  describedBy,
}: {
  type: "checkbox" | "radio";
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  dataField?: string;
  describedBy?: string;
}) {
  return (
    <label className="cursor-pointer">
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        data-field={dataField}
        aria-describedby={describedBy}
        className="peer sr-only"
      />
      <span className="inline-flex h-11 items-center rounded-full border border-line-strong px-4 text-[0.9375rem] transition-colors duration-300 ease-expo select-none peer-checked:border-neon peer-checked:bg-neon peer-checked:font-medium peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-neon hover:border-paper/60">
        {label}
      </span>
    </label>
  );
}

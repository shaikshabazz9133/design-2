"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useContactForm } from "@/components/ui/hooks";
import { BUDGETS, PROJECT_TYPES } from "@/lib/contact";

const label = "block font-sans text-sm font-bold text-ink";
const input =
  "mt-2 block w-full rounded-2xl border-2 border-ink/10 bg-cream px-4 py-3.5 font-sans text-base text-ink placeholder:text-mute/50 transition-colors focus:border-cobalt focus:bg-paper focus:outline-none aria-[invalid=true]:border-tomato aria-[invalid=true]:bg-tomato/5";

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p id={id} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 font-sans text-sm font-semibold text-tomato">
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function ContactForm({ email }: { email: string }) {
  const { values, errors, status, onSubmit, reset, field } = useContactForm();

  if (status.state === "success") {
    return (
      <motion.div role="status" initial={{ opacity: 0, scale: 0.94, rotate: -1 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="rounded-[2rem] bg-navy p-8 text-cream sm:p-12">
        <span className="inline-block rounded-full bg-butter px-3 py-1 font-sans text-xs font-bold uppercase tracking-[0.12em] text-ink">Ref {status.reference}</span>
        <h3 className="mt-6 font-display text-4xl font-extrabold tracking-[-0.04em]">
          Obrigada, <span className="font-serif font-light italic text-butter">{values.name.split(" ")[0]}!</span>
        </h3>
        <p className="mt-5 font-sans text-lg leading-relaxed text-cream/85">
          Your message checks out. Heads up: this is a demonstration site with no email service connected, so nothing was actually sent. To reach the studio, write to{" "}
          <a href={`mailto:${email}`} className="font-bold underline decoration-butter decoration-2 underline-offset-4">{email}</a>.
        </p>
        <button type="button" onClick={reset} className="mt-8 min-h-12 rounded-full bg-cream px-6 font-sans font-bold text-ink hover:bg-butter">Write another message</button>
      </motion.div>
    );
  }

  const submitting = status.state === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 rounded-[2rem] bg-paper p-6 shadow-[0_30px_80px_-40px_rgba(35,26,21,0.35)] sm:grid-cols-2 sm:p-10">
      <div>
        <label htmlFor="contact-name" className={label}>Your name *</label>
        <input {...field("name")} value={values.name} autoComplete="name" placeholder="Rita Almeida" className={input} />
        <FieldError id="contact-name-error" message={errors.name} />
      </div>
      <div>
        <label htmlFor="contact-email" className={label}>Email *</label>
        <input {...field("email")} value={values.email} type="email" autoComplete="email" placeholder="rita@example.com" className={input} />
        <FieldError id="contact-email-error" message={errors.email} />
      </div>
      <div>
        <label htmlFor="contact-phone" className={label}>Phone <span className="font-normal text-mute">(optional)</span></label>
        <input {...field("phone")} value={values.phone} type="tel" autoComplete="tel" placeholder="+351 …" className={input} />
        <FieldError id="contact-phone-error" message={errors.phone} />
      </div>
      <div>
        <label htmlFor="contact-projectType" className={label}>What&apos;s the project? *</label>
        <select {...field("projectType")} value={values.projectType} className={`${input} cursor-pointer`}>
          <option value="" disabled>Pick one</option>
          {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <FieldError id="contact-projectType-error" message={errors.projectType} />
      </div>
      <fieldset className="sm:col-span-2">
        <legend className={label}>Rough budget</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <label key={b} className="cursor-pointer">
              <input type="radio" name="budget" value={b} checked={values.budget === b} onChange={field("budget").onChange} className="peer sr-only" />
              <span className="inline-flex min-h-11 items-center rounded-full border-2 border-ink/15 px-4 font-sans text-sm font-semibold transition-all peer-checked:-rotate-2 peer-checked:border-cobalt peer-checked:bg-cobalt peer-checked:text-cream peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cobalt-deep hover:border-cobalt">
                {b}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2">
        <label htmlFor="contact-message" className={label}>Tell us about your space *</label>
        <textarea {...field("message")} value={values.message} rows={5} placeholder="Where is it, what's driving you mad, what do you love?" className={`${input} resize-y`} />
        <div className="flex gap-4">
          <FieldError id="contact-message-error" message={errors.message} />
          <span className="ml-auto mt-2 font-sans text-xs text-mute/70">{values.message.length}/2000</span>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 font-sans text-[15px] leading-relaxed text-mute">
          <input {...field("consent")} type="checkbox" checked={values.consent} className="mt-1 h-5 w-5 shrink-0 accent-cobalt" />
          Yes, Casa Cobalto can contact me about this project. No newsletters, promise.
        </label>
        <FieldError id="contact-consent-error" message={errors.consent} />
      </div>
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input {...field("company")} value={values.company} tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={submitting} className="group inline-flex min-h-14 items-center justify-between gap-4 rounded-full bg-cobalt py-2 pl-7 pr-2 font-sans text-base font-bold text-cream transition-colors hover:bg-navy disabled:cursor-wait disabled:opacity-80">
          {submitting ? "Sending…" : "Send it over"}
          <span className="grid h-10 w-10 place-items-center rounded-full bg-cream text-cobalt transition-transform duration-500 group-hover:rotate-45">
            {submitting ? <Loader2 size={18} className="animate-spin" aria-hidden /> : <ArrowUpRight size={18} strokeWidth={2.4} aria-hidden />}
          </span>
        </button>
        {status.state === "error" && <p role="alert" className="font-sans text-sm font-semibold text-tomato">{status.message}</p>}
      </div>
    </form>
  );
}

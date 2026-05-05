"use client";

import { useState, type FormEvent } from "react";
import { DOCTOR } from "@/config/doctor";

type Status = "idle" | "submitting" | "success" | "error";

export function EConsultForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      formType: "e-consult",
      consultationVia: String(fd.get("consultationVia") ?? ""),
      condition: String(fd.get("condition") ?? ""),
      fullname: String(fd.get("fullname") ?? ""),
      mobile: String(fd.get("mobile") ?? ""),
      email: String(fd.get("email") ?? ""),
      country: String(fd.get("country") ?? ""),
    };
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Submission failed (${res.status})`);
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-brand-gold/40 bg-section-warm p-8 text-center">
        <h3 className="font-heading text-2xl font-semibold text-brand-ink">Thanks. Your request is in.</h3>
        <p className="mt-3 text-brand-ink-soft">
          Dr. Sethi&apos;s team will reach out shortly. For anything urgent, call{" "}
          <a href={`tel:${DOCTOR.contact.phone}`} className="portfolio-link font-semibold">
            {DOCTOR.contact.phoneDisplay}
          </a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl bg-white p-6 ring-1 ring-section-alt md:p-8">
      <Field label="1. Preference">
        <select name="consultationVia" required className={inputCls}>
          <option value=""> - Select - </option>
          <option>Audio Call</option>
          <option>Video Call</option>
        </select>
      </Field>

      <Field label="2. Describe your dental condition">
        <textarea name="condition" rows={4} required className={inputCls} />
      </Field>

      <Field label="3. Full Name">
        <input name="fullname" type="text" autoComplete="name" required className={inputCls} />
      </Field>

      <Field label="4. Mobile Number">
        <input name="mobile" type="tel" required className={inputCls} placeholder={DOCTOR.contact.phoneDisplay} />
      </Field>

      <Field label="5. Email">
        <input name="email" type="email" autoComplete="email" required className={inputCls} />
      </Field>

      <Field label="6. Country">
        <input name="country" type="text" required className={inputCls} placeholder="e.g. India / United States / United Kingdom" />
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-black disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request E-Consult"}
      </button>

      {status === "error" && (
        <p className="text-sm text-brand-accent">Couldn&apos;t send: {error}. Please try again or email {DOCTOR.contact.email}.</p>
      )}
    </form>
  );
}

const inputCls =
  "w-full rounded-md border border-section-alt bg-white px-3 py-2.5 text-sm text-brand-ink placeholder:text-brand-ink-soft/50 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-ink">
        {label}
      </span>
      {children}
    </label>
  );
}

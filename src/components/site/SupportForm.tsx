"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FieldRow, Input, Label, Select, Textarea } from "@/components/ui/Field";
import { Check } from "@/components/ui/Icon";

type Topic = "support" | "bulk" | "warranty" | "partner" | "general";

const TOPICS: { value: Topic; label: string }[] = [
  { value: "support", label: "Technical support" },
  { value: "warranty", label: "Warranty / replacement claim" },
  { value: "bulk", label: "Bulk procurement enquiry" },
  { value: "partner", label: "Partner / referral programme" },
  { value: "general", label: "General question" },
];

export function SupportForm({ defaultTopic = "general" as Topic, formId }: { defaultTopic?: Topic; formId?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    if (fd.get("company_url")) {
      setStatus("error");
      setMessage("Submission blocked.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          organization: fd.get("organization"),
          topic: fd.get("topic"),
          orderRef: fd.get("orderRef"),
          message: fd.get("message"),
          submittedAt: new Date().toISOString(),
        }),
      });
      const data: { ok: boolean; message?: string } = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message ?? "Could not send message.");
        return;
      }
      setStatus("ok");
      setMessage("Thanks — we've logged your request. We'll respond within 24 hours.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Network error");
    }
  };

  return (
    <form id={formId} className="flex flex-col gap-5 bg-white p-6 ring-1 ring-[var(--line)]" onSubmit={onSubmit} noValidate>
      <FieldRow columns={2}>
        <div>
          <Label htmlFor="sf-name" required>Full name</Label>
          <Input id="sf-name" name="name" autoComplete="name" required minLength={2} />
        </div>
        <div>
          <Label htmlFor="sf-email" required>Email</Label>
          <Input id="sf-email" type="email" name="email" autoComplete="email" required />
        </div>
      </FieldRow>
      <FieldRow columns={2}>
        <div>
          <Label htmlFor="sf-phone">Phone</Label>
          <Input id="sf-phone" type="tel" name="phone" autoComplete="tel" />
        </div>
        <div>
          <Label htmlFor="sf-org">Organization</Label>
          <Input id="sf-org" name="organization" autoComplete="organization" />
        </div>
      </FieldRow>
      <FieldRow columns={2}>
        <div>
          <Label htmlFor="sf-topic" required>Topic</Label>
          <Select id="sf-topic" name="topic" required defaultValue={defaultTopic}>
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="sf-order" hint="Optional">Order reference</Label>
          <Input id="sf-order" name="orderRef" placeholder="EGS-XXXXX" />
        </div>
      </FieldRow>
      <div>
        <Label htmlFor="sf-message" required>Message</Label>
        <Textarea id="sf-message" name="message" required minLength={10} rows={5} placeholder="Tell us what you need. The more detail, the faster we can route it." />
      </div>
      <input
        type="text"
        name="company_url"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />

      {status === "ok" ? (
        <div role="status" className="flex items-center gap-2 border border-[var(--mint)] bg-[var(--mint)] p-3 text-sm font-semibold text-[var(--ink)]">
          <Check size={16} /> {message}
        </div>
      ) : null}
      {status === "error" ? (
        <div role="alert" className=" border border-[var(--coral)] bg-[var(--coral-soft)] p-3 text-sm text-[var(--coral)]">
          {message ?? "Submission failed."}
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-[var(--ink-4)]">
          We respond within 24 hours, often sooner. Sensitive issues route through encrypted email.
        </p>
        <Button type="submit" variant="ink" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}

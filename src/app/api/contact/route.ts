import { NextResponse } from "next/server";
import { sendEmail, escapeHtml } from "@/lib/email";
import { SITE } from "@/lib/site";
import { isEmail, isOneOf, isOptionalString, isString, validateObject } from "@/lib/validation";

export const dynamic = "force-dynamic";

const TOPICS = ["support", "warranty", "bulk", "partner", "general"] as const;

const contactShape = {
  name: isString(2, 80),
  email: isEmail(),
  phone: isOptionalString(20),
  organization: isOptionalString(120),
  topic: isOneOf(TOPICS),
  orderRef: isOptionalString(40),
  message: isString(10, 4000),
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ ok: false, message: "Invalid payload" }, { status: 400 });
  }
  const payload = body as Record<string, unknown>;

  // honeypot
  if (typeof payload.company_url === "string" && payload.company_url.length > 0) {
    return NextResponse.json({ ok: true, message: "Received" }, { status: 202 });
  }

  const result = validateObject(payload, contactShape);
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: "Please review the form", errors: result.errors }, { status: 400 });
  }

  const v = result.value;
  const routedTo =
    v.topic === "support" || v.topic === "warranty"
      ? SITE.contact.supportEmail
      : v.topic === "bulk" || v.topic === "partner"
        ? SITE.contact.salesEmail
        : SITE.contact.salesEmail;

  const html = `
<!doctype html>
<html><body style="margin:0;padding:0;background:#05070d;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#f4f8ff;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <h1 style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#ff5a1f;margin:0 0 8px;">⚡ EGS · Inbound</h1>
    <h2 style="font-size:20px;margin:0 0 8px;">${escapeHtml(v.topic.toUpperCase())} request from ${escapeHtml(v.name)}</h2>
    <p style="margin:0 0 16px;color:#c9d4e5;font-size:13px;">${escapeHtml(v.email)}${v.phone ? " · " + escapeHtml(v.phone) : ""}${v.organization ? " · " + escapeHtml(v.organization) : ""}</p>
    ${v.orderRef ? `<p style="margin:0 0 16px;font-size:13px;color:#94a3b8;">Order ref: <code style="color:#ff5a1f;">${escapeHtml(v.orderRef)}</code></p>` : ""}
    <div style="margin:16px 0;padding:16px;border-left:3px solid #00e5ff;background:#0a0f1a;color:#c9d4e5;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(v.message)}</div>
    <p style="margin:16px 0 0;font-size:11px;color:#5a6680;">Topic: ${escapeHtml(v.topic)} · Routed to ${escapeHtml(routedTo)}</p>
  </div>
</body></html>`;

  const sent = await sendEmail({
    to: routedTo,
    subject: `[${v.topic.toUpperCase()}] ${v.name}${v.organization ? " · " + v.organization : ""}`,
    html,
    replyTo: v.email,
  });

  if (!sent.ok && sent.mode === "resend") {
    return NextResponse.json({ ok: false, message: "Could not deliver right now — please try again or email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, mailMode: sent.mode }, { status: 200 });
}

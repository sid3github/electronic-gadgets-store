type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

/**
 * Sends an email via Resend if RESEND_API_KEY is set.
 * Falls back to console logging — useful in local dev and avoids hard-failing
 * order submission when no mail provider is configured.
 */
export async function sendEmail(payload: EmailPayload): Promise<{ ok: boolean; mode: "resend" | "console"; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM ?? "Electronic Gadgets Store <orders@egs-store.example>";

  if (!apiKey) {
    console.info("[voltage:email:dev]", {
      to: payload.to,
      subject: payload.subject,
      replyTo: payload.replyTo,
      html: payload.html,
    });
    return { ok: true, mode: "console" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [payload.to],
        subject: payload.subject,
        html: payload.html,
        ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("[voltage:email] resend failed", res.status, errText);
      return { ok: false, mode: "resend", error: `${res.status} ${errText}` };
    }
    const json = (await res.json()) as { id?: string };
    return { ok: true, mode: "resend", id: json.id };
  } catch (err) {
    console.error("[voltage:email] resend error", err);
    return { ok: false, mode: "resend", error: err instanceof Error ? err.message : "unknown" };
  }
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

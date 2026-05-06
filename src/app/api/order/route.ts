import { NextResponse } from "next/server";
import { PRODUCTS, formatINR } from "@/lib/products";
import { sendEmail, escapeHtml } from "@/lib/email";
import { SITE } from "@/lib/site";
import {
  isEmail,
  isOptionalString,
  isPhone,
  isPin,
  isString,
  validateObject,
} from "@/lib/validation";

export const dynamic = "force-dynamic";

type IncomingItem = { slug: string; quantity: number };

const customerShape = {
  name: isString(2, 80),
  email: isEmail(),
  phone: isPhone(),
  organization: isOptionalString(120),
};

const shippingShape = {
  line1: isString(3, 160),
  line2: isOptionalString(160),
  city: isString(2, 80),
  state: isString(2, 80),
  pin: isPin(),
  notes: isOptionalString(800),
};

function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `EGS-${ts}-${rand}`;
}

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

  // honeypot from raw form (if any)
  if (typeof payload.company_url === "string" && payload.company_url.length > 0) {
    return NextResponse.json({ ok: true, orderId: "ignored" }, { status: 202 });
  }

  const customerResult = validateObject(payload.customer, customerShape);
  if (!customerResult.ok) {
    return NextResponse.json({ ok: false, message: "Invalid customer details", errors: customerResult.errors }, { status: 400 });
  }
  const shippingResult = validateObject(payload.shipping, shippingShape);
  if (!shippingResult.ok) {
    return NextResponse.json({ ok: false, message: "Invalid shipping details", errors: shippingResult.errors }, { status: 400 });
  }

  const itemsRaw = Array.isArray(payload.items) ? (payload.items as unknown[]) : [];
  if (itemsRaw.length === 0) {
    return NextResponse.json({ ok: false, message: "Cart is empty" }, { status: 400 });
  }
  if (itemsRaw.length > 50) {
    return NextResponse.json({ ok: false, message: "Too many line items" }, { status: 400 });
  }

  const items: Array<IncomingItem & { name: string; unitPrice: number; lineTotal: number }> = [];
  for (const raw of itemsRaw) {
    if (typeof raw !== "object" || raw === null) {
      return NextResponse.json({ ok: false, message: "Invalid line item" }, { status: 400 });
    }
    const r = raw as Record<string, unknown>;
    const slug = typeof r.slug === "string" ? r.slug : "";
    const qty = typeof r.quantity === "number" ? r.quantity : 0;
    if (!slug || qty <= 0 || qty > 99) {
      return NextResponse.json({ ok: false, message: "Invalid line item" }, { status: 400 });
    }
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product) {
      return NextResponse.json({ ok: false, message: `Unknown SKU: ${slug}` }, { status: 400 });
    }
    items.push({
      slug,
      quantity: qty,
      name: product.name,
      unitPrice: product.price,
      lineTotal: product.price * qty,
    });
  }

  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
  const shippingCost = subtotal >= 25000 ? 0 : 499;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + shippingCost + gst;

  const orderId = generateOrderId();
  const submittedAt = new Date().toISOString();

  // Compose order email to ops
  const opsHtml = renderOpsEmail({
    orderId,
    customer: customerResult.value,
    shipping: shippingResult.value,
    items,
    subtotal,
    gst,
    shippingCost,
    total,
    submittedAt,
  });

  const customerHtml = renderCustomerEmail({
    orderId,
    customer: customerResult.value,
    shipping: shippingResult.value,
    items,
    subtotal,
    gst,
    shippingCost,
    total,
  });

  // Fire the operations email — this is the F-05 trigger.
  const opsResult = await sendEmail({
    to: SITE.contact.ordersEmail,
    subject: `🔌 New EGS order ${orderId} · ${formatINR(total)}`,
    html: opsHtml,
    replyTo: customerResult.value.email,
  });

  // Customer confirmation — best-effort.
  await sendEmail({
    to: customerResult.value.email,
    subject: `EGS order received — ${orderId}`,
    html: customerHtml,
  }).catch((err) => {
    console.warn("[voltage:order] customer email failed", err);
  });

  if (!opsResult.ok && opsResult.mode === "resend") {
    // The ops email actually failed via Resend. In v1, log loudly so ops can pick it up.
    console.error("[voltage:order] ops email FAILED — manual follow-up required", { orderId, opsResult });
  }

  return NextResponse.json(
    {
      ok: true,
      orderId,
      total,
      currency: "INR",
      mailMode: opsResult.mode,
    },
    { status: 200 },
  );
}

function renderOpsEmail(o: {
  orderId: string;
  customer: { name: string; email: string; phone: string; organization?: string };
  shipping: { line1: string; line2?: string; city: string; state: string; pin: string; notes?: string };
  items: Array<{ slug: string; name: string; quantity: number; unitPrice: number; lineTotal: number }>;
  subtotal: number;
  gst: number;
  shippingCost: number;
  total: number;
  submittedAt: string;
}) {
  const itemsHtml = o.items
    .map(
      (i) =>
        `<tr><td style="padding:6px 8px;border-bottom:1px solid #1f2937;">${escapeHtml(i.name)}<br><small style="color:#94a3b8">${escapeHtml(i.slug)}</small></td><td style="padding:6px 8px;border-bottom:1px solid #1f2937;text-align:center;">${i.quantity}</td><td style="padding:6px 8px;border-bottom:1px solid #1f2937;text-align:right;">${formatINR(i.unitPrice)}</td><td style="padding:6px 8px;border-bottom:1px solid #1f2937;text-align:right;">${formatINR(i.lineTotal)}</td></tr>`,
    )
    .join("");

  return `
<!doctype html>
<html><body style="margin:0;padding:0;background:#05070d;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#f4f8ff;">
  <div style="max-width:640px;margin:0 auto;padding:32px 24px;">
    <h1 style="font-size:14px;letter-spacing:.18em;text-transform:uppercase;color:#ff5a1f;margin:0 0 8px;">⚡ EGS · New Order</h1>
    <h2 style="font-size:22px;margin:0 0 24px;">${escapeHtml(o.orderId)}</h2>
    <p style="margin:0 0 16px;color:#c9d4e5;font-size:13px;">Submitted at ${escapeHtml(o.submittedAt)}.</p>

    <h3 style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#ff5a1f;margin:24px 0 8px;">Customer</h3>
    <p style="margin:0 0 4px;font-weight:600;">${escapeHtml(o.customer.name)}${o.customer.organization ? ` · ${escapeHtml(o.customer.organization)}` : ""}</p>
    <p style="margin:0 0 4px;color:#c9d4e5;font-size:13px;"><a style="color:#ff5a1f;" href="mailto:${escapeHtml(o.customer.email)}">${escapeHtml(o.customer.email)}</a> · <a style="color:#ff5a1f;" href="tel:${escapeHtml(o.customer.phone)}">${escapeHtml(o.customer.phone)}</a></p>

    <h3 style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#ff5a1f;margin:24px 0 8px;">Ship to</h3>
    <p style="margin:0;color:#c9d4e5;font-size:13px;line-height:1.6;">
      ${escapeHtml(o.shipping.line1)}<br>
      ${o.shipping.line2 ? escapeHtml(o.shipping.line2) + "<br>" : ""}
      ${escapeHtml(o.shipping.city)}, ${escapeHtml(o.shipping.state)} ${escapeHtml(o.shipping.pin)}
    </p>
    ${o.shipping.notes ? `<p style="margin:8px 0 0;font-size:12px;color:#8a99b3;"><em>Notes:</em> ${escapeHtml(o.shipping.notes)}</p>` : ""}

    <h3 style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#ff5a1f;margin:24px 0 8px;">Items</h3>
    <table style="width:100%;border-collapse:collapse;font-size:13px;color:#f4f8ff;">
      <thead><tr><th align="left" style="padding:6px 8px;border-bottom:1px solid #00e5ff;">Item</th><th style="padding:6px 8px;border-bottom:1px solid #00e5ff;">Qty</th><th align="right" style="padding:6px 8px;border-bottom:1px solid #00e5ff;">Unit</th><th align="right" style="padding:6px 8px;border-bottom:1px solid #00e5ff;">Total</th></tr></thead>
      <tbody>${itemsHtml}</tbody>
    </table>

    <table style="width:100%;margin-top:16px;font-size:13px;color:#c9d4e5;">
      <tr><td>Subtotal</td><td align="right" style="color:#f4f8ff;">${formatINR(o.subtotal)}</td></tr>
      <tr><td>GST (18%)</td><td align="right" style="color:#f4f8ff;">${formatINR(o.gst)}</td></tr>
      <tr><td>Shipping</td><td align="right" style="color:#f4f8ff;">${o.shippingCost === 0 ? "Free" : formatINR(o.shippingCost)}</td></tr>
      <tr><td style="padding-top:12px;font-weight:700;color:#f4f8ff;">Total</td><td align="right" style="padding-top:12px;font-weight:700;color:#ff5a1f;">${formatINR(o.total)}</td></tr>
    </table>

    <p style="margin:24px 0 0;font-size:11px;color:#7d839c;">This is an automated notification from egs-store.example. Reply directly to this email to reach the customer.</p>
  </div>
</body></html>`;
}

function renderCustomerEmail(o: {
  orderId: string;
  customer: { name: string; email: string; phone: string; organization?: string };
  shipping: { line1: string; line2?: string; city: string; state: string; pin: string; notes?: string };
  items: Array<{ slug: string; name: string; quantity: number; unitPrice: number; lineTotal: number }>;
  subtotal: number;
  gst: number;
  shippingCost: number;
  total: number;
}) {
  const itemsHtml = o.items
    .map(
      (i) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">${escapeHtml(i.name)} <small style="color:#6b7280;">× ${i.quantity}</small></td><td align="right" style="padding:8px 0;border-bottom:1px solid #e5e7eb;">${formatINR(i.lineTotal)}</td></tr>`,
    )
    .join("");

  return `
<!doctype html>
<html><body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#0f172a;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;background:#ffffff;">
    <h1 style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#ff5a1f;margin:0 0 6px;">⚡ Electronic Gadgets Store</h1>
    <h2 style="font-size:24px;margin:0 0 16px;color:#0f172a;">Hi ${escapeHtml(o.customer.name.split(" ")[0])} — your order is in.</h2>
    <p style="margin:0 0 16px;color:#475569;line-height:1.6;">
      We've received your order <strong>${escapeHtml(o.orderId)}</strong> and our operations team will reach out within 1 business hour to confirm stock and share a secure payment link.
    </p>
    <p style="margin:0 0 24px;color:#475569;line-height:1.6;">No card was charged at submission. Your order is held for 24 hours pending confirmation.</p>

    <h3 style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#ff5a1f;margin:24px 0 8px;">Items</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tbody>${itemsHtml}</tbody>
    </table>
    <table style="width:100%;margin-top:12px;font-size:14px;color:#475569;">
      <tr><td>Subtotal</td><td align="right">${formatINR(o.subtotal)}</td></tr>
      <tr><td>GST (18%)</td><td align="right">${formatINR(o.gst)}</td></tr>
      <tr><td>Shipping</td><td align="right">${o.shippingCost === 0 ? "Free" : formatINR(o.shippingCost)}</td></tr>
      <tr><td style="padding-top:8px;font-weight:700;color:#0f172a;">Total</td><td align="right" style="padding-top:8px;font-weight:700;color:#0f172a;">${formatINR(o.total)}</td></tr>
    </table>

    <h3 style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#ff5a1f;margin:24px 0 8px;">Ship to</h3>
    <p style="margin:0;color:#475569;line-height:1.6;font-size:14px;">
      ${escapeHtml(o.shipping.line1)}<br>
      ${o.shipping.line2 ? escapeHtml(o.shipping.line2) + "<br>" : ""}
      ${escapeHtml(o.shipping.city)}, ${escapeHtml(o.shipping.state)} ${escapeHtml(o.shipping.pin)}
    </p>

    <p style="margin:24px 0 0;color:#475569;font-size:13px;line-height:1.6;">Need to change something? Just reply to this email.</p>
    <p style="margin:24px 0 0;color:#94a3b8;font-size:12px;">Electronic Gadgets Store Pvt. Ltd. · Mumbai</p>
  </div>
</body></html>`;
}

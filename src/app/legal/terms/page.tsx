import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";

export const metadata: Metadata = {
  title: "Terms & conditions",
  description: "The legal terms governing the use of the EGS website and any orders placed on it.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" effective="01 January 2026" active="/legal/terms">
      <LegalSection heading="1. Acceptance">
        <p>
          By accessing egs-store.example or placing an order, you agree to these Terms. If you do not agree, please do not use the site or order from us. We may update these Terms; the effective date above will move forward when we do, and material changes are emailed to active customers.
        </p>
      </LegalSection>
      <LegalSection heading="2. Eligibility">
        <p>
          Orders may be placed by individuals 18+ or by authorised representatives of an organisation. By submitting an order, you represent that you have the authority to bind the named buyer.
        </p>
      </LegalSection>
      <LegalSection heading="3. Orders & confirmation">
        <p>
          Every order placed on the site is an offer to purchase. The order is binding once we send a written confirmation. Until then, EGS may decline or modify any order — for stock, pricing or compliance reasons — and will refund any prepaid amount.
        </p>
      </LegalSection>
      <LegalSection heading="4. Pricing & taxes">
        <p>
          Prices are in INR and inclusive of GST unless explicitly stated otherwise. Pricing is subject to change without notice prior to confirmation. Once confirmed, the price stated in your order confirmation governs.
        </p>
      </LegalSection>
      <LegalSection heading="5. Delivery">
        <p>
          We dispatch in-stock orders within 48 hours from our Mumbai warehouse. Estimated delivery is 3–7 business days nationwide. Risk of loss passes to you on delivery to the named consignee.
        </p>
      </LegalSection>
      <LegalSection heading="6. Warranty">
        <p>
          EGS hardware ships with a published warranty (see our <a href="/warranty">Warranty Policy</a>). Free replacement applies to technical defects, not physical damage. Warranty is non-transferrable and tied to the original buyer record.
        </p>
      </LegalSection>
      <LegalSection heading="7. Returns & replacements">
        <p>
          Returns and replacements are governed by our <a href="/legal/returns">Return Policy</a>. Out-of-the-box defects are replaced within 7 days. Wrong-item or damaged-in-transit shipments are replaced at our cost.
        </p>
      </LegalSection>
      <LegalSection heading="8. Intellectual property">
        <p>
          All site content, brand marks, product photography and copy are the property of Electronic Gadgets Store Pvt. Ltd. or its licensors. You may not reproduce or redistribute without written permission.
        </p>
      </LegalSection>
      <LegalSection heading="9. Acceptable use">
        <p>You agree not to: (a) reverse-engineer or scrape the site; (b) submit fraudulent orders or fictional contact details; (c) use the site to violate any law; (d) circumvent rate limits, captchas or other security controls.</p>
      </LegalSection>
      <LegalSection heading="10. Liability">
        <p>
          To the extent permitted by law, EGS's aggregate liability under any order is limited to the value of that order. We are not liable for indirect, incidental or consequential losses including loss of data, revenue or business opportunity.
        </p>
      </LegalSection>
      <LegalSection heading="11. Governing law">
        <p>
          These Terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
        </p>
      </LegalSection>
      <LegalSection heading="12. Contact">
        <p>
          For questions about these Terms, write to <a href="mailto:legal@egs-store.example">legal@egs-store.example</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

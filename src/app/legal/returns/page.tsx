import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Return & replacement policy",
  description: "How EGS handles returns and replacements — clearly, in plain language.",
};

export default function ReturnsPage() {
  return (
    <LegalLayout title="Return & Replacement Policy" effective="01 January 2026" active="/legal/returns">
      <LegalSection heading="Plain-language summary">
        <p>
          We replace defective hardware. We accept unopened returns within {SITE.policies.returnWindowDays} days for a full refund. We do not accept returns of opened or used hardware unless it has a covered defect.
        </p>
      </LegalSection>
      <LegalSection heading="Return window">
        <p>
          You may return any unopened, unused product within {SITE.policies.returnWindowDays} days of delivery for a full refund. The product must be in its original packaging with all accessories intact.
        </p>
      </LegalSection>
      <LegalSection heading="Out-of-the-box defects">
        <p>
          If the device fails on first power-on or has a manufacturing defect that prevents normal use, contact us within 7 days of delivery. We will replace the device and pay both legs of freight.
        </p>
      </LegalSection>
      <LegalSection heading="Damaged on arrival">
        <p>
          If the package arrives visibly damaged, refuse the delivery if possible, and notify us within 24 hours. We will arrange a replacement at our cost. Photographs of the damaged packaging help speed up the claim.
        </p>
      </LegalSection>
      <LegalSection heading="Wrong item shipped">
        <p>If we ship the wrong SKU, we will arrange a free pick-up of the wrong item and dispatch the correct one as priority. No restocking fee applies.</p>
      </LegalSection>
      <LegalSection heading="Replacements under warranty">
        <p>
          Replacements for technical defects discovered after the return window are governed by our <a href="/warranty">Warranty Policy</a>. Free replacement applies for the duration of the warranty.
        </p>
      </LegalSection>
      <LegalSection heading="What we don't accept">
        <ul className="list-disc space-y-1 pl-5">
          <li>Used or opened products without a covered defect</li>
          <li>Devices damaged by misuse, drops or liquid (unless the SKU is rugged-rated)</li>
          <li>Items returned without RMA number or original accessories</li>
          <li>Accessories that have been visibly used (cables, mounts, styli — unless defective)</li>
        </ul>
      </LegalSection>
      <LegalSection heading="How to start a return">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Email <a href="mailto:support@egs-store.example">support@egs-store.example</a> with your order reference and a brief description.</li>
          <li>We issue an RMA number, usually within {SITE.policies.supportTatHours} hours.</li>
          <li>Pack the device with the RMA number on the outside of the box.</li>
          <li>Hand over to the courier we schedule. We pay the freight.</li>
          <li>On receipt, we process the refund or replacement within 5 business days.</li>
        </ol>
      </LegalSection>
      <LegalSection heading="Refunds">
        <p>
          Refunds are issued to the original payment instrument. UPI/card refunds typically settle in 5–7 business days; bank transfers within 3 business days. We always send a refund confirmation email with the ARN/UTR number.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

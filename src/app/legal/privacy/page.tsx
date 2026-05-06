import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How EGS collects, uses and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" effective="01 January 2026" active="/legal/privacy">
      <LegalSection heading="What we collect">
        <p>
          We collect the data you provide when ordering or contacting us — name, email, phone, organisation, billing and shipping address, and the contents of any messages you send us. We collect basic technical data on site visits (IP, user-agent, page paths) for diagnostics and abuse prevention.
        </p>
      </LegalSection>
      <LegalSection heading="Why we collect it">
        <p>To accept and fulfil orders, deliver hardware, honour warranty and replacement obligations, respond to support requests, run our business and comply with applicable law. We do not sell personal data — to anyone, ever.</p>
      </LegalSection>
      <LegalSection heading="Cookies & analytics">
        <p>
          We use a small set of essential cookies (cart state, login if applicable) and a privacy-respecting analytics tool to count page views in aggregate. We do not run third-party advertising or behavioural-tracking pixels.
        </p>
      </LegalSection>
      <LegalSection heading="Where we store data">
        <p>Order and customer records are stored on Indian servers operated by reputable cloud providers, with at-rest encryption. Backups are encrypted and rotated.</p>
      </LegalSection>
      <LegalSection heading="Who we share with">
        <p>
          With our courier and logistics partners, strictly to deliver shipments. With payment processors, only when initiating a payment. With law enforcement when legally compelled. Never with marketers, never with brokers.
        </p>
      </LegalSection>
      <LegalSection heading="Retention">
        <p>
          We retain order records for the duration of the warranty plus seven years to satisfy tax and accounting law. You may request earlier deletion, which we will action subject to overriding legal obligations.
        </p>
      </LegalSection>
      <LegalSection heading="Your rights">
        <p>You may request access to your data, correction of inaccuracies, export of your records, or deletion (subject to retention exceptions above). Email <a href="mailto:privacy@egs-store.example">privacy@egs-store.example</a> and we will respond within 30 days.</p>
      </LegalSection>
      <LegalSection heading="Security">
        <p>HTTPS is enforced site-wide. Form submissions are validated and rate-limited. Internal access to customer data is role-based and logged. We will notify affected users of any incident that meets the legal threshold for disclosure, within 72 hours of confirmation.</p>
      </LegalSection>
      <LegalSection heading="Children">
        <p>Our site is intended for adults and for organisational procurement. We do not knowingly collect data from anyone under 18.</p>
      </LegalSection>
      <LegalSection heading="Updates">
        <p>If we materially change this policy, we will email active customers and update the effective date above.</p>
      </LegalSection>
    </LegalLayout>
  );
}

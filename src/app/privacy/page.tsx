import type { Metadata } from "next";
import Rodape from "@/components/historia/Rodape";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for apps developed by Yuri Dagot.",
};

export default function PrivacyPage() {
  return (
    <main className="legal" lang="en">
      <h1>Privacy Policy</h1>
      <p className="legal-data">Last updated: March 9, 2026</p>

      <section>
        <h2>Overview</h2>
        <p>
          This privacy policy applies to mobile applications developed by Yuri Dagot
          (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). We respect your privacy and are committed
          to protecting the personal data you share with us.
        </p>
      </section>

      <section>
        <h2>Data We Collect</h2>
        <p>Depending on the app, we may collect:</p>
        <ul>
          <li>Name and contact information</li>
          <li>Phone number</li>
          <li>Photos and media you upload</li>
          <li>User identifiers (for authentication)</li>
        </ul>
      </section>

      <section>
        <h2>How We Use Your Data</h2>
        <p>
          Your data is used solely to provide app functionality. We do not sell, rent, or share
          your personal data with third parties for marketing purposes.
        </p>
      </section>

      <section>
        <h2>Third-Party Services</h2>
        <p>Our apps may use the following services to operate:</p>
        <ul>
          <li>Cloud storage for media (photos, files)</li>
          <li>Real-time database services</li>
          <li>AI services for in-app features</li>
        </ul>
        <p>
          These services process data only as needed to deliver app functionality.
        </p>
      </section>

      <section>
        <h2>Data Retention</h2>
        <p>
          We retain your data for as long as your account is active or as needed to provide
          services. You can request deletion of your data at any time by contacting us.
        </p>
      </section>

      <section>
        <h2>Security</h2>
        <p>
          We implement reasonable security measures to protect your data. However, no method
          of transmission over the internet is 100% secure.
        </p>
      </section>

      <section>
        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent at any time</li>
        </ul>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          For any questions about this privacy policy or your data, contact us at:{" "}
          <a href="mailto:ydagot@gmail.com">
            ydagot@gmail.com
          </a>
        </p>
      </section>
      <Rodape />
    </main>
  );
}

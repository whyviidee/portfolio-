import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for apps developed by Yuri Dagot.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-6 py-32 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-gray-600 mb-12">Last updated: March 9, 2026</p>

      <section className="space-y-8 text-gray-300 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Overview</h2>
          <p>
            This privacy policy applies to mobile applications developed by Yuri Dagot
            (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). We respect your privacy and are committed
            to protecting the personal data you share with us.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Data We Collect</h2>
          <p>Depending on the app, we may collect:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Name and contact information</li>
            <li>Phone number</li>
            <li>Photos and media you upload</li>
            <li>User identifiers (for authentication)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">How We Use Your Data</h2>
          <p>
            Your data is used solely to provide app functionality. We do not sell, rent, or share
            your personal data with third parties for marketing purposes.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Third-Party Services</h2>
          <p>Our apps may use the following services to operate:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Cloud storage for media (photos, files)</li>
            <li>Real-time database services</li>
            <li>AI services for in-app features</li>
          </ul>
          <p className="mt-2">
            These services process data only as needed to deliver app functionality.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Data Retention</h2>
          <p>
            We retain your data for as long as your account is active or as needed to provide
            services. You can request deletion of your data at any time by contacting us.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Security</h2>
          <p>
            We implement reasonable security measures to protect your data. However, no method
            of transmission over the internet is 100% secure.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
          <p>
            For any questions about this privacy policy or your data, contact us at:{" "}
            <a href="mailto:yuridagot@gmail.com" className="text-amber-400 hover:underline">
              yuridagot@gmail.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

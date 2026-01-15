import React from "react";
import { Link } from "react-router-dom"; // ✅ If using react-router-dom

const TermsOfService = ({
  siteName = "LookInDharamshala",
  siteUrl = "https://lookindharamshala.synergyayush.com",
  effectiveDate = "August 24, 2025",
  contactEmail = "ayush988277@gmail.com",
  contactPhone = "9882770709",
}) => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-sm text-gray-500">Effective Date: {effectiveDate}</p>
        </div>

        {/* ✅ Back button aligned to the right */}
        <Link
          to="/"
          className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
        >
          ← Back to Home
        </Link>
      </header>

      <section className="space-y-6 text-gray-800 leading-relaxed">
        <p>
          Welcome to <strong>{siteName}</strong> ("we," "our," or "us"). By accessing or
          using our website (<a className="underline" href={siteUrl}>{siteUrl}</a>), you agree to be
          bound by these Terms of Service ("Terms"). If you do not agree, please do not
          use the Site.
        </p>

        <h2 className="text-xl font-semibold">1. Use of the Site</h2>
        <p>
          The Site is provided for informational purposes only, offering details about
          Dharamshala, including attractions, services, and general information. You agree
          to use the Site only for lawful purposes and in a manner that does not infringe the
          rights of others or restrict their use of the Site.
        </p>

        <h2 className="text-xl font-semibold">2. Information Accuracy</h2>
        <p>
          We make reasonable efforts to provide accurate and up-to-date information, but we
          do not guarantee the completeness, reliability, or accuracy of any content. Information
          may change over time, and you should verify details directly with official sources or
          service providers before making decisions.
        </p>

        <h2 className="text-xl font-semibold">3. Intellectual Property</h2>
        <p>
          All text, images, graphics, logos, and other content on the Site are the property of{" "}
          <strong>{siteName}</strong> or its licensors, unless otherwise stated. You may view and use
          the content for personal, non-commercial purposes. Reproduction, distribution, or
          modification of any content without prior written permission is prohibited.
        </p>

        <h2 className="text-xl font-semibold">4. External Links</h2>
        <p>
          The Site may include links to third-party websites for convenience. We are not
          responsible for the content, accuracy, or policies of those sites. Accessing them
          is at your own risk.
        </p>

        <h2 className="text-xl font-semibold">5. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, {siteName} shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, or any loss of
          data or profits, arising from or related to your use of the Site or reliance on its
          content. Your use of the Site is at your sole risk.
        </p>

        <h2 className="text-xl font-semibold">6. Privacy</h2>
        <p>
          While the Site does not process payments, it may collect basic information that you
          voluntarily submit via forms. For details on how we handle personal data, please see
          our Privacy Policy.
        </p>

        <h2 className="text-xl font-semibold">7. Changes to Terms</h2>
        <p>
          We may modify or update these Terms at any time. Continued use of the Site after
          changes are posted constitutes acceptance of the revised Terms.
        </p>

        <h2 className="text-xl font-semibold">8. Governing Law</h2>
        <p>
          These Terms shall be governed by and interpreted in accordance with the laws of
          India, without regard to its conflict of law principles.
        </p>

        <h2 className="text-xl font-semibold">Contact Us</h2>
        <address className="not-italic">
          <div>Email: <a className="underline" href={`mailto:${contactEmail}`}>{contactEmail}</a></div>
          <div>Phone: <a className="underline" href={`tel:${contactPhone}`}>{contactPhone}</a></div>
        </address>
      </section>
    </main>
  );
};

export default TermsOfService;

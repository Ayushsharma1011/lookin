import React from "react";
import { Link } from "react-router-dom"; // ✅ If using react-router-dom

const PrivacyPolicy = ({
  siteName = "LookInDharamshala",
  siteUrl = "https://lookindharamshala.synergyayush.com",
  effectiveDate = "August 24, 2025",
  contactEmail = "ayush988277@gmail.com",
  contactPhone = "9882770709",
}) => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Effective Date: {effectiveDate}</p>
        </div>

        {/* Back to Home Button (React Router version) */}
        <Link
          to="/"
          className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
        >
          ← Back to Home
        </Link>

        {/* If NOT using react-router-dom, replace with:
        <a
          href="/"
          className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
        >
          ← Back to Home
        </a>
        */}
      </header>

      {/* Content */}
      <section className="space-y-6 text-gray-800 leading-relaxed">
        <p>
          At <strong>{siteName}</strong> ("we," "our," or "us"), we value your privacy and are
          committed to protecting the personal information you share with us. This Privacy
          Policy explains what information we collect, how we use it, and your choices.
        </p>

        {/* 1. Information We Collect */}
        <h2 className="text-xl font-semibold">1. Information We Collect</h2>
        <ul className="list-disc pl-6">
          <li><strong>Name</strong> (required)</li>
          <li><strong>Phone number</strong> (required)</li>
          <li><strong>Email address</strong> (optional)</li>
        </ul>
        <p>
          We may also collect non-personal data automatically (e.g., basic usage analytics,
          browser or device information) to help improve the Site.
        </p>

        {/* 2. How We Use Your Information */}
        <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6">
          <li>Respond to inquiries or requests you submit</li>
          <li>Provide you with relevant information about Dharamshala</li>
          <li>Improve the content and user experience of the Site</li>
        </ul>
        <p>
          We do <strong>not</strong> sell, rent, or share your personal information with third
          parties for their marketing purposes.
        </p>

        {/* 3. Data Storage and Security */}
        <h2 className="text-xl font-semibold">3. Data Storage and Security</h2>
        <p>
          Your information is stored securely and is accessible only to authorized personnel.
          While we take reasonable measures to protect your data, no method of transmission
          over the internet or electronic storage is 100% secure.
        </p>

        {/* 4. Third-Party Links */}
        <h2 className="text-xl font-semibold">4. Third-Party Links</h2>
        <p>
          Our Site may include links to external websites. We are not responsible for the
          privacy practices or content of those third-party sites.
        </p>

        {/* 5. Your Choices */}
        <h2 className="text-xl font-semibold">5. Your Choices</h2>
        <ul className="list-disc pl-6">
          <li>Providing your email address is optional.</li>
          <li>You may contact us to request correction or deletion of your personal information.</li>
        </ul>

        {/* 6. Updates to This Policy */}
        <h2 className="text-xl font-semibold">6. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this
          page with the revised effective date.
        </p>

        {/* Contact Section */}
        <h2 className="text-xl font-semibold">Contact Us</h2>
        <address className="not-italic space-y-1">
          <div>
            Website:{" "}
            <a className="underline" href={siteUrl} target="_blank" rel="noopener noreferrer">
              {siteUrl}
            </a>
          </div>
          <div>
            Email:{" "}
            <a className="underline" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </div>
          <div>
            Phone:{" "}
            <a className="underline" href={`tel:${contactPhone}`}>
              {contactPhone}
            </a>
          </div>
        </address>
      </section>
    </main>
  );
};

export default PrivacyPolicy;

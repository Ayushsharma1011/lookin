import React from 'react';
import { Helmet } from 'react-helmet';

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Look in Dharamshala</title>
      </Helmet>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms & Conditions for Data Collection</h1>
        <div className="space-y-5 text-gray-700 text-base leading-relaxed">
          <p>
            By submitting your information on this website, you agree to the following terms regarding the collection and use of your personal data.
          </p>

          <h2 className="text-xl font-semibold">1. Data We Collect</h2>
          <p>
            We collect your Name, Email Address, and Phone Number through our popup form.
          </p>

          <h2 className="text-xl font-semibold">2. Purpose of Collection</h2>
          <p>
            The information is collected to communicate with you regarding your interest in our services, updates, or to answer any inquiries.
          </p>

          <h2 className="text-xl font-semibold">3. Data Storage</h2>
          <p>
            Your data is securely stored in our Supabase database, which uses encrypted and access-controlled infrastructure.
          </p>

          <h2 className="text-xl font-semibold">4. Data Sharing</h2>
          <p>
            We do not sell, rent, or share your personal data with any third-party services or individuals.
          </p>

          <h2 className="text-xl font-semibold">5. Data Retention</h2>
          <p>
            Your data is retained as long as necessary for operational purposes or until you request its deletion.
          </p>

          <h2 className="text-xl font-semibold">6. User Rights</h2>
          <p>
            You have the right to:
            <ul className="list-disc ml-5 mt-2">
              <li>Request access to your data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw your consent at any time</li>
            </ul>
            For any of these actions, please email us at <a className="text-blue-600 underline" href="mailto:ayush988277@gmail.com">ayush988277@gmail.com</a>.
          </p>

          <h2 className="text-xl font-semibold">7. Consent</h2>
          <p>
            By submitting the popup form, you provide clear consent to collect and use your data as described above.
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsPage;

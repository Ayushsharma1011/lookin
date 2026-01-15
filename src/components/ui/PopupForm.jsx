import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

const PopupForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // Show after 45s if not submitted
  useEffect(() => {
    const hasSubmitted = sessionStorage.getItem('popupSubmitted');
    if (!hasSubmitted) {
      const timer = setTimeout(() => setShowPopup(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, email } = formData;

    if (!name.trim()) {
      alert('Name is required!');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert('Phone number must be exactly 10 digits!');
      return;
    }

    const { error } = await supabase.from('popup_leads').insert([{ name, phone, email }]);
    if (error) {
      alert('Failed to submit. Try again!');
      console.error(error);
    } else {
      setSubmitted(true);
      sessionStorage.setItem('popupSubmitted', 'true');
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  return (
    showPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md relative animate-[fadeInScale_0.3s_ease-in-out]">
          
          {/* Close Button */}
          <button
            onClick={() => {
              setShowPopup(false);
              sessionStorage.setItem('popupSubmitted', 'true'); // prevent showing again
            }}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-sm"
            aria-label="Close"
          >
            ✖
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5 rounded-t-2xl text-white text-center">
            <h2 className="text-2xl font-bold">Get Exclusive Access 🚀</h2>
            <p className="text-sm opacity-90 mt-1">
              Enter your details and explore amazing services.
            </p>
          </div>

          <div className="p-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  required
                />

                {/* Phone */}
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number (10 digits)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  required
                />

                {/* Email (Optional) */}
                <input
                  name="email"
                  type="email"
                  placeholder="Email (optional)"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                />

                {/* Terms */}
                <div className="text-xs text-gray-500">
                  By submitting, you agree to our{' '}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-blue-600 underline"
                  >
                    Terms & Conditions
                  </button>
                  . We respect your privacy.
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:scale-[1.02] transition"
                >
                  Submit & Continue →
                </button>
              </form>
            ) : (
              <h3 className="text-lg text-center font-medium text-green-600">
                ✅ Thank you! Your details are submitted.
              </h3>
            )}
          </div>
        </div>

        {/* Terms Modal */}
        {showTerms && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-[90%] relative">
              <button
                onClick={() => setShowTerms(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
              >
                ✖
              </button>
              <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
              <div className="max-h-[300px] overflow-y-auto text-sm text-gray-700 space-y-2">
                <p>We respect your privacy and only collect your name, phone, and optional email for contact purposes.</p>
                <p>Your data is stored securely and never shared with third parties.</p>
                <p>You may be contacted about relevant offers or services.</p>
                <p>By submitting, you consent to these terms under PII compliance.</p>
              </div>
              <button
                onClick={() => setShowTerms(false)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Back to Form
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default PopupForm;

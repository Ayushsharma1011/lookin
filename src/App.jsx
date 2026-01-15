import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import HomePage from '@/pages/HomePage';
import AttractionsPage from '@/pages/AttractionsPage';
import PlanTripPage from '@/pages/PlanTripPage';
import ContactPage from '@/pages/ContactPage';
import ServicesPage from '@/pages/ServicesPage';
import ListBusinessPage from '@/pages/ListBusinessPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import PrivateRoute from '@/components/PrivateRoute';
import { ServicesProvider } from '@/contexts/ServicesContext';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import { ReviewsProvider } from './contexts/ReviewsContext';
import TermsPage from '@/pages/TermsPage';
import ScrollToTopOnClick from '@/components/ScrollToTopOnClick';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';


const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ServicesProvider>
          <ReviewsProvider>
            <div className="min-h-screen">
              {/* ✅ Global SEO */}
              <Helmet>
                <title>LookInDharamshala – Dharamshala Attractions & Travel Guide</title>
                <meta
                  name="description"
                  content="LookInDharamshala – What you think, we have it! Discover Dharamshala attractions including McLeod Ganj, Bhagsu, Naddi, hotels, guides, and adventure activities. LookDharamshala & Looking Dharmshala provide complete travel solutions."
                />
                <link rel="canonical" href="https://lookindharamshala.in/" />
                {/* Structured Data */}
                <script type="application/ld+json">
                  {`
                  {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "LookInDharamshala",
                    "url": "https://lookindharamshala.in",
                    "logo": "https://lookindharamshala.in/logo.jpg",
                    "description": "LookInDharamshala – What you think, we have it! Discover Dharamshala attractions including McLeod Ganj, Bhagsu, Naddi, hotels, guides, and adventure activities. LookDharamshala & Looking Dharmshala provide complete travel solutions.",
                    "sameAs": [
                      "https://www.instagram.com/lookindharamshala",
                      "https://www.facebook.com/LookinDharamshala",
                      "https://www.youtube.com/@lookindharamshala"
                    ]
                  }
                  `}
                </script>
              </Helmet>

              <ScrollToTopOnClick />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/attractions" element={<AttractionsPage />} />
              
                <Route path="/plan-trip" element={<PlanTripPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:id" element={<ServiceDetailPage />} />
                <Route path="/list-your-business" element={<ListBusinessPage />} />
                <Route path="/terms-and-conditions" element={<TermsPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <PrivateRoute>
                      <AdminDashboardPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
              <Toaster />
            </div>
          </ReviewsProvider>
        </ServicesProvider>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;

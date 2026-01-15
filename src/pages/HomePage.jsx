import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import TrustElements from '@/components/home/TrustElements';
import SpecialSections from '@/components/home/SpecialSections';
import GallerySection from '@/components/home/GallerySection';
import MapSection from '@/components/MapSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const HomePage = () => {
  useScrollReveal();

  return (
    <>
      <Helmet>
  {/* Primary SEO */}
  <title>Look in Dharamshala - Explore Dharamshala & Nearby Attractions</title>
  <meta 
    name="description" 
    content="What You Think We Have It. We Have Solution To Your Searches In And About Dharamshala. Discover Dharamshala, Himachal Pradesh with our travel guide. Explore HPCA Stadium, McLeod Ganj, Bhagsu, Naddi. Find hotels, adventure activities, local guides, and spiritual experiences." 
  />
  <meta 
    name="keywords" 
    content="Dharamshala, HPCA Stadium,lookin dharamshala, McLeod Ganj, Bhagsu, Naddi, Lookindharamashala,lookindharamshala,lookin haramshala, Dharamshala hotels, Dharamshala adventure, Dharamshala local guides, Dharamshala food" 
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.lookindharamshala.in/" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  {/* Open Graph / Facebook */}
  <meta property="og:title" content="Look in Dharamshala - Explore Dharamshala & Nearby Attractions" />
  <meta property="og:description" content="Your complete Dharamshala travel guide: HPCA Stadium, McLeod Ganj, Bhagsu, Naddi. Find hotels, local guides, adventure, and spiritual experiences." />
  <meta property="og:url" content="https://www.lookindharamshala.in/" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://www.lookindharamshala.in/og-image.jpg" />

  {/* Social Links */}
  <link rel="me" href="https://www.facebook.com/lookindharamshala" />
  <link rel="me" href="https://www.instagram.com/lookindharamshala/?hl=en" />
  <link rel="me" href="https://www.youtube.com/@lookindharamshala" />

  {/* JSON-LD Structured Data */}
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": "Look in Dharamshala",
        "url": "https://www.lookindharamshala.in",
        "logo": "https://www.lookindharamshala.in/logo.png",
        "sameAs": [
          "https://www.facebook.com/lookindharamshala",
          "https://www.instagram.com/lookindharamshala/?hl=en",
          "https://www.youtube.com/@lookindharamshala"
        ],
        "description": "Explore Dharamshala, Himachal Pradesh with our travel guide. Visit HPCA Stadium, McLeod Ganj, Bhagsu, Naddi, Forsyth Ganj. Find hotels, local guides, adventure activities, and spiritual experiences.",
        "address": [
          {
            "@type": "PostalAddress",
            "streetAddress": "Near HPCA Stadium",
            "addressLocality": "Dharamshala",
            "addressRegion": "Himachal Pradesh",
            "postalCode": "176215",
            "addressCountry": "IN"
          },
          {
            "@type": "PostalAddress",
            "streetAddress": "Bhagsu Road",
            "addressLocality": "McLeod Ganj",
            "addressRegion": "Himachal Pradesh",
            "postalCode": "176219",
            "addressCountry": "IN"
          },
          {
            "@type": "PostalAddress",
            "streetAddress": "Naddi Village",
            "addressLocality": "Dharamshala",
            "addressRegion": "Himachal Pradesh",
            "postalCode": "176215",
            "addressCountry": "IN"
          },
          {
            "@type": "PostalAddress",
            "streetAddress": "Forsyth Ganj",
            "addressLocality": "Dharamshala",
            "addressRegion": "Himachal Pradesh",
            "postalCode": "176215",
            "addressCountry": "IN"
          }
        ]
      }
    `}
  </script>
</Helmet>


      <Navbar />

      <main>
        <section id="hero">
          <HeroSection />
        </section>

        <section id="trust">
          <TrustElements />
        </section>

        <section id="special">
          <SpecialSections />
        </section>

        <section id="gallery">
          <GallerySection />
        </section>

        <section id="map">
          <MapSection />
        </section>

        <section id="testimonials">
          <TestimonialsSection />
        </section>

        <section id="cta">
          <CtaSection />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;

import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Star, MapPin, Phone, Mail, ArrowLeft, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MapSection from "@/components/MapSectionFooter";
import { useServices } from "@/contexts/ServicesContext";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PopupForm from '@/components/ui/PopupForm';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services } = useServices();
  const service = services.find((s) => s.id === id);

  const [galleryIndex, setGalleryIndex] = useState(-1);
  const [carouselIndex, setCarouselIndex] = useState(-1);

  const handleGetDirections = () => {
    if (!service) return;
    const query = `${service.name}, ${service.location}, Dharamshala, Himachal Pradesh`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-gray-900 via-green-900 to-black text-white px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">Service Not Found</h1>
          <p className="text-lg sm:text-xl opacity-80 mb-8">We couldn't find the service you were looking for.</p>
          <Link to="/services">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-700 hover:opacity-90 text-white font-semibold shadow-lg px-6 py-3 rounded-full">
              Back to Services
            </Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const carouselImages = [
    { src: '/images/attractions/triund/2.avif', alt: "Sunset at Dharamshala" },
    { src: "https://images.unsplash.com/photo-1689702584022-f9843db091c3", alt: "Local Market (Unsplash)" },
    { src: '/images/attractions/dalailama/1.jpg', alt: 'Dalai Lama Temple Complex - Main View' },
    { src: '/images/attractions/dalailama/2.jpg', alt: 'Dalai Lama Temple Complex - Prayer Wheels' },
    { src: '/images/attractions/dalailama/3.jpg', alt: 'Dalai Lama Temple Complex - Monastery Interior' },
    { src: '/images/attractions/triund/1.jpeg', alt: 'Triund Trek - Mountain Trail' },
    { src: '/images/attractions/triund/2.avif', alt: 'Triund Trek - Sunset View' },
    { src: '/images/attractions/triund/3.avif', alt: 'Triund Trek - Snow Peak View' },
    { src: '/images/attractions/bhagsu/1.jpg', alt: 'Bhagsu Waterfall - Front View' },
    { src: '/images/attractions/bhagsu/2.jpg', alt: 'Bhagsu Waterfall - Natural Pool' },
    { src: '/images/attractions/bhagsu/3.jpg', alt: 'Bhagsu Waterfall - Top View' },
    { src: '/images/attractions/mcleodganj/1.jpg', alt: 'McLeod Ganj Market - Tibetan Stalls' },
    { src: '/images/attractions/mcleodganj/2.jpg', alt: 'McLeod Ganj Market - Handicrafts' },
    { src: '/images/attractions/mcleodganj/3.jpg', alt: 'McLeod Ganj Market - Street View' },
    { src: '/images/attractions/teagardens/1.jpeg', alt: 'Tea Gardens - Green Pathway' },
    { src: '/images/attractions/teagardens/2.jpeg', alt: 'Tea Gardens - Tea Leaves Close-up' },
    { src: '/images/attractions/teagardens/3.jpeg', alt: 'Tea Gardens - Scenic View' }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    
    <>
    
      <Helmet>
        <title>{`${service.name} | Look in Dharamshala`}</title>
        <meta name="description" content={service.about} />
      </Helmet>
          <PopupForm />
      <Navbar />

      {/* -------- Hero Section -------- */}
      <section className="relative pt-20 sm:pt-24 pb-20 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <img
            className="w-full h-64 sm:h-80 md:h-[70vh] object-cover object-center rounded-2xl shadow-lg"
            alt={service.name}
            src={service.images?.[0]}
          />
          <img
            className="w-full h-64 sm:h-80 md:h-[70vh] object-cover object-center rounded-2xl shadow-lg"
            alt={service.name}
            src={service.images?.[1] || service.images?.[0]}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-10 shadow-2xl inline-block"
          >
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4 sm:mb-6 text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Button>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg">{service.name}</h1>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-base sm:text-lg mt-4 sm:mt-6">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span>{service.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-5 w-5" />
                <span>{service.location}</span>
              </div>
              <span className="bg-gradient-to-r from-green-500 to-emerald-700 px-3 sm:px-4 py-1 rounded-full text-sm sm:text-base font-semibold shadow-lg">
                {service.category}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* -------- Main Section -------- */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-white via-green-50 to-emerald-100 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          {/* About + Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-2xl rounded-2xl overflow-hidden border border-green-100">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl font-semibold">About {service.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-8">
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{service.about}</p>

                {/* Details */}
                <div className="mt-6 sm:mt-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 border-b-2 border-green-200 pb-1 sm:pb-2">Details</h3>
                  <div className="prose prose-green max-w-none text-gray-800 text-sm sm:text-base">
                    {service.description ? (
                      <p>{service.description}</p>
                    ) : (
                      <p className="text-gray-500 italic">No details available.</p>
                    )}
                  </div>
                </div>

                {/* What We Offer */}
                {(service.amenities || service.specialties || service.highlights || service.items || service.services) && (
                  <div className="mt-6 sm:mt-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 border-b-2 border-green-200 pb-1 sm:pb-2">What we offer</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {(service.amenities || service.specialties || service.highlights || service.items || service.services).map((item) => (
                        <span
                          key={item}
                          className="bg-gradient-to-r from-green-100 to-emerald-200 text-green-900 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-md hover:shadow-lg"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Gallery */}
              {service.images && service.images.length > 0 && (
  <div className="mt-6 sm:mt-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {service.images.map((img, index) => (
        <motion.img
          key={index}
          src={img}
          alt={`${service.name} ${index + 1}`}
          className="rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition duration-300"
          onClick={() => setGalleryIndex(index)}
          whileHover={{ y: -5 }}
        />
      ))}
    </div>
    <Lightbox
      open={galleryIndex >= 0}
      index={galleryIndex}
      close={() => setGalleryIndex(-1)}
      slides={service.images.map((src) => ({ src }))}
    />
  </div>
)}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-xl rounded-2xl border border-green-100 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl font-semibold">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-8">
                {service.contact?.phone && (
                  <>
                    <a href={`tel:${service.contact.phone}`} className="flex items-center space-x-2 sm:space-x-3 group">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 group-hover:text-emerald-700" />
                      <span className="text-gray-800 font-medium group-hover:text-green-700 transition text-sm sm:text-base">{service.contact.phone}</span>
                    </a>

                    <a href={`https://wa.me/${service.contact.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 sm:space-x-3 group">
                      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 group-hover:text-green-600" />
                      <span className="text-gray-800 font-medium group-hover:text-green-600 transition text-sm sm:text-base">Chat on WhatsApp</span>
                    </a>
                  </>
                )}

                {service.contact?.email && (
                  <a href={`mailto:${service.contact.email}`} className="flex items-center space-x-2 sm:space-x-3 group">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 group-hover:text-emerald-700" />
                    <span className="text-gray-800 font-medium group-hover:text-green-700 transition text-sm sm:text-base">{service.contact.email}</span>
                  </a>
                )}

                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-700 hover:opacity-90 text-white font-semibold shadow-lg px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base"
                  onClick={handleGetDirections}
                >
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* -------- Image Carousel -------- */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-green-50 via-white to-emerald-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Top Spots</h2>

       <Slider {...sliderSettings}>
  {carouselImages.map((img, index) => (
    <div key={index} className="px-2 sm:px-3">
      <img
        src={img.src}
        alt={img.alt}
        className="rounded-2xl shadow-xl h-48 sm:h-60 md:h-72 w-full object-cover cursor-pointer"
        onClick={() => setCarouselIndex(index)}
      />
    </div>
  ))}
</Slider>

<Lightbox
  open={carouselIndex >= 0}
  index={carouselIndex}
  close={() => setCarouselIndex(-1)}
  slides={carouselImages.map((img) => ({ src: img.src }))}
/>

          {/* Explore Top Spots Button */}
          <div className="mt-6 sm:mt-10">
            <button
              onClick={() => window.location.href = "/attractions"}
              className="relative z-10 px-6 sm:px-8 py-2 sm:py-3 font-semibold text-white rounded-full shadow-lg
                         bg-gradient-to-r from-green-400 via-blue-500 to-pink-500
                         hover:from-pink-500 hover:via-purple-500 hover:to-green-400
                         transition-all duration-500
                         before:absolute before:-inset-1 before:rounded-full
                         before:bg-gradient-to-r before:from-pink-500 before:via-purple-500 before:to-green-500
                         before:opacity-50 before:blur-2xl before:animate-pulse before:-z-10 text-sm sm:text-base"
            >
              Explore Top Spots
            </button>
          </div>
        </div>
      </section>

      <MapSection />
      <Footer />
    </>
  );
};

export default ServiceDetailPage;

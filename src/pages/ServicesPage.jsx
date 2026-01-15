import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { serviceCategories } from '@/data/services';
import { useServices } from '@/contexts/ServicesContext';

/* --- Slideshow card --- */
const ServiceCard = ({ service, index }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = Array.isArray(service.images)
    ? service.images
    : service.images
    ? [service.images]
    : [];

  useEffect(() => {
    if (images.length > 1) {
      const id = setInterval(
        () => setCurrentIndex((i) => (i + 1) % images.length),
        8000 // 8s for smoother slideshow
      );
      return () => clearInterval(id);
    }
  }, [images.length]);

  const src = images.length ? images[currentIndex] : '/placeholder.png';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        <div className="relative">
          <img
            className="w-full h-48 object-cover rounded-t-lg"
            alt={service.name}
            src={src}
            loading="lazy"
          />
          <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 text-xs font-semibold text-gray-800">
            {service.category}
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800">
            {service.name}
          </CardTitle>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>{service.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{service.location}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {service.description}
          </p>
          <Link to={`/services/${service.id}`}>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              View Details
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ServicesPage = () => {
  const { services } = useServices();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get('category') || 'All'
  );
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const filteredServices = useMemo(() => {
    if (!services) return [];
    return services.filter((service) => {
      const matchesCategory =
        activeCategory === 'All' || service.category === activeCategory;

      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch =
        service.name.toLowerCase().includes(searchTermLower) ||
        (service.description &&
          service.description.toLowerCase().includes(searchTermLower)) ||
        (service.location &&
          service.location.toLowerCase().includes(searchTermLower)) ||
        (service.type &&
          service.type.toLowerCase().includes(searchTermLower));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm, services]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);

    // Close the "Show More" menu automatically
    setShowMoreCategories(false);

    const newSearchParams = new URLSearchParams(searchParams);
    if (category === 'All') newSearchParams.delete('category');
    else newSearchParams.set('category', category);
    setSearchParams(newSearchParams);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    const newSearchParams = new URLSearchParams(searchParams);
    if (val) newSearchParams.set('search', val);
    else newSearchParams.delete('search');
    setSearchParams(newSearchParams, { replace: true });
  };

  // Reorder categories: always "All" first, then active category (if not All), then rest
  const reorderedCategories = useMemo(() => {
    const all = serviceCategories;
    const others = all.filter((cat) => cat.name !== 'All');
    if (activeCategory && activeCategory !== 'All') {
      const active = all.find((c) => c.name === activeCategory);
      const rest = others.filter((c) => c.name !== activeCategory);
      return [{ name: 'All', icon: '🌐' }, active, ...rest];
    }
    return all;
  }, [activeCategory]);

  // Only show first 5 unless expanded
  const visibleCategories = showMoreCategories
    ? reorderedCategories
    : reorderedCategories.slice(0, 5);

  return (
    <>
     <Helmet>
  <title>Services in Dharamshala - Hotels, Guides & Adventure</title>
  <meta
    name="description"
    content="Find the best services in Dharamshala and nearby areas like HPCA Stadium, McLeod Ganj, Bhagsu, Naddi, Forsyth Ganj. Hotels, local guides, adventure, food, and wellness services."
  />
  <meta
    name="keywords"
    content="Dharamshala services, local guides Dharamshala, hotels in Dharamshala, adventure Dharamshala, HPCA Stadium, McLeod Ganj, Bhagsu, Naddi, Forsyth Ganj"
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.lookindharamshala.in/services" />

  {/* Open Graph */}
  <meta property="og:title" content="Services in Dharamshala - Hotels, Guides & Adventure" />
  <meta property="og:description" content="Explore top services in Dharamshala and nearby locations including HPCA Stadium, McLeod Ganj, Bhagsu, Naddi, Forsyth Ganj. Find hotels, guides, and adventure activities." />
  <meta property="og:url" content="https://www.lookindharamshala.in/services" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://www.lookindharamshala.in/services-og.jpg" />

  {/* JSON-LD */}
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Dharamshala Local Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Look in Dharamshala",
          "image": "https://www.lookindharamshala.in/logo.png",
          "telephone": "+91 9882770709",
          "email": "lookindharamshala@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Dharamshala",
            "addressRegion": "HP",
            "postalCode": "176215",
            "addressCountry": "IN"
          },
          "sameAs": [
            "https://www.facebook.com/lookindharamshala",
            "https://www.instagram.com/lookindharamshala/?hl=en",
            "https://www.youtube.com/@lookindharamshala"
          ]
        },
        "areaServed": ["Dharamshala", "HPCA Stadium", "McLeod Ganj", "Bhagsu", "Naddi", "Forsyth Ganj"],
        "description": "Hotels, adventure activities, local guides, food, and wellness services in Dharamshala and nearby areas."
      }
    `}
  </script>
</Helmet>

      <Navbar />

      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            alt="Market street in McLeod Ganj, Dharamshala"
            src="https://images.unsplash.com/photo-1565814603084-d2d5acf87070"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-6xl font-bold mb-6"
          >
            Dharamshala Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto"
          >
            Discover and connect with the best local businesses and service
            providers.
          </motion.p>
        </div>
      </section>

      {/* Filters & Services */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            {/* Search Bar */}
            <div className="relative flex-grow w-full md:max-w-md shrink-0">
              <Input
                type="text"
                placeholder="Search for a service..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Categories with Show More */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 w-full max-w-6xl mx-auto px-2">
              {visibleCategories.map((category) => (
                <Button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`flex flex-col items-center justify-center h-20 sm:h-24 text-[11px] sm:text-xs px-2 py-2 rounded-lg border transition-all duration-300 shadow-sm ${
                    activeCategory === category.name
                      ? "bg-green-600 text-white shadow-md scale-105"
                      : "bg-white text-gray-700 hover:shadow-md hover:scale-105"
                  }`}
                >
                  <span className="text-xl sm:text-2xl mb-1">{category.icon}</span>
                  <span className="font-medium text-center leading-tight truncate w-full">
                    {category.name}
                  </span>
                </Button>
              ))}

              {serviceCategories.length > 5 && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowMoreCategories((prev) => !prev)}
                  className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6 h-10 text-xs text-gray-700 hover:bg-green-700 hover:text-white rounded-lg shadow-sm transition-all"
                >
                  {showMoreCategories ? "Show Less" : "Show More"}
                </Button>
              )}
            </div>
          </div>

          {/* Services List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-600">
                  No services found. Try a different search or category!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ServicesPage;

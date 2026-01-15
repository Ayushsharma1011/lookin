import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, Camera } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const AttractionsPage = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);

  const handlePhotoClick = (images) => {
    setLightboxImages(images.map((src) => ({ src })));
    setLightboxOpen(true);
  };

  const handleDirectionsClick = (location) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`,
      "_blank"
    );
  };

  const attractions = [
    {
      name: 'Dalai Lama Temple Complex',
      description: 'The spiritual heart of Dharamshala, home to His Holiness the Dalai Lama',
      duration: '2-3 hours',
      rating: 4.8,
      category: 'Spiritual',
      highlights: ['Tibetan Museum', 'Prayer Wheels', 'Meditation'],
      image: '/images/attractions/dalailama/1.jpg',
      gallery: [
        '/images/attractions/dalailama/1.jpg',
        '/images/attractions/dalailama/2.jpg',
        '/images/attractions/dalailama/3.jpg'
      ],
      location: 'Dalai Lama Temple Complex, McLeod Ganj, Dharamshala'
    },
    {
      name: 'Triund Trek',
      description: 'Popular trekking destination offering panoramic views of Dhauladhar range',
      duration: 'Full day',
      rating: 4.9,
      category: 'Adventure',
      highlights: ['Mountain Views', 'Camping', 'Sunrise Point'],
      image: '/images/attractions/triund/3.avif',
      gallery: [
        '/images/attractions/triund/1.jpeg',
        '/images/attractions/triund/2.avif',
        '/images/attractions/triund/3.avif'
      ],
      location: 'Triund Trek, Dharamshala'
    },
    {
      name: 'Bhagsu Waterfall',
      description: 'Scenic waterfall perfect for nature lovers and photography enthusiasts',
      duration: '1-2 hours',
      rating: 4.6,
      category: 'Nature',
      highlights: ['Natural Pool', 'Rock Climbing', 'Photography'],
      image: '/images/attractions/bhagsu/1.jpg',
      gallery: [
        '/images/attractions/bhagsu/1.jpg',
        '/images/attractions/bhagsu/2.jpg',
        '/images/attractions/bhagsu/3.jpg'
      ],
      location: 'Bhagsu Waterfall, McLeod Ganj, Dharamshala'
    },
    {
      name: 'McLeod Ganj Market',
      description: 'Vibrant market area with Tibetan handicrafts, cafes, and local culture',
      duration: '2-4 hours',
      rating: 4.5,
      category: 'Culture',
      highlights: ['Shopping', 'Local Food', 'Street Art'],
      image: '/images/attractions/mcleodganj/1.jpg',
      gallery: [
        '/images/attractions/mcleodganj/1.jpg',
        '/images/attractions/mcleodganj/2.jpg',
        '/images/attractions/mcleodganj/3.jpg'
      ],
      location: 'McLeod Ganj Market, Dharamshala'
    },
    {
      name: 'Kangra Fort',
      description: 'Ancient fort with rich history and stunning valley views',
      duration: '2-3 hours',
      rating: 4.4,
      category: 'Historical',
      highlights: ['Ancient Architecture', 'Valley Views', 'Museum'],
      image: '/images/attractions/kangrafort/1.jpeg',
      gallery: [
        '/images/attractions/kangrafort/1.jpeg',
        '/images/attractions/kangrafort/2.jpeg',
        '/images/attractions/kangrafort/3.jpeg'
      ],
      location: 'Kangra Fort, Kangra, Himachal Pradesh'
    },
    {
      name: 'Tea Gardens',
      description: 'Lush green tea plantations offering serene walks and fresh mountain air',
      duration: '1-2 hours',
      rating: 4.7,
      category: 'Nature',
      highlights: ['Tea Tasting', 'Scenic Walks', 'Photography'],
      image: '/images/attractions/teagardens/1.jpeg',
      gallery: [
        '/images/attractions/teagardens/1.jpeg',
        '/images/attractions/teagardens/2.jpeg',
        '/images/attractions/teagardens/3.jpeg'
      ],
      location: 'Dharamshala Tea Gardens'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Top Attractions in Dharamshala - Best Places to Visit | Look in Dharamshala</title>
        <meta name="description" content="Discover the best attractions in Dharamshala including Dalai Lama Temple, Triund Trek, Bhagsu Waterfall, and more. Complete guide with ratings, timings, and visitor tips." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img  
            className="w-full h-full object-cover" 
            alt="Panoramic view of Dharamshala's top attractions including temples, mountains, and valleys"
            src="https://images.unsplash.com/photo-1565814603084-d2d5acf87070" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-6xl font-bold mb-6"
          >
            Top Attractions in Dharamshala
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto"
          >
            Explore sacred temples, breathtaking treks, and cultural landmarks in the Himalayan foothills
          </motion.p>
        </div>
      </section>

      {/* Attractions Grid */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((attraction, index) => (
              <motion.div
                key={attraction.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 glass-effect">
                  <div className="relative">
                    <img  
                      className="w-full h-48 object-cover rounded-t-lg" 
                      alt={`${attraction.name} - ${attraction.description}`}
                      src={attraction.image}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1">
                      <span className="text-sm font-semibold text-gray-800">{attraction.category}</span>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800">
                      {attraction.name}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{attraction.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{attraction.duration}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 mb-4">{attraction.description}</p>
                    
                    <div className="mb-4">
                      <p className="font-semibold text-gray-800 mb-2">Highlights:</p>
                      <div className="flex flex-wrap gap-2">
                        {attraction.highlights.map((highlight) => (
                          <span 
                            key={highlight}
                            className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleDirectionsClick(attraction.location)}
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Directions
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                        onClick={() => handlePhotoClick(attraction.gallery)}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Component */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxImages}
        plugins={[Thumbnails]}
      />

      <Footer />
    </>
  );
};

export default AttractionsPage;
7
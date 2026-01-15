import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Mountain, Church as Temple, Sprout, Building, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MapSection = () => {
  const openGoogleMaps = (query) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleMapInteraction = () => {
    openGoogleMaps('Dharamshala Top Places, Himachal Pradesh');
  };

  const handleLocationClick = (location) => {
    openGoogleMaps(`${location}, Dharamshala, Himachal Pradesh`);
  };

  const popularLocations = [
    {
      name: 'McLeod Ganj',
      spec: 'Vibrant Tibetan hub',
      icon: <Temple className="h-5 w-5 text-yellow-600" />,
      imageAlt: 'Vibrant street scene in McLeod Ganj with prayer flags and shops'
    },
    {
      name: 'Dalai Lama Temple',
      spec: 'Spiritual heart of the city',
      icon: <Temple className="h-5 w-5 text-red-600" />,
      imageAlt: 'Exterior of the Dalai Lama Temple with monks walking by'
    },
    {
      name: 'Bhagsu Waterfall',
      spec: 'Scenic natural cascade',
      icon: <Sprout className="h-5 w-5 text-green-600" />,
      imageAlt: 'Bhagsu waterfall cascading down lush green rocks'
    },
    {
      name: 'Triund Trek',
      spec: 'Popular Himalayan trek',
      icon: <Mountain className="h-5 w-5 text-blue-600" />,
      imageAlt: 'Hikers on the Triund trek with Dhauladhar mountain range in the background'
    },
    {
      name: 'Kangra Fort',
      spec: 'Ancient royal fortress',
      icon: <Building className="h-5 w-5 text-gray-600" />,
      imageAlt: 'The ancient and majestic Kangra Fort ruins'
    },
    {
      name: 'Cricket Stadium',
      spec: 'Highest international stadium',
      icon: <Star className="h-5 w-5 text-pink-600" />,
      imageAlt: 'The picturesque HPCA Cricket Stadium in Dharamshala'
    },
    {
      name: 'Norbulingka Institute',
      spec: 'Preserving Tibetan culture',
      icon: <Temple className="h-5 w-5 text-purple-600" />,
      imageAlt: 'Gardens and traditional architecture of Norbulingka Institute'
    }
  ];

  return (
    
    <section className="py-16 bg-gradient-to-b from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold text-gray-800 mb-4">
            Explore Dharamshala
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Navigate through the beautiful landscapes and discover hidden gems with our interactive map
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="h-[30rem] overflow-hidden shadow-xl">
              <CardContent className="p-0 h-full relative">
           <div
  className="w-full h-full bg-cover bg-center flex items-center justify-center cursor-pointer group relative rounded-xl overflow-hidden"
  onClick={handleMapInteraction}
  style={{
    backgroundImage: "url('images/1.png')", // 🔁 Replace with your image path or URL
  }}
>
  {/* Optional dark overlay for better text contrast */}
  <div className="absolute inset-0 bg-black/30 z-0" />

  <div className="text-center z-10 transition-transform duration-300 group-hover:scale-110">
    <MapPin className="h-16 w-16 text-white mx-auto mb-4 floating-animation" />
    <p className="text-white font-semibold text-lg">Interactive Map</p>
    <p className="text-white text-sm">Click to explore locations</p>
  </div>
</div>

               
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 rounded-full p-2 shadow-lg">
                    <Navigation className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Card className="shadow-xl h-[30rem] flex flex-col">
              <CardHeader>
                <CardTitle className="text-green-700">Popular Locations</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {popularLocations.map((location, index) => (
                  <motion.div
                    key={location.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div
                      className="flex items-center space-x-4 p-2 rounded-lg bg-white hover:bg-green-50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
                      onClick={() => handleLocationClick(location.name)}
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                          alt={location.imageAlt}
                         src="https://images.unsplash.com/photo-1595872018818-97555653a011" />//popular location images
                         
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 group-hover:text-green-800">{location.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          {location.icon}
                          <span className="ml-2">{location.spec}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
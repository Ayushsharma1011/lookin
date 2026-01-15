import React from 'react';
    import { motion } from 'framer-motion';
    import { ArrowRight } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import SearchBar from '@/components/SearchBar';
    import WeatherWidget from '@/components/WeatherWidget';
    import { Button } from '@/components/ui/button';

    const HeroSection = () => {
      return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover"
              alt="Stunning panoramic view of Dharamshala with snow-capped Himalayan mountains, lush green valleys, and traditional Tibetan architecture"
              src="https://images.unsplash.com/photo-1639809959651-9c6138ca06e0"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
          </div>

          <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Discover the Magic of the Mountains
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto"
            >
              Explore Dharamshala with us - Your guide to local services, stays, and adventures.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <SearchBar />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/services">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold pulse-glow"
                >
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/list-your-business">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold pulse-glow"
                >
                  List Your Business
                 
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="absolute top-20 right-4 z-20 hidden lg:block">
            <WeatherWidget />
          </div>
        </section>
      );
    };

    export default HeroSection;
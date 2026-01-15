import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const sectionsData = [
  {
    title: 'Hotels & Stays',
    description: 'Discover your ideal retreat — from luxurious mountain resorts to charming homestays tucked away in serene corners.',
    icon: '🏨',
    path: '/services?category=Stays'
  },
  {
    title: 'Restaurants & Cafes',
    description: 'Indulge in mouthwatering Tibetan delicacies, global flavors, and cozy café vibes.',
    icon: '🍜',
    path: '/services?category=Food'
  },
  {
    title: 'Mobile Accessories & SIM Services',
    description: 'Browse a variety of mobile accessories and get SIM services to stay connected.',
    icon: '📱',
    path: '/services?category=Mobile%20Accessories%20%26%20SIM%20Services'
  },
  {
    title: 'Adventure & Activities',
    description: 'From trekking Himalayan trails to soaring high in paragliding adventures — thrill awaits at every turn.',
    icon: '🪂',
    path: '/services?category=Adventure'
  },
  {
    title: 'Local Guides',
    description: 'Experience Dharamshala through the eyes of locals — guided tours filled with stories, culture, and hidden gems.',
    icon: '🧘',
    path: '/services?category=Guides'
  },
  {
    title: 'Shopping',
    description: 'Wander through vibrant bazaars brimming with handicrafts, woolens, and one-of-a-kind souvenirs.',
    icon: '🛍️',
    path: '/services?category=Shopping'
  },
  {
    title: 'Wellness & Spa',
    description: 'Unwind with yoga, meditation, massages, and healing therapies amidst nature’s calm.',
    icon: '🌿',
    path: '/services?category=Wellness'
  },
  {
    title: 'Education',
    description: 'Explore renowned schools, colleges, and skill-learning centers shaping bright futures.',
    icon: '🎓',
    path: '/services?category=Education'
  },
  {
    title: 'Gyms & Fitness',
    description: 'Stay fit with top-notch gyms, personal trainers, and fitness studios to keep you energized.',
    icon: '🏋️‍♂️',
    path: '/services?category=Gyms'
  },
  {
    title: 'Hospitals & Clinics',
    description: 'Access trusted healthcare facilities, specialized clinics, and emergency medical support.',
    icon: '🏥',
    path: '/services?category=Hospitals&Clinics'
  },
  {
    title: 'Vehicle Rentals',
    description: 'Rent bikes, scooters, or cars for hassle-free travel and exploration at your own pace.',
    icon: '🛵 🚗',
    path: '/services?category=Vehicle%20Rentals'
  },
  {
    title: 'Photography & Videography',
    description: 'Capture your special moments with professional photographers and cinematic storytellers.',
    icon: '📸',
    path: '/services?category=Photography'
  },
  {
    title: 'Spiritual Experiences',
    description: 'Immerse yourself in monasteries, temples, and soulful retreats for inner peace.',
    icon: '🙏',
    path: '/services?category=Spiritual'
  },
  {
    title: 'Entertainment & Events',
    description: 'Enjoy live music, theatre, cultural shows, and local festivities year-round.',
    icon: '🎭',
    path: '/services?category=Entertainment'
  },
  {
    title: 'Pet Care & Services',
    description: 'Find loving pet sitters, grooming services, and veterinary care for your furry friends.',
    icon: '🐾',
    path: '/services?category=Pet%20Services'
  },
  {
    title: 'Transportation',
    description: 'Reliable buses, taxis, and shuttle services to get you where you need to be.',
    icon: '🚍',
    path: '/services?category=Transportation'
  },
  {
    title: 'Stationery & Book Stores',
    description: 'Discover stationery, books, and supplies for students and professionals.',
    icon: '📚',
    path: '/services?category=Stationery%20%26%20Book%20Stores'
  },
  {
    title: 'PG & Hostels',
    description: 'Affordable and comfortable accommodations for students and working professionals.',
    icon: '🏠',
    path: '/services?category=PG%20%26%20Hostels'
  },
  {
    title: 'Home Services',
    description: 'Plumbers, electricians, and carpenters available for all your household needs.',
    icon: '🛠️',
    path: '/services?category=Home%20Services%20(Plumber,%20Electrician,%20Carpenter)'
  },
  {
    title: 'Beauty & Salon',
    description: 'Pamper yourself with beauty treatments, salon services, and grooming.',
    icon: '💇‍♀️',
    path: '/services?category=Beauty%20%26%20Salon'
  },
  {
    title: 'Banks & ATMs',
    description: 'Easily find nearby banks and ATMs for secure financial services.',
    icon: '🏦',
    path: '/services?category=Banks%20%26%20ATMs'
  },
  {
    title: 'Events & Party Services',
    description: 'Plan and host memorable events with decorators, DJs, and party organizers.',
    icon: '🎉',
    path: '/services?category=Events%20%26%20Party%20Services'
  },
  {
    title: 'Laundry & Dry Cleaning',
    description: 'Professional laundry and dry-cleaning services for your convenience.',
    icon: '🧺',
    path: '/services?category=Laundry%20%26%20Dry%20Cleaning'
  },
  {
    title: 'Courier & Delivery',
    description: 'Reliable courier and delivery services for personal and business needs.',
    icon: '📦',
    path: '/services?category=Courier%20%26%20Delivery'
  },
  {
    title: 'Repair Services',
    description: 'Mobile, laptop, and electronic repair services at your doorstep.',
    icon: '🔧',
    path: '/services?category=Repair%20Services%20(Mobile,%20Laptop,%20etc.)'
  },
  {
    title: 'Real Estate & Rentals',
    description: 'Explore property rentals, buying options, and trusted real estate agents.',
    icon: '🏡',
    path: '/services?category=Real%20Estate%20%26%20Rentals'
  },
  {
    title: 'Legal & Consultancy',
    description: 'Trusted lawyers and consultants for legal and professional advice.',
    icon: '⚖️',
    path: '/services?category=Legal%20%26%20Consultancy'
  },
  {
    title: 'Coworking Spaces',
    description: 'Work productively in shared coworking spaces with modern facilities.',
    icon: '💼',
    path: '/services?category=Coworking%20Spaces'
  }
];

const SpecialSections = () => {
  const [showAll, setShowAll] = useState(false);
  const topRef = useRef(null);

  const visibleSections = showAll ? sectionsData : sectionsData.slice(0, 6);

  const handleShowLess = () => {
    setShowAll(false);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={topRef}
      className="py-20 bg-gradient-to-b from-green-50 to-white relative overflow-hidden"
    >
      {/* Decorative blur background */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80%] h-[300px] bg-green-200/40 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
            Find Local Businesses & Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            From spiritual retreats to thrilling adventures — explore everything this Himalayan paradise has to offer.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border border-green-100 backdrop-blur-lg bg-white/70 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl">
                <CardHeader className="text-center">
                  <div className="text-5xl mb-4 drop-shadow-sm">{section.icon}</div>
                  <CardTitle className="text-xl font-bold text-gray-800 tracking-tight">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-6 leading-relaxed">{section.description}</p>
                  <Link to={section.path}>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white rounded-full shadow-md hover:shadow-lg transition-all">
                      Explore More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <div className="text-center mt-12">
          {!showAll ? (
            <Button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-md hover:shadow-lg transition-all"
            >
              Show More
            </Button>
          ) : (
            <Button
              onClick={handleShowLess}
              className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-md hover:shadow-lg transition-all"
            >
              Show Less
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SpecialSections;

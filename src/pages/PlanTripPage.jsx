import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, Users, Utensils, Hotel, FerrisWheel, Wallet, Plane, Car, Clock, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

const PlanTripPage = () => {
  const [days, setDays] = useState(3);
  const [guests, setGuests] = useState(1);
  const [travelStyle, setTravelStyle] = useState(2); 

  const styleConfig = {
    1: { name: 'Backpacker', stay: 800, food: 500, activity: 300, icon: '🎒' },
    2: { name: 'Mid-Range', stay: 2500, food: 1200, activity: 800, icon: '✈️' },
    3: { name: 'Luxury', stay: 8000, food: 3000, activity: 2500, icon: '💎' },
  };

  const totalBudget = useMemo(() => {
    const style = styleConfig[travelStyle];
    const totalStay = style.stay * days * guests;
    const totalFood = style.food * days * guests;
    const totalActivities = style.activity * days * guests;
    return totalStay + totalFood + totalActivities;
  }, [days, guests, travelStyle]);

  const travelTips = [
    { icon: <Plane className="h-6 w-6 text-blue-600" />, title: 'Getting There', tip: 'Fly to Kangra Airport (15km) or take train to Pathankot (90km) then bus/taxi.' },
    { icon: <Car className="h-6 w-6 text-green-600" />, title: 'Local Transport', tip: 'Auto-rickshaws and local buses are common. Renting a scooter offers great flexibility.' },
    { icon: <Clock className="h-6 w-6 text-orange-600" />, title: 'Best Time to Visit', tip: 'March-June for pleasant weather. September-November for clear skies post-monsoon.' },
    { icon: <MapPin className="h-6 w-6 text-purple-600" />, title: 'Where to Stay', tip: 'McLeod Ganj for hustle, Dharamkot for quiet cafes, and Bhagsu for nature access.' }
  ];

  return (
    <>
      <Helmet>
        <title>Dharamshala Trip Planner & Budget Calculator | Look in Dharamshala</title>
        <meta name="description" content="Plan your perfect trip to Dharamshala with our interactive budget calculator. Estimate costs for your stay, food, and activities based on your travel style." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" alt="Travel planning scene" src="https://images.unsplash.com/photo-1695619976604-cdfc58cd0da6" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          >
            Plan Your Dharamshala Trip
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto"
          >
            Instantly estimate your travel budget with our simple calculator.
          </motion.p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-blue-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Trip Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="glass-effect shadow-xl h-full">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
                  Trip Budget Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 sm:space-y-8 p-4 sm:p-8">

                {/* Days */}
                <div>
                  <label className="flex items-center text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
                    <Calendar className="h-5 w-5 mr-2 sm:mr-3 text-green-600" />
                    Trip Duration (Days)
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                    <Slider
                      min={1}
                      max={15}
                      step={1}
                      value={[days]}
                      onValueChange={(value) => setDays(value[0])}
                      className="w-full sm:w-auto"
                    />
                    <Input
                      type="number"
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      className="w-20 text-center font-bold"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="flex items-center text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
                    <Users className="h-5 w-5 mr-2 sm:mr-3 text-green-600" />
                    Number of Guests
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      value={[guests]}
                      onValueChange={(value) => setGuests(value[0])}
                      className="w-full sm:w-auto"
                    />
                    <Input
                      type="number"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-20 text-center font-bold"
                    />
                  </div>
                </div>

                {/* Travel Style */}
                <div>
                  <label className="flex items-center text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
                    <Wallet className="h-5 w-5 mr-2 sm:mr-3 text-green-600" />
                    Travel Style
                  </label>
                  <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-2 rounded-full gap-2">
                    {Object.entries(styleConfig).map(([key, style]) => (
                      <Button 
                        key={key}
                        onClick={() => setTravelStyle(Number(key))}
                        variant={travelStyle === Number(key) ? "default" : "ghost"}
                        className={`w-full sm:w-auto rounded-full transition-all duration-300 ${travelStyle === Number(key) ? 'bg-green-600 text-white' : ''}`}
                      >
                        <span className="mr-2 text-lg">{style.icon}</span> {style.name}
                      </Button>
                    ))}
                  </div>
                </div>

              </CardContent>
            </Card>
          </motion.div>

          {/* Budget Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Card className="bg-gradient-to-br from-green-600 to-blue-600 text-white shadow-2xl h-full flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-bold text-center">Estimated Budget</CardTitle>
              </CardHeader>
              <CardContent className="text-center flex-grow flex flex-col justify-center">
                <motion.div
                  key={totalBudget}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <p className="font-display text-3xl sm:text-5xl font-bold">
                    ₹{totalBudget.toLocaleString('en-IN')}
                  </p>
                  <p className="opacity-80 mt-1 text-sm sm:text-base">for {days} {days > 1 ? 'days' : 'day'} & {guests} {guests > 1 ? 'guests' : 'guest'}</p>
                </motion.div>
              </CardContent>
              <div className="p-4 sm:p-6 border-t border-white/20 text-xs sm:text-sm space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center opacity-90">
                  <span className="flex items-center"><Hotel className="h-4 w-4 mr-1 sm:mr-2"/>Stays</span>
                  <span>₹{(styleConfig[travelStyle].stay * days * guests).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center opacity-90">
                  <span className="flex items-center"><Utensils className="h-4 w-4 mr-1 sm:mr-2"/>Food</span>
                  <span>₹{(styleConfig[travelStyle].food * days * guests).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center opacity-90">
                  <span className="flex items-center"><FerrisWheel className="h-4 w-4 mr-1 sm:mr-2"/>Activities</span>
                  <span>₹{(styleConfig[travelStyle].activity * days * guests).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </Card>
          </motion.div>

        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
              Essential Travel Tips
            </h2>
            <p className="text-sm sm:text-lg text-gray-600">Everything you need for a smooth journey.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {travelTips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center glass-effect hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="bg-gray-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                      {tip.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">{tip.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">{tip.tip}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PlanTripPage;

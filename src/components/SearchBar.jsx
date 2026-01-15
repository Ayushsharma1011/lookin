import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/customSupabaseClient';
import {serviceCategories} from '../data/services';
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

   const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();

    // Fetch from services
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('name, category, description');

    // Fetch from businesses
    const { data: businesses, error: businessesError } = await supabase
      .from('businesses')
      .select('businessName, category, description');

    if (servicesError || businessesError) {
      console.error('Error fetching data:', servicesError || businessesError);
      return;
    }

    // Check matches in services
    const foundInServices = services?.some(service =>
      service.name.toLowerCase().includes(query)
    );

    // Check matches in businesses
    const foundInBusinesses = businesses?.some(business =>
      business.businessName.toLowerCase().includes(query)
    );

    // ✅ Check if it matches or partially matches a module name
    const matchedModule = serviceCategories.find(category =>
      category.name.toLowerCase().includes(query)
    );

    if (matchedModule) {
      // 🔹 Directly open that module page
      navigate(`/services?category=${encodeURIComponent(matchedModule.name)}`);
      return;
    }

    // If found in either table, go to search results
    if (foundInServices || foundInBusinesses) {
      navigate(`/services?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        navigate('/services');
      }, 2000);
    }
  };



  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col items-center mt-4 space-y-3"
      >
        {showInput ? (
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 shadow-lg">
            <input
              type="text"
              placeholder="Search for places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-white placeholder-white/70 w-64"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full transition"
            >
              Go
            </button>
            <button
              onClick={() => setShowInput(false)}
              className="text-white/70 hover:text-white transition text-sm"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-lg transition"
          >
            <Search className="h-5 w-5" />
            <span className="text-sm font-medium">Search</span>
          </button>
        )}

        {/* Temporary message */}
       
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-2xl text-green-400"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Thank you for exploring! Let’s discover more options…
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>

      {/* Google font import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
        rel="stylesheet"
      />
    </>
  );
};

export default SearchBar;

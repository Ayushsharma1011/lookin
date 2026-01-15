import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Top Spots', path: '/attractions' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Plan Your Trip', path: '/plan-trip' },
      { 
      name: 'Student Zone', 
      external: true, 
      path: 'https://studentzone.lookindharamshala.in/' 
    } // ✅ External link added
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      {/* Left-aligned full-width container */}
      <div className="max-w-full mx-auto px-0">
        <div className="flex justify-between items-center h-16">
          {/* Logo and site name */}
        <Link to="/" className="flex items-center space-x-3 pl-4">
  <img
    src="1.png"
    alt="Logo"
    className="h-14 w-14 sm:h-16 sm:w-16 object-contain" // Smaller size
  />
  <span className="font-display font-bold text-xl sm:text-4xl text-green-500">
    Look in Dharamshala
  </span>
</Link>

          {/* Desktop nav items */}
          <div className="hidden md:flex items-center space-x-6 pr-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-lg font-semibold transition-colors ${
                  scrolled
                    ? location.pathname === item.path
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-800 hover:text-green-600'
                    : location.pathname === item.path
                    ? 'text-green-400 border-b-2 border-green-400'
                    : 'text-white hover:text-green-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/list-your-business">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-full">
                <PlusCircle className="h-4 w-4 mr-2" />
                List Your Business
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 backdrop-blur-md rounded-lg mt-2 p-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors hover:text-green-600 ${
                  location.pathname === item.path ? 'text-green-600' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/list-your-business" onClick={() => setIsOpen(false)} className="block py-2">
              <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full">
                <PlusCircle className="h-4 w-4 mr-2" />
                List Your Business
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;

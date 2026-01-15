import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Plan Your Trip', path: '/plan-trip' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'List Your Business', path: '/list-your-business' },
      { 
      name: 'Student Zone', 
      external: true, 
      path: 'https://studentzone.lookindharamshala.in/' 
    } // ✅ External link added
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, path: 'https://www.facebook.com/share/1BVRYiucpU/' },
    { icon: <Instagram className="h-5 w-5" />, path: 'https://www.instagram.com/lookindharamshala/?hl=en' },
    { icon: <Youtube className="h-5 w-5" />, path: 'https://www.youtube.com/@lookindharamshala' },
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
               <img
                  src="1.png"
                  alt="Logo"
                  className="h-10 w-10 sm:h-16 sm:w-10 object-contain" // Smaller size
                />
                            <span className="font-display font-bold text-xl">
                Look in Dharamshala
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              Your ultimate guide to exploring the serene beauty and vibrant culture of Dharamshala.
            </p>
          </div>

          <div>
            <p className="font-bold tracking-wider uppercase text-gray-400 mb-4">Navigate</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-bold tracking-wider uppercase text-gray-400 mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>lookindharamshala@gmail.com</li>
              <li>+91 9882770709</li>
              <li></li>
              <li>Dharamshala, HP 176219</li>
            </ul>
          </div>

          <div>
            <p className="font-bold tracking-wider uppercase text-gray-400 mb-4">Follow Us</p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.path} className="text-gray-400 hover:text-white transition-colors">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} SynergyAyush & Look in Dharamshala. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link to="/admin/login" className="hover:text-white transition-colors">Admin Portal</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

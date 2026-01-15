import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';

    const CtaSection = () => {
      return (
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl font-bold text-gray-800 mb-6">
                Are you a local business owner?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join our platform and connect with thousands of travelers visiting Dharamshala.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/list-your-business">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
                  >
                    List Your Business Now
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-full text-lg font-semibold"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      );
    };

    export default CtaSection;
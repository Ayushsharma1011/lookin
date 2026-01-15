import React from 'react';
    import { motion } from 'framer-motion';
    import { Users, Star, Award, Calendar } from 'lucide-react';

    const trustMetrics = [
      { icon: <Users className="h-8 w-8 text-green-600" />, value: '50K+', label: 'Happy Travelers', color: 'bg-green-100' },
      { icon: <Star className="h-8 w-8 text-blue-600" />, value: '4.9/5', label: 'Average Rating', color: 'bg-blue-100' },
      { icon: <Award className="h-8 w-8 text-yellow-600" />, value: 'Verified', label: 'Locally Curated', color: 'bg-yellow-100' },
      { icon: <Calendar className="h-8 w-8 text-purple-600" />, value: '24/7', label: 'Support Available', color: 'bg-purple-100' },
    ];

    const TrustElements = () => {
      return (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              {trustMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className={`${metric.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto`}>
                    {metric.icon}
                  </div>
                  <p className="font-bold text-2xl text-gray-800">{metric.value}</p>
                  <p className="text-gray-600">{metric.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      );
    };

    export default TrustElements;
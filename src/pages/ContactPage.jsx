import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMailSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Contact Form: ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    );

    const mailtoLink = `mailto:ayush988277@gmail.com?subject=${subject}&body=${body}`;

    const a = document.createElement("a");
    a.href = mailtoLink;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    toast({
      title: "✅ Mail sent!",
      description: "We'll get back to you shortly.",
    });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    const text = encodeURIComponent(
      `Hello, my name is ${formData.name}.\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    );

    const whatsappLink = `https://wa.me/919882770709?text=${text}`;
    window.open(whatsappLink, "_blank");

    toast({
      title: "📱 WhatsApp opened!",
      description: "You can now send your message directly.",
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: 'Phone',
      details: ['+91 9882770709'],
      description: 'Call us for immediate assistance'
    },
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: 'Email',
      details: ['lookindharamshala@gmail.com'],
      description: 'Send us your queries anytime'
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: 'Hours',
      details: ['Mon-Sat: 9:00 AM - 7:00 PM', 'Sun: 10:00 AM - 5:00 PM'],
      description: 'We are here to help'
    }
  ];

  const team = [
    { name: ' Dr. Satish Sood', role: 'Ideator & Mentor' },
    { name: 'Dr. Sachin Awasthi', role: 'Ideator & Mentor' },
    { name: '  Ayush Sharma', role: 'Creator' }
  ];

  return (
    <>
      <Helmet>
  <title>Contact Look in Dharamshala - Local Guides & Travel Experts</title>
  <meta
    name="description"
    content="Get in touch with our local travel experts in Dharamshala, Himachal Pradesh. Book local guides, adventure activities, and personalized travel assistance."
  />
  <meta
    name="keywords"
    content="Contact Dharamshala travel experts, HPCA Stadium, McLeod Ganj, Bhagsu, Naddi, Forsyth Ganj, local guides Dharamshala, Dharamshala adventure"
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.lookindharamshala.in/contact" />

  {/* Open Graph */}
  <meta property="og:title" content="Contact Look in Dharamshala - Local Guides & Travel Experts" />
  <meta property="og:description" content="Reach our team for travel guidance in Dharamshala and nearby areas like HPCA Stadium, McLeod Ganj, Bhagsu, Naddi, Forsyth Ganj." />
  <meta property="og:url" content="https://www.lookindharamshala.in/contact" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://www.lookindharamshala.in/contact-og.jpg" />

  {/* JSON-LD */}
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Look in Dharamshala",
        "image": "https://www.lookindharamshala.in/logo.png",
        "telephone": "+91 9882770709",
        "email": "lookindharamshala@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dharamshala",
          "addressRegion": "HP",
          "postalCode": "176215",
          "addressCountry": "IN"
        },
        "url": "https://www.lookindharamshala.in",
        "sameAs": [
          "https://www.facebook.com/lookindharamshala",
          "https://www.instagram.com/lookindharamshala/?hl=en",
          "https://www.youtube.com/@lookindharamshala"
        ]
      }
    `}
  </script>
</Helmet>


      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img  
            className="w-full h-full object-cover" 
            alt="Friendly local guides and travel experts in Dharamshala with mountain backdrop"
            src="https://images.unsplash.com/photo-1579612769377-72c7703f0604" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-6xl font-bold mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto"
          >
            Connect with our local experts for personalized travel assistance
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="glass-effect shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Send us a Message
                  </CardTitle>
                  <p className="text-gray-600">We'll get back to you within 24 hours</p>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                        <select 
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          required
                        >
                          <option value="">Select Subject</option>
                          <option value="trip-planning">Trip Planning</option>
                          <option value="booking">Hotel Booking</option>
                          <option value="guide">Local Guide</option>
                          <option value="general">General Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                      <textarea
                        className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your travel plans..."
                        required
                      />
                    </div>

                    {/* Two Buttons */}
                    <div className="flex space-x-4">
                      <Button 
                        onClick={handleMailSubmit}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Mail
                      </Button>
                      <Button 
                        onClick={handleWhatsAppSubmit}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send WhatsApp
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-effect">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-1">{info.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{info.description}</p>
                          {info.details.map((detail, i) => (
                            <p key={i} className="text-gray-700 font-medium">{detail}</p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-gray-800 mb-4">
              Meet Our Dedicated Team
            </h2>
            <p className="text-lg text-gray-600">
              Our team of passionate local experts is committed to making your journey seamless, memorable, and uniquely Dharamshala.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-4xl">
                      <span>👨</span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg">{member.name}</h3>
                    <p className="text-green-600 font-semibold">{member.role}</p>
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

export default ContactPage;

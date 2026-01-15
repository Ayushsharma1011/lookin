import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Send, Building, User, Phone, Mail, FileText, Tag, Loader2, Image as ImageIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { serviceCategories } from '@/data/services';
import { supabase } from '@/lib/customSupabaseClient';

const ListBusinessPage = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    phone: '+91',
    email: '',
    category: '',
    about: '',        // ✅ added field
    description: '',
  });

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    if (field === "about" && value.length > 50) return; // ✅ enforce 50 chars
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setImages(files);
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation checks
    if (!formData.businessName || !formData.ownerName || !formData.phone || !formData.email || !formData.category || !formData.description) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    // ✅ Phone number check
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number with country code (e.g. +91XXXXXXXXXX).",
        variant: "destructive",
      });
      return;
    }

    // ✅ Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    let imageUrls = [];

    try {
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const file = images[i];
          if (!file.type.startsWith("image/")) {
            toast({
              title: "Invalid File",
              description: "Only image files are allowed.",
              variant: "destructive",
            });
            continue;
          }

          const fileExt = file.name.split(".").pop();
          const fileName = `${Date.now()}_${i}.${fileExt}`;
          const filePath = `uploads/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("businesses")
            .upload(filePath, file, {
              cacheControl: "3600",
              upsert: false,
              contentType: file.type,
            });

          if (uploadError) {
            console.error("Image upload error: ", uploadError.message);
            toast({
              title: "Image Upload Failed",
              description: uploadError.message,
              variant: "destructive",
            });
            continue;
          }

          const { data: publicUrlData } = supabase.storage
            .from("businesses")
            .getPublicUrl(filePath);

          if (publicUrlData?.publicUrl) {
            imageUrls.push(publicUrlData.publicUrl);
          }
        }
      }

      const { error } = await supabase.from("businesses").insert([
        {
          ...formData,
          images: imageUrls,
          status: "pending",
          submittedAt: new Date().toISOString(),
        },
      ]);

      if (error) {
        toast({
          title: "Submission Failed",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
        console.error("Error adding document: ", error);
      } else {
        toast({
          title: "✅ Submission Received!",
          description: "Thank you for listing your business. We will review it shortly.",
        });
        setFormData({
          businessName: "",
          ownerName: "",
          phone: "+91",
          email: "",
          category: "",
          about: "",        // ✅ reset about
          description: "",
        });
        setImages([]);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: "Unexpected Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>List Your Business | Look in Dharamshala</title>
        <meta
          name="description"
          content="List your local business or service in Dharamshala on our platform and reach more customers. Hotels, restaurants, guides, and more."
        />
      </Helmet>

      <Navbar />

      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            alt="A vibrant street market in Dharamshala, representing local businesses"
            src="https://images.unsplash.com/photo-1536858485787-2906fd32f7e4"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-6xl font-bold mb-6"
          >
            Grow Your Business With Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto"
          >
            Join our community of local partners and connect with thousands of travelers.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Business Information Form
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Fill out the details below. Our team will review your submission within 48 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Business Name"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Owner's Full Name"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder="Contact Phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Contact Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  required
                  className="pl-10 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select Business Category</option>
                  {serviceCategories
                    .filter(c => c.name !== 'All')
                    .map(cat => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* ✅ About field (50 chars max) */}
              <div className="relative">
                <FileText className="absolute left-3 top-1/3 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Short About (max 50 characters)"
                  value={formData.about}
                  onChange={(e) => handleInputChange('about', e.target.value)}
                  maxLength={50}
                  required
                  className="pl-10"
                />
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {formData.about.length}/50 characters
                </p>
              </div>

              <div className="relative">
                <FileText className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                <textarea
                  placeholder="Brief Description of Your Business/Service"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                  className="pl-10 w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                ></textarea>
              </div>

              {/* Image Upload Section */}
              <div className="relative">
                <label
                  htmlFor="images"
                  className="flex flex-col items-center justify-center w-full cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 p-6 text-center transition"
                >
                  <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-gray-600 font-medium">Click to upload images</span>
                  <span className="text-sm text-gray-500">You can upload up to 3 images</span>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {images.map((file, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" /> Submit for Review
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ListBusinessPage;

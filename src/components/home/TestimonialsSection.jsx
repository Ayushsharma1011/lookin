import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/customSupabaseClient";

const TestimonialsSection = () => {
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ Name: "", Email: "", Review: "" });
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch only approved reviews
  useEffect(() => {
    const fetchApprovedReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("Approved", true) // Only approved
        .order("id", { ascending: false }); // Newest first

      if (!error && data) {
        setTestimonialsData(data);
      } else {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchApprovedReviews();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("reviews").insert([
      {
        Name: formData.Name,
        Email: formData.Email || null, // optional
        Review: formData.Review,
        Rating: rating,
        Approved: false, // new reviews default to pending
      },
    ]);

    if (error) {
      console.error("Error inserting review:", error);
      setMessage("❌ Error saving review: " + error.message);
    } else {
      setMessage("✅ Thank you! Your review is submitted for approval.");
      setFormData({ Name: "", Email: "", Review: "" });
      setRating(0);

      // Auto close popup after 2 seconds
      setTimeout(() => {
        setShowForm(false);
        setMessage("");
      }, 2000);
    }

    setLoading(false);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            What Travelers Say
          </h2>
          <p className="text-lg text-green-100">
            Real experiences from real people
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
         <Card className="bg-white/40 backdrop-blur-md border border-green-300 shadow-xl rounded-2xl transform transition-all hover:scale-105 hover:shadow-2xl h-full">
  <CardContent className="p-6 flex flex-col items-center text-center">

    {/* Reviewer Name */}
    <p className="font-bold text-xl text-gray-900 tracking-wide mb-2">
      {testimonial.Name}
    </p>

    {/* Rating as stars */}
    <div className="flex items-center justify-center mb-4">
      {[...Array(testimonial.Rating)].map((_, i) => (
        <Star
          key={i}
          className="h-6 w-6 text-yellow-400 drop-shadow-md"
        />
      ))}
    </div>

    {/* Review Text */}
    <p className="text-gray-800 font-medium italic leading-relaxed">
      “{testimonial.Review}”
    </p>
  </CardContent>
</Card>

            </motion.div>
          ))}
        </div>

        {/* Add Review Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-lg transition"
          >
            Give Review
          </button>
        </div>
      </div>

      {/* Popup Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md border border-white/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Share Your Experience
              </h3>

              {message && (
                <p
                  className={`mb-3 text-sm text-center font-medium ${
                    message.startsWith("✅") ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {message}
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="Name"
                  placeholder="Your Name"
                  value={formData.Name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition"
                  required
                />
                <input
                  type="email"
                  name="Email"
                  placeholder="Your Email (optional)"
                  value={formData.Email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition"
                />
                <textarea
                  name="Review"
                  placeholder="Your Review"
                  value={formData.Review}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition resize-none"
                  rows="4"
                  required
                ></textarea>

                {/* Rating stars */}
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <Star
                      key={starValue}
                      className={`h-8 w-8 cursor-pointer transition-transform ${
                        starValue <= rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                      onClick={() => setRating(starValue)}
                    />
                  ))}
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? "Submitting..." : "Submit Review"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialsSection;

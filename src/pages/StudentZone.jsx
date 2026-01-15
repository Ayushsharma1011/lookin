import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Footer from '@/components/Footer';
import Navbar from "../components/Navbar"; 

const StudentZone = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navbar />

      {/* Hero Section */}
      <div
        className="h-[60vh] bg-cover bg-center flex flex-col items-center justify-center text-center px-4"
        style={{ backgroundImage: "url('/images/gorkha-bhawan-bg.jpg')" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-5xl font-bold mb-4 text-green-400 drop-shadow-lg"
        >
          Annual Quiz Competition
        </motion.h1>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg sm:text-2xl font-bold mb-4 text-green-400 drop-shadow-lg px-2"
        >
          On the Occasion of 109th Anniversary Celebration of Himachal & Punjab Gorkha Association
        </motion.h3>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-xl sm:text-2xl font-bold mb-4 text-green-400 drop-shadow-lg"
        >
          Dharamshala
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg text-gray-200 max-w-2xl leading-relaxed px-4"
        >
          Organized by{" "}
          <span className="text-green-400 font-semibold">
            Himachal & Punjab Gorkha Association
          </span>
          . A celebration of knowledge, culture, and community spirit.
        </motion.p>
      </div>

      {/* Single Image Section */}
      <div className="bg-gray-800/70 border border-green-600/30 rounded-2xl shadow-lg p-4 sm:p-8 flex items-center justify-center mx-4 sm:mx-20 my-8">
        <img
          src="/download.jpg"
          alt="Quiz Moment"
          className="rounded-2xl object-cover w-full max-w-3xl max-h-96"
        />
      </div>

      {/* Sample Quiz Section */}
      <div className="bg-gray-800 py-12 sm:py-16 text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-green-400 mb-4">
          Sample Questions for Quiz
        </h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
          Prepare yourself with sample questions curated specially for the Gorkha Bhawan Quiz.
        </p>

        <motion.a
          href="/SAMPLE QUESTION.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg transition text-sm sm:text-base"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          Download Sample PDF
        </motion.a>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentZone;

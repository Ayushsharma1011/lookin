import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./gallery.css";

const GallerySection = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([
    { src: "https://images.unsplash.com/photo-1536858485787-2906fd32f7e4", alt: "Dalai Lama Temple (Unsplash)" },
    { src: "https://images.unsplash.com/photo-1700992897732-739863a7de6e", alt: "Triund Trek (Unsplash)" },
    { src: "https://images.unsplash.com/photo-1689702584022-f9843db091c3", alt: "Bhagsu Waterfall (Unsplash)" },
    { src: "https://images.unsplash.com/photo-1693165097242-9ef4d9f326d9", alt: "Tibetan Food" },
    { src: '/images/attractions/triund/2.avif', alt: "Sunset at Dharamshala" },
    { src: '/images/attractions/dalailama/1.jpg', alt: 'Dalai Lama Temple Complex - Main View' },
    { src: '/images/attractions/dalailama/2.jpg', alt: 'Dalai Lama Temple Complex - Prayer Wheels' },
    { src: '/images/attractions/dalailama/3.jpg', alt: 'Dalai Lama Temple Complex - Monastery Interior' },
    { src: '/images/attractions/triund/1.jpeg', alt: 'Triund Trek - Mountain Trail' },
    { src: '/images/attractions/triund/2.avif', alt: 'Triund Trek - Sunset View' },
    { src: '/images/attractions/triund/3.avif', alt: 'Triund Trek - Snow Peak View' },
    { src: '/images/attractions/bhagsu/1.jpg', alt: 'Bhagsu Waterfall - Front View' },
    { src: '/images/attractions/bhagsu/2.jpg', alt: 'Bhagsu Waterfall - Natural Pool' },
    { src: '/images/attractions/bhagsu/3.jpg', alt: 'Bhagsu Waterfall - Top View' },
    { src: '/images/attractions/mcleodganj/1.jpg', alt: 'McLeod Ganj Market - Tibetan Stalls' },
    { src: '/images/attractions/mcleodganj/2.jpg', alt: 'McLeod Ganj Market - Handicrafts' },
    { src: '/images/attractions/mcleodganj/3.jpg', alt: 'McLeod Ganj Market - Street View' },
    { src: '/images/attractions/kangrafort/1.jpeg', alt: 'Kangra Fort - Main Entrance' },
    { src: '/images/attractions/kangrafort/2.jpeg', alt: 'Kangra Fort - Ancient Walls' },
    { src: '/images/attractions/kangrafort/3.jpeg', alt: 'Kangra Fort - Valley View' },
    { src: '/images/attractions/teagardens/1.jpeg', alt: 'Tea Gardens - Green Pathway' },
    { src: '/images/attractions/teagardens/2.jpeg', alt: 'Tea Gardens - Tea Leaves Close-up' },
    { src: '/images/attractions/teagardens/3.jpeg', alt: 'Tea Gardens - Scenic View' }
  ]);

  // Swap images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setGalleryImages(prev => {
        const newImages = [...prev];
        let i1 = Math.floor(Math.random() * newImages.length);
        let i2 = Math.floor(Math.random() * newImages.length);
        while (i2 === i1) i2 = Math.floor(Math.random() * newImages.length);
        [newImages[i1], newImages[i2]] = [newImages[i2], newImages[i1]];
        return newImages;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="py-10 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10"
        >
          Our Gallery
        </motion.h2>

        {/* Slider */}
        <Slider {...settings} className="overflow-visible">
  {galleryImages.map((img, idx) => (
    <div key={idx} className="px-2 sm:px-3">
      <div
        className="overflow-hidden rounded-xl shadow-lg cursor-pointer"
        onClick={() => setLightboxImage(img)}
      >
        <motion.img
          src={img.src}
          alt={img.alt}
          className="w-full h-48 sm:h-60 md:h-72 object-cover rounded-xl transition-transform duration-500"
          whileHover={{ scale: 1.05 }}
        />
      </div>
    </div>
  ))}
</Slider>

        {/* Lightbox */}
        {lightboxImage && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 px-4 sm:px-6">
            <div className="relative">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
              />
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-10 sm:-top-12 right-0 text-white text-3xl sm:text-4xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;

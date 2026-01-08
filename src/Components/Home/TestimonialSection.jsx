import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ayesha Rahman",
    image: "/user-placeholder.jpg",
    text: "PlateShare helped me donate leftover food from our event. Amazing experience!",
    rating: 5,
  },
  {
    name: "Rafi Ahmed",
    image: "/user-placeholder.jpg",
    text: "I received food through this platform. Very helpful and easy to use.",
    rating: 4,
  },
  {
    name: "Sara Khan",
    image: "/user-placeholder.jpg",
    text: "Great community initiative. Encourages responsible food sharing.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 100 } },
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <motion.section
      className="py-16 px-4 max-w-7xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2
        className="text-3xl font-bold text-center text-black dark:text-white mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Testimonials
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md dark:shadow-gray-700 text-black dark:text-white"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-400">
                  {t.name}
                </h4>
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-800 dark:text-gray-300">{t.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default TestimonialsSection;

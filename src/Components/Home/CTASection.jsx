import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, type: "spring", stiffness: 100 } 
    },
  };

  return (
    <motion.section
      className="py-16 px-4 bg-green-600 dark:bg-green-800 rounded-2xl mx-4 md:mx-16 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold mb-4 text-black dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Join PlateShare Today!
      </motion.h2>

      <motion.p
        className="mb-6 text-lg text-black dark:text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Donate or request food and make a positive impact in your community.
      </motion.p>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/addfoods"
          className="px-6 py-3 bg-white text-green-600 dark:text-green-800 rounded-md font-semibold hover:bg-gray-100 transition-colors"
        >
          Get Started
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default CTASection;

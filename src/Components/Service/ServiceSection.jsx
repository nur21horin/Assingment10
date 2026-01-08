import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UtensilsCrossed, ArrowRight } from "lucide-react";

const services = [
  { 
    title: "Food Donation", 
    desc: "Easily donate surplus food to those in need.", 
    link: "/addfoods" 
  },
  { 
    title: "Request Food", 
    desc: "Request food in your area with a simple form.", 
    link: "/availablefoods" 
  },
  { 
    title: "Manage Inventory", 
    desc: "Keep track of donations and requests efficiently.", 
    link: "/manage-foods" 
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
  hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
};

const iconVariants = {
  hover: { x: 5, opacity: 1, transition: { duration: 0.3 } },
  initial: { x: -5, opacity: 0 },
};

const ServicesSection = () => {
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
        Our Services
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {services.map((service, i) => (
          <Link key={i} to={service.link}>
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md dark:shadow-gray-700 cursor-pointer transition-colors duration-300 hover:bg-green-50 dark:hover:bg-green-900"
            >
              <div className="flex items-center mb-4 gap-3">
                <UtensilsCrossed className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{service.desc}</p>
              
              {/* Hover arrow */}
              <motion.div
                className="absolute top-1/2 right-6 -translate-y-1/2"
                variants={iconVariants}
                initial="initial"
              >
                <ArrowRight className="w-5 h-5 text-green-600 dark:text-green-400" />
              </motion.div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ServicesSection;

import React, { useContext } from "react";
import { Plus, Search, Heart } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: Plus,
    title: "Post Your Food",
    description:
      "Share your surplus food by adding details like quantity, location, and expiry date. It only takes a minute!",
    color: "text-green-600",
    bg: "bg-green-100 dark:bg-green-900/30",
    link: "/addfoods",
  },
  {
    icon: Search,
    title: "Find Available Food",
    description:
      "Browse through available food donations in your area. Filter by location and food type to find what you need.",
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    link: "/availablefoods",
  },
  {
    icon: Heart,
    title: "Collect & Enjoy",
    description:
      "Request the food you need and coordinate pickup. Help reduce waste while feeding your community!",
    color: "text-pink-600",
    bg: "bg-pink-100 dark:bg-pink-900/30",
    link: "/myrequests",
  },
];

const HowWeWorks = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
            How PlateShare Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Sharing food is simple and rewarding. Follow these three easy steps to get started.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
          }}
        >
          {steps.map((step, index) => (
            <Link to={step.link} key={index}>
              <motion.div
                className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-700 p-8 text-center cursor-pointer hover:shadow-lg transition-all duration-300"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 1,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                }}
              >
                {/* Animated icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${step.bg} mb-6`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </motion.div>

                {/* Animated number */}
                <motion.div
                  className="absolute top-4 right-6 text-5xl font-bold text-gray-100"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {index + 1}
                </motion.div>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeWorks;

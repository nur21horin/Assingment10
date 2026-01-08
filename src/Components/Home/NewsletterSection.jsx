import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Enter your email");
      return;
    }
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success("Subscribed successfully!");
    }, 1500);
  };

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
      className="py-16 px-4 max-w-4xl mx-auto rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-md dark:shadow-gray-700 text-center"
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
        Subscribe to Our Newsletter
      </motion.h2>

      <motion.p
        className="text-gray-800 dark:text-gray-200 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Stay updated with the latest food donation drives and news.
      </motion.p>

      <motion.div 
        className="flex flex-col sm:flex-row justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-md w-full sm:w-auto flex-1 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="px-6 py-2 bg-green-600 dark:bg-green-500 text-white rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </motion.div>

      <ToastContainer position="top-center" autoClose={2000} />
    </motion.section>
  );
};

export default NewsletterSection;

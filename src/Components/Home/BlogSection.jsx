import React from "react";
import { motion } from "framer-motion";

const blogs = [
  { title: "5 Tips to Reduce Food Waste", date: "Jan 5, 2026", link: "#" },
  { title: "How Communities Can Share Food", date: "Dec 28, 2025", link: "#" },
  { title: "Impact of Food Donations in Dhaka", date: "Dec 15, 2025", link: "#" },
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

const BlogSection = () => {
  return (
    <motion.section
      className="py-16 px-4 max-w-7xl mx-auto rounded-2xl"
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
        Latest Blog & News
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {blogs.map((blog, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover="hover"
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md dark:shadow-gray-700 cursor-pointer transition-colors duration-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
              {blog.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {blog.date}
            </p>
            <a
              href={blog.link}
              className="text-green-600 dark:text-green-400 font-medium hover:underline"
            >
              Read More
            </a>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default BlogSection;

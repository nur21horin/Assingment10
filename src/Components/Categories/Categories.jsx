import React from "react";
import { motion } from "framer-motion";

const categories = [
  { name: "Vegetables", link: "/categories/vegetables" },
  { name: "Fruits", link: "/categories/fruits" },
  { name: "Packaged Foods", link: "/categories/packaged-foods" },
  { name: "Beverages", link: "/categories/beverages" },
  { name: "Bakery", link: "/categories/bakery" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, type: "spring" },
  }),
};

const CategoriesSection = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-12">
        Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {categories.map((cat, i) => (
          <motion.a
            key={i}
            href={cat.link}
            className="block bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl shadow-md dark:shadow-gray-700 p-6 text-center cursor-pointer hover:shadow-xl transition-all hover:bg-green-50 dark:hover:bg-green-900"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold">{cat.name}</h3>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;

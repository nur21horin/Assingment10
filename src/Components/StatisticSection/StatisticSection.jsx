import React from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Donors", value: 1200, link: "/donors" },
  { label: "Recipients", value: 3400, link: "/recipients" },
  { label: "Foods Shared", value: 8500, link: "/shared-foods" },
];

const StatisticsSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl mx-4 md:mx-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
};

const StatCard = ({ stat, index }) => {
  const [count, setCount] = React.useState(0);

  // Count-up animation
  React.useEffect(() => {
    let start = 0;
    const end = stat.value;
    const duration = 1500;
    const increment = Math.ceil(end / (duration / 30));
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(start);
    }, 30);

    return () => clearInterval(counter);
  }, [stat.value]);

  return (
    <motion.a
      href={stat.link}
      className="block bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md dark:shadow-gray-700 hover:shadow-xl transition cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-4xl font-bold text-black dark:text-white mb-2">{count}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-lg">{stat.label}</p>
    </motion.a>
  );
};

export default StatisticsSection;

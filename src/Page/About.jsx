import React from "react";

const About = () => {
  return (
    <section className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-green-800 dark:text-green-400">
        About Our Food Donation Platform
      </h1>

      <p className="text-gray-700 dark:text-gray-300">
        Our platform connects generous donors with people in need. We strive
        to reduce food waste and support communities by providing a simple,
        reliable way to donate and request food.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md dark:shadow-gray-700">
          <h2 className="text-2xl font-semibold mb-2 text-green-700 dark:text-green-400">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Reduce food waste, support the needy, and make food donation simple
            and accessible for everyone.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md dark:shadow-gray-700">
          <h2 className="text-2xl font-semibold mb-2 text-green-700 dark:text-green-400">
            Our Vision
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Create a world where surplus food is never wasted, and everyone has
            access to nutritious meals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

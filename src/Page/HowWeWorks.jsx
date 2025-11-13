import React from "react";
import { Plus, Search, Heart } from "lucide-react";

const steps = [
  {
    icon: Plus,
    title: "Post Your Food",
    description:
      "Share your surplus food by adding details like quantity, location, and expiry date. It only takes a minute!",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    icon: Search,
    title: "Find Available Food",
    description:
      "Browse through available food donations in your area. Filter by location and food type to find what you need.",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: Heart,
    title: "Collect & Enjoy",
    description:
      "Request the food you need and coordinate pickup. Help reduce waste while feeding your community!",
    color: "text-pink-600",
    bg: "bg-pink-100",
  },
];

const HowWeWorks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            How PlateShare Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sharing food is simple and rewarding. Follow these three easy steps
            to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-all"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${step.bg} mb-6`}
              >
                <step.icon className={`h-8 w-8 ${step.color}`} />
              </div>
              <div className="absolute top-4 right-6 text-5xl font-bold text-gray-100">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorks;

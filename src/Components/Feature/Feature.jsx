import React from "react";
import { CheckCircle } from "lucide-react";

const features = [
  { title: "Reduce Waste", desc: "Connect donors and recipients to reduce food waste." },
  { title: "Community Impact", desc: "Make a difference in your local community." },
  { title: "Easy to Use", desc: "Simple UI for adding, requesting, and managing foods." },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-green-800 dark:text-green-400 mb-12">
        Our Features
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <div key={i} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <CheckCircle className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

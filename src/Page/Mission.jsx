import React from "react";
import { Leaf, Users, TrendingDown, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Community Members",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    icon: Leaf,
    value: "50,000+",
    label: "Meals Shared",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    icon: TrendingDown,
    value: "30 Tons",
    label: "Waste Reduced",
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    icon: Award,
    value: "100+",
    label: "Partner Organizations",
    color: "text-green-700",
    bg: "bg-green-100",
  },
];

const MissionSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-extrabold mb-6 text-gray-800">
              Our Mission:{" "}
              <span className="text-green-700">Zero Food Waste</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Every year, millions of tons of perfectly good food go to waste
              while many people struggle to put meals on the table.
              <span className="font-semibold text-green-700">PlateShare</span>
              bridges this gap by creating a community-driven platform where
              surplus food finds those who need it most.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe that food sharing is not just about reducing waste —
              it's about building stronger, more connected communities.
              Together, we're creating a sustainable future, one shared meal at
              a time.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition-all"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${stat.bg} mb-4`}
                >
                  <stat.icon className={`h-7 w-7 ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-500 text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;

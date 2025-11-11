import React from "react";
import { Link } from "react-router-dom";
import { Search, Share2 } from "lucide-react";
import HeroImg from "./../assets/hero-food-sharing.jpg";

const Heropage = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-100">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HeroImg}
          alt="Food sharing hero"
          className="w-full h-full object-cover scale-105 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-white px-6 md:px-12 lg:px-20 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
          Share Food, <span className="text-green-400">Reduce Waste</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-200 leading-relaxed">
          Join our community in fighting food waste. Share your surplus meals
          with neighbors who need them. Together, we can make a difference —
          one plate at a time.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/availablefoods">
            <button className="group w-full sm:w-auto px-8 py-3 bg-green-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-green-700 hover:scale-105">
              <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Find Available Foods
            </button>
          </Link>

          <Link to="/addfoods">
            <button className="group w-full sm:w-auto px-8 py-3 bg-white text-green-700 font-semibold rounded-lg flex items-center justify-center gap-2 border border-green-600 transition-all duration-300 hover:bg-green-600 hover:text-white hover:scale-105">
              <Share2 className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
              Share Your Food
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Heropage;

import React from "react";
import HeroImg from "./../assets/hero-food-sharing.jpg";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Heropage = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={HeroImg}
          alt="Food sharing hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/80 to-background/60" />
      </div>
      {/* Content item */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Share Food , <span className="text-primary">Reduce Waste</span>
          </h1>
          <p>
            Join our community in fighting food waste. Share your surplus meals
            with neighbors who need them. Together, we can make a difference,
            one plate at a time.
          </p>
          <div>
            <Link to={"/availablefoods"}>
              <button>
                <Search className="mr-2 h-5 w-5" />
                Find Available Foods
              </button>
            </Link>
            <Link to={"/addfoods"}>
              <button className="w-full size-lg sm:w-auto">
                Share Your Food
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Heropage;

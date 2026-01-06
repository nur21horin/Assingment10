import React from "react";
import { Link } from "react-router-dom";
import { UtensilsCrossed, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-8">
       
        {/* Logo & Description */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <Link to="/" className="flex items-center font-bold text-xl text-gray-800 dark:text-gray-100">
            <UtensilsCrossed className="w-6 h-6" />
            <span className="ml-2">PlateShare</span>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-sm">
            Reducing food waste by connecting communities. Share your surplus food and make a difference.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Quick Links</h3>
          <ul className="flex flex-col space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/availablefoods" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Available Foods
              </Link>
            </li>
            <li>
              <Link to="/addfoods" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Add Food
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Connect With Us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400 transition-colors">
        &copy; {currentYear} PlateShare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

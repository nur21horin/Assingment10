import React from "react";
import { Link } from "react-router-dom";

const Errorpage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <img
        src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
        alt="404 Not Found"
        className="w-80 h-80 mb-6 rounded-lg shadow-lg"
      />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Oops! Page not found
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <button className="px-6 py-3 bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white font-semibold rounded-md transition shadow-md">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default Errorpage;

import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { ThemeContext } from "../context/ThemeContext";

const RootLayout = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen transition-colors duration-300`}
    >
      <Navbar />
      <Outlet />

      <Footer />
    </div>
  );
};

export default RootLayout;

// import React, { useContext } from "react";
// import { NavLink, Outlet, useLocation } from "react-router-dom";

// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import { ThemeContext } from "../../context/ThemeContext";

// const RootLayout = () => {
//   const { theme } = useContext(ThemeContext);
//   const location = useLocation();

//   // Dashboard routes should NOT show Navbar/Footer
//   const isDashboard = location.pathname.startsWith("/dashboard");

//   return (
//     <div
//       className={`min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300`}
//     >
//       {/* Navbar only for public routes */}
//       <aside className="w-64 bg-gray-800 text-white p-4">
//         <h2 className="text-xl font-bold mb-6">Dashboard</h2>
//         <nav>
//           <NavLink to="/profile">My Profile</NavLink>
//           <NavLink to={"/overview"}>Overview</NavLink>
//           <NavLink to={"/home"}>Home</NavLink>
//           <NavLink to={"/my-foods"}>My Foods</NavLink>
//           <NavLink to={"/food-table"}>Food Table</NavLink>
//           <NavLink to={"/edit-food"}>Food Modal</NavLink>
//         </nav>
//       </aside>
//       {!isDashboard && <Navbar />}

//       {/* Main Content */}
//       <main className="flex-1">
//         <Outlet />
//       </main>

//       {/* Footer only for public routes */}
//       {!isDashboard && <Footer />}
//     </div>
//   );
// };
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  // Load sidebar state from localStorage
  const [open, setOpen] = useState(() => {
    const saved = localStorage.getItem("dashboardSidebar");
    return saved ? JSON.parse(saved) : true;
  });

  // Persist sidebar state
  useEffect(() => {
    localStorage.setItem("dashboardSidebar", JSON.stringify(open));
  }, [open]);

  // Auto-collapse on mobile resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <DashboardSidebar
        open={open}
        setOpen={setOpen}
        notificationCount={3} // dynamic-ready
      />

      <main
        className={`flex-1 p-6 overflow-y-auto transition-all duration-300
        ${open ? "md:ml-64" : "md:ml-20"}`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

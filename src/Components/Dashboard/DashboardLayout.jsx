import React, { useState, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, Home, Users, List, BarChart2, LogOut } from "lucide-react";
import { AuthContext } from "../../context/Authcontext";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { LogOut } = useContext(AuthContext);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white dark:bg-gray-800 shadow-md transition-width duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h1 className={`font-bold text-lg text-green-700 ${sidebarOpen ? "" : "hidden"}`}>PlateShare</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-6 w-6 text-gray-800 dark:text-gray-200" />
          </button>
        </div>
        <nav className="flex-1 mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition"
              >
                <Home className="h-5 w-5 text-green-600" />
                {sidebarOpen && "Dashboard Home"}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/myfoods"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition"
              >
                <List className="h-5 w-5 text-green-600" />
                {sidebarOpen && "My Foods"}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/users"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition"
              >
                <Users className="h-5 w-5 text-green-600" />
                {sidebarOpen && "Users"}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/analytics"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition"
              >
                <BarChart2 className="h-5 w-5 text-green-600" />
                {sidebarOpen && "Analytics"}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={LogOut}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 transition"
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

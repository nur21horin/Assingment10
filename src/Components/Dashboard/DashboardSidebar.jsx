import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Home,
  List,
  Table,
  Pencil,
  Bell,
  Menu,
  X,
} from "lucide-react";

const DashboardSidebar = ({ open, setOpen }) => {
  const base =
    "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300";

  const active =
    "bg-green-600 text-white shadow-md";

  const inactive =
    "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white";

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
        fixed md:static z-50 h-full
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out
        ${open ? "w-64 left-0" : "w-20 -left-64 md:left-0"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2
            className={`text-xl font-bold text-green-600 dark:text-green-500 ${
              !open && "hidden"
            }`}
          >
            Dashboard
          </h2>

          <button
            onClick={() => setOpen(!open)}
            className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Menu */}
        <nav className="p-3 space-y-2 text-sm font-medium">
          {[
            {
              to: "/dashboard/overview",
              label: "Overview",
              icon: <LayoutDashboard size={20} />,
            },
            {
              to: "/dashboard/profile",
              label: "Profile",
              icon: <User size={20} />,
            },
            {
              to: "/dashboard/home",
              label: "Dashboard Home",
              icon: <Home size={20} />,
            },
            {
              to: "/dashboard/my-foods",
              label: "My Foods",
              icon: <List size={20} />,
            },
            {
              to: "/dashboard/food-table",
              label: "Food Table",
              icon: <Table size={20} />,
            },
            {
              to: "/dashboard/edit-food",
              label: "Edit Food",
              icon: <Pencil size={20} />,
            },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              {item.icon}
              {open && item.label}
            </NavLink>
          ))}
        </nav>

        {/* Notifications */}
        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <Bell size={20} />
            {open && (
              <span className="flex items-center gap-2">
                Notifications
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  3
                </span>
              </span>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;

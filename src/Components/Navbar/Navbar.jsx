import { Link, useNavigation } from "react-router-dom";
import { UtensilsCrossed, Menu, X, Sun, Moon } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import { toast } from "react-toastify";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, LogOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigation();
  const isLoggedIn = !!user;

  const handleLogOut = () => {
    LogOut()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Logout failed! Try again!");
      });
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800 transition-colors duration-300">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-green-800 text-xl hover:opacity-80"
          >
            <UtensilsCrossed className="w-6 h-6" />
            <span className="font-bold text-2xl text-green-800">
              PlateShare
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/availablefoods"
              className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Available Foods
            </Link>

            <Link
              to="/about"
              className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Contact
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title="Toggle Dark/Light Mode"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>

            {/* Auth Links */}
            {isLoggedIn ? (
              <>
                <Link
                  to="/addfoods"
                  className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  Add Food
                </Link>
                <Link
                  to={"/dashboard"}
                  className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/manage-foods"
                  className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  Manage My Foods
                </Link>
                <Link
                  to="/foodRequests"
                  className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  My Food Requests
                </Link>

                {/* User avatar & logout */}
                <div className="flex items-center gap-3">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User avatar"
                      className="w-9 h-9 rounded-full border"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                      {user?.email?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <button
                    onClick={handleLogOut}
                    className="text-red-600 dark:text-red-400 font-medium hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded-md transition-colors">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-800 dark:text-blue-300 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/"
              className="block py-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/availablefoods"
              className="block py-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Available Foods
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Contact
            </Link>

            {/* Theme toggle mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>

            {isLoggedIn ? (
              <>
                <Link
                  to="/addfoods"
                  className="block py-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Add Food
                </Link>
                <Link
                  to={"/dashboard"}
                  className="block py-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/manage-foods"
                  className="block py-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Manage My Foods
                </Link>
                <Link
                  to="/foodRequests"
                  className="block py-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Food Requests
                </Link>
                <button
                  onClick={handleLogOut}
                  className="w-full text-left py-2 text-red-600 dark:text-red-400 font-medium hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded-md transition-colors">
                  Login
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import { UtensilsCrossed, Menu, X } from "lucide-react";
import { use, useState } from "react";
import { AuthContext } from "../../context/Authcontext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { createUser, signInUser, signInGoogle, user, loading } =
    use(AuthContext);
  //   // TODO: Replace with actual auth state
  const isLoggedIn = false;

  return (
    <nav className=" w-full bg-white shadow-sm z-50">
      <div className="w-full  px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-blue-800 text-xl  hover:opacity-80 "
          ><UtensilsCrossed className="w-6 h-6" />
            <span className=" font-bold text-2xl text-blue-800  ">PlateShare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-800 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/availablefoods"
              className="text-gray-800 hover:text-blue-600 transition-colors font-medium"
            >
              Available Foods
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/add-food"
                  className="text-gray-800 hover:text-blue-600 transition-colors font-medium"
                >
                  Add Food
                </Link>
                <Link
                  to="/manage-foods"
                  className="text-gray-800 hover:text-blue-600 transition-colors font-medium"
                >
                  Manage My Foods
                </Link>
                <Link
                  to="/food-requests"
                  className="text-gray-800 hover:text-blue-600 transition-colors font-medium"
                >
                  My Food Requests
                </Link>

                {/* Simple user display */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <button className="text-red-600 font-medium hover:underline">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-800 p-2"
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
          <div className="md:hidden py-4 space-y-3 border-t">
            <Link
              to="/"
              className="block py-2 text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/'availablefoods'"
              className="block py-2 text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Available Foods
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/add-food"
                  className="block py-2 text-gray-800 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Add Food
                </Link>
                <Link
                  to="/manage-foods"
                  className="block py-2 text-gray-800 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Manage My Foods
                </Link>
                <Link
                  to="/food-requests"
                  className="block py-2 text-gray-800 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Food Requests
                </Link>
                <button className="w-full text-left py-2 text-red-600 font-medium hover:underline">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
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

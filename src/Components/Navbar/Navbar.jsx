import { Link, useNavigation } from "react-router-dom";
import { UtensilsCrossed, Menu, X } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user,  LogOut } = useContext(AuthContext); // assuming you have logOut in your context
  const navigate=useNavigation();
  const isLoggedIn = !!user;

  const handleLogOut = () => {
     LogOut()
     .then(()=>{
      toast.success("Logged out successfully!");
      navigate("/");
     })
     .catch((err)=>{
      console.log(err);
      toast.error("Logout failed! Try again!")
     })
  };

  return (
    <nav className="w-full bg-white shadow-sm z-50">
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
                  to="/addfoods"
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
                  to="/foodRequests"
                  className="text-gray-800 hover:text-blue-600 transition-colors font-medium"
                >
                  My Food Requests
                </Link>

                {/* User Avatar */}
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
                    className="text-red-600 font-medium hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800 transition-colors">
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
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              to="/availablefoods"
              className="block py-2 text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Available Foods
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/addfoods"
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
                  to="/foodRequests"
                  className="block py-2 text-gray-800 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Food Requests
                </Link>
                <button
                  onClick={handleLogOut}
                  className="w-full text-left py-2 text-red-600 font-medium hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800 transition-colors">
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

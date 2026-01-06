import { useEffect, useState, useContext } from "react";
import { MapPin, Calendar, Users, Search, Share2 } from "lucide-react";
import Spinner from "../../Page/Spinner";
import { AuthContext } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // optional, for any theme-dependent logic
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        let token = "";
        if (user) token = await user.getIdToken();

        const res = await fetch("http://localhost:3000/foods", {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });

        if (!res.ok) throw new Error("Failed to fetch foods");

        const data = await res.json();
        const availableFoods = data.filter((f) => f.food_status === "Available");
        setFoods(availableFoods);
        setFilteredFoods(availableFoods);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching foods.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [user]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = foods.filter((f) =>
      f.food_name.toLowerCase().includes(query)
    );
    setFilteredFoods(filtered);
  };

  const handleShare = async (food) => {
    const foodUrl = `${window.location.origin}/food/${food._id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: food.food_name,
          text: "Check out this available food!",
          url: foodUrl,
        });
      } else {
        await navigator.clipboard.writeText(foodUrl);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
      alert("Unable to share this food link.");
    }
  };

  const handleViewDetails = (id) => {
    if (!user) navigate("/login");
    else navigate(`/food/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 py-16">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-4 py-1 rounded-full">
            Featured Foods
          </span>
          <h2 className="text-4xl font-bold mt-4 text-gray-800 dark:text-gray-100">
            Available Now
          </h2>
          <p className="text-gray-500 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
            These generous community members are sharing their surplus food.
            Grab yours before it's gone!
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10 relative text-black dark:text-white">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Search foods by name..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 transition-colors duration-300"
          />
        </div>

        {filteredFoods.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No foods found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFoods.map((food) => (
              <div
                key={food._id}
                className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={food.food_image}
                    alt={food.food_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-md text-xs">
                    {food.food_status}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                    {food.food_name}
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    <p>By: {food.donator_name}</p>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <p className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      {food.food_quantity || "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      {food.pickup_location || "Unknown"}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Expires:{" "}
                      {food.expire_date
                        ? new Date(food.expire_date).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex gap-3">
                  <button
                    onClick={() => handleViewDetails(food._id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white dark:text-white py-2 rounded-md transition-colors duration-300"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleShare(food)}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                    title="Share this food"
                  >
                    <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AvailableFoods;

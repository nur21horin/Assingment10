import { useEffect, useState, useContext } from "react";
import { MapPin, Calendar, Users, Search, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import Spinner from "../../Page/Spinner";
import { AuthContext } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 3 per row x 2 rows
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch foods
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("http://localhost:3000/foods");
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

  // Filter & Sort
  useEffect(() => {
    let filtered = [...foods];
    if (searchQuery)
      filtered = filtered.filter((f) =>
        f.food_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    if (locationFilter)
      filtered = filtered.filter(
        (f) => f.pickup_location.toLowerCase() === locationFilter.toLowerCase()
      );
    if (dateFilter)
      filtered = filtered.filter(
        (f) => f.expire_date && new Date(f.expire_date) <= new Date(dateFilter)
      );
    if (sortOption === "expiry")
      filtered.sort((a, b) => new Date(a.expire_date) - new Date(b.expire_date));
    else if (sortOption === "quantity")
      filtered.sort(
        (a, b) => (parseInt(b.food_quantity) || 0) - (parseInt(a.food_quantity) || 0)
      );
    setFilteredFoods(filtered);
    setCurrentPage(1); // reset to first page after filter
  }, [searchQuery, locationFilter, dateFilter, sortOption, foods]);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleViewDetails = (id) => {
    if (!user) navigate("/login");
    else navigate(`/food/${id}`);
  };
  const handleShare = async (food) => {
    const foodUrl = `${window.location.origin}/food/${food._id}`;
    try {
      if (navigator.share) await navigator.share({ title: food.food_name, text: "Check out this food!", url: foodUrl });
      else {
        await navigator.clipboard.writeText(foodUrl);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error(err);
      alert("Unable to share this food link.");
    }
  };

  const uniqueLocations = [...new Set(foods.map((f) => f.pickup_location))];

  const SkeletonCard = () => (
    <div className="animate-pulse bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-2xl overflow-hidden">
      <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="flex gap-2 mt-2">
          <div className="flex-1 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-10 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );

  // Pagination
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirst, indexOfLast);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Available Foods</h2>
        </div>

        {/* Filters/Search */}
        <div className="flex flex-col md:flex-row md:justify-center gap-4 mb-12 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search foods..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 transition-colors duration-300"
            />
          </div>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="border rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((loc, idx) => (
              <option key={idx} value={loc}>{loc}</option>
            ))}
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          >
            <option value="">Sort By</option>
            <option value="expiry">Expiration Date</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>

        {/* Food Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredFoods.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No foods found.</p>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {currentFoods.map((food, idx) => (
                <motion.div
                  key={food._id}
                  className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:-rotate-1 group"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
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
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{food.food_name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{food.food_quantity}</p>
                    <p className="text-gray-600 dark:text-gray-300">{food.pickup_location}</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleViewDetails(food._id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors duration-300"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleShare(food)}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                      >
                        <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-12 gap-4">
              <button
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 disabled:opacity-50"
              >
                Previous
              </button>

              <span className="px-4 py-2 rounded-full bg-blue-600 text-white">{currentPage}</span>

              <button
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AvailableFoods;

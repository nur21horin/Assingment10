import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/Authcontext";
import Spinner from "../../Page/Spinner";
import { toast, ToastContainer } from "react-toastify";
import { Users, MapPin, Calendar } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const DashboardFoodTable = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch foods
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const token = user ? await user.getIdToken() : "";
        const res = await fetch("http://localhost:3000/foods", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch foods");
        const data = await res.json();
        setFoods(data);
        setFilteredFoods(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load food submissions.");
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [user]);

  // Filter & sort
  useEffect(() => {
    let temp = [...foods];
    if (searchQuery) {
      temp = temp.filter((f) =>
        f.food_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortOption === "expiry") {
      temp.sort((a, b) => new Date(a.expire_date) - new Date(b.expire_date));
    } else if (sortOption === "quantity") {
      temp.sort(
        (a, b) => (parseInt(b.food_quantity) || 0) - (parseInt(a.food_quantity) || 0)
      );
    }
    setFilteredFoods(temp);
    setCurrentPage(1);
  }, [searchQuery, sortOption, foods]);

  // Pagination
  const totalPages = Math.ceil(filteredFoods.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentFoods = filteredFoods.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // Actions
  const handleAction = async (id, status) => {
    try {
      setActionLoading(true);
      const token = user ? await user.getIdToken() : "";
      const res = await fetch(`http://localhost:3000/foods/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ food_status: status }),
      });
      if (!res.ok) throw new Error("Action failed");
      setFoods((prev) =>
        prev.map((f) => (f._id === id ? { ...f, food_status: status } : f))
      );
      toast.success(`Food ${status} successfully!`);
    } catch (err) {
      console.error(err);
      toast.error("Action failed.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food?")) return;
    try {
      setActionLoading(true);
      const token = user ? await user.getIdToken() : "";
      const res = await fetch(`http://localhost:3000/foods/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setFoods((prev) => prev.filter((f) => f._id !== id));
      toast.success("Food deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="text-center py-16 text-red-600 dark:text-red-400">{error}</div>
    );

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
        Admin Food Management
      </h2>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12 max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Search foods..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 border rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 transition-colors duration-300"
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

      {/* Card Grid */}
      {currentFoods.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">No foods found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentFoods.map((food) => (
            <div
              key={food._id}
              className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={food.food_image}
                  alt={food.food_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-md text-xs">
                  {food.food_status}
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{food.food_name}</h3>
                <p className="text-gray-600 dark:text-gray-300">By: {food.donator_name}</p>
                <div className="flex justify-between text-gray-600 dark:text-gray-300 text-sm">
                  <span className="flex items-center gap-1"><Users className="h-4 w-4 text-blue-600 dark:text-blue-400" /> {food.food_quantity}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" /> {food.pickup_location}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" /> {food.expire_date ? new Date(food.expire_date).toLocaleDateString() : "N/A"}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                  {food.food_status === "Pending" && (
                    <>
                      <button
                        disabled={actionLoading}
                        onClick={() => handleAction(food._id, "Approved")}
                        className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                      >
                        Approve
                      </button>
                      <button
                        disabled={actionLoading}
                        onClick={() => handleAction(food._id, "Rejected")}
                        className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    disabled={actionLoading}
                    onClick={() => handleDelete(food._id)}
                    className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-100">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default DashboardFoodTable;

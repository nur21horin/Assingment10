import React, { useEffect, useState, useContext } from "react";
import { Trash2, Edit } from "lucide-react";
import DashboardEditFoodModal from "./DashboardEditFoodModal";
import Spinner from "../../Page/Spinner";
import { AuthContext } from "../../context/Authcontext";

const DashboardMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch user's foods
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchMyFoods = async () => {
      try {
        setLoading(true);
        const token = await user.getIdToken();
        const res = await fetch(`http://localhost:3000/foods?user=${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch foods");
        const data = await res.json();
        setFoods(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load your foods.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyFoods();
  }, [user]);

  // Open edit modal
  const handleEdit = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  // Delete food
  const handleDelete = async (foodId) => {
    if (!window.confirm("Are you sure you want to delete this food?")) return;

    try {
      const token = await user.getIdToken();
      const res = await fetch(`http://localhost:3000/foods/${foodId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete");

      // Remove from UI
      setFoods(foods.filter((f) => f._id !== foodId));
      alert("Food deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Unable to delete food.");
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
      <p className="text-center text-red-600 dark:text-red-400 py-20">{error}</p>
    );

  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        My Foods
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            {food.food_image && (
              <img
                src={food.food_image}
                alt={food.food_name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <div className="p-5 space-y-2">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {food.food_name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quantity: {food.food_quantity}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Pickup: {food.pickup_location}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Expires: {food.expire_date?.split("T")[0]}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(food)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
                >
                  <Edit className="inline w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(food._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
                >
                  <Trash2 className="inline w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <DashboardEditFoodModal
        food={selectedFood}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(updatedFood) => {
          setFoods(
            foods.map((f) => (f._id === updatedFood._id ? updatedFood : f))
          );
        }}
      />
    </section>
  );
};

export default DashboardMyFoods;

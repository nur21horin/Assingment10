import React, { useState, useEffect, useContext } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/Authcontext";

const DashboardEditFoodModal = ({ food, isOpen, onClose, onSave }) => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    food_name: "",
    food_quantity: "",
    pickup_location: "",
    expire_date: "",
    additional_notes: "",
  });
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens or food changes
  useEffect(() => {
    if (isOpen && food) {
      setForm({
        food_name: food.food_name || "",
        food_quantity: food.food_quantity || "",
        pickup_location: food.pickup_location || "",
        expire_date: food.expire_date?.split("T")[0] || "",
        additional_notes: food.additional_notes || "",
      });
    }
  }, [food, isOpen]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await user.getIdToken();
      const res = await fetch(`http://localhost:3000/foods/${food._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update food");

      const updatedFood = await res.json();
      onSave(updatedFood);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Edit Food
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="food_name"
                placeholder="Food Name"
                value={form.food_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
              <input
                type="text"
                name="food_quantity"
                placeholder="Quantity"
                value={form.food_quantity}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
              <input
                type="text"
                name="pickup_location"
                placeholder="Pickup Location"
                value={form.pickup_location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
              <input
                type="date"
                name="expire_date"
                value={form.expire_date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
              <textarea
                name="additional_notes"
                placeholder="Additional Notes"
                value={form.additional_notes}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
              >
                {loading ? "Updating..." : "Update Food"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DashboardEditFoodModal;

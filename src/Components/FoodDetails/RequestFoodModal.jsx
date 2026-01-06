import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import { ThemeContext } from "../../context/ThemeContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestFoodModal = ({ food }) => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ location: "", reason: "", contact: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.location || !form.reason || !form.contact) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const requestBody = {
        food_id: food._id,
        user_name: user.displayName || user.email.split("@")[0],
        user_email: user.email,
        location: form.location,
        reason: form.reason,
        contact: form.contact,
        status: "Pending",
      };
      const res = await fetch("http://localhost:3000/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit request");
      toast.success("Food requested successfully!");
      setOpen(false);
      setForm({ location: "", reason: "", contact: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to request food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Open Modal Button */}
      <button
        onClick={() => setOpen(true)}
        className="mt-6 w-full 
                   bg-green-600 dark:bg-green-500 
                   text-white 
                   py-2 rounded-md 
                   hover:bg-green-700 dark:hover:bg-green-600 
                   transition-colors duration-300"
      >
        Request Food
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setOpen(false)}
          ></div>

          <div className="relative bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Request Food</h3>

            <input
              type="text"
              name="location"
              placeholder="Your Location"
              value={form.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-3
                         bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <textarea
              name="reason"
              placeholder="Why do you need food?"
              value={form.reason}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-3
                         bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={form.contact}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-3
                         bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded hover:bg-green-700 dark:hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Requesting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default RequestFoodModal;

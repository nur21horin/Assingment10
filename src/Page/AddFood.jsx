import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { Calendar } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    food_name: "",
    food_image: "",
    food_quantity: "",
    pickup_location: "",
    expire_date: "",
    additional_notes: "",
  });
  const [loading, setLoading] = useState(false);

  // input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (!data.success) {
        throw new Error("Image upload failed");
      }
      setForm({ ...form, food_image: data.data.url });
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to add food");
      navigate("/login");
      return;
    }

    if (!form.food_image) {
      alert("Please upload an image first");
      return;
    }

    try {
      setLoading(true);

      const token = await user.getIdToken();
      const foodData = {
        ...form,
        donator_name: user.displayName,
        donator_email: user.email,
        donator_image: user.photoURL,
      };

      const res = await fetch(
        "https://my-project-server-side-plateshare.vercel.app/foods",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(foodData),
        }
      );

      if (!res.ok) throw new Error("Failed to add food");

      toast.success("Food added successfully!");
      setForm({
        food_name: "",
        food_image: "",
        food_quantity: "",
        pickup_location: "",
        expire_date: "",
        additional_notes: "",
      });
      navigate("/availablefoods");
    } catch (error) {
      console.error(error);
      alert("Failed to add food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto bg-white shadow-2xl rounded-3xl p-10 mt-12 border border-gray-100">
      <div className="text-center mb-8">
        <ToastContainer></ToastContainer>
        <h2 className="text-4xl font-extrabold text-green-600 mb-2">
          Add New Food
        </h2>
        <p className="text-gray-500 text-lg">
          Share your delicious dish with the community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Food Name
          </label>
          <input
            type="text"
            name="food_name"
            placeholder="e.g., Vegetable Curry"
            value={form.food_name}
            onChange={handleChange}
            required
            className="border text-black filed.text-black-500 border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Food Image
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            required
            className=" text-black border border-gray-300 rounded-xl p-2 w-full cursor-pointer bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="text"
            name="food_quantity"
            placeholder="e.g., Serves 2 people"
            value={form.food_quantity}
            onChange={handleChange}
            required
            className="border text-black border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pickup Location
          </label>
          <input
            type="text"
            name="pickup_location"
            placeholder="e.g., Dhaka, Bangladesh"
            value={form.pickup_location}
            onChange={handleChange}
            required
            className="border text-black border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none transition"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Expiration Date
          </label>

          <input
            ref={(ref) => (window.expireRef = ref)}
            type="date"
            name="expire_date"
            value={form.expire_date}
            onChange={handleChange}
            required
            className="border text-black border-gray-300 rounded-xl p-3 pr-12 w-full focus:ring-2 focus:ring-green-400 focus:outline-none transition duration-300 hover:border-green-400"
          />

          <button
            type="button"
            onClick={() => {
              const el = window.expireRef;
              if (el && typeof el.showPicker === "function") el.showPicker();
              else el.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition"
            title="Open calendar"
          >
            <Calendar className="w-5 h-5" />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            name="additional_notes"
            placeholder="Any special instructions?"
            value={form.additional_notes}
            onChange={handleChange}
            rows="3"
            className="border text-black border-gray-300 rounded-xl p-3 w-full text-gray-600 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl text-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? "Adding..." : "Add Food"}
        </button>
      </form>
    </section>
  );
};

export default AddFood;

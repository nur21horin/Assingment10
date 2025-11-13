import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import { toast, ToastContainer } from "react-toastify";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [form, setForm] = useState({
    food_name: "",
    food_image: "",
    food_quantity: "",
    pickup_location: "",
    expire_date: "",
    additional_notes: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  const fetchMyFoods = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch(
        `https://my-project-server-side-plateshare.vercel.app/my-foods/${user.email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setMyFoods(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyFoods();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food?")) return;
    try {
      const token = await user.getIdToken();
      const res = await fetch(
        `https://my-project-server-side-plateshare.vercel.app/foods/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to delete food");
      setMyFoods(myFoods.filter((food) => food._id !== id));
      toast.success("Food item deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete food");
    }
  };

  const handleEdit = (food) => {
    setEditingFood(food._id);
    setForm({ ...food });
    setImagePreview(food.food_image);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

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
      setForm({ ...form, food_image: data.data.url });
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      const res = await fetch(
        `https://my-project-server-side-plateshare.vercel.app/foods/${editingFood}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Failed to update food");

      setMyFoods(
        myFoods.map((food) => (food._id === editingFood ? form : food))
      );
      setEditingFood(null);
      toast.success("Food updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update food");
    }
  };

  if (!user)
    return (
      <p className="text-center mt-10 text-red-600">
        Please log in to manage your foods.
      </p>
    );

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-extrabold text-green-600 mb-8 text-center">
        Manage My Foods
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : myFoods.length === 0 ? (
        <p className="text-center text-gray-500">No foods added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myFoods.map((food) => (
            <div
              key={food._id}
              className="bg-white shadow-lg rounded-3xl overflow-hidden transition hover:shadow-2xl"
            >
              <img
                src={food.food_image}
                alt={food.food_name}
                className="w-full h-48 object-cover rounded-t-3xl"
              />
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-bold text-gray-800">
                  {food.food_name}
                </h3>
                <p className="text-gray-600">Quantity: {food.food_quantity}</p>
                <p className="text-gray-600">Pickup: {food.pickup_location}</p>
                <p className="text-gray-600">Expires: {food.expire_date}</p>
                <p className="text-gray-600">{food.additional_notes}</p>
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => handleEdit(food)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 px-4 z-50 overflow-auto">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full space-y-6"
          >
            <h3 className="text-3xl font-extrabold text-green-600 text-center">
              Update Food
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Name
              </label>
              <input
                type="text"
                name="food_name"
                value={form.food_name}
                onChange={handleChange}
                placeholder="e.g., Vegetable Curry"
                required
                className="border text-gray-700 border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Food Image
              </label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="border text-gray-700 border-gray-300 rounded-xl p-2 w-full cursor-pointer bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-xl mx-auto mt-2"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="text"
                name="food_quantity"
                value={form.food_quantity}
                onChange={handleChange}
                placeholder="e.g., Serves 2 people"
                required
                className="border border-gray-300 text-gray-700 rounded-xl p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Location
              </label>
              <input
                type="text"
                name="pickup_location"
                value={form.pickup_location}
                onChange={handleChange}
                placeholder="e.g., Dhaka, Bangladesh"
                required
                className="border text-gray-700 border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiration Date
              </label>
              <input
                type="date"
                name="expire_date"
                value={form.expire_date}
                onChange={handleChange}
                required
                className="border text-gray-700 border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="additional_notes"
                value={form.additional_notes}
                onChange={handleChange}
                placeholder="Any special instructions?"
                rows="3"
                className="border text-gray-700 border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setEditingFood(null)}
                className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-semibold"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      <ToastContainer />
    </section>
  );
};

export default ManageMyFoods;

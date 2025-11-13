import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import { toast, ToastContainer } from "react-toastify";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal state
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
      const res = await fetch(`http://localhost:3000/my-foods/${user.email}`);
      const data = await res.json();
      setMyFoods(data);
    } catch (error) {
      console.error("Failed to fetch foods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyFoods();
  }, [user]);

  // Delete food
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food?")) return;
    try {
      const res = await fetch(`http://localhost:3000/foods/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete food");
      setMyFoods(myFoods.filter((food) => food._id !== id));
      toast.success("Food item deleted successfully")
    } catch (error) {
      console.error(error);
      alert("Failed to delete food");
    }
  };

  // Open modal for editing
  const handleEdit = (food) => {
    setEditingFood(food._id);
    setForm({ ...food });
    setImagePreview(food.food_image); // initial preview
  };

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview before uploading
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=9a3b67c0f54834f6bf3e123b98af36d0`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setForm({ ...form, food_image: data.data.url });
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed");
    }
  };

  // Submit update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/foods/${editingFood}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update food");

      setMyFoods(
        myFoods.map((food) => (food._id === editingFood ? form : food))
      );
      setEditingFood(null);
      alert("Food updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update food");
    }
  };

  if (!user) return <p>Please log in to manage your foods.</p>;

  return (
    <section className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage My Foods</h2>
      {loading ? (
        <p>Loading...</p>
      ) : myFoods.length === 0 ? (
        <p>No foods added yet.</p>
      ) : (
        <div className="grid gap-4">
          {myFoods.map((food) => (
            <div
              key={food._id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <img
                  src={food.food_image}
                  alt={food.food_name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold">{food.food_name}</h3>
                  <p>Quantity: {food.food_quantity}</p>
                  <p>Pickup: {food.pickup_location}</p>
                  <p>Status: {food.food_status}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(food)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(food._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {editingFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white p-6 rounded max-w-md w-full space-y-3"
          >
            <h3 className="text-xl font-bold">Update Food</h3>
            <input
              type="text"
              name="food_name"
              value={form.food_name}
              onChange={handleChange}
              placeholder="Food Name"
              required
              className="border p-2 w-full"
            />
            <input
              type="file"
              onChange={handleImageUpload}
              className="border p-2 w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mx-auto"
              />
            )}
            <input
              type="text"
              name="food_quantity"
              value={form.food_quantity}
              onChange={handleChange}
              placeholder="Quantity"
              required
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="pickup_location"
              value={form.pickup_location}
              onChange={handleChange}
              placeholder="Pickup Location"
              required
              className="border p-2 w-full"
            />
            <input
              type="date"
              name="expire_date"
              value={form.expire_date}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
            <textarea
              name="additional_notes"
              value={form.additional_notes}
              onChange={handleChange}
              placeholder="Additional Notes"
              className="border p-2 w-full"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingFood(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
      <ToastContainer/>
    </section>
  );
};

export default ManageMyFoods;

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/Authcontext";
import Spinner from "../../Page/Spinner";
import { toast, ToastContainer } from "react-toastify";

const DashboardProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    photoURL: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error("Image upload failed");
      setForm({ ...form, photoURL: data.data.url });
      toast.success("Profile picture updated!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateUserProfile(form);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 dark:text-gray-300">Please login to view your profile.</p>
      </div>
    );

  return (
    <section className="max-w-4xl mx-auto py-16 px-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
        My Profile
      </h2>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={form.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-green-600"
          />
          <label className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
            Change Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="displayName"
            value={form.displayName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-gray-100 transition"
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            readOnly
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 cursor-not-allowed transition"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </section>
  );
};

export default DashboardProfile;

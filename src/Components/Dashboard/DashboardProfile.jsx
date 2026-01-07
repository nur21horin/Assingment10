import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/Authcontext";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../../Page/Spinner";
import { Camera } from "lucide-react";

const DashboardProfile = () => {
  const { user, profile,updateUserProfile } = useContext(AuthContext);
  const [form, setForm] = useState({
    displayName: "",
   // email: "",
    photoURL: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        bio: profile.bio || "",
      });
    }
  }, [user,profile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be under 2MB!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        { method: "POST", body: formData }
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
      await updateUserProfile({
        bio: form.bio,
        displayName: form.displayName,
        photoURL: form.photoURL,
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Update failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  if (!user)
    return (
      <div className="text-center py-20 text-gray-600 dark:text-gray-300">
        Please login to view your profile.
      </div>
    );

  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-12 text-center">
        My Profile
      </h2>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Column - Profile Picture & Stats */}
        <div className="flex flex-col items-center w-full lg:w-1/3">
          <div className="relative group">
            <img
              src={form.photoURL || "https://via.placeholder.com/200"}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-green-600 shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
            <label className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full cursor-pointer hover:bg-green-700 shadow-lg transition">
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
            {form.displayName || "Your Name"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {form.bio || "Add a short bio..."}
          </p>

          {/* Stats */}
          <div className="mt-6 w-full grid grid-cols-3 gap-4 text-center">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl py-4">
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                12
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Foods Donated
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl py-4">
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                7
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Collected
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl py-4">
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {new Date(user.metadata.creationTime).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Joined</p>
            </div>
          </div>
        </div>

        {/* Right Column - Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-6"
        >
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-gray-100 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              readOnly
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 cursor-not-allowed transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              placeholder="A little about yourself..."
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 resize-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default DashboardProfile;

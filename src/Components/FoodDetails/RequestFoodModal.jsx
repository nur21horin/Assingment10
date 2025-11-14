import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestFoodModal = ({ food }) => {
  const { user } = useContext(AuthContext);
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
      const res = await fetch("https://server-orpin.vercel.app/requests", {
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
      <button
        onClick={() => setOpen(true)}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
      >
        Request Food
      </button>
      {open && (
        <div className="fixed inset-0 text-gray-600 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Request Food</h3>
            <input
              type="text"
              name="location"
              placeholder="Your Location"
              value={form.location}
              onChange={handleChange}
              className="w-full text-gray-600 p-2 border rounded mb-3"
            />
            <textarea
              name="reason"
              placeholder="Why do you need food?"
              value={form.reason}
              onChange={handleChange}
              className="w-full text-gray-600 p-2 border rounded mb-3"
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={form.contact}
              onChange={handleChange}
              className="w-full text-gray-600 p-2 border rounded mb-3"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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

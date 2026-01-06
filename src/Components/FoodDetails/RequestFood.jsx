import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import { toast, ToastContainer } from "react-toastify";
import { ThemeContext } from "../../context/ThemeContext";

const RequestFood = ({ foodId }) => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // optional, for extra logic if needed
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    if (!user) {
      alert("Please log in before requesting food.");
      return;
    }

    try {
      setLoading(true);

      const token = user.getIdToken ? await user.getIdToken() : "";

      const requestBody = {
        food_id: foodId,
        user_name: user.displayName || user.email.split("@")[0],
        user_email: user.email,
      };

      console.log("Sending request:", requestBody);

      const res = await fetch("http://localhost:3000/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to request food");

      toast.success("Food requested successfully!");
    } catch (error) {
      console.error("Request error:", error);
      toast.error("Failed to request food.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleRequest}
        disabled={loading}
        className="
          mt-6 w-full 
          bg-green-600 dark:bg-green-500 
          text-white 
          py-2 rounded-md 
          hover:bg-green-700 dark:hover:bg-green-600 
          transition-colors duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {loading ? "Requesting..." : "Request Food"}
      </button>
      <ToastContainer />
    </div>
  );
};

export default RequestFood;

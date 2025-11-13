import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/Authcontext";

const RequestFood = ({ foodId }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    if (!user) {
      alert("Please log in before requesting food.");
      return;
    }

    try {
      setLoading(true);

      // Optional: Firebase token (only if backend verifies JWT)
      const token = user.getIdToken ? await user.getIdToken() : "";

      const requestBody = {
        food_id: foodId,
        user_name: user.displayName || user.email.split("@")[0], // fallback to email prefix
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

      alert("✅ Food requested successfully!");
    } catch (error) {
      console.error("Request error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRequest}
      disabled={loading}
      className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
    >
      {loading ? "Requesting..." : "Request Food"}
    </button>
  );
};

export default RequestFood;

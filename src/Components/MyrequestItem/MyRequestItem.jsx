import React, { useContext, useEffect, useState } from "react";

import Spinner from "../../Page/Spinner";
import { AuthContext } from "../../context/Authcontext";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchRequests = async () => {
      try {
        const res = await fetch(`http://localhost:3000/requests/${user.email}`);
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error("Failed to load requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  if (loading) return <Spinner />;

  return (
    <section className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Food Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-500 text-center">
          You haven’t requested any food yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <img
                src={req.foodDetails?.food_image}
                alt={req.foodDetails?.food_name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-3">
                {req.foodDetails?.food_name}
              </h3>
              <p className="text-gray-600">
                Pickup: {req.foodDetails?.pickup_location}
              </p>
              <p className="text-gray-500 text-sm">
                Requested On: {new Date(req.requested_at).toLocaleDateString()}
              </p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                  req.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {req.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyRequests;

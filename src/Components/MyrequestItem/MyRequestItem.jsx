import React, { useContext, useEffect, useState } from "react";
import Spinner from "../../Page/Spinner";
import { AuthContext } from "../../context/Authcontext";
import { toast, ToastContainer } from "react-toastify";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchRequests = async () => {
      try {
        const res = await fetch(
          `https://nur-plate-share-nzyecs5fx-nur-mohammods-projects.vercel.app//requests/${user.email}`
        );
        if (!res.ok) throw new Error("Failed to fetch requests");
        const data = await res.json();

        const requestsWithFood = await Promise.all(
          data.map(async (req) => {
            try {
              const foodRes = await fetch(
                `https://nur-plate-share-nzyecs5fx-nur-mohammods-projects.vercel.app//foods/${req.food_id}`
              );
              if (!foodRes.ok) return { ...req, foodDetails: null };
              const foodData = await foodRes.json();
              return { ...req, foodDetails: foodData };
            } catch {
              return { ...req, foodDetails: null };
            }
          })
        );

        setRequests(requestsWithFood);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?"))
      return;

    try {
      const res = await fetch(
        `https://nur-plate-share-nzyecs5fx-nur-mohammods-projects.vercel.app//requests/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete request");

      setRequests(requests.filter((req) => req._id !== id));
      toast.success("Request deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete the request.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
      </div>
    );

  if (!requests.length)
    return (
      <p className="text-gray-500 text-center text-lg mt-10">
        You haven't requested any food yet.
      </p>
    );

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-green-600 mb-8 text-center">
        My Food Requests
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => {
          const food = req.foodDetails || {};
          return (
            <div
              key={req._id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <div className="h-48 w-full overflow-hidden rounded-t-3xl">
                {food.food_image ? (
                  <img
                    src={food.food_image}
                    alt={food.food_name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-xl font-bold text-gray-800">
                  {food.food_name || "Unknown Food"}
                </h3>
                <p className="text-gray-600">
                  Pickup: {food.pickup_location || "N/A"}
                </p>
                <p className="text-gray-500 text-sm">
                  Requested On:{" "}
                  {new Date(req.requested_at).toLocaleDateString()}
                </p>

                <span
                  className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-medium ${
                    req.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {req.status}
                </span>

                <button
                  onClick={() => handleDelete(req._id)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
                >
                  Delete Request
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </section>
  );
};

export default MyRequests;

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
import Spinner from "../../Page/Spinner";
import RequestFoodModal from "./RequestFoodModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../../context/ThemeContext";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // optional, for theme-dependent logic

  const [food, setFood] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // if (!user) {
    //   navigate("/login");
    //   return;
    // }

    const fetchData = async () => {
      try {
        setLoading(true);
        const resFood = await fetch(`http://localhost:3000/foods/${id}`);
        if (!resFood.ok) throw new Error("Failed to fetch food");
        const foodData = await resFood.json();
        setFood(foodData);

        if (user && foodData.donator_email === user.email) {
          const resReq = await fetch(
            `http://localhost:3000/requests/food/${id}`
          );
          const reqData = await resReq.json();
          setRequests(reqData);
        } else {
          setRequests([]);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user, navigate, refresh]);

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to ${newStatus.toUpperCase()} this request?`
      );
      if (!confirmed) return;

      const res = await fetch(`http://localhost:3000/requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success(data.message);
      setRefresh(!refresh);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-600 dark:text-red-400 py-16">{error}</div>
    );
  if (!food)
    return (
      <div className="text-center py-16 text-gray-600 dark:text-gray-300">
        Food not found.
      </div>
    );

  return (
    <section className="max-w-3xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-2xl overflow-hidden transition-colors duration-300">
        <img
          src={food.food_image || "/placeholder.jpg"}
          alt={food.food_name}
          className="w-full h-64 object-cover"
        />

        <div className="p-6 space-y-4 text-gray-800 dark:text-gray-100">
          <h2 className="text-3xl text-green-800 dark:text-green-400 font-bold">
            {food.food_name}
          </h2>
          <p>
            <span className="font-semibold">Quantity:</span> {food.food_quantity}
          </p>
          <p>
            <span className="font-semibold">Pickup Location:</span>{" "}
            {food.pickup_location}
          </p>
          <p>
            <span className="font-semibold">Expire Date:</span>{" "}
            {new Date(food.expire_date).toLocaleDateString()}
          </p>

          {food.additional_notes && (
            <p>
              <span className="font-semibold">Notes:</span> {food.additional_notes}
            </p>
          )}

          <div className="flex items-center gap-3 mt-4">
            <img
              src={food.donator_image || "/user-placeholder.jpg"}
              alt={food.donator_name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-green-800 dark:text-green-400">
                {food.donator_name}
              </p>
              <p className="text-gray-500 dark:text-gray-300 text-sm">
                {food.donator_email}
              </p>
            </div>
          </div>

          {user && food.donator_email !== user.email && (
            <RequestFoodModal food={food} />
          )}

          {user && food.donator_email === user.email && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-green-800 dark:text-green-400">
                Food Requests
              </h3>
              {requests.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-300 text-sm">
                  No requests yet.
                </p>
              ) : (
                <table className="w-full border-collapse border border-gray-200 dark:border-gray-600 text-sm">
                  <thead className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                    <tr>
                      <th className="p-2 border border-gray-200 dark:border-gray-600">Name</th>
                      <th className="p-2 border border-gray-200 dark:border-gray-600">Email</th>
                      <th className="p-2 border border-gray-200 dark:border-gray-600">Location</th>
                      <th className="p-2 border border-gray-200 dark:border-gray-600">Reason</th>
                      <th className="p-2 border border-gray-200 dark:border-gray-600">Contact</th>
                      <th className="p-2 border border-gray-200 dark:border-gray-600">Status</th>
                      <th className="p-2 border border-gray-200 dark:border-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req) => (
                      <tr
                        key={req._id}
                        className={`text-center ${
                          req.status === "Accepted"
                            ? "bg-green-50 dark:bg-green-800 text-gray-800 dark:text-gray-100"
                            : req.status === "Rejected"
                            ? "bg-red-50 dark:bg-red-800 text-gray-800 dark:text-gray-100"
                            : "text-gray-800 dark:text-gray-100"
                        }`}
                      >
                        <td className="p-2 border border-gray-200 dark:border-gray-600">
                          {req.user_name}
                        </td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600">
                          {req.user_email}
                        </td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600">
                          {req.location}
                        </td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600">
                          {req.reason}
                        </td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600">
                          {req.contact}
                        </td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600 font-semibold">
                          {req.status}
                        </td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600 space-x-2">
                          {req.status === "Pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(req._id, "Accepted")
                                }
                                className="px-2 py-1 bg-green-600 dark:bg-green-500 text-white rounded hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-300"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(req._id, "Rejected")
                                }
                                className="px-2 py-1 bg-red-600 dark:bg-red-500 text-white rounded hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-300"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </section>
  );
};

export default FoodDetails;

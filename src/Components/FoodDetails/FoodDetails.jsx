import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
import Spinner from "../../Page/Spinner";
import RequestFoodModal from "./RequestFoodModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [food, setFood] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const resFood = await fetch(
          `https://server-orpin.vercel.app/foods/${id}`
        );
        if (!resFood.ok) throw new Error("Failed to fetch food");
        const foodData = await resFood.json();
        setFood(foodData);

        if (foodData.donator_email === user.email) {
          const resReq = await fetch(
            `https://server-orpin.vercel.app/requests/food/${id}`
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

      const res = await fetch(
        `https://server-orpin.vercel.app/requests/${requestId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success(data.message);
      setRefresh(!refresh);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  if (loading) return <Spinner />;
  if (error)
    return <div className="text-center text-red-600 py-16">{error}</div>;
  if (!food)
    return (
      <div className="text-center py-16 text-gray-600">Food not found.</div>
    );

  return (
    <section className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        <img
          src={food.food_image || "/placeholder.jpg"}
          alt={food.food_name}
          className="w-full h-64 object-cover"
        />

        <div className="p-6 space-y-4">
          <h2 className="text-3xl text-green-800 font-bold">
            {food.food_name}
          </h2>
          <p className="text-gray-600">
            <span className="font-semibold">Quantity:</span>{" "}
            {food.food_quantity}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Pickup Location:</span>{" "}
            {food.pickup_location}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Expire Date:</span>{" "}
            {new Date(food.expire_date).toLocaleDateString()}
          </p>

          {food.additional_notes && (
            <p className="text-gray-600">
              <span className="font-semibold">Notes:</span>{" "}
              {food.additional_notes}
            </p>
          )}

          <div className="flex items-center gap-3 mt-4">
            <img
              src={food.donator_image || "/user-placeholder.jpg"}
              alt={food.donator_name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-green-800">
                {food.donator_name}
              </p>
              <p className="text-gray-500 text-sm">{food.donator_email}</p>
            </div>
          </div>

          {food.donator_email !== user.email && (
            <RequestFoodModal food={food} />
          )}

          {food.donator_email === user.email && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-green-800">
                Food Requests
              </h3>
              {requests.length === 0 ? (
                <p className="text-gray-500 text-sm">No requests yet.</p>
              ) : (
                <table className="w-full border-collapse border border-gray-200 text-sm">
                  <thead className="bg-green-100 text-green-800">
                    <tr>
                      <th className="p-2 text-gray-600 border">Name</th>
                      <th className="p-2 text-gray-600 border">Email</th>
                      <th className="p-2 text-gray-600 border">Location</th>
                      <th className="p-2 text-gray-600 border">Reason</th>
                      <th className="p-2 text-gray-600 border">Contact</th>
                      <th className="p-2 text-gray-600 border">Status</th>
                      <th className="p-2 text-gray-600 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req) => (
                      <tr
                        key={req._id}
                        className={`text-center text-gray-600 ${
                          req.status === "Accepted"
                            ? "text-gray-600 bg-green-50"
                            : req.status === "Rejected"
                            ? "text-gray-600 bg-red-50"
                            : ""
                        }`}
                      >
                        <td className="p-2 text-gray-600 border">
                          {req.user_name}
                        </td>
                        <td className="p-2 text-gray-600 border">
                          {req.user_email}
                        </td>
                        <td className="p-2 text-gray-600 border">
                          {req.location}
                        </td>
                        <td className="p-2 text-gray-600 border">
                          {req.reason}
                        </td>
                        <td className="p-2 text-gray-600 border">
                          {req.contact}
                        </td>
                        <td className="p-2  text-gray-600 border font-semibold">
                          {req.status}
                        </td>
                        <td className="p-2 border space-x-2">
                          {req.status === "Pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(req._id, "Accepted")
                                }
                                className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(req._id, "Rejected")
                                }
                                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
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

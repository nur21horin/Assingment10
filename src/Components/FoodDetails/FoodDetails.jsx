import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
import Spinner from "../../Page/Spinner";
import RequestFood from "./RequestFood";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchFood = async () => {
      try {
        const res = await fetch(`http://localhost:3000/foods/${id}`);
        if (!res.ok) throw new Error("Failed to fetch food details");
        const data = await res.json();
        setFood(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching food details.");
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id, user, navigate]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-600 py-16">{error}</div>;
  if (!food) return <div className="text-center py-16 text-gray-600">Food not found.</div>;

  return (
    <section className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        <img
          src={food.food_image || "/placeholder.jpg"}
          alt={food.food_name}
          className="w-full h-64 object-cover"
        />

        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold">{food.food_name}</h2>
          <p className="text-gray-600">Quantity: {food.food_quantity}</p>
          <p className="text-gray-600">Pickup Location: {food.pickup_location}</p>
          <p className="text-gray-600">
            Expire Date: {new Date(food.expire_date).toLocaleDateString()}
          </p>
          {food.additional_notes && (
            <p className="text-gray-600">Notes: {food.additional_notes}</p>
          )}

          <div className="flex items-center gap-3 mt-4">
            <img
              src={food.donator_image || "/user-placeholder.jpg"}
              alt={food.donator_name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{food.donator_name}</p>
              <p className="text-gray-500 text-sm">{food.donator_email}</p>
            </div>
          </div>

          <RequestFood foodId={food._id} />
        </div>
      </div>
    </section>
  );
};

export default FoodDetails;

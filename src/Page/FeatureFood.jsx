import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users } from "lucide-react";
import Spinner from "./Spinner";
import { AuthContext } from "../context/Authcontext";

const FeaturedFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/foods")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch foods");
        return res.json();
      })
      .then((data) => {
        const availableFoods = data.filter((f) => f.food_status === "Available");
        const sortedFoods = availableFoods.sort((a, b) => {
          const aDate = a.createdAt ? new Date(a.createdAt) : new Date();
          const bDate = b.createdAt ? new Date(b.createdAt) : new Date();
          return bDate - aDate;
        });
        setFoods(sortedFoods.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong while fetching foods.");
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;

  if (error)
    return (
      <div className="text-center text-red-600 py-16">
        <p>{error}</p>
      </div>
    );

  if (foods.length === 0)
    return (
      <div className="text-center py-16 text-gray-600">
        <p>Foods are not available now.</p>
      </div>
    );

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold bg-blue-100 text-blue-700 px-4 py-1 rounded-full">
            Featured Foods
          </span>
          <h2 className="text-4xl font-bold mt-4 text-gray-800">Available Now</h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            These generous community members are sharing their surplus food.
            Grab yours before it's gone!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={food.food_image || "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={food.food_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-md text-xs">
                  Available
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-lg text-gray-800">{food.food_name}</h3>
                <div className="text-sm text-gray-500">
                  <p>By: {food.donator_name}</p>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    {food.quantity || "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    {food.location || "Unknown"}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    Expires:{" "}
                    {food.expireDate
                      ? new Date(food.expireDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => (user ? navigate(`/food/${food._id}`) : navigate("/login"))}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/availablefoods">
            <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-600 hover:text-white transition">
              Show All Available Foods
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFoods;

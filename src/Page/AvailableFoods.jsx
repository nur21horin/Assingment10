import React, { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import Spinner from "./Spinner";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/foods")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner/>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {foods.map((food) => (
        <div
          key={food.id}
          className="p-4 border rounded-lg shadow hover:shadow-lg transition"
        >
          <h3 className="font-bold text-lg">{food.name}</h3>
          <p>{food.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AvailableFoods;

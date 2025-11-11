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
    
  );
};

export default AvailableFoods;

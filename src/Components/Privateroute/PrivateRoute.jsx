import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";


import { AuthContext } from "../../context/Authcontext";
import Spinner from "../../Page/Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();


  if (loading) {
    return <Spinner />; 
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;

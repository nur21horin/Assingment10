import { useContext } from "react";
import { Navigate, replace, useLocation } from "react-router-dom";

import { AuthContext } from "../../context/Authcontext";
import Spinner from "../../Page/Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;

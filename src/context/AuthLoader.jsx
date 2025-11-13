import { useContext } from "react";
import { AuthContext } from "./Authcontext";
import Spinner from "../Page/Spinner";



const AuthLoader = ({ children }) => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return children;
};

export default AuthLoader;

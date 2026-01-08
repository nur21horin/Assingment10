import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/Authcontext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFacebook } from "react-icons/fa";
const Login = () => {
  const { signInUser, signInGoogle, signInFacebook } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      const res = await signInUser(data.email, data.password);
      toast.success("Login successful!");
      setTimeout(() => navigate(from, { replace: true }), 1500);
    } catch (err) {
      toast.error("Login failed! " + err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInGoogle();
      toast.success("Logged in with Google!");
      setTimeout(() => navigate(from, { replace: true }), 1500);
    } catch (err) {
      toast.error("Google login failed! " + err.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInFacebook();
      toast.success("Logged in with Facebook");
      setTimeout(() => navigate(form, { replace: true }), 1500);
    } catch (err) {
      toast.error("Facebook login failed" + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h1 className="text-2xl font-bold text-green-500 mb-4">Login Now</h1>
      <div className="card w-full max-w-sm shadow-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition-colors duration-300">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="input bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="btn bg-green-500 text-white mt-4 w-full hover:bg-green-600 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="p-4 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white dark:bg-gray-700 border dark:border-gray-600 mt-2 flex items-center justify-center w-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Login with Google
          </button>
          <button
            onClick={handleFacebookSignIn}
            className="btn bg-white dark:bg-gray-700 border dark:border-gray-600 mt-2 flex items-center justify-center w-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
          <FaFacebook className="w-5 h-5 mr-2" />  Login with Facebook
          </button>

          <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            <span>New user? </span>
            <Link
              to="/register"
              className="link text-blue-600 dark:text-blue-400 hover:underline"
            >
              Register here
            </Link>
          </div>
        </div>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default Login;

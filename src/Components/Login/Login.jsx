import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/Authcontext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { signInUser, signInGoogle } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
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

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold text-green-500 mb-4">Login Now</h1>
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="input"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="btn bg-green-500 text-white mt-4 w-full"
          >
            Login
          </button>
        </form>

        <div className="p-4 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white border mt-2 flex items-center justify-center w-full"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 bg-green-700 mr-2"
            />
            Login with Google
          </button>

          <div className="mt-3 text-sm">
            <span>New user? </span>
            <Link to="/register" className="link text-blue-600">
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

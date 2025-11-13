import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/Authcontext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { createUser, signInGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    if (!/[A-Z]/.test(data.password)) {
      toast.error("Password must contain an uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(data.password)) {
      toast.error("Password must contain a lowercase letter.");
      return;
    }
    if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await createUser(data.email, data.password);
      toast.success("Registration successful!");
      reset();
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error("Registration failed! " + err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInGoogle();
      toast.success("Logged in with Google!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error("Google login failed! " + err.message);
    }
  };

  return (
    <div className="card items-center flex flex-col mt-10">
      <h1 className="text-2xl text-green-600 font-bold mb-4">Register Now</h1>
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input"
            placeholder="Full Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

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

          <label className="label">Photo URL</label>
          <input
            type="text"
            {...register("photo", { required: "Photo URL is required" })}
            className="input"
            placeholder="Photo URL"
          />
          {errors.photo && (
            <p className="text-red-500 text-sm">{errors.photo.message}</p>
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

          <label className="label">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
            })}
            className="input"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Register
          </button>

          <div className="mt-2 text-sm">
            <span>Already have an account? </span>
            <Link to="/login" className="link underline text-blue-600">
              Login here
            </Link>
          </div>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-green-500 text-black border-[#e5e5e5] mt-3 flex items-center justify-center"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Register with Google
        </button>

        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default Register;

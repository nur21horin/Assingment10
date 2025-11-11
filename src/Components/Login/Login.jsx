import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


const Login = () => {
  const { signInUser, signInGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((res) => {
        console.log("Logged in user: ", res.user);
        toast.success("Login successful!");
        setError("");
        setTimeout(() => navigate(from, { replace: true }), 1500);
      })
      .catch((err) => {
        console.error(err.message);
        setError("Invalid email or password");
        toast.error("Login failed! " + err.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((res) => {
        console.log("Google login success:", res.user);
        toast.success("Logged in with Google!");
        setTimeout(() => navigate(from, { replace: true }), 1500);
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Google login failed! " + err.message);
      });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold text-green-300 mb-4">Login Now</h1>
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              required
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              required
            />

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <button type="submit" className="btn btn-neutral mt-4 w-full">
              Login
            </button>
          </fieldset>
        </form>

        <div className="p-4 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white text-black border-[#e5e5e5] mt-2 flex items-center justify-center w-full"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Login with Google
          </button>

          <div className="mt-3 text-sm">
            <span>New user? </span>
            <Link to="/register" className="link link-hover text-blue-600">
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

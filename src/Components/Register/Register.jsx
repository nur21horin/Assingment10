import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { createUser, signInGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Google Sign-In moved outside
  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((res) => {
        console.log("Google login success: ", res.user);
        toast.success("Logged in with Google!");
        setTimeout(() => navigate("/"), 1500);
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Google login failed! " + err.message);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    const password1 = e.target.password1.value;

    // 🔐 Password validation
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    } else if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== password1) {
      setError("Passwords do not match.");
      return;
    }

    // ✅ Create user
    createUser(email, password)
      .then((res) => {
        console.log("User created: ", res.user);
        setError("");
        toast.success("Registration successful!");
        e.target.reset();
        setTimeout(() => navigate("/"), 1500);
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Registration failed! " + err.message);
      });
  };

  return (
    <div className="card items-center flex flex-col mt-10">
      <h1 className="text-2xl text-green-600 font-bold mb-4">Register Now</h1>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          {/* ✅ Changed to form, not fieldset */}
          <form onSubmit={handleRegister} className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Full Name"
              required
            />

            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              required
            />

            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input"
              placeholder="Photo URL"
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

            <label className="label">Confirm Password</label>
            <input
              type="password"
              name="password1"
              className="input"
              placeholder="Confirm Password"
              required
            />

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <button type="submit" className="btn btn-neutral mt-4 w-full">
              Register
            </button>

            <div className="mt-2 text-sm">
              <span>Already have an account? </span>
              <Link to="/login" className="link underline link-hover text-blue-600">
                Login here
              </Link>
            </div>
          </form>

          {/* ✅ Google login button works now */}
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white text-black border-[#e5e5e5] mt-3 flex items-center justify-center"
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
    </div>
  );
};

export default Register;

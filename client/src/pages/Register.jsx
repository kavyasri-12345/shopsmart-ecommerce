import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      alert(
        "Registration Successful"
      );

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div className="auth-container">

      {/* LEFT SIDE */}

      <div className="auth-left">

        <div className="hero-content">

          <span className="hero-badge">
            Join Thousands of Happy Customers
          </span>

          <h1>
            Create Your
            <br />
            Account Today.
          </h1>

          <p>
            Sign up now and unlock access
            to premium products, special
            discounts and fast checkout.
          </p>

          <div className="feature-boxes">

            <div className="feature-card">
              <h3>100%</h3>
              <p>Secure</p>
            </div>

            <div className="feature-card">
              <h3>24/7</h3>
              <p>Support</p>
            </div>

            <div className="feature-card">
              <h3>5000+</h3>
              <p>Users</p>
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="auth-right">

        <div className="auth-card">

          <div className="logo">
            <h2>
              Shop<span>Smart</span>
            </h2>
          </div>

          <h3>Create Account 🚀</h3>

          <form onSubmit={submitHandler}>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <button type="submit">
              Register
            </button>

          </form>

          <div className="auth-link">
            <p>
              Already have an account?{" "}
              <Link to="/login">
                Login
              </Link>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;
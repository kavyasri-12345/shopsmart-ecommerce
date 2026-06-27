import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://shopsmart-ecommerce-shve.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      alert("Login Successful");

      navigate("/home");
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
            #1 Online Shopping Platform
          </span>

          <h1>
            Shop Smarter,
            <br />
            Live Better.
          </h1>

          <p>
            Discover premium products,
            exclusive deals and a seamless
            shopping experience from anywhere.
          </p>

          <div className="feature-boxes">

            <div className="feature-card">
              <h3>10K+</h3>
              <p>Products</p>
            </div>

            <div className="feature-card">
              <h3>5K+</h3>
              <p>Customers</p>
            </div>

            <div className="feature-card">
              <h3>24/7</h3>
              <p>Support</p>
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

          <h3>Welcome Back 👋</h3>

          <form onSubmit={submitHandler}>

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
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <button type="submit">
              Login
            </button>

          </form>

          <div className="auth-link">
            <p>
              Don't have an account?{" "}
              <Link to="/register">
                Register
              </Link>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
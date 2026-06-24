import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {

  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const [cartCount, setCartCount] =
    useState(0);

  const [wishlistCount, setWishlistCount] =
    useState(0);

  const [orderCount, setOrderCount] =
    useState(0);

  useEffect(() => {

    fetchCounts();

  }, []);

  const fetchCounts = async () => {

    try {

      const { data: cartData } =
        await axios.get(
          "http://localhost:5000/api/cart",
          {
            headers: {
              Authorization:
                `Bearer ${userInfo.token}`,
            },
          }
        );

      const { data: wishlistData } =
        await axios.get(
          "http://localhost:5000/api/wishlist",
          {
            headers: {
              Authorization:
                `Bearer ${userInfo.token}`,
            },
          }
        );

      const { data: ordersData } =
        await axios.get(
          "http://localhost:5000/api/orders",
          {
            headers: {
              Authorization:
                `Bearer ${userInfo.token}`,
            },
          }
        );

      setCartCount(
        cartData.length || 0
      );

      setWishlistCount(
        wishlistData.length || 0
      );

      setOrderCount(
        ordersData.length || 0
      );

    } catch (error) {

      console.log(error);

    }
  };

  const logoutHandler = () => {

    localStorage.removeItem(
      "userInfo"
    );

    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <div className="profile-container">

        <div className="profile-card">

          <div className="profile-avatar">
            {userInfo?.name?.charAt(0)}
          </div>

          <h2>
            {userInfo?.name}
          </h2>

          <p>
            {userInfo?.email}
          </p>

          <div className="profile-stats">

            <div className="stat-card">
              <h3>{orderCount}</h3>
              <p>Orders</p>
            </div>

            <div className="stat-card">
              <h3>{wishlistCount}</h3>
              <p>Wishlist</p>
            </div>

            <div className="stat-card">
              <h3>{cartCount}</h3>
              <p>Cart</p>
            </div>

          </div>

          <button
            className="orders-btn"
            onClick={() =>
              navigate("/orders")
            }
          >
            My Orders
          </button>

          <button
            className="logout-btn"
            onClick={logoutHandler}
          >
            Logout
          </button>

        </div>

      </div>
    </>
  );
}

export default Profile;
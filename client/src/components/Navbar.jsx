import "./Navbar.css";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Navbar() {

  const [cartCount, setCartCount] =
    useState(0);

  const [wishlistCount, setWishlistCount] =
    useState(0);

  useEffect(() => {

    fetchCartCount();

    fetchWishlistCount();

  }, []);

  const fetchCartCount =
    async () => {

      try {

        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        if (!userInfo) return;

        const { data } =
          await axios.get(
            "https://shopsmart-ecommerce-shve.onrender.com/api/cart",
            {
              headers: {
                Authorization:
                  `Bearer ${userInfo.token}`,
              },
            }
          );

        if (data.items) {

          setCartCount(
            data.items.length
          );

        } else {

          setCartCount(
            data.length || 0
          );

        }

      } catch (error) {

        console.log(error);

      }
    };

  const fetchWishlistCount =
    async () => {

      try {

        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        if (!userInfo) return;

        const { data } =
          await axios.get(
            "https://shopsmart-ecommerce-shve.onrender.com/api/wishlist",
            {
              headers: {
                Authorization:
                  `Bearer ${userInfo.token}`,
              },
            }
          );

        setWishlistCount(
          data.length || 0
        );

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <nav className="navbar">

      <Link
        to="/home"
        className="logo"
      >
        Shop
        <span>Smart</span>
      </Link>

      

      <div className="nav-icons">

        <Link
          to="/wishlist"
          className="wishlist-icon"
        >

          <FaHeart />

          {wishlistCount > 0 && (

            <span className="badge">
              {wishlistCount}
            </span>

          )}

        </Link>

        <Link
          to="/cart"
          className="cart-icon"
        >

          <FaShoppingCart />

          {cartCount > 0 && (

            <span className="badge">
              {cartCount}
            </span>

          )}

        </Link>

        <Link
          to="/profile"
        >
          <FaUser />
        </Link>

      </div>

    </nav>

  );
}

export default Navbar;
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "./Cart.css";

function Cart() {
   const navigate = useNavigate();
  const [cartItems, setCartItems] =
    useState([]);

  useEffect(() => {
    fetchCart();
  }, []);
  const fetchCart = async () => {
    try {
      const userInfo =
        JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        );

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

      setCartItems(
        data.filter(
          (item) =>
            item &&
            item.product
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      const userInfo =
        JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        );

      await axios.delete(
        `https://shopsmart-ecommerce-shve.onrender.com/api/cart/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };
  const updateQuantity =
  async (id, quantity) => {

    try {

      const userInfo =
        JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        );

      await axios.put(
        `https://shopsmart-ecommerce-shve.onrender.com/api/cart/${id}`,
        {
          quantity,
        },
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      fetchCart();

    } catch (error) {
      console.log(error);
    }
  };
  
  const total = cartItems.reduce(
    (acc, item) =>
      acc +
      (item.product?.price || 0) *
        item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="cart-container">

        <h1>
          Shopping Cart 🛒
        </h1>

        {cartItems.length === 0 ? (
          <h2>
            Your Cart Is Empty
          </h2>
        ) : (
          <>
            <div className="cart-grid">

              {cartItems.map(
                (item) => (
                  <div
                    key={item._id}
                    className="cart-item"
                  >
                    <img
                      src={
                        item.product.image
                      }
                      alt={
                        item.product.title
                      }
                    />

                    <div className="cart-details">

                      <h3>
                        {
                          item.product.title
                        }
                      </h3>

                      <p>
                        ₹
                        {
                          item.product.price
                        }
                      </p>

                      <div className="qty-box">

  <button
    onClick={() =>
      updateQuantity(
        item._id,
        Math.max(
          1,
          item.quantity - 1
        )
      )
    }
  >
    -
  </button>

  <span>
    {item.quantity}
  </span>

  <button
    onClick={() =>
      updateQuantity(
        item._id,
        item.quantity + 1
      )
    }
  >
    +
  </button>

</div>

                    </div>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeItem(
                          item._id
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>
                )
              )}

            </div>

            <div className="cart-total">

              <h2>
                Total:
                ₹ {total}
              </h2>

            <button
  className="checkout-btn"
  onClick={() => {
    console.log("GOING TO CHECKOUT");
    navigate("/checkout");
  }}
>
  Proceed To Checkout
</button>

            </div>

          </>
        )}

      </div>
    </>
  );
}

export default Cart;
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
function Checkout() {

  const [address, setAddress] =
    useState("");

  const navigate = useNavigate();

  const placeOrder = async () => {
    try {

      const userInfo =
        JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        );

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          shippingAddress: address,
        },
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      alert("Order Placed Successfully");

      navigate("/orders");

    } catch (error) {

      console.log(error);

      alert("Failed To Place Order");

    }
  };

  return (
    <>
      <Navbar />

      <div className="checkout-container">

        <h1>Checkout</h1>

        <textarea
          placeholder="Enter Shipping Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        <button
          onClick={placeOrder}
        >
          Place Order
        </button>

      </div>
    </>
  );
}

export default Checkout;
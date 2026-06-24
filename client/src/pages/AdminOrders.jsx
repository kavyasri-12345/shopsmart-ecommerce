import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./AdminOrders.css";

function AdminOrders() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =
    async () => {

      try {

        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        const { data } =
          await axios.get(
            "http://localhost:5000/api/admin/orders",
            {
              headers: {
                Authorization:
                  `Bearer ${userInfo.token}`,
              },
            }
          );

        setOrders(data);

      } catch (error) {

        console.log(error);

      }
    };
const updateStatus =
  async (id) => {

    try {

      const userInfo =
        JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        );

      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        {
          status: "Delivered",
        },
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      alert(
        "Order Delivered"
      );

      fetchOrders();

    } catch (error) {

      console.log(error);

    }
  };
  return (
    <>
      <Navbar />

      <div className="orders-page">

  <h1 className="orders-title">
    Admin Orders
  </h1>

  <div className="orders-grid">

    {orders.map((order) => (

      <div
        key={order._id}
        className="admin-order-card"
      >

        <h3>Order Details</h3>

        <p>
          <strong>ID:</strong>
          {order._id}
        </p>

        <p>
          <strong>User:</strong>
          {order.user?.name}
        </p>

        <p>
          <strong>Amount:</strong>
          ₹{order.totalPrice}
        </p>

        <p>
  <strong>Status:</strong>

  <span
    className={
      order.status === "Delivered"
        ? "delivered"
        : "pending"
    }
  >
    {order.status}
  </span>

</p>

<button
  className="deliver-btn"
  onClick={() =>
    updateStatus(order._id)
  }
>
  Mark Delivered
</button>
      </div>

    ))}

  </div>

</div>
    </>
  );
}

export default AdminOrders;
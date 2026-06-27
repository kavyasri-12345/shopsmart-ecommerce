import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const { data } = await axios.get(
        "https://shopsmart-ecommerce-shve.onrender.com/api/orders",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="orders-container">
        <h1>My Orders</h1>

        {loading ? (
          <h2>Loading...</h2>
        ) : orders.length === 0 ? (
          <h2>No Orders Found</h2>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div
                key={order._id}
                className="order-card"
              >
                <h3>Order Details</h3>

                <p>
                  <strong>Order ID:</strong>
                  <br />
                  {order._id}
                </p>

                <p>
                  <strong>Total:</strong>
                  <br />
                  ₹{order.totalPrice}
                </p>

                <p>
                  <strong>Status:</strong>
                  <br />
                  {order.status}
                </p>

                <p>
                  <strong>Items:</strong>
                  <br />
                  {order.orderItems?.length || 0}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Orders;
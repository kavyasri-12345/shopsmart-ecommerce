import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import "./AdminDashboard.css";

function AdminDashboard() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
    const [stats, setStats] =
    useState({
      products: 0,
      orders: 0,
      users: 0,
      revenue: 0,
    });
    useEffect(() => {

  fetchProducts();

  fetchStats();

}, []);
  const fetchProducts = async () => {
    try {
      const { data } =
        await axios.get(
          "http://localhost:5000/api/products"
        );

      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const fetchStats =
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
          "http://localhost:5000/api/admin/stats",
          {
            headers: {
              Authorization:
                `Bearer ${userInfo.token}`,
            },
          }
        );

      setStats(data);

    } catch (error) {

      console.log(error);

    }
  };
  const deleteProduct =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this product?"
        );

      if (!confirmDelete) return;

      try {
        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        await axios.delete(
          `http://localhost:5000/api/products/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${userInfo.token}`,
            },
          }
        );

        alert(
          "Product Deleted"
        );

        fetchProducts();
      } catch (error) {
        console.log(error);
      }
    };
     
  return (
    <>
      <Navbar />

      <div className="admin-dashboard">

        <div className="admin-header">

          <h1>
            Admin Dashboard
          </h1>

          <Link
            to="/admin/add-product"
          >
            <button className="add-product-btn">
              + Add Product
            </button>
          </Link>
          <Link
  to="/admin/orders"
>
  <button
    className="add-product-btn"
  >
    View Orders
  </button>
</Link>

        </div>

        {/* STATS */}

        {/* STATS */}

<div className="stats-container">

  <div className="stat-card">
  <h2>{stats.products}</h2>
  <p>Total Products</p>
</div>

<div className="stat-card">
  <h2>{stats.orders}</h2>
  <p>Total Orders</p>
</div>

<div className="stat-card">
  <h2>{stats.users}</h2>
  <p>Total Users</p>
</div>

<div className="stat-card">
  <h2>₹{stats.revenue}</h2>
  <p>Total Revenue</p>
</div>

</div>

        {/* PRODUCT TABLE */}

        <div className="table-container">

          <h2>
            Manage Products
          </h2>

          {loading ? (
            <h3>
              Loading...
            </h3>
          ) : (
            <table>

              <thead>

                <tr>
                  <th>
                    Image
                  </th>

                  <th>
                    Product
                  </th>

                  <th>
                    Price
                  </th>

                  <th>
                    Stock
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Actions
                  </th>
                </tr>

              </thead>

              <tbody>

                {products.map(
                  (product) => (
                    <tr
                      key={
                        product._id
                      }
                    >
                      <td>

                        <img
                          src={
                            product.image
                          }
                          alt=""
                          className="product-image"
                        />

                      </td>

                      <td>
                        {
                          product.title
                        }
                      </td>

                      <td>
                        ₹
                        {
                          product.price
                        }
                      </td>

                      <td>
                        {
                          product.stock
                        }
                      </td>

                      <td>
                        {
                          product.category
                        }
                      </td>

                      <td>

                        <Link
                          to={`/admin/edit/${product._id}`}
                        >
                          <button className="edit-btn">
                            Edit
                          </button>
                        </Link>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteProduct(
                              product._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>
          )}

        </div>

      </div>
    </>
  );
}

export default AdminDashboard;
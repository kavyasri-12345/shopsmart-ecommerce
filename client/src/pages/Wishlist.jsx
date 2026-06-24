import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Wishlist.css";

function Wishlist() {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist =
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
            "http://localhost:5000/api/wishlist",
            {
              headers: {
                Authorization:
                  `Bearer ${userInfo.token}`,
              },
            }
          );

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

  const removeWishlist =
    async (id) => {
      try {
        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        await axios.delete(
          `http://localhost:5000/api/wishlist/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${userInfo.token}`,
            },
          }
        );

        fetchWishlist();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <Navbar />

      <div className="wishlist-container">

        <h1>
          Wishlist ❤️
        </h1>

        {products.length === 0 ? (
          <h2>
            No Products In Wishlist
          </h2>
        ) : (

          <div className="wishlist-grid">

            {products.map(
              (product) => (

                <div
                  key={product._id}
                  className="wishlist-item"
                >

                  <img
                    src={product.image}
                    alt={product.title}
                  />

                  <div className="wishlist-details">

                    <h3>
                      {product.title}
                    </h3>

                    <p>
                      ₹{product.price}
                    </p>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeWishlist(
                        product._id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              )
            )}

          </div>

        )}

      </div>
    </>
  );
}

export default Wishlist;
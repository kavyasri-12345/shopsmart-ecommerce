import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [reviews, setReviews] =
    useState([]);

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  useEffect(() => {

    fetchProduct();

    fetchReviews();

  }, [id]);

  const fetchProduct =
    async () => {

      try {

        const { data } =
          await axios.get(
            `http://localhost:5000/api/products/${id}`
          );

        setProduct(data);

      } catch (error) {

        console.log(error);

      }
    };

  const fetchReviews =
    async () => {

      try {

        const { data } =
          await axios.get(
            `http://localhost:5000/api/reviews/${id}`
          );

        setReviews(data);

      } catch (error) {

        console.log(error);

      }
    };

  const addToCart =
    async () => {

      try {

        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        await axios.post(
          "http://localhost:5000/api/cart",
          {
            productId:
              product._id,
            quantity: 1,
          },
          {
            headers: {
              Authorization:
                `Bearer ${userInfo.token}`,
            },
          }
        );

        alert(
          "Added To Cart"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Add Cart"
        );

      }
    };

  const addToWishlist =
    async () => {

      try {

        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        await axios.post(
          "http://localhost:5000/api/wishlist",
          {
            productId:
              product._id,
          },
          {
            headers: {
              Authorization:
                `Bearer ${userInfo.token}`,
            },
          }
        );

        alert(
          "Added To Wishlist"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Add Wishlist"
        );

      }
    };

  const submitReview =
    async () => {

      try {

        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        await axios.post(
          "http://localhost:5000/api/reviews",
          {
            user:
              userInfo._id,

            product:
              product._id,

            rating,

            comment,
          }
        );

        setRating(5);

        setComment("");

        fetchReviews();

        alert(
          "Review Added"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Add Review"
        );

      }
    };

  if (!product)
    return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />

      <div className="details-container">

        <div className="details-image">

          <img
            src={product.image}
            alt={product.title}
          />

        </div>

        <div className="details-info">

          <h1>
            {product.title}
          </h1>

          <h2>
            ₹ {product.price}
          </h2>

          <p>
            {product.description}
          </p>

          <p>
            Category:
            {" "}
            {product.category}
          </p>

          <p>
            Stock:
            {" "}
            {product.stock}
          </p>

          <button
            onClick={addToCart}
          >
            Add To Cart
          </button>

          <button
            onClick={addToWishlist}
          >
            Add To Wishlist
          </button>

        </div>

      </div>

      {/* REVIEWS */}

      <div className="review-section">

        <h2>
          Product Reviews ⭐
        </h2>

        <div className="review-form">

          <select
            value={rating}
            onChange={(e) =>
              setRating(
                Number(
                  e.target.value
                )
              )
            }
          >

            <option value="5">
              ⭐⭐⭐⭐⭐
            </option>

            <option value="4">
              ⭐⭐⭐⭐
            </option>

            <option value="3">
              ⭐⭐⭐
            </option>

            <option value="2">
              ⭐⭐
            </option>

            <option value="1">
              ⭐
            </option>

          </select>

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
          />

          <button
            onClick={submitReview}
          >
            Submit Review
          </button>

        </div>

        <div className="reviews-list">

          {reviews.length === 0 ? (

            <h3>
              No Reviews Yet
            </h3>

          ) : (

            reviews.map(
              (review) => (

                <div
                  key={review._id}
                  className="review-card"
                >

                  <h4>
                    ⭐ {review.rating}/5
                  </h4>

                  <p>
                    {review.comment}
                  </p>

                  <small>
                    {review.user?.name ||
                      "User"}
                  </small>

                </div>

              )
            )

          )}

        </div>

      </div>

    </>
  );
}

export default ProductDetails;
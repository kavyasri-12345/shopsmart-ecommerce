import "./ProductCard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {

  const navigate = useNavigate();

  const addToCart = async () => {
  try {
    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    const { data } = await axios.post(
      "https://shopsmart-ecommerce-shve.onrender.com/api/cart",
      {
        productId: product._id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    console.log(data);

    alert("Added To Cart");
  } catch (error) {
    console.log(error);
    alert("Failed To Add Cart");
  }
};
const addToWishlist = async () => {
  try {

    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    await axios.post(
      "https://shopsmart-ecommerce-shve.onrender.com/api/wishlist",
      {
        productId: product._id,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    alert("Added To Wishlist");

  } catch (error) {

    console.log(error);
    alert("Failed To Add Wishlist");

  }
};

  return (
    <div
      className="product-card"
      onClick={() =>
        navigate(
          `/product/${product._id}`
        )
      }
    >

      <img
        className="product-img"
        src={product.image}
        alt={product.title}
      />

      <div className="product-info">

        <p className="category">
          {product.category}
        </p>

        <h3>
          {product.title}
        </h3>

        <p className="price">
          ₹{product.price}
        </p>

     <div className="product-actions">

  <button
    className="quick-btn"
    onClick={(e) => {
      e.stopPropagation();
      addToCart();
    }}
  >
    Add To Cart
  </button>

  <button
    className="wishlist-btn"
    onClick={(e) => {
      e.stopPropagation();
      addToWishlist();
    }}
  >
    ❤️ Wishlist
  </button>
  <button
  className="delete-btn"
  onClick={() => deleteProduct(product._id)}
>
  Delete
</button>

</div>

      </div>

    </div>
  );
}

export default ProductCard;
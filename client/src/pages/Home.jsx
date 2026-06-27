import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import "./Home.css";

function Home() {

  const [products, setProducts] =
  useState([]);

const [search, setSearch] =
  useState("");

const [category, setCategory] =
  useState("All");

const [loading, setLoading] =
  useState(true);

useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = async () => {
  try {

    const { data } =
      await axios.get(
        "https://shopsmart-ecommerce-shve.onrender.com/api/products"
      );

    setProducts(data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }
};

const filteredProducts =
  products.filter(
    (product) => {

      const matchesSearch =
        product.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "All"
          ? true
          : product.category
              ?.toLowerCase() ===
            category.toLowerCase();

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

const electronics =
  products.filter(
    (product) =>
      product.category
        ?.toLowerCase()
        .includes("electronics")
  );

const laptopProducts =
  products.filter(
    (product) =>
      product.category
        ?.toLowerCase()
        .includes("laptops")
  );

const fashionProducts =
  products.filter(
    (product) =>
      product.category
        ?.toLowerCase()
        .includes("fashion")
  );

const accessoriesProducts =
  products.filter(
    (product) =>
      product.category
        ?.toLowerCase()
        .includes("accessories")
  );

const trendingProducts =
  products.slice(0, 8);
  console.log("Search:", search);
console.log("Filtered:", filteredProducts);
  return (
    <>

      <Navbar />

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <h1>
            Shop Smarter,
            <br />
            Live Better.
          </h1>

          <p>
            Discover amazing products,
            unbeatable deals and
            lightning-fast delivery.
          </p>

          <button>
            Shop Now
          </button>

        </div>

      </section>

      {/* SEARCH */}

      <section className="search-container">

        <input
  type="text"
  placeholder="Search Products..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
/>

      </section>

      {/* CATEGORIES */}

      <section className="categories">

        <h2>
          Popular Categories
        </h2>
         <div className="category-grid">

  <div
    className="category-card"
    onClick={() =>
      setCategory("electronics")
    }
  >
    📱 Electronics
  </div>

 <div
  className="category-card"
  onClick={() =>
    setCategory("Laptops")
  }
>
  💻 Laptops
</div>

<div
  className="category-card"
  onClick={() =>
    setCategory("Fashion")
  }
>
  👕 Fashion
</div>

<div
  className="category-card"
  onClick={() =>
    setCategory("Accessories")
  }
>
  🎧 Accessories
</div>

  <div
    className="category-card"
    onClick={() =>
      setCategory("All")
    }
  >
    All Products
  </div>

</div>
        

      

      </section>
<section className="products-section">

  <h2>
    {search
      ? `Search Results (${filteredProducts.length})`
      : "Featured Products"}
  </h2>

  {loading ? (
    <h2>Loading...</h2>
  ) : (
    <div className="products-grid">

      {filteredProducts.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}

    </div>
  )}

</section>

{search === "" && (

<>
  {/* TRENDING PRODUCTS */}

  <section className="products-section">

    <h2>Trending Products 🔥</h2>

    <div className="products-grid">

      {trendingProducts.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}

    </div>

  </section>

  {/* ELECTRONICS */}

  <section className="products-section">

    <h2>Electronics 📱</h2>

    <div className="products-grid">

      {electronics.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}

    </div>

  </section>
  <section className="products-section">

  <h2>Laptops 💻</h2>

  <div className="products-grid">

    {laptopProducts.map((product) => (
      <ProductCard
        key={product._id}
        product={product}
      />
    ))}

  </div>

</section>

  {/* FASHION */}

  <section className="products-section">

    <h2>Fashion 👕</h2>

    <div className="products-grid">

      {fashionProducts.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}

    </div>

  </section>

  {/* JEWELLERY */}

  <section className="products-section">

    <h2>Accessories 🎧</h2>

<div className="products-grid">

  {accessoriesProducts.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}

    </div>

  </section>

</>

)}
      {/* WHY US */}

      <section className="why-us">

        <h2>
          Why Shop With Us?
        </h2>

        <div className="why-grid">

          <div className="why-card">
            <h3>🚚 Fast Delivery</h3>

            <p>
              Quick shipping across
              India.
            </p>
          </div>

          <div className="why-card">
            <h3>🔒 Secure Payments</h3>

            <p>
              Safe payment gateway.
            </p>
          </div>

          <div className="why-card">
            <h3>⭐ Top Quality</h3>

            <p>
              Best quality products.
            </p>
          </div>

        </div>

      </section>

      {/* DEALS */}

      <section className="deals">

        <h2>
          Today's Deals 🔥
        </h2>

        <div className="deal-grid">

          <div className="deal-card">
            <h3>
              Up To 50% OFF
            </h3>

            <p>
              Electronics
            </p>
          </div>

          <div className="deal-card">
            <h3>
              Up To 70% OFF
            </h3>

            <p>
              Fashion
            </p>
          </div>

          <div className="deal-card">
            <h3>
              Up To 40% OFF
            </h3>

            <p>
              Accessories
            </p>
          </div>

        </div>

      </section>

      {/* BRANDS */}

      <section className="brands">

        <h2>
          Top Brands
        </h2>

        <div className="brand-grid">

          <div className="brand-card">
            Apple
          </div>

          <div className="brand-card">
            Samsung
          </div>

          <div className="brand-card">
            Nike
          </div>

          <div className="brand-card">
            Adidas
          </div>

          <div className="brand-card">
            HP
          </div>

          <div className="brand-card">
            Dell
          </div>

        </div>

      </section>

      {/* NEWSLETTER */}

      <section className="newsletter">

        <h2>
          Stay Updated
        </h2>

        <p>
          Subscribe for latest offers
          and exclusive discounts.
        </p>

        <input
          type="email"
          placeholder="Enter Email"
        />

        <button>
          Subscribe
        </button>

      </section>

      {/* FOOTER */}

      <footer className="footer">

        <h2>
          ShopSmart
        </h2>

        <p>
          © 2025 All Rights Reserved
        </p>

      </footer>

    </>
  );
}

export default Home;
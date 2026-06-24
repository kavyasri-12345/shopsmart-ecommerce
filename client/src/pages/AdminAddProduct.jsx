import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AdminAddProduct() {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const userInfo =
        JSON.parse(
          localStorage.getItem("userInfo")
        );

      await axios.post(
        "http://localhost:5000/api/products",
        {
          title,
          price,
          image,
          category,
          description,
          stock,
        },
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      alert("Product Added");

    } catch (error) {

      console.log(error);
      alert("Failed");

    }
  };

  return (
    <>
      <Navbar />

      <div className="form-container">

        <h1>Add Product</h1>

        <form onSubmit={submitHandler}>

          <input
            placeholder="Title"
            onChange={(e)=>setTitle(e.target.value)}
          />

          <input
            placeholder="Price"
            onChange={(e)=>setPrice(e.target.value)}
          />

          <input
            placeholder="Image URL"
            onChange={(e)=>setImage(e.target.value)}
          />

          <input
            placeholder="Category"
            onChange={(e)=>setCategory(e.target.value)}
          />

          <input
            placeholder="Stock"
            onChange={(e)=>setStock(e.target.value)}
          />

          <textarea
            placeholder="Description"
            onChange={(e)=>setDescription(e.target.value)}
          />

          <button type="submit">
            Add Product
          </button>

        </form>

      </div>
    </>
  );
}

export default AdminAddProduct;
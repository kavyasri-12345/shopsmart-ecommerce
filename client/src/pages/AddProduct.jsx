import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./AddProduct.css";

function AddProduct() {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [image, setImage] =
    useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];

    const formData =
      new FormData();

    formData.append(
      "image",
      file
    );

    try {
      const { data } =
        await axios.post(
          "http://localhost:5000/api/products/upload",
          formData
        );

      setImage(
        data.imageUrl
      );
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (
    e
  ) => {
    e.preventDefault();

    try {
      const userInfo =
        JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        );

      await axios.post(
        "http://localhost:5000/api/products",
        {
          title,
          description,
          price,
          stock,
          category,
          image,
        },
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      alert(
        "Product Added Successfully"
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="add-product">

        <h1>
          Add Product
        </h1>

        <form
          onSubmit={
            submitHandler
          }
        >

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

          <textarea
            placeholder="Description"
            value={
              description
            }
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
          />

         <input
  type="number"
  min="0"
  value={stock}
  onChange={(e) =>
    setStock(e.target.value)
  }
/>

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          />

          <input
            type="file"
            onChange={
              uploadImage
            }
          />

          {image && (
            <img
              src={image}
              alt=""
              width="200"
            />
          )}

          <button
            type="submit"
          >
            Add Product
          </button>

        </form>

      </div>
    </>
  );
}

export default AddProduct;
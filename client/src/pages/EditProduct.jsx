import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./AddProduct.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
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

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } =
        await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

      setTitle(data.title);
      setDescription(
        data.description
      );
      setPrice(data.price);
      setStock(data.stock);
      setCategory(
        data.category
      );
      setImage(data.image);
    } catch (error) {
      console.log(error);
    }
  };

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

      await axios.put(
        `http://localhost:5000/api/products/${id}`,
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
        "Product Updated Successfully"
      );

      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="add-product">

        <h1>Edit Product</h1>

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
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(
                e.target.value
              )
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
            Update Product
          </button>
        </form>

      </div>
    </>
  );
}

export default EditProduct;
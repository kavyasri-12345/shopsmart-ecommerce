import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";

import Product from "./models/Product.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {

    console.log("MongoDB Connected");

    const { data } =
      await axios.get(
        "https://fakestoreapi.com/products"
      );

    const products =
      data.map((item) => ({
        title: item.title,
        description:
          item.description,
        price:
          Math.floor(
            item.price * 85
          ),
        category:
          item.category,
        stock: 20,
        image: item.image,
      }));

    await Product.deleteMany({});

    await Product.insertMany(
      products
    );

    console.log(
      "Products Seeded Successfully"
    );

    process.exit();

  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
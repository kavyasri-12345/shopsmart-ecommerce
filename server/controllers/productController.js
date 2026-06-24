import Product from "../models/Product.js";

// ====================================
// GET ALL PRODUCTS
// ====================================

export const getProducts = async (
  req,
  res
) => {
  try {
    const products =
      await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ====================================
// GET SINGLE PRODUCT
// ====================================

export const getProductById = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ====================================
// CREATE PRODUCT
// ====================================

export const createProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.create({
        title:
          req.body.title,

        description:
          req.body.description,

        price:
          req.body.price,

        category:
          req.body.category,

        stock:
          req.body.stock,

        image:
          req.body.image,
      });

    res.status(201).json(
      product
    );
  } catch (error) {

  console.log("CREATE PRODUCT ERROR:");
  console.log(error);

  res.status(500).json({
    message: error.message,
  });

}
};

// ====================================
// UPDATE PRODUCT
// ====================================

export const updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ====================================
// DELETE PRODUCT
// ====================================

export const deleteProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ====================================
// SEED PRODUCTS
// ====================================

export const seedProducts = async (
  req,
  res
) => {
  try {
   const products = [
  {
    title: "iPhone 15",
    description: "Apple Smartphone",
    price: 79999,
    category: "Electronics",
    stock: 20,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab"
  },
  {
    title: "Samsung Galaxy S24",
    description: "Samsung Flagship",
    price: 74999,
    category: "Electronics",
    stock: 15,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf"
  },
  {
    title: "OnePlus 12",
    description: "OnePlus Smartphone",
    price: 64999,
    category: "Electronics",
    stock: 18,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  },
  {
    title: "MacBook Air M3",
    description: "Apple Laptop",
    price: 119999,
    category: "Laptops",
    stock: 10,
    image: "https://images.pexels.com/photos/8533587/pexels-photo-8533587.jpeg"
  },
  {
    title: "Dell XPS 13",
    description: "Premium Laptop",
    price: 99999,
    category: "Laptops",
    stock: 12,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
  },
  {
    title: "HP Pavilion",
    description: "HP Laptop",
    price: 69999,
    category: "Laptops",
    stock: 15,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed"
  },
  {
    title: "Nike Air Max",
    description: "Running Shoes",
    price: 7999,
    category: "Fashion",
    stock: 25,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  {
    title: "Adidas Ultraboost",
    description: "Sports Shoes",
    price: 8999,
    category: "Fashion",
    stock: 20,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
  },
  {
    title: "Puma Sneakers",
    description: "Casual Shoes",
    price: 5999,
    category: "Fashion",
    stock: 30,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772"
  },
  {
    title: "Sony Headphones",
    description: "Wireless Headphones",
    price: 12999,
    category: "Accessories",
    stock: 25,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  },
  {
    title: "Apple Watch",
    description: "Smart Watch",
    price: 34999,
    category: "Accessories",
    stock: 15,
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9"
  },
  {
    title: "Boat Rockerz",
    description: "Bluetooth Headphones",
    price: 2999,
    category: "Accessories",
    stock: 50,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944"
  }
];
    await Product.deleteMany(
      {}
    );

    const createdProducts =
      await Product.insertMany(
        products
      );

    res.status(201).json({
      message:
        "Products Seeded Successfully",
      products:
        createdProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
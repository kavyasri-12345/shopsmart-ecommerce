import Wishlist from "../models/Wishlist.js";

// ADD TO WISHLIST
export const addToWishlist = async (
  req,
  res
) => {
  try {
    const { productId } = req.body;

    let wishlist =
      await Wishlist.findOne({
        user: req.user._id,
      });

    if (!wishlist) {
      wishlist =
        await Wishlist.create({
          user: req.user._id,
          products: [],
        });
    }

    if (
      !wishlist.products.some(
        (p) =>
          p.toString() === productId
      )
    ) {
      wishlist.products.push(
        productId
      );
    }

    await wishlist.save();

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET WISHLIST
export const getWishlist =
  async (req, res) => {
    try {
      const wishlist =
        await Wishlist.findOne({
          user: req.user._id,
        }).populate(
          "products"
        );

      if (!wishlist) {
        return res.json([]);
      }

      res.json(
        wishlist.products
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// REMOVE FROM WISHLIST
export const removeWishlistItem =
  async (req, res) => {
    try {
      const wishlist =
        await Wishlist.findOne({
          user: req.user._id,
        });

      if (!wishlist) {
        return res.status(404).json({
          message:
            "Wishlist not found",
        });
      }

      wishlist.products =
        wishlist.products.filter(
          (product) =>
            product.toString() !==
            req.params.id
        );

      await wishlist.save();

      res.json({
        message:
          "Item removed from wishlist",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
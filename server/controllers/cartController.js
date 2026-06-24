import Cart from "../models/Cart.js";

export const addToCart = async (
  req,
  res
) => {
  try {
    const { productId, quantity } =
      req.body;

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    const itemIndex =
      cart.items.findIndex(
        (item) =>
          item.product.toString() ===
          productId
      );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity +=
        quantity || 1;
    } else {
      cart.items.push({
        product: productId,
        quantity:
          quantity || 1,
      });
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getCart = async (
  req,
  res
) => {
  try {
    const cart =
      await Cart.findOne({
        user: req.user._id,
      }).populate(
        "items.product"
      );

    if (!cart) {
      return res.json([]);
    }

    res.json(cart.items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const removeCartItem =
  async (req, res) => {
    try {
      const cart =
        await Cart.findOne({
          user: req.user._id,
        });

      if (!cart) {
        return res
          .status(404)
          .json({
            message:
              "Cart not found",
          });
      }

      cart.items =
        cart.items.filter(
          (item) =>
            item._id.toString() !==
            req.params.id
        );

      await cart.save();

      res.json({
        message:
          "Item removed",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  export const updateCartQuantity =
  async (req, res) => {
    try {

      const { quantity } =
        req.body;

      const cart =
        await Cart.findOne({
          user: req.user._id,
        });

      if (!cart) {
        return res.status(404).json({
          message: "Cart not found",
        });
      }

      const item =
        cart.items.id(
          req.params.id
        );

      if (!item) {
        return res.status(404).json({
          message: "Item not found",
        });
      }

      item.quantity = quantity;

      await cart.save();

      res.json(cart);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
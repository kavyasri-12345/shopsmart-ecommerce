import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
export const createOrder =
  async (req, res) => {

    try {

      const cart =
        await Cart.findOne({
          user: req.user._id,
        }).populate(
          "items.product"
        );

      if (
        !cart ||
        cart.items.length === 0
      ) {
        return res.status(400).json({
          message:
            "Cart is empty",
        });
      }

      const totalPrice =
        cart.items.reduce(
          (acc, item) =>
            acc +
            item.product.price *
              item.quantity,
          0
        );

      const order =
        await Order.create({
          user: req.user._id,

          orderItems:
            cart.items,

          totalPrice,

         shippingAddress:
  req.body.shippingAddress,
        });

      cart.items = [];

      await cart.save();

      res.status(201).json(order);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };

export const getOrders =
  async (req, res) => {

    try {

      const orders =
        await Order.find({
          user: req.user._id,
        }).populate(
          "orderItems.product"
        );

      res.json(orders);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };
  export const updateOrderStatus =
  async (req, res) => {

    try {

      console.log("Updating:", req.params.id);

      const order =
        await Order.findById(
          req.params.id
        );

      console.log("Order Found:", order);

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      order.status = "Delivered";

      const updatedOrder =
        await order.save();

      console.log(
        "Updated Successfully"
      );

      res.json(updatedOrder);

    } catch (error) {

      console.log(
        "UPDATE ERROR:",
        error
      );

      res.status(500).json({
        message: error.message,
      });

    }
  };
  export const getAdminStats =
  async (req, res) => {

    try {

      const totalOrders =
        await Order.countDocuments();

      const totalRevenue =
        await Order.aggregate([
          {
            $group: {
              _id: null,
              revenue: {
                $sum: "$totalPrice",
              },
            },
          },
        ]);

      const totalUsers =
        await User.countDocuments();

      const totalProducts =
        await Product.countDocuments();

      res.json({
        products: totalProducts,
        orders: totalOrders,
        users: totalUsers,
        revenue:
          totalRevenue[0]?.revenue || 0,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };
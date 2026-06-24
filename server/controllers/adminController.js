import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const getDashboardStats =
  async (req, res) => {

    try {

      const products =
        await Product.countDocuments();

      const orders =
        await Order.countDocuments();

      const users =
        await User.countDocuments();

      const allOrders =
        await Order.find();

      const revenue =
        allOrders.reduce(
          (acc, order) =>
            acc + order.totalPrice,
          0
        );

      res.json({
        products,
        orders,
        users,
        revenue,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };

  export const getAllOrders =
  async (req, res) => {

    try {

      const orders =
        await Order.find()
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.json(orders);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };
import mongoose from "mongoose";

const orderSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      orderItems: [
        {
          product: {
            type:
              mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },

          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],

      totalPrice: {
        type: Number,
        required: true,
      },

      shippingAddress: {
        type: String,
        default:
          "Default Address",
      },

      status: {
        type: String,
        default: "Pending",
      },
    },
    {
      timestamps: true,
    }
  );

const Order =
  mongoose.model(
    "Order",
    orderSchema
  );

export default Order;
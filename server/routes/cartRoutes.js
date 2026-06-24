import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  addToCart,
  getCart,
  removeCartItem,
   updateCartQuantity,
} from "../controllers/cartController.js";

const router =
  express.Router();

router.post(
  "/",
  protect,
  addToCart
);

router.get(
  "/",
  protect,
  getCart
);

router.delete(
  "/:id",
  protect,
  removeCartItem
);
router.put(
  "/:id",
  protect,
  updateCartQuantity
);
export default router;
import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
} from "../controllers/wishlistController.js";

const router =
  express.Router();

router.post(
  "/",
  protect,
  addToWishlist
);

router.get(
  "/",
  protect,
  getWishlist
);

router.delete(
  "/:id",
  protect,
  removeWishlistItem
);

export default router;
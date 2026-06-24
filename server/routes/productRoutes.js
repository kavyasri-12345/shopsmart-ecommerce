import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";
import { uploadImage } from "../controllers/uploadController.js";
import {
  seedProducts
} from "../controllers/productController.js";
const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post(
  "/",
  protect,
  admin,
  createProduct
);

router.put(
  "/:id",
  protect,
  admin,
  updateProduct
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);

router.post(
  "/upload",
  upload.single("image"),
  uploadImage
);
router.post(
  "/seed",
  seedProducts
);

export default router;
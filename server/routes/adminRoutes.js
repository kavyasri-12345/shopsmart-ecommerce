import express from "express";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import {
  getDashboardStats,getAllOrders
} from "../controllers/adminController.js";

const router =
  express.Router();

router.get(
  "/stats",
  protect,
  admin,
  getDashboardStats
);
router.get(
  "/orders",
  protect,
  admin,
  getAllOrders
);
export default router;
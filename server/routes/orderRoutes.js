import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getAdminStats
} from "../controllers/orderController.js";

const router =
  express.Router();

router.post(
  "/",
  protect,
  createOrder
);

router.get(
  "/",
  protect,
  getOrders
);
router.put(
  "/:id/status",
  protect,
  updateOrderStatus
);
router.get(
  "/admin/stats",
  protect,
  getAdminStats
);
export default router;
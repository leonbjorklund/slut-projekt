import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateShippingStatus,
} from "../controllers/order-controller";

const orderRouter = express.Router();

// Create new Order
orderRouter.post("/api/orders", createOrder);

// Get all orders
orderRouter.get("/api/orders", getAllOrders);

// Get order by id
orderRouter.get("/api/orders/:id", getOrderById);

// Update the shipping status on order
orderRouter.put("/api/orders/:id", updateShippingStatus);

export default orderRouter;

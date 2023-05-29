import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  updateShippingStatus,
} from "../controllers/order-controller";

const orderRouter = Router();

orderRouter.post("/api/orders", createOrder);
orderRouter.get("/api/orders", getAllOrders);
orderRouter.get("/api/orders/:email", getOrdersByUser);
orderRouter.get("/api/orders/:id", getOrderById);
orderRouter.put("/api/orders/:id", updateShippingStatus);

export default orderRouter;

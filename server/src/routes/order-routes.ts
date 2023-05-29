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
orderRouter.get("/api/orders/:id", getOrderById);
orderRouter.put("/api/orders/:id", updateShippingStatus);
orderRouter.get("/api/orders/user/:email", getOrdersByUser);

export default orderRouter;

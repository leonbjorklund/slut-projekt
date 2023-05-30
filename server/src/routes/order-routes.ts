import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  updateShippingStatus,
} from "../controllers/order-controller";
import {
  validateCreateOrder,
  validateUpdateShippingStatus,
} from "../validation/order-validation";

const orderRouter = Router();

orderRouter.post("/api/orders", validateCreateOrder, createOrder);
orderRouter.get("/api/orders", getAllOrders);
orderRouter.get("/api/orders/:email", getOrdersByUser);
orderRouter.get("/api/orders/:id", getOrderById);
orderRouter.put(
  "/api/orders/:id",
  validateUpdateShippingStatus,
  updateShippingStatus
);

export default orderRouter;

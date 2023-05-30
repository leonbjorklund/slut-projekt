import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateShippingStatus,
} from "../controllers/order-controller";
import { validateCreateOrder } from "../validation/order-validation";

const orderRouter = Router();

orderRouter.post("/api/orders", validateCreateOrder, createOrder);
orderRouter.get("/api/orders", getAllOrders);
orderRouter.get("/api/orders/:id", getOrderById);
orderRouter.put("/api/orders/:id", updateShippingStatus);

export default orderRouter;

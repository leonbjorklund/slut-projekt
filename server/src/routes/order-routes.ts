import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  updateShippingStatus,
} from "../controllers/order-controller";
import { isAdmin } from "../middlewares/isAdmin";
import { isOrderOwner } from "../middlewares/isOrderOwner";

const orderRouter = Router();

orderRouter.post("/api/orders", createOrder);
orderRouter.get("/api/orders", isAdmin, getAllOrders);
orderRouter.get("/api/orders/:email", isOrderOwner, getOrdersByUser);
orderRouter.get("/api/orders/:id", getOrderById);
orderRouter.put("/api/orders/:id", isAdmin, updateShippingStatus);

export default orderRouter;

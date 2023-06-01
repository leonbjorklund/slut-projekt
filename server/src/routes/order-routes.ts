import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  updateShippingStatus,
} from "../controllers/order-controller";
import { isAdmin } from "../middlewares/isAdmin";
import { isOrderOwner } from "../middlewares/isOrderOwner";
import {
  validateCreateOrder,
  validateUpdateShippingStatus,
} from "../validation/order-validation";

const orderRouter = Router();

orderRouter.post("/api/orders", createOrder);
orderRouter.get("/api/orders", isAdmin, getAllOrders);
orderRouter.get("/api/orders/:email", isOrderOwner, getOrdersByUser);
orderRouter.put(
  "/api/orders/:id",
  isAdmin,
  validateUpdateShippingStatus,
  updateShippingStatus
);

export default orderRouter;

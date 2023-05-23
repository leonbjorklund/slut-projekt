import { Request, Response } from "express";
import { OrderModel } from "../models/order-model";

// Create new order
export async function createOrder(req: Request, res: Response) {
  const order = await OrderModel.create(req.body);
  await order.save();

  return res.status(201).json(order);
}

// Get all orders
export async function getAllOrders(req: Request, res: Response) {
  const orders = await OrderModel.find({}).populate("userId");
  res.status(200).json(orders);
}

// Get order by Id
export async function getOrderById(req: Request, res: Response) {
  const orderId = req.params.id;
  const order = await OrderModel.findById(orderId);

  if (!order) {
    return res.status(404).json("Order not found");
  }
  return res.status(200).json(order);
}

// Update shipping status
export async function updateShippingStatus(req: Request, res: Response) {
  const orderId = req.params.id;
  const { isShipped } = req.body;

  try {
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json("Order not found");
    }

    order.isShipped = isShipped;
    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json("Failed to update shipping status");
  }
}

import { Request, Response } from "express";
import { OrderModel } from "../models/order-model";

export async function createOrder(req: Request, res: Response) {
  const order = await OrderModel.create(req.body);
  await order.save();

  return res.status(201).json(order);
}

export async function getAllOrders(req: Request, res: Response) {
  res.send("getAllOrders");
}

export async function getOrderById(req: Request, res: Response) {
  res.send("getOrderById");
}

export async function updateShippingStatus(req: Request, res: Response) {
  res.send("updateShippingStatus");
}

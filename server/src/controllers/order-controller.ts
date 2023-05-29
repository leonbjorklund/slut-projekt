import { Request, Response } from "express";
import { assert } from "../errorHandler";
import { OrderModel } from "../models/order-model";

// Create new order
export async function createOrder(req: Request, res: Response) {
  // if(req.session && req.session.user && req.session.user._id){
  const order = await OrderModel.create(req.body);
  await order.save();

  return res.status(201).json(order);
}

// Get all orders
export async function getAllOrders(req: Request, res: Response) {
  const orders = await OrderModel.find({}).populate(
    "userId orderItems.product"
  );
  console.log(orders);

  res.status(200).json(orders);
}

// Get order by Id
export async function getOrderById(req: Request, res: Response) {
  const orderId = req.params.id;
  const order = await OrderModel.findById(orderId);

  assert(order !== null, 404, "Order not found");

  return res.status(200).json(order);
}

// Update shipping status
export async function updateShippingStatus(req: Request, res: Response) {
  const orderId = req.params.id;
  const { isShipped } = req.body;

  const order = await OrderModel.findById(orderId);

  assert(order !== null, 404, "Order not found");

  order!.isShipped = isShipped;
  await order!.save();

  return res.status(200).json(order);
}

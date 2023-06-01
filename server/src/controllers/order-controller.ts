import { Request, Response } from "express";
import { assert } from "../errorHandler";
import { OrderModel } from "../models/order-model";
import { ProductModel } from "../models/product-model";
import { UserModel } from "../models/user-model";

// Create new order
export async function createOrder(req: Request, res: Response) {
  // Check if the user is logged in
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  const userId = req.session.user._id;

  const orderData = {
    ...req.body,
    userId: userId,
  };

  const order = await OrderModel.create(orderData);
  order.populate("userId orderItems.product");
  await order.save();

  // Update stock for each ordered product
  for (const orderItem of order.orderItems) {
    const product = await ProductModel.findById(orderItem.product);
    assert(product !== null, 404, "Product not found");

    // Check if ordered quantity is available in stock
    assert(
      product!.inStock >= orderItem.quantity,
      400,
      `Not enough stock available for product ${product!.name}`
    );

    // Update stock quantity
    product!.inStock -= orderItem.quantity;
    await product!.save();
  }

  return res.status(201).json(order);
}

// Get all orders
export async function getAllOrders(req: Request, res: Response) {
  const orders = await OrderModel.find({}).populate(
    "userId orderItems.product"
  );
  assert(orders !== null, 404, "Orders not found");

  res.status(200).json(orders);
}

// Get orders by user email
export async function getOrdersByUser(req: Request, res: Response) {
  const userEmail = req.params.email;
  const user = await UserModel.findOne({ email: userEmail });
  assert(user !== null, 404, "User not found");

  const orders = await OrderModel.find({ userId: user?._id }).populate(
    "userId orderItems.product"
  );

  res.json(orders);
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

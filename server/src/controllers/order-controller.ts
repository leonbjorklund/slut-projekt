import { Request, Response } from "express";

export async function createOrder(req: Request, res: Response) {
  res.send("createOrder");
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

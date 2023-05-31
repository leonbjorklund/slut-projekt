import { NextFunction, Request, Response } from "express";
import { z } from "zod";

//Validation create new order

const addressSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  address: z.string().min(1),
  zipCode: z.string().min(5).max(5),
  city: z.string().min(1),
  phoneNumber: z.string().min(10),
});

const orderItemSchema = z.object({
  product: z
    .string()
    .min(1)
    .refine((value) => value.trim() !== "", { message: "Product is required" }),
  quantity: z.number().min(1),
});

const orderSchema = z.object({
  // userId: z.string().min(1),
  orderItems: z.array(orderItemSchema).min(1),
  deliveryAddress: addressSchema,
  isShipped: z.boolean(),
  createdAt: z.date().default(() => new Date()),
});

export function validateCreateOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validationResult = orderSchema.safeParse(req.body);
  if (validationResult.success) {
    next();
  } else {
    const errorMessages = validationResult.error.errors.map(
      (error) => `Field '${error.path.join(".")}' is incorrect or missing`
    );
    res.status(400).json(errorMessages);
  }
}

// Validation update shipping status
const updateShippingStatusSchema = z.object({
  isShipped: z.boolean(),
});

export function validateUpdateShippingStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validationResult = updateShippingStatusSchema.safeParse(req.body);
  if (validationResult.success) {
    req.body = validationResult.data;
    next();
  } else {
    const errorMessages = validationResult.error.errors.map(
      (error) => `Invalid value for '${error.path.join(".")}'`
    );
    res.status(400).json(errorMessages);
  }
}

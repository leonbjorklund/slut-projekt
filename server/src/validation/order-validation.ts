import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const addressSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  address: z.string().default(""),
  zipCode: z.number().default(0),
  city: z.string().default(""),
  phoneNumber: z.number().default(0),
});

const orderItemSchema = z.object({
  product: z
    .string()
    .min(1)
    .refine((value) => value !== "", { message: "Product is required" }),
  quantity: z.number().min(1),
});

const orderSchema = z
  .object({
    userId: z.string().min(1),
    orderItems: z.array(orderItemSchema).min(1),
    deliveryAddress: addressSchema,
    isShipped: z.boolean(),
    createdAt: z.date().default(() => new Date()),
  })
  .nonstrict();

export function validateCreateOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validationResult = orderSchema.safeParse(req.body);
  validationResult.success
    ? next()
    : res.status(400).json(validationResult.error.message);
}

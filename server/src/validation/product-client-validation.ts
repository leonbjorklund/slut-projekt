import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ProductModel } from "../models/product-model";

export const productCreateSchema = z
  .object({
    name: z.string().min(1).max(100),
    price: z.number().min(1).max(1000),
    height: z.number().min(1).max(1000),
    image: z.string().min(1).max(1000),
    description: z.string().min(1).max(1000),
    categories: z.array(z.string().min(1).max(1000)),
    inStock: z.number().min(1).max(1000),
  })
  .strict();

  export const productEditSchema = z
  .object({
    name: z.string().min(1).max(100),
    price: z.number().min(1).max(1000),
    image: z.string().min(1).max(1000),
    height: z.number().min(1).max(1000),
    description: z.string().min(1).max(1000),
    categories: z.array(z.string().min(1).max(1000)),
    inStock: z.number().min(1).max(1000),
  })
  .strict();

export function validateBody(schema: z.Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse(req.body);
    if (!validationResult.success) {
    console.error('Validation error:', validationResult.error);
  }

    console.log(validationResult);
    if (validationResult.success) {
      next();
    } else {
      if (req.params.id) {
        const product = await ProductModel.findById(req.params.id);
        console.log(product);
        if (!product) {
          res
            .status(404)
            .json(`Product with ID ${req.params.id} was not found`);
        } else {
          res.status(400).json(validationResult.error.message);
        }
      } else {
        res.status(400).json(validationResult.error.message);
      }
    }
  };
}

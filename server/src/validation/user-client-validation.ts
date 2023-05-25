import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().min(1).max(100),
  password: z.string().min(6).max(28),
});

export function validateCreateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validationResult = createUserSchema.safeParse(req.body);
  validationResult.success
    ? next()
    : res.status(400).json(validationResult.error.message);
}

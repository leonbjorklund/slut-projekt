import { NextFunction, Request, Response } from "express";

export class CustomError extends Error {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export function errorHandler(
  err: CustomError, //TODO: unknown och typa if satser
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { statusCode, message } = err;
  console.error(err);
  res.status(statusCode || 500).json(message);
}

export function assert(
  condition: boolean,
  status: number,
  message: string
): void {
  if (!condition) {
    throw new CustomError(status, message);
  }
}

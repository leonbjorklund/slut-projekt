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
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    const { statusCode, message } = err;
    console.error(err);
    res.status(statusCode || 500).json(message);
  } else if (err instanceof Error) {
    console.error(err);
    res.status(500).json(err.message);
  } else {
    console.error(err);
    res.status(500).json("An unknown error occurred.");
  }
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

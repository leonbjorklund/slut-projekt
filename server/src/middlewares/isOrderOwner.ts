import { NextFunction, Request, Response } from "express";

export function isOrderOwner(req: Request, res: Response, next: NextFunction) {
  const userEmail = req.params.email; // Assuming the email is passed as a parameter
  const user = req.session?.user;

  if (user && user.email === userEmail) {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
}

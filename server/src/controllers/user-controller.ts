import { Request, Response } from "express";
import { UserModel } from "../models/user-model";

export async function createUser(req: Request, res: Response) {
  const user = await UserModel.create(req.body);
  await user.save();
  console.log(req.body);
  return res.status(201).json(user);
}

export async function getAllUsers(req: Request, res: Response) {
  res.send("getAllUsers");
}

export async function getUserById(req: Request, res: Response) {
  res.send("getUserById");
}

export async function updateUser(req: Request, res: Response) {
  res.send("updateUser");
}

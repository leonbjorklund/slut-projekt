import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { UserModel } from "../models/user-model";

export async function createUser(req: Request, res: Response) {
  const user = await UserModel.create(req.body);
  await user.save();
  console.log(req.body);
  return res.status(201).json(user);
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  req.session!.user = {
    _id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  res.status(200).json({
    _id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
  });

  return res.status(200).json({ message: "Login successful" });
}

export async function signoutUser(req: Request, res: Response) {
  req.session = null;
  res.status(204).json({ message: "Signout successful" });
}

export async function updateUserAdmin(req: Request, res: Response) {
  res.send("updateUserAdmin");
}

export async function getAllUsers(req: Request, res: Response) {
  res.send("getAllUsers");
}

export async function getUserById(req: Request, res: Response) {
  res.send("getUserById");
}

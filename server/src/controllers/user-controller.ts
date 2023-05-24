import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { assert } from "../errorHandler";
import { UserModel } from "../models/user-model";

export async function createUser(req: Request, res: Response) {
  const user = await UserModel.create(req.body);
  await user.save();
  return res.status(201).json(user);
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  assert(user !== null, 401, "Invalid email or password");

  const passwordMatch = await bcrypt.compare(password, user!.password);

  assert(passwordMatch, 401, "Invalid email or password");

  req.session!.user = {
    _id: user!.id,
    email: user!.email,
    isAdmin: user!.isAdmin,
  };

  res.status(200).json({
    _id: user!.id,
    email: user!.email,
    isAdmin: user!.isAdmin,
  });
}

export function signoutUser(req: Request, res: Response) {
  req.session = null;
  res.status(204).json({ message: "Signout successful" });
}

export async function updateUserAdmin(req: Request, res: Response) {
  const userId = req.params.id;
  const { isAdmin } = req.body;
  const user = await UserModel.findById(userId);

  assert(user !== null, 404, "User not found");

  user!.isAdmin = isAdmin;
  await user!.save();

  return res.status(200).json({
    _id: user!._id,
    username: user!.email,
    isAdmin: user!.isAdmin,
  });
}

export async function getAllUsers(req: Request, res: Response) {
  const users = await UserModel.find().select("_id email __v isAdmin");
  res.status(200).json(users);
}

export async function getUserById(req: Request, res: Response) {
  const userId = req.params.id;
  const user = await UserModel.findById(userId).select("_id email __v isAdmin");

  assert(user !== null, 404, "User not found");

  return res.status(200).json(user);
}

export function checkAuth(req: Request, res: Response) {
  if (req.session && req.session.user) {
    res.status(200).json({ success: true, user: req.session.user });
  } else {
    res.status(204).json({ success: false, user: null });
  }
}

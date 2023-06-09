import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { assert } from "../errorHandler";
import { UserModel } from "../models/user-model";

export async function createUser(req: Request, res: Response) {
  const { email } = req.body;

  // check if user with given email already exists
  const existingUser = await UserModel.findOne({ email });

  // if user already exists, throw an error
  assert(existingUser === null, 409, "User already exists!");

  const user = await UserModel.create(req.body);
  await user.save();

  const userResponse: any = user.toObject();
  delete userResponse.password;

  return res.status(201).json(userResponse);
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

export function logoutUser(req: Request, res: Response) {
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
    email: user!.email,
    isAdmin: user!.isAdmin,
  });
}

export async function getAllUsers(req: Request, res: Response) {
  const users = await UserModel.find().select("_id email __v isAdmin");
  res.status(200).json(users);
}

export function checkAuth(req: Request, res: Response) {
  if (req.session && req.session.user) {
    res.status(200).json({ success: true, user: req.session.user });
  } else {
    res.status(204).json({ success: false, user: null });
  }
}

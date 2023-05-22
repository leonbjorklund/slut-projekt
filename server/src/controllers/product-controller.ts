import { Request, Response } from "express";

export async function addProduct(req: Request, res: Response) {
  res.send("createUser");
}

export async function getAllProducts(req: Request, res: Response) {
  res.send("getAllUsers");
}

export async function getProductById(req: Request, res: Response) {
  res.send("getUserById");
}

export async function updateProduct(req: Request, res: Response) {
  res.send("updateUser");
}

export async function deleteProduct(req: Request, res: Response) {
  res.send("updateUser");
}

import { Request, Response } from "express";
import { Product, ProductModel } from "../models/product-model";

export async function addProduct(req: Request, res: Response) {
  try {
    const newProduct: Product = req.body;
    const product = await ProductModel.create(newProduct);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
}

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products: Product[] = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to get products" });
  }
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

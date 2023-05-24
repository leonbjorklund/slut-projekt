import { Request, Response } from "express";
import { assert } from "../errorHandler";
import { Product, ProductModel } from "../models/product-model";

export async function addProduct(req: Request, res: Response) {
  const newProduct: Product = req.body;
  const product = await ProductModel.create(newProduct);
  res.status(201).json(product);
}

export async function getAllProducts(req: Request, res: Response) {
  const products: Product[] = await ProductModel.find();
  res.json(products);
}

export async function getProductById(req: Request, res: Response) {
  const productId = req.params.id;
  const product = await ProductModel.findById(productId);

  assert(product !== null, 404, "Product not found");

  res.status(200).json(product);
}

export async function updateProduct(req: Request, res: Response) {
  const productId = req.params.id;
  const updatedProductData: Product = req.body;

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    updatedProductData,
    { new: true }
  );

  assert(updatedProduct !== null, 404, "Product not found");

  res.status(200).json(updatedProduct);
}

export async function deleteProduct(req: Request, res: Response) {
  const productId = req.params.id;
  const product = await ProductModel.findByIdAndDelete(productId);

  assert(product !== null, 404, "Product not found");

  res.status(200).json({ message: "Product deleted successfully" });
}

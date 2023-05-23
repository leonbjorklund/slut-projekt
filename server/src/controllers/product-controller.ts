import { NextFunction, Request, Response } from "express";
import { assert, CustomError } from "../errorHandler";
import { Product, ProductModel } from "../models/product-model";

export async function addProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newProduct: Product = req.body;
    const product = await ProductModel.create(newProduct);
    res.status(201).json(product);
  } catch (error) {
    next(new CustomError(500, "Failed to add product"));
  }
}

export async function getAllProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products: Product[] = await ProductModel.find();
    res.json(products);
  } catch (error) {
    next(new CustomError(500, "Failed to get products"));
  }
}

export async function getProductById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    assert(product !== null, 404, "Product not found");
    res.status(200).json(product);
  } catch (error) {
    next(new CustomError(500, "Product not found"));
  }
}

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const productId = req.params.id;
    const updatedProductData: Product = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );

    assert(updatedProduct !== null, 404, "Product not found");
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(new CustomError(500, "Failed to update product"));
  }
}

export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findByIdAndDelete(productId);
    assert(product !== null, 404, "Product not found");
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(new CustomError(500, "Failed to delete product"));
  }
}

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
  try {
    const productId = req.params.id;
    await ProductModel.findById(productId);
    res.status(200).json({ message: "Product successfully found" });
  } catch (error) {
    res.status(500).json({ error: "Product not found " });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const productId = req.params.id;
    const updatedProductData: Product = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const productId = req.params.id;
    await ProductModel.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
}

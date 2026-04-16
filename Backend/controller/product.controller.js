import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";

// CREATE PRODUCT
const createProduct = asyncHandler(async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();

  if (savedProduct) {
    res.status(201).json(savedProduct);
  } else {
    res.status(400);
    throw new Error("Product was not created");
  }
});

// UPDATE PRODUCT
const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedProduct) {
    res.status(400);
    throw new Error("Product has not been updated");
  } else {
    res.status(200).json(updatedProduct);
  }
});

// DELETE PRODUCT
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product was not deleted");
  } else {
    res.status(200).json("Product deleted successfully");
  }
});

// GET ONE PRODUCT
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    res.status(200).json(product);
  }
});

// GET ALL PRODUCTS (🔥 FIXED + SAFE)
const getALLProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();

    console.log("🛒 Products:", products); // debug

    res.status(200).json(products);
  } catch (err) {
    console.log("❌ Error fetching products:", err);
    res.status(500).json("Error fetching products");
  }
});

// RATING PRODUCT
const ratingProduct = asyncHandler(async (req, res) => {
  const { star, name, comment, postedBy } = req.body;

  if (star && name && comment && postedBy) {
    await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $push: { ratings: { star, name, comment, postedBy } },
      },
      { new: true }
    );

    res.status(200).json("Product rated successfully");
  } else {
    res.status(400);
    throw new Error("Product was not rated");
  }
});

export {
  ratingProduct,
  getALLProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
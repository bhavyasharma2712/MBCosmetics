import {
  ratingProduct,
  getALLProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";
import express from "express";
const router = express.Router();

//RATING PRODUCT ROUTER
router.put("/rating/:productId", ratingProduct);
//GET ALL PRODUCTS
router.get("/", getALLProducts);
//GET ONE PRODUCT
router.get("/find/:id", getProduct);
//CREATE PRODUCT
router.post("/", createProduct);
//UPDATE PRODUCT
router.put("/:id", updateProduct);

//DELETE PRODUCT
router.delete("/:id", deleteProduct);

export default router;

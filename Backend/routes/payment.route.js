import express from "express";
const router = express.Router();
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controller/payment.controller.js";

// CREATE RAZORPAY ORDER
router.post("/create-order", createRazorpayOrder);

// VERIFY PAYMENT
router.post("/verify", verifyRazorpayPayment);

export default router;
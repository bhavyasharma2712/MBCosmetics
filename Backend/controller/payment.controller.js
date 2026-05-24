import Razorpay from "razorpay";
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import dotenv from "dotenv";

// Load environment variables immediately
dotenv.config();

// Helper to check if keys are actually loaded in the terminal
const verifyEnv = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error("CRITICAL ERROR: Razorpay keys are missing from process.env");
    return false;
  }
  return true;
};

// CREATE RAZORPAY ORDER
export const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  // Debugging: Check keys in backend terminal when this is called
  console.log("Attempting to create order for amount:", amount);
  verifyEnv();

  if (!amount) {
    res.status(400);
    throw new Error("Amount is required");
  }

  // Initialize instance inside the function to ensure process.env is populated
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID.trim(), // trim() removes accidental hidden spaces
    key_secret: process.env.RAZORPAY_KEY_SECRET.trim(),
  });

  const options = {
    amount: Math.round(Number(amount) * 100), // convert to paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log("Order created successfully:", order.id);
    res.status(200).json(order);
  } catch (error) {
    // Log the full error to your VS Code terminal for inspection
    console.error("Razorpay API Error Response:", error);
    
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.error?.description || "Payment Gateway Authentication Failed",
      details: error.error?.code || "INTERNAL_ERROR"
    });
  }
});

// VERIFY RAZORPAY PAYMENT
export const verifyRazorpayPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  // Crucial: Use the secret from .env for the signature check
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.status(200).json({ success: true, paymentId: razorpay_payment_id });
  } else {
    console.error("Signature verification failed");
    res.status(400).json({ success: false, message: "Invalid payment signature" });
  }
});